import {ReactNode} from 'react';
import {cn} from '@/lib/utils';

export function Container({children, className}: { children: ReactNode, className?: string }) {
	return <div
		className={cn('mx-auto max-w-3xl w-full flex flex-col items-start md:pt-10 px-2 gap-4 pb-[85px] max-md:pb-[100px]', className)}>
		{children}
	</div>;
}