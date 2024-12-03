import prisma from '@/server/lib/prisma';
import {Prisma} from '@prisma/client';

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

	static async updateUser({id, ...data}: Prisma.UserGetPayload<{}>) {
		await prisma.user.upsert({
			where: {
				id: 1
			},
			update: data,
			create: {
				id: 1,
				...data
			}
		});
	}
}