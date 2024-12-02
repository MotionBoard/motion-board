import {redirect} from 'next/navigation';
import {ReactNode} from 'react';
import {checkAuth} from '@/lib/auth';

export default async function Layout({children}: Readonly<{ children: ReactNode; }>) {
	const {isOnboarded, isLoggedIn} = await checkAuth();

	if (!isOnboarded) {
		return redirect('/onboarding');
	}

	if (isLoggedIn) {
		return redirect('/');
	}

	return children;
}