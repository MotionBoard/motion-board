import {useGet} from '@/lib/api';

export type MovieType = {
	id: string,
	title: string
}

export function useMovies() {
	return useGet<MovieType[]>('movies');
}