import {GarminConnect} from '@/server/lib/garmin-connect';
import {SettingsRepository} from '@/server/repositories/settings.repository';
import {encrypt} from '@/server/lib/crypto';

export class GarminService {
	private static client: GarminConnect;

	static async testCredentials(username: string, password: string) {
		try {
			this.client = new GarminConnect({username, password});
			await this.client.login();
			return this.client.exportToken();
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
}