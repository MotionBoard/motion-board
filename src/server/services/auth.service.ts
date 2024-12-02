import {Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {env} from '@/env';
import {SettingsRepository} from '@/server/repositories/settings.repository';
import {IUser} from '@/shared/types';

export class AuthService {
	static async generateToken(res: Response) {
		const token = jwt.sign({}, env.JWT_SECRET, {
			expiresIn: '7d'
		});
		res.cookie('token', token, {
			httpOnly: true,
			sameSite: 'strict',
			secure: env.NODE_ENV === 'production',
			maxAge: 1000 * 60 * 60 * 24 * 7
		});
	}

	static async hashPassword(password: string) {
		return bcrypt.hash(password, 10);
	}

	static async comparePassword(password: string) {
		const settings = await SettingsRepository.getSettings();
		if (!settings || !settings.hash) {
			return false;
		}
		return bcrypt.compare(password, settings.hash);
	}

	static async checkToken(token?: string) {
		if (!token) {
			return false;
		}
		try {
			return jwt.verify(token, process.env.JWT_SECRET!) as IUser;
		} catch {
			return false;
		}
	}
}