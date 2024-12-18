import * as React from 'react';
import {useState} from 'react';

import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {EyeIcon, EyeOffIcon, LucideIcon} from 'lucide-react';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, icon: Icon, type, children, ...props}, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const disabled = props.value === '' || props.value === undefined || props.disabled;

        return <div className="relative flex items-center w-full">
            <input
                type={showPassword ? 'text' : type}
                className={cn(
                    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                    Icon && 'pl-9',
                    className
                )}
                ref={ref}
                {...props}
            />
            {children}
            {Icon && <Icon className={'absolute left-3 h-4 w-4 text-muted-foreground'}/>}
            {type === 'password' && <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={disabled}
            >
                {showPassword && !disabled ? (
                    <EyeIcon className="h-4 w-4" aria-hidden="true"/>
                ) : (
                    <EyeOffIcon className="h-4 w-4" aria-hidden="true"/>
                )}
                <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
            </Button>}
        </div>;
    }
);
Input.displayName = 'Input';

export {Input};
