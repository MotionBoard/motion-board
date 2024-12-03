import {GarminConnect} from '@/server/lib/garmin-connect';
import {SettingsRepository} from '@/server/repositories/settings.repository';
import {decrypt, encrypt} from '@/server/lib/crypto';
import {Prisma} from '@prisma/client';
import {UserRepository} from '@/server/repositories/user.repository';

export class GarminService {
	private static client: GarminConnect;

	static async getClient() {
		if (!this.client) {
			const settings = await SettingsRepository.getSettings();
			if (!settings || !settings.garmin_username || !settings.garmin_password) {
				throw new Error('Settings not found');
			}

			const client = await this.loginWithToken(settings) || await this.loginWithPassword(settings);
			if (!client) {
				throw new Error('Failed to login');
			}
			this.client = client;
		}
		return this.client;
	}

	private static async loginWithToken(settings: Prisma.SettingsGetPayload<{}>) {
		if (!settings.oauth) {
			return null;
		}

		const client = new GarminConnect({
			username: settings.garmin_username,
			password: decrypt(settings.garmin_password)
		});
		const {oauth1, oauth2} = JSON.parse(decrypt(settings.oauth));
		client.loadToken(oauth1, oauth2);
		return client;
	}

	private static async loginWithPassword(settings: Prisma.SettingsGetPayload<{}>) {
		const client = new GarminConnect({
			username: settings.garmin_username,
			password: decrypt(settings.garmin_password)
		});
		await client.login();
		await SettingsRepository.updateToken(JSON.stringify(client.exportToken()));
		return client;
	}

	static async testCredentials(username: string, password: string) {
		try {
			const client = new GarminConnect({username, password});
			await client.login();
			this.client = client;
			return client.exportToken();
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async updateGarminCredentials(data: {
		garmin_email: string;
		garmin_password: string;
		tokens: any;
	}) {
		await SettingsRepository.updateGarminCredentials({
			garmin_email: data.garmin_email,
			garmin_password: encrypt(data.garmin_password),
			tokens: encrypt(JSON.stringify(data.tokens))
		});
	}

	static async updateToken(token: any) {
		await SettingsRepository.updateToken(encrypt(JSON.stringify(token)));
	}

	static async updateUserData() {
		const client = await this.getClient();
		const profile = await client.getUserProfile();
		const data = await client.getUserData();
		await UserRepository.updateUser({
			id: 1,
			email: profile.userName,
			name: profile.fullName,
			display_name: profile.displayName,
			avatar: profile.profileImageUrlLarge,
			sex: data.gender ?? undefined,
			weight: data.weight,
			height: data.height,
			birth: data.birthDate ? new Date(data.birthDate) : null,
			cycling_vo2: data.vo2MaxCycling,
			running_vo2: data.vo2MaxRunning
		});
	}
}