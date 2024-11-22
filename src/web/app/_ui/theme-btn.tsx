'use client';

import {useTheme} from 'next-themes';
import {useCallback} from 'react';
import {Button} from '@/components/ui/button';
import {Moon, Sun} from 'lucide-react';

export default function ThemeBtn() {
	const {theme, setTheme} = useTheme();

	const toggleTheme = useCallback(() => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	}, [theme, setTheme]);

	return <Button size={'icon'} onClick={toggleTheme}>
		{theme === 'dark' ? <Sun/> : <Moon/>}
	</Button>;
}