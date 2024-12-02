import AutoForm from '@/components/ui/auto-form';
import {garminSchema} from '@shared/schemas/settings.schema';
import {ArrowRightIcon} from 'lucide-react';
import {useCallback} from 'react';
import {post} from '@/lib/api';
import {errors} from '@shared/errors';
import {toast} from 'sonner';

export function GarminForm({nextStep}: { nextStep: () => void }) {
	const onSubmit = useCallback(async (values) => {
		const {success, error} = await post('/settings/garmin', values);
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
		nextStep();
	}, [nextStep]);

	return <div className={'max-w-lg w-full'}>
		<h1 className={'text-3xl font-semibold'}>Welcome to Motion Board</h1>
		<p className={'text-accent-foreground mt-1 mb-6'}>
			Please provide your Garmin credentials to get started.
		</p>
		<AutoForm formSchema={garminSchema} onSubmit={onSubmit} fieldConfig={{
			password: {
				inputProps: {
					type: 'password'
				}
			}
		}} submitText={<>
			Next<ArrowRightIcon size={14}/>
		</>}>
		</AutoForm>
	</div>;
}