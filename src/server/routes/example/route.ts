import {RouteBuilder, validate} from '@next-ts';
import {exampleInsertSchema} from '@/shared/schemas/example.schemas';
import {ExampleController} from '@/server/controllers/example.controller';

const router = new RouteBuilder(ExampleController)
	.get('/', 'getValues')
	.post('/', 'addValue', [validate(exampleInsertSchema)])
	.delete('/:id', 'deleteValue');

export default router;