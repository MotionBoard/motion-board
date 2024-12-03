import {ArrowRight, LucideIcon} from 'lucide-react';

export function SettingsItem({icon: Icon, title, onClick}: { icon: LucideIcon, title: string, onClick: () => void }) {
	return <div
		onClick={onClick}
		className={'flex items-center select-none gap-4 hover:bg-accent/50 group p-4 pr-8 max-md:p-2 max-md:pr-6 rounded-sm cursor-pointer'}>
		<div className={'aspect-square p-3 bg-accent text-foreground/80 rounded-md border'}>
			<Icon className={'h-5 w-5 max-md:w-4 max-md:h-4'}/>
		</div>
		<span className={'ml-2 text-sm font-medium'}>{title}</span>
		<ArrowRight size={20}
					className={'ml-auto transition-transform duration-150 text-muted-foreground group-hover:translate-x-2'}/>
	</div>;
}