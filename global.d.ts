declare namespace Express {
	export interface Response {
		error(statusCode: number, error?: Error): void;

		success(payload?: any): void;
	}
}