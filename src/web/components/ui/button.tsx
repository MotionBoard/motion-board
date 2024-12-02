import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';
import {LoaderCircle, LucideIcon} from 'lucide-react';

const buttonVariants = cva(
	'inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline:
					'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-foreground underline-offset-4 hover:underline !p-0'
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'h-9 w-9'
			},
			invert: {true: 'flex-row-reverse'}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	icon?: LucideIcon;
	loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({className, loading, disabled, children, variant, invert, icon: Icon, size, asChild = false, ...props}, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({variant, size, invert, className}))}
				ref={ref}
				disabled={disabled || loading}
				{...props}
			>
				{Icon && <Icon size={14}/>}
				{loading && <LoaderCircle size={14} className={'animate-spin'}/>}
				{children}
			</Comp>
		);
	}
);
Button.displayName = 'Button';

export {Button, buttonVariants};
