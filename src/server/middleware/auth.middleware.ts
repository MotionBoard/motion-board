import {NextFunction, Request, Response} from 'express';
import {AuthService} from '@/server/services/auth.service';
import {ServerError} from '@next-ts';
import {SettingsRepository} from '@/server/repositories/settings.repository';
import {errors} from '@/shared/errors';

export async function checkAuth(req: Request, res: Response, next: NextFunction) {
	const token = req.cookies.token;

	if (!token) {
		throw new ServerError(401, errors.UNAUTHORIZED);
	}

	const user = await AuthService.checkToken(token);

	if (!user) {
		throw new ServerError(401, errors.UNAUTHORIZED);
	}

	req.user = user;

	next();
}

export async function checkAuthIfOnboarded(req: Request, res: Response, next: NextFunction) {
	const token = req.cookies.token;

	if (!token) {
		const isOnboarded = await SettingsRepository.isOnboarded();
		if (isOnboarded) {
			throw new ServerError(401, errors.UNAUTHORIZED);
		}
	} else {
		const user = await AuthService.checkToken(token);
		if (!user) {
			throw new ServerError(401, errors.UNAUTHORIZED);
		}
		req.user = user;
	}

	next();
}