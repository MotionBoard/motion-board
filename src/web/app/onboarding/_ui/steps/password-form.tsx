import AutoForm from '@/components/ui/auto-form';
import {passwordSchema} from '@shared/schemas/settings.schema';
import {ArrowRightIcon} from 'lucide-react';
import {useCallback} from 'react';
import {post} from '@/lib/api';
import {errors} from '@shared/errors';
import {toast} from 'sonner';

export function PasswordForm({nextStep}: { nextStep: () => void }) {
	const onSubmit = useCallback(async (values) => {
		const {success, error} = await post('/settings/password', values);
		if (!success) {
			if (error.code !== errors.INVALID_CREDENTIALS) {
				toast.error('An error occurred', {
					description: 'Please try again later'
				});
			}
			return;
		}
		nextStep();
	}, [nextStep]);

	return <div className={'max-w-lg w-full'}>
		<h1 className={'text-3xl font-semibold'}>Password</h1>
		<p className={'text-accent-foreground mt-1 mb-6'}>
			Set a password to protect your board.
		</p>
		<AutoForm formSchema={passwordSchema} onSubmit={onSubmit} fieldConfig={{
			password: {
				inputProps: {
					type: 'password'
				}
			},
			password_confirmation: {
				inputProps: {
					type: 'password'
				}
			}
		}} submitText={<>
			Next<ArrowRightIcon size={14}/>
		</>}/>
	</div>;
}