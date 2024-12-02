import {cn} from '@/lib/utils';
import {LucideIcon} from 'lucide-react';

export function Step({title, icon: Icon, description, currentStep, stepIndex, last}: {
	title: string;
	description: string;
	currentStep: number;
	stepIndex: number;
	last?: boolean
	icon: LucideIcon
}) {
	const active = currentStep === stepIndex;

	return <div
		className={cn('flex gap-3 items-start relative pb-8 text-foreground/40',
			active && 'text-foreground')}>
		<div className={'aspect-square p-3 flex-grow-0 border rounded bg-background z-10'}>
			<Icon size={20}/>
		</div>
		<div className={'flex flex-col gap-1'}>
			<h3 className={'font-semibold'}>{title}</h3>
			<p className={cn('text-muted-foreground/40', active && "text-muted-foreground")}>{description}</p>
		</div>
		<div className={cn('border-l-2 absolute top-0 left-6 bottom-0 w-1 z-0', last && 'hidden')}/>
	</div>;
}