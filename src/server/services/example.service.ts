import {ExampleRepository} from '@/server/repositories/example.repository';
import {ControllerHandlerProps} from '@next-ts';
import {exampleInsertSchema} from '@/shared/schemas/example.schemas';

export class ExampleService {
	async getValues({res}: ControllerHandlerProps) {
		const values = await ExampleRepository.getValues();
		res.success(values);
	};

	async addValue({res, body}: ControllerHandlerProps<typeof exampleInsertSchema>) {
		const data = await ExampleRepository.addValue(body.title);
		res.status(201).success(data);
	};

	async deleteValue({res, params}: ControllerHandlerProps) {
		const {id} = params;
		await ExampleRepository.deleteValue(id);
		res.success();
	}
}