import {z} from 'zod';
import {createEnv} from '@next-ts';

export const env = createEnv({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	DATABASE_URL: z.string(),
	ENCRYPT_KEY: z.string(),
	ENCRYPT_IV: z.string(),
	JWT_SECRET: z.string(),
	DISABLE_WORKER: z.coerce.boolean().default(false)
});