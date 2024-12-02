import prisma from '@/server/lib/prisma';

export class UserRepository {
	static async getUser() {
		return prisma.user.findFirst();
	}

	static async exists() {
		const user = await prisma.user.findFirst({
			select: {
				id: true
			}
		});
		return !!user;
	}
}