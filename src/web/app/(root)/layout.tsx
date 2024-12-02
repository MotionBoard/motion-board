import {ReactNode} from 'react';
import {checkAuth} from '@/lib/auth';
import {redirect} from 'next/navigation';

export default async function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
	const auth = await checkAuth();

	if (!auth.isOnboarded) {
		redirect('/onboarding');
	}

	if (!auth.isLoggedIn) {
		redirect('/login');
	}

	return children;
}