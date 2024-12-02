import {z} from 'zod';
import {ActivityType, ChartType, Interval, OnKey} from '@prisma/client';

export const loginSchema = z.object({
	password: z.string().min(6)
});

export const newCardSchema = z.object({
	title: z.string().min(3).max(255),
	on: z.nativeEnum(OnKey),
	chart_type: z.nativeEnum(ChartType).describe('Chart type'),
	sports: z.nativeEnum(ActivityType).array().min(1),
	intervals: z.nativeEnum(Interval).array().min(1)
});

export const paginationSchema = z.object({
	page: z.number().int().min(0),
	pageSize: z.enum(['10', '30', '50']),
	sports: z.nativeEnum(ActivityType).array(),
	search: z.string(),
	order_by: z.enum(['asc_date', 'desc_date', 'asc_distance', 'desc_distance'])
});