import {z} from 'zod';

export const exampleInsertSchema = z.object({
	title: z.string().min(1).max(255)
});