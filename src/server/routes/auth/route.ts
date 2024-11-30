import {RouteBuilder, validate} from '@next-ts';
import {AuthController} from '@/server/controllers/auth.controller';
import {loginSchema} from '@/shared/schemas';

const router = new RouteBuilder(AuthController)
	.post('/', 'login', [validate(loginSchema)])
	.get('/logout', 'logout');

export default router;