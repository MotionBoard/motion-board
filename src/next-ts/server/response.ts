import {STATUS_CODES} from 'node:http';
import {Response} from 'express';
import {ServerError} from '@/next-ts/server/server-error';

function generateResponse(status: number, data: any, error: any) {
	let parsedError = null;
	if (error) {
		if (error instanceof ServerError) {
			parsedError = {
				code: error.code,
				content: error.content
			};
		} else {
			parsedError = {
				message: error.message,
				stack: error.stack
			};
		}
	}

	return {
		status: (status >= 400 || error) ? 'error' : 'success',
		success: status < 400 && !error,
		code: status,
		message: STATUS_CODES[status],
		data,
		error: parsedError
	};
}

export function responseError(this: Response, statusCode: number, payload?: any) {
	this.status(statusCode).json(generateResponse(statusCode, null, payload));
}

export function responseSuccess(this: Response, payload?: any) {
	this.json(generateResponse(this.statusCode, payload, null));
}