import prisma from '@/server/lib/prisma';
import {z} from 'zod';
import {settingsSchema} from '@/shared/schemas/settings.schema';

export class SettingsRepository {
	static async getSettings() {
		return prisma.settings.findFirst();
	}

	static async isOnboarded() {
		const settings = await prisma.settings.findFirst({
			select: {
				hash: true
			}
		});
		return !!settings && !!settings.hash;
	}

	static async exists() {
		const settings = await prisma.settings.findFirst({
			select: {
				id: true
			}
		});
		return !!settings;
	}

	static async updateToken(token: string) {
		await prisma.settings.update({
			where: {id: 1},
			data: {
				oauth: token
			}
		});
	}

	static async updateGarminCredentials(data: {
		garmin_email: string;
		garmin_password: string;
		tokens: any;
	}) {
		await prisma.settings.upsert({
			where: {id: 1},
			update: {
				garmin_username: data.garmin_email,
				garmin_password: data.garmin_password,
				oauth: data.tokens
			},
			create: {
				id: 1,
				garmin_username: data.garmin_email,
				garmin_password: data.garmin_password,
				oauth: data.tokens
			}
		});
	}

	static async updatePassword(hash: string) {
		await prisma.settings.update({
			where: {id: 1},
			data: {
				hash
			}
		});
	}

	static async updateSettings(data: z.infer<typeof settingsSchema>) {
		await prisma.settings.update({
			where: {id: 1},
			data
		});
	}
}