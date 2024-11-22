'use client';

import {Button} from '@/components/ui/button';
import {del, optimisticUpdate, post} from '@/lib/api';
import {useCallback, useState} from 'react';
import {Card, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Trash} from 'lucide-react';
import {ExampleType, useExample} from '@/lib/services/example.service';

function ExampleCard({id, title}: { title: string, id: string }) {
	const {mutate} = useExample();

	const deleteCard = useCallback(async () => {
		await del(`/example/${id}`);
		await mutate((prev: any) => prev.filter((d: any) => d.id !== id));
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
	const {data} = useExample();
	const [value, setValue] = useState('');

	const addData = () => {
		if (value !== '') {
			setValue('');
			optimisticUpdate<ExampleType, any>('/example', {
				fetcher: async () => {
					return (await post('/example', {title: value})).data;
				},
				optimisticData: {
					id: 'temp' + Date.now(),
					title: value
				},
				setData: (prev, newData) => [...prev, newData]
			});
		}
	};

	return <div className={'flex items-center justify-center h-screen w-full flex-col gap-4'}>
		<div className={'flex flex-col gap-2 max-w-md w-full'}>
			{data && data.map((d: any) => <ExampleCard key={d.id} id={d.id} title={d.title}/>)}
		</div>
		<div className={'max-w-md w-full flex gap-2'}>
			<Input type={'text'} placeholder={'Enter something'} value={value}
				   onChange={e => setValue(e.target.value)}/>
			<Button onClick={addData}>Send</Button>
		</div>
	</div>;
}
