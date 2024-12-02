import {Router} from 'express';
import fg from 'fast-glob';
import path from 'node:path';
import {config} from '@next-ts';
import {green, red} from '@/next-ts/utils/colors';
import cookie from 'cookie-parser';

function trimSlashes(str: string): string {
	return str.replace(/^\/+|\/+$/g, '');
}

export async function getRoutes() {
	const base = config.dev ? './src/server/routes' : './dist/server/routes';
	const files = await fg(`${base}/**/route.{ts,js}`);

	return files.map(file => ({
		path: file,
		routePath: '/' + trimSlashes(file
			.replace(base, '')
			.replace('/route.ts', '')
			.replace('/route.js', ''))
			.replace(/[^a-zA-Z0-9/-]/g, '')
	}));
}

export async function apiLoader(): Promise<Router> {
	const router = Router();
	router.use(cookie());

	const files = await getRoutes();

	if (config.dev) {
		router.use((req, res, next) => {
			const start = Date.now();

			res.on('finish', () => {
				const ms = Date.now() - start;
				const success = res.statusCode >= 200 && res.statusCode < 400;
				const status = success ? green(res.statusCode.toString()) : red(res.statusCode.toString());
				console.log(` ${req.method} ${req.originalUrl} ${status} in ${ms}ms`);
			});

			next();
		});
	}

	for (const file of files) {
		const {default: route} = await import(path.resolve(file.path));

		if (!router || typeof router !== 'function' || router.name !== 'router') {
			throw new Error('Route should export a RouteBuilder as default');
		}

		router.use(file.routePath, route._getRouter());
	}

	router.use('*', (req, res) => {
		res.error(404);
	});

	return router;
}