import type {Metadata} from 'next';
import {ReactNode} from 'react';
import {ThemeProvider} from '@/components/providers/theme-provider';
import ThemeBtn from '@/app/_ui/theme-btn';
import {GeistSans} from 'geist/font/sans';

import './globals.css';

export const metadata: Metadata = {
	title: 'Next-TS'
};

export default function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
	return (
		<html lang="en" suppressHydrationWarning className={`bg-background antialiased ${GeistSans.className}`}>
		<body>
		<ThemeProvider attribute="class">
			<div className={'absolute top-4 right-4'}>
				<ThemeBtn/>
			</div>
			{children}
		</ThemeProvider>
		</body>
		</html>
	);
}
