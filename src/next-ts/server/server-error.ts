export class ServerError extends Error {
	constructor(public status: number, public code: string, public content?: any) {
		super(code);
	}
}