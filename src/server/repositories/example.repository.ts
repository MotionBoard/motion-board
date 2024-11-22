import prisma from '@/server/lib/prisma';

export class ExampleRepository {
	static async getValues() {
		return prisma.example.findMany();
	}

	static async addValue(title: string) {
		return await prisma.example.create({
			data: {
				title
			}
		});
	}

	static async deleteValue(id: string) {
		await prisma.example.delete({
			where: {
				id
			}
		});
	}
}