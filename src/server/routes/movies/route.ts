import {RouteBuilder, validate} from '@next-ts';
import {movieInsertSchema} from '@/shared/schemas/movie.schemas';
import {MoviesController} from '@/server/controllers/movies.controller';

const router = new RouteBuilder(MoviesController)
	.get('/', 'getMovie')
	.post('/', 'addMovie', [validate(movieInsertSchema)])
	.delete('/:id', 'deleteMovie');

export default router;