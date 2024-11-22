import {z, ZodSchema} from 'zod';
import {existsSync} from 'node:fs';

export function createEnv<T extends Record<string, ZodSchema>>(vars: T): { [K in keyof T]: T[K]['_output'] } {
	const schema = z.object(vars);
	const parse = schema.safeParse(process.env);

	if (!parse.success) {
		console.error('Wrong environnement variables configuration:');
		for (const error of parse.error.errors) {
			if (error.message === 'Required') {
				console.error(`- Missing required variable: ${error.path.join('.')}`);
			} else {
				console.error(`- Invalid value for variable ${error.path.join('.')}: ${error.message}`);
			}
		}
		process.exit(0);
	}

	return parse.data as { [K in keyof T]: T[K]['_output'] };
}

export async function loadEnv() {
	if (existsSync('./src/env.ts')) {
		await import('@/env');
	}
}