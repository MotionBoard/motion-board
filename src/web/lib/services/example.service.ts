import {useGet} from '@/lib/api';

export type ExampleType = {
	id: string,
	title: string
}[]

export function useExample() {
	return useGet<ExampleType>('/example');
}