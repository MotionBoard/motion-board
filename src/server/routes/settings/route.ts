import {RouteBuilder, validate} from '@next-ts';
import {SettingsController} from '@/server/controllers/settings.controller';
import {garminSchema, passwordSchema, settingsSchema} from '@/shared/schemas/settings.schema';
import {checkAuth, checkAuthIfOnboarded} from '@/server/middleware/auth.middleware';

const router = new RouteBuilder(SettingsController)
	.post('/garmin', 'setGarminCredentials', [validate(garminSchema), checkAuthIfOnboarded])
	.post('/password', 'setPassword', [validate(passwordSchema), checkAuthIfOnboarded])
	.post('/', 'saveSettings', [validate(settingsSchema), checkAuth]);

export default router;