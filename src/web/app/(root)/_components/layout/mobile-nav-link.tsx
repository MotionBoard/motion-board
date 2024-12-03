'use client';

import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {cn} from '@/lib/utils';
import {ReactNode, useMemo} from 'react';

export function MobileNavLink({href, name, children}: { href: string, name: string, children: ReactNode }) {
	const pathname = usePathname();

	const isActive = useMemo(() => pathname === href, [pathname, href]);

	return <Link
		href={href}
		className={cn('flex flex-col transition-all duration-400 bg-transparent items-center gap-0.5 text-[10px] md:gap-1 md:text-sm font-medium text-muted-foreground [&.active]:text-primary group md:rounded-t-[34px] md:py-4 md:hover:bg-muted', isActive && 'active')}
	>
		{children}
		<span className={'md:opacity-0 group-hover:opacity-100 transition-opacity duration-100'}>{name}</span>
	</Link>;
}