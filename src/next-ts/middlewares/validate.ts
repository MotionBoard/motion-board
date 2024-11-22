import {NextFunction, Request, RequestHandler, Response} from 'express';
import {z, ZodError, ZodRawShape, ZodSchema, ZodTypeAny} from 'zod';
import {ServerError} from '@next-ts';

const types = ['query', 'params', 'body'] as const;

function isZodSchema(schema: any): schema is ZodSchema {
	return schema && typeof schema.safeParse === 'function';
}

type Validation = ZodTypeAny | ZodRawShape;

type ZodOutput<T extends Validation> = T extends ZodRawShape ? z.ZodObject<T>['_output'] : T['_output'];

type SchemaType = ZodSchema | {
	params?: ZodSchema;
	query?: ZodSchema;
	body?: ZodSchema;
}

export function validate<TParams extends Validation = {}, TQuery extends Validation = {}, TBody extends Validation = {}>(
	schemas: SchemaType
): RequestHandler<ZodOutput<TParams>, any, ZodOutput<TBody>, ZodOutput<TQuery>> {
	const validation = isZodSchema(schemas) ? {
		body: schemas
	} : schemas;

	return (req: Request, res: Response, next: NextFunction) => {
		const errors: Array<{
			type: (typeof types)[number];
			errors: ZodError;
		}> = [];

		for (const type of types) {
			if (!validation[type]) continue;
			const parsed = validation[type]!.safeParse(req[type] ?? {});
			if (parsed.success) req[type] = parsed.data;
			else errors.push({type, errors: parsed.error});
		}

		if (errors.length > 0) {
			throw new ServerError(400, 'VALIDATION_ERROR', errors.map(error => ({
				type: error.type,
				errors: error.errors
			})));
		}

		next();
	};
}