import prisma from '@/server/lib/prisma';

export class ActivityRepository {
	static async getAllActivities() {
		return prisma.activity.findMany();
	}
}