import prisma from '@/server/lib/prisma';

export class MovieRepository {
	static async getMovies() {
		return prisma.movies.findMany();
	}

	static async addMovie(title: string) {
		return await prisma.movies.create({
			data: {
				title
			}
		});
	}

	static async deleteMovie(id: string) {
		await prisma.movies.delete({
			where: {
				id
			}
		});
	}
}