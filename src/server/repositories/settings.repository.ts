import prisma from '@/server/lib/prisma';

export class SettingsRepository {
	static async getSettings() {
		return prisma.settings.findFirst();
	}
}