import {ReactNode} from 'react';
import {checkAuth} from '@/lib/auth';
import {redirect} from 'next/navigation';
import {userCache} from '@/lib/cache';
import {UserProvider} from '@/components/providers/user-provider';
import {Navbar} from '@/app/(root)/_components/layout/navbar';

export default async function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
	const auth = await checkAuth();

	if (!auth.isOnboarded) {
		redirect('/onboarding');
	}

	if (!auth.isLoggedIn) {
		redirect('/login');
	}

	const user = await userCache();

	return <UserProvider user={user!}>
		<Navbar/>
		<div vaul-drawer-wrapper={''}
			 style={{
				 transitionProperty: 'transform, borderRadius',
				 transitionDuration: '0.5s',
				 transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
				 transformOrigin: 'center top'
			 }}>
			<main
				className={'max-md:pt-2 md:pt-6 mx-auto max-w-6xl max-md:pb-28 relative flex min-h-screen overflow-x-hidden flex-col bg-background'}>
				{children}
			</main>
		</div>
	</UserProvider>;
}