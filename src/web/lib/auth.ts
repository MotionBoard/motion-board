import 'server-only';
import {SettingsRepository} from '@server/repositories/settings.repository';
import {cookies} from 'next/headers';
import {AuthService} from '@server/services/auth.service';

export async function checkAuth() {
	const isOnboarded = await SettingsRepository.isOnboarded();

	if (!isOnboarded) {
		return {
			isOnboarded,
			isLoggedIn: false
		};
	}

	const cookieStore = await cookies();
	const token = cookieStore.get('token');
	const validToken = await AuthService.checkToken(token?.value);

	return {
		isOnboarded,
		isLoggedIn: validToken
	};
}