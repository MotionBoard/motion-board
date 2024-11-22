import express, {NextFunction, Request, RequestHandler, Response, Router} from 'express';
import {z, ZodSchema} from 'zod';
import * as console from 'node:console';
import {config} from '@/next-ts';
import {green, red} from '@/next-ts/utils/colors';

const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
type HttpMethod = typeof methods[number];
type ControllerWithHandlers<T> = {
	[K in keyof T]: T[K] extends ControllerHandlerType ? K : never
}[keyof T];
type HandlerType<T> = (path: string, controllerMethodName: ControllerWithHandlers<T>, middlewares?: RequestHandler[]) => RouteBuilder<T>

export interface Constructable<T> {
	new(...args: any[]): T;
}

export type ControllerHandlerProps<TBody extends ZodSchema | null = null, TParams extends ZodSchema | null = null, TQuery extends ZodSchema | null = null> = {
	res: Response;
	req: Request;
	next: NextFunction;
	body: TBody extends ZodSchema ? z.infer<TBody> : any;
	params: TParams extends ZodSchema ? z.infer<TParams> : any;
	query: TQuery extends ZodSchema ? z.infer<TQuery> : any;
}

export interface ControllerHandlerType {
	(props: ControllerHandlerProps): Promise<void> | void;
}

export class RouteBuilder<T> {
	get!: HandlerType<T>;
	post!: HandlerType<T>;
	put!: HandlerType<T>;
	delete!: HandlerType<T>;
	patch!: HandlerType<T>;
	private readonly router: Router;
	private readonly controller: T;

	constructor(controller: Constructable<T> | T) {
		this.router = express.Router();
		if (typeof controller !== 'object') {
			// @ts-ignore
			this.controller = new controller();
		} else {
			this.controller = controller;
		}
		this.createHandlers();
	}

	addMiddleware(middlewares: RequestHandler[]) {
		this.router.use(middlewares);
		return this;
	}

	_getRouter() {
		return this.router;
	}

	private devDecorate(controller: (request: Request, response: Response, next: NextFunction) => Promise<void>) {
		return async (request: Request, response: Response, next: NextFunction) => {
			const start = Date.now();
			await controller(request, response, next);
			const ms = Date.now() - start;
			const success = response.statusCode >= 200 && response.statusCode < 400;
			const status = success ? green(response.statusCode.toString()) : red(response.statusCode.toString());
			console.log(` ${request.method} ${request.baseUrl} ${status} in ${ms}ms`);
		};
	}

	private decorate(controller: ControllerHandlerType) {
		return async (request: Request, response: Response, next: NextFunction) => {
			try {
				await controller({
					req: request,
					res: response,
					next,
					body: request.body,
					params: request.params,
					query: request.query
				});
			} catch (error) {
				next(error);
			}
		};
	}

	private addRoute(
		method: HttpMethod,
		path: string,
		controllerMethodName: ControllerWithHandlers<T>,
		middlewares: RequestHandler[] = []
	) {
		const fullPath = `/${path.replace(/^\/|\/$/g, '')}`;
		const controllerMethod = this.controller[controllerMethodName];

		if (typeof controllerMethod !== 'function') {
			throw new Error(`Method ${String(controllerMethodName)} does not exist on the controller`);
		}

		// @ts-ignore
		const func = this.decorate(controllerMethod);

		// @ts-ignore
		this.router[method](fullPath, ...middlewares, config.dev ? this.devDecorate(func) : func);
	}

	private createHandlers() {
		for (const method of methods) {
			this[method] = (path: string, controllerMethodName: ControllerWithHandlers<T>, middlewares?: RequestHandler[]) => {
				this.addRoute(method, path, controllerMethodName, middlewares);
				return this;
			};
		}
	}
}
