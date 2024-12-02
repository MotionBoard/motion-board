'use client';

import AutoForm from '@/components/ui/auto-form';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {z} from 'zod';
import {useCallback} from 'react';
import {useRouter} from 'next/navigation';
import {loginSchema} from '@shared/schemas';
import {post} from '@/lib/api';
import {errors} from '@shared/errors';
import {toast} from 'sonner';

export default function Login() {
	const router = useRouter();

	const onSubmit = useCallback(async (data: z.infer<typeof loginSchema>) => {
		const {success, error} = await post('/auth', data);
		if (!success) {
			if (error.code === errors.INVALID_CREDENTIALS) {
				toast.error('Invalid credentials');
			} else {
				toast.error('An error occurred', {
					description: 'Please try again later'
				});
			}
			return;
		}
		router.push('/');
	}, []);

	return <div className={'min-h-screen h-full w-full flex justify-center items-center px-4'}>
		<Card className={'max-w-md w-full'}>
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>Enter your password to get started</CardDescription>
			</CardHeader>
			<CardContent>
				<AutoForm formSchema={loginSchema} fieldConfig={{
					password: {
						inputProps: {
							type: 'password'
						}
					}
				}} onSubmit={onSubmit} submitText={'Login'}/>
			</CardContent>
		</Card>
	</div>;
}