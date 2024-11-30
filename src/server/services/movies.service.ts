import {MovieRepository} from '@/server/repositories/movie.repository';

export class MoviesService {
	static async getMovies() {
		return await MovieRepository.getMovies();
	};

	static async addMovie(title: string) {
		return await MovieRepository.addMovie(title);
	};

	static async deleteMovie(id: string) {
		await MovieRepository.deleteMovie(id);
	}
}