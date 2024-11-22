import {RouteBuilder, validate} from '@next-ts';
import {ExampleService} from '@/server/services/example.service';
import {exampleInsertSchema} from '@/shared/schemas/example.schemas';

const feur = new RouteBuilder(ExampleService)
	.get('/', 'getValues')
	.post('/', 'addValue', [validate(exampleInsertSchema)])
	.delete('/:id', 'deleteValue');

export default feur;