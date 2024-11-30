import {z} from 'zod';

export const movieInsertSchema = z.object({
	title: z.string().min(1).max(255)
});