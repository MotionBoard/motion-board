import {LucideIcon} from 'lucide-react';
import {Switch} from '@/components/ui/switch';

export function SettingsToggle({icon: Icon, title, checked, toggle}: {
	icon: LucideIcon,
	title: string,
	checked: boolean,
	toggle: () => void
}) {
	return <div
		onClick={toggle}
		className={'flex items-center select-none gap-4 hover:bg-accent/50 group p-4 pr-6 max-md:p-2 max-md:pr-4 rounded-sm cursor-pointer'}>
		<div className={'aspect-square p-3 bg-accent text-foreground/80 rounded-md border'}>
			<Icon className={'h-5 w-5 max-md:w-4 max-md:h-4'}/>
		</div>
		<span className={'ml-2 text-sm font-medium'}>{title}</span>
		<Switch checked={checked ? true : undefined} className={'ml-auto'}/>
	</div>;
}