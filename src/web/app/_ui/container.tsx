import {ReactNode} from 'react';
import {cn} from '@/lib/utils';

export function Container({className, children}: Readonly<{ className?: string; children: ReactNode; }>) {
	return <main className={cn('h-full max-w-[1200px] mx-auto w-full', className)}>
		{children}
	</main>;
}