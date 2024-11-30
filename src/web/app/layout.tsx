import type {Metadata} from 'next';
import {ReactNode} from 'react';
import {ThemeProvider} from '@/components/providers/theme-provider';
import {GeistSans} from 'geist/font/sans';
import {Toaster} from 'sonner';

import './globals.css';

export const metadata: Metadata = {
	title: 'Next-TS'
};

export default function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
	return (
		<html lang="en"
			  suppressHydrationWarning
			  className={`bg-background antialiased ${GeistSans.className}`}>
		<body>
		<ThemeProvider attribute="class">
			{children}
			<Toaster/>
		</ThemeProvider>
		</body>
		</html>
	);
}
