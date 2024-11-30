import {ControllerHandlerProps} from '@next-ts';
import {movieInsertSchema} from '@/shared/schemas/movie.schemas';
import {MoviesService} from '@/server/services/movies.service';

export class MoviesController {
	async getMovie({res}: ControllerHandlerProps) {
		const values = await MoviesService.getMovies();
		res.success(values);
	};

	async addMovie({res, body}: ControllerHandlerProps<typeof movieInsertSchema>) {
		const data = await MoviesService.addMovie(body.title);
		res.status(201).success(data);
	};

	async deleteMovie({res, params}: ControllerHandlerProps) {
		const {id} = params;
		await MoviesService.deleteMovie(id);
		res.success();
	}
}