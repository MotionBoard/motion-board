import useSWR, {mutate, SWRConfiguration} from 'swr';
import {toast} from 'sonner';
import React from 'react';

type ErrorType = {
	status: number;
	message: string;
	code: string;
} | null

type RequestReturn<T> = {
	data?: {
		status: 'success' | 'error',
		success: boolean,
		code: number,
		message: string,
		data: T | null,
		error: ErrorType
	},
	res?: Response,
	success: boolean,
	error?: ErrorType,
	status?: number
}

type MethodType = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'

function trimSlashes(str: string): string {
	return str.replace(/^\/+|\/+$/g, '');
}

async function request<T>(method: MethodType, url: string, opts?: {
	data?: any
}): Promise<RequestReturn<T>> {
	try {
		const res = await fetch(`${window.origin}/api/${trimSlashes(url)}`, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: opts?.data ? JSON.stringify(opts.data) : undefined
		});
		const body = await res.json();
		return {
			data: body.data,
			res,
			error: body.error,
			success: res.ok,
			status: res.status
		};
	} catch (e) {
		console.error(e);
		return {
			success: false
		};
	}
}

export function useGet<T>(url: string, opts?: {
	callback?: (data: any) => T
} & SWRConfiguration) {
	const swrOpts: SWRConfiguration = {
		...opts,
		revalidateOnFocus: false,
		revalidateIfStale: false
	};
	return useSWR<T, ErrorType>(url, async () => {
		const {data, error} = await get(url);
		if (error) {
			throw error;
		}
		return opts?.callback ? opts.callback(data) : data as T;
	}, swrOpts);
}

export async function optimisticUpdate<T, C>(url: string,
											 options: {
												 fetcher: Promise<C>,
												 optimisticData: C,
												 setData: (prev: T, newData: C) => T
											 }) {
	await mutate(url, async (currentData) => {
		try {
			const data = await options.fetcher;
			return options.setData(currentData, data);
		} catch {
			return currentData;
		}
	}, {
		optimisticData: (dt: T) => options.setData(dt, options.optimisticData),
		revalidate: false
	});
}

export async function optimisticRequest<T>(url: string,
										   options: {
											   fetcher: Promise<RequestReturn<any>>,
											   setData: (prev: T) => T
										   }) {
	await mutate(url, async (currentData) => {
		try {
			await options.fetcher;
			return options.setData(currentData);
		} catch {
			return currentData;
		}
	}, {
		optimisticData: (dt: T) => options.setData(dt),
		revalidate: false
	});
}

export async function get<T>(url: string): Promise<RequestReturn<T>> {
	return request('GET', url);
}

export async function post<T>(url: string, data: any): Promise<RequestReturn<T>> {
	return request('POST', url, {data});
}

export async function del<T>(url: string): Promise<RequestReturn<T>> {
	return request('DELETE', url);
}

export async function put<T>(url: string, data: any): Promise<RequestReturn<T>> {
	return request('PUT', url, {data});
}

export async function patch<T>(url: string, data: any): Promise<RequestReturn<T>> {
	return request('PATCH', url, {data});
}

type PromiseTResult<Data = any> =
	string
	| React.ReactNode
	| ((data: Data) => React.ReactNode | string | Promise<React.ReactNode | string>);

export async function toastRequest<T>(req: () => Promise<RequestReturn<T>>, opts?: {
	loading?: string | React.ReactNode;
	success?: PromiseTResult<T>;
	error?: PromiseTResult;
	description?: PromiseTResult;
	finally?: () => void | Promise<void>;
}) {
	const promise = new Promise(async (resolve, reject) => {
		const {success, data} = await req();
		if (success) {
			resolve(data);
			return;
		}
		reject();
	});

	return toast.promise(promise, opts).unwrap() as Promise<T>;
}