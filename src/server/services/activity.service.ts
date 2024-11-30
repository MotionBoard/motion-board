import {ActivityRepository} from '@/server/repositories/activity.repository';
import {ControllerHandlerProps} from '@next-ts';

export class ActivityService {
	async getAllActivities({res}: ControllerHandlerProps) {
		const values = await ActivityRepository.getAllActivities();
		res.success(values);
	};
}