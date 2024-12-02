import {ControllerHandlerProps, ServerError} from '@next-ts';
import {AuthService} from '@/server/services/auth.service';
import {loginSchema} from '@/shared/schemas';
import {errors} from '@/shared/errors';

export class AuthController {
	async login({res, body}: ControllerHandlerProps<typeof loginSchema>) {
		const valid = await AuthService.comparePassword(body.password);
		if (!valid) {
			throw new ServerError(401, errors.INVALID_CREDENTIALS);
		}
		await AuthService.generateToken(res);
		res.success();
	};

	logout({res}: ControllerHandlerProps) {
		res.clearCookie('token');
		res.redirect('/login');
	};
}