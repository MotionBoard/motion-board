'use client';

import {useTheme} from 'next-themes';
import {SettingsToggle} from '@/app/(root)/profile/_components/settings-toggle';
import {KeyIcon, LogOutIcon, MoonIcon, TriangleIcon} from 'lucide-react';
import {SettingsItem} from '@/app/(root)/profile/_components/settings-item';
import {useEffect, useState} from 'react';
import {logout} from '@/lib/services/auth.service';

export function Preferences() {
	const {theme, setTheme} = useTheme();
	const [checked, setChecked] = useState(false);

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
		setChecked(!checked);
	};

	useEffect(() => {
		setChecked(theme === 'dark');
	}, []);

	return <>
		<SettingsToggle icon={MoonIcon} title={'Dark mode'} checked={checked}
						toggle={toggleTheme}/>
		<SettingsItem icon={KeyIcon} title={'Modify password'} onClick={() => {
		}}/>
		<SettingsItem icon={TriangleIcon} title={'Garmin credentials'} onClick={() => {
		}}/>
		<SettingsItem icon={LogOutIcon} title={'Logout'} onClick={logout}/>
	</>;
}