'use client';

import {Button} from '@/components/ui/button';
import {del, optimisticRequest, optimisticUpdate, post, toastRequest} from '@/lib/api';
import {useCallback, useState} from 'react';
import {Card, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Trash} from 'lucide-react';
import {MovieType, useMovies} from '@/lib/services/movies.service';
import ThemeBtn from '@/app/_ui/theme-btn';

function MovieCard({id, title}: { title: string, id: string }) {
	const deleteCard = useCallback(async () => {
		await optimisticRequest<MovieType[]>('movies', {
			fetcher: toastRequest(() => del(`/movies/${id}`), {
				loading: 'Deleting movie...',
				success: `Movie ${title} deleted successfully!`,
				error: 'Failed to delete movie!'
			}),
			setData: (prev) => prev.filter((d: any) => d.id !== id)
		});
	}, [id]);

	return <Card>
		<CardHeader className={'flex justify-between items-center flex-row py-2 px-3'}>
			<CardTitle>{title}</CardTitle>
			<Button variant={'destructive'} size={'icon'} onClick={deleteCard}>
				<Trash size={10}/>
			</Button>
		</CardHeader>
	</Card>;
}

export default function Home() {
	const {data: movies} = useMovies();
	const [value, setValue] = useState('');

	const addMovie = useCallback(async () => {
		if (value !== '') {
			setValue('');

			await optimisticUpdate<MovieType[], MovieType>('movies', {
				fetcher: toastRequest<MovieType>(() => post('/movies', {title: value}), {
					loading: 'Sending movie...',
					success: (data: any) => `Movie ${data.title} sent successfully!`,
					error: 'Failed to send movie!'
				}),
				optimisticData: {
					id: 'movie' + Date.now(),
					title: value
				},
				setData: (prev, newData) => [...prev, newData]
			});
		}
	}, [value]);

	return <>
		<div className={'absolute top-4 right-4'}>
			<ThemeBtn/>
		</div>
		<div className={'flex items-center justify-center h-screen w-full flex-col gap-4'}>
			<div className={'flex flex-col gap-2 max-w-md w-full'}>
				{movies && movies.map((d: any) => <MovieCard key={d.id} id={d.id} title={d.title}/>)}
			</div>
			<div className={'max-w-md w-full flex gap-2'}>
				<Input type={'text'} placeholder={'Enter movie name'} value={value}
					   onChange={e => setValue(e.target.value)}/>
				<Button onClick={addMovie}>Add</Button>
			</div>
		</div>
	</>;
}
