'use client';

import {useUser} from '@/components/providers/user-provider';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {DropdownMenuTrigger} from '@radix-ui/react-dropdown-menu';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {twoLetters} from '@/lib/utils';
import {useTheme} from 'next-themes';
import {logout} from '@/lib/services/auth.service';

export function UserDropdown() {
	const user = useUser();
	const {setTheme, theme} = useTheme();

	return <DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="ghost" className="relative h-8 w-8 rounded-full">
				<Avatar className="h-8 w-8 max-md:h-7 max-md:w-7">
					<AvatarImage src={user.avatar ?? undefined} alt={user.name}/>
					<AvatarFallback>{twoLetters(user.name)}</AvatarFallback>
				</Avatar>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent className="w-56" align="end" forceMount>
			<DropdownMenuLabel className="font-normal">
				<div className="flex flex-col space-y-1">
					<p className="text-sm font-medium leading-none">{user.name}</p>
					<p className="text-xs leading-none text-muted-foreground">
						{user.email}
					</p>
				</div>
			</DropdownMenuLabel>
			<DropdownMenuSeparator/>
			<DropdownMenuGroup>
				<DropdownMenuItem>
					Profile
				</DropdownMenuItem>
				<DropdownMenuItem>
					Settings
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
					{theme === 'dark' ? 'Light mode' : 'Dark mode'}
				</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator/>
			<DropdownMenuItem onClick={logout}>
				Log out
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>;
}