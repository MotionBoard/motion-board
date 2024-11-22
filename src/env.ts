import {z} from 'zod';
import {createEnv} from '@next-ts';

export const env = createEnv({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	DATABASE_URL: z.string()
});