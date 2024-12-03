import {BikeIcon, FlameIcon, LayoutDashboard, LucideIcon} from 'lucide-react';
import {MobileNavLink} from '@/app/(root)/_components/layout/mobile-nav-link';
import {UserAvatar} from '@/app/(root)/_components/user-avatar';
import {cn} from '@/lib/utils';
import {fullWidthClassName} from 'react-remove-scroll-bar';

const links: { href: string, name: string, icon: LucideIcon, fill?: boolean }[] = [
	{href: '/', name: 'Overview', icon: LayoutDashboard, fill: true},
	{href: '/activities', name: 'Activities', icon: BikeIcon},
	{href: '/stats', name: 'Stats', icon: FlameIcon, fill: true}
];

export function Navbar() {
	return <div
		className={cn('fixed z-50 bottom-0 w-full left-0 flex justify-center pointer-events-none right-scroll-bar-position', fullWidthClassName)}>
		<nav
			className={'pointer-events-auto w-full bg-background relative remove-scroll group transition-all duration-150 hover:md:bottom-0 md:-bottom-6 px-2 grid grid-cols-4 gap-6 pt-3 pb-7 border-t md:max-w-lg md:border md:rounded-t-[40px] md:p-2 md:pb-0 md:gap-0'}>
			{links.map(link => <MobileNavLink key={link.href} href={link.href} name={link.name}>
				<link.icon className={cn(link.fill && 'group-[.active]:fill-primary', 'group-[.active]:stroke-primary')}
						   size={28}/>
			</MobileNavLink>)}
			<MobileNavLink href={'/profile'} name={'Profile'}>
				<UserAvatar/>
			</MobileNavLink>
		</nav>
	</div>;
}