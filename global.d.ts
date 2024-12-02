import {IUser} from '@/shared/types';

declare global {
	namespace Express {
		export interface Request {
			user?: IUser;
		}

		export interface Response {
			error(statusCode: number, error?: Error): void;

			success(payload?: any): void;
		}
	}
}