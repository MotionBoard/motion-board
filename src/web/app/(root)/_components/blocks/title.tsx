import {ComponentType} from 'react';
import {cva, VariantProps} from 'class-variance-authority';
import {cn} from '@/lib/utils';

const iconVariant = cva('p-3 aspect-square rounded-md bg-yellow-500/30',
	{
		variants: {
			variant: {
				default: 'text-muted-foreground bg-muted',
				yellow: 'text-yellow-500 bg-yellow-500/30'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
);

export function Title({title, icon: Icon, description, variant}: {
	title: string,
	icon: ComponentType<{ className?: string }>,
	description: string
} & VariantProps<typeof iconVariant>) {
	return <div className={'flex items-center gap-4 max-w-3xl w-full'}>
		<div className={cn(iconVariant({variant}))}>
			<Icon className={'w-6 h-6'}/>
		</div>
		<div>
			<h1 className={'text-xl font-bold'}>{title}</h1>
			<p className={'text-muted-foreground text-sm'}>{description}</p>
		</div>
	</div>;
}