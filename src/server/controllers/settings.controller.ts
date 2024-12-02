import {ControllerHandlerProps, ServerError} from '@next-ts';
import {garminSchema, passwordSchema, settingsSchema} from '@/shared/schemas/settings.schema';
import {GarminService} from '@/server/services/garmin.service';
import {errors} from '@/shared/errors';
import {AuthService} from '@/server/services/auth.service';
import {SettingsRepository} from '@/server/repositories/settings.repository';

export class SettingsController {
	async setGarminCredentials({res, body}: ControllerHandlerProps<typeof garminSchema>) {
		const tokens = await GarminService.testCredentials(body.email, body.password);
		if (!tokens) {
			throw new ServerError(400, errors.INVALID_CREDENTIALS);
		}
		await GarminService.updateGarminCredentials({
			garmin_email: body.email,
			garmin_password: body.password,
			tokens
		});
		res.success();
	};

	async setPassword({res, body}: ControllerHandlerProps<typeof passwordSchema>) {
		const hash = await AuthService.hashPassword(body.password);
		await SettingsRepository.updatePassword(hash);
		await AuthService.generateToken(res);
		res.success();
	}

	async saveSettings({res, body}: ControllerHandlerProps<typeof settingsSchema>) {
		console.log('body', body);
		await SettingsRepository.updateSettings(body);
		res.success();
	}
}