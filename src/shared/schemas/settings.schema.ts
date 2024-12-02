import {z} from 'zod';

export const garminSchema = z.object({
	email: z.string().email().describe('Email'),
	password: z.string().describe('Password')
});

export const passwordSchema = z.object({
	password: z.string().min(8).describe('Password'),
	password_confirmation: z.string().min(8).describe('Password Confirmation')
}).refine((data) => data.password === data.password_confirmation, {
	message: 'Passwords must match.'
});

export const settingsSchema = z.object({
	refresh_interval: z.number().int().min(1).default(15).describe('Refresh Interval')
});