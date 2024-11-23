import {ExampleRepository} from '@/server/repositories/example.repository';

export class ExampleService {
	static async getValues() {
		return await ExampleRepository.getValues();
	};

	static async addValue(title: string) {
		return await ExampleRepository.addValue(title);
	};

	static async deleteValue(id: string) {
		await ExampleRepository.deleteValue(id);
	}
}