import {ControllerHandlerProps} from '@next-ts';
import {exampleInsertSchema} from '@/shared/schemas/example.schemas';
import {ExampleService} from '@/server/services/example.service';

export class ExampleController {
	async getValues({res}: ControllerHandlerProps) {
		const values = await ExampleService.getValues();
		res.success(values);
	};

	async addValue({res, body}: ControllerHandlerProps<typeof exampleInsertSchema>) {
		const data = await ExampleService.addValue(body.title);
		res.status(201).success(data);
	};

	async deleteValue({res, params}: ControllerHandlerProps) {
		const {id} = params;
		await ExampleService.deleteValue(id);
		res.success();
	}
}