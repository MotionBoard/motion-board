'use client';

import AutoForm from '@/components/ui/auto-form';
import {settingsSchema} from '@shared/schemas/settings.schema';
import {ArrowRightIcon} from 'lucide-react';
import {useCallback} from 'react';
import {useRouter} from 'next/navigation';
import {post} from '@/lib/api';
import {toast} from 'sonner';

export function SettingsForm() {
	const router = useRouter();
	const onSubmit = useCallback(async (values) => {
		const {success} = await post('/settings', values);
		if (!success) {
			toast.error('An error occurred', {
				description: 'Please try again later'
			});
			return;
		}
		router.push('/');
	}, []);

	return <div className={'max-w-lg w-full'}>
		<h1 className={'text-3xl font-semibold'}>Settings</h1>
		<p className={'text-accent-foreground mt-1 mb-6'}>
			Customize your board to your liking.
		</p>
		<AutoForm formSchema={settingsSchema} onSubmit={onSubmit} fieldConfig={{}} submitText={<>
			Get started<ArrowRightIcon size={14}/>
		</>}/>
	</div>;
}