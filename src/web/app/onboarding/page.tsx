import {checkAuth} from '@/lib/auth';
import {redirect} from 'next/navigation';
import {Onboarding} from '@/app/onboarding/_ui/onboarding';
import {SettingsRepository} from '@server/repositories/settings.repository';

export default async function OnboardingPage() {
	const auth = await checkAuth();

	if (auth.isOnboarded && !auth.isLoggedIn) {
		return redirect('/onboarding');
	}

	if (auth.isLoggedIn) {
		return redirect('/');
	}

	const settings = await SettingsRepository.exists();

	return <Onboarding currentStep={settings ? 1 : 0}/>;
}