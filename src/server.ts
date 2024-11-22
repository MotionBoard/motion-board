import {parse} from 'url';
import next from 'next';
import express, {NextFunction, Request, Response} from 'express';
import figlet from 'figlet';
import {createHttpTerminator, HttpTerminator} from 'http-terminator';
import cors from 'cors';
import {loadEnvConfig} from '@next/env';

// Next-ts imports
import {config} from '@next-ts';
import {loadEnv} from '@/next-ts/utils/create-env';
import {responseError, responseSuccess} from '@/next-ts/server/response';
import {apiLoader} from '@/next-ts/server/api-loader';
import {cyan, magenta, red} from '@/next-ts/utils/colors';
import {ServerError} from '@/next-ts/server/server-error';

const nextApp = next({
	dev: config.dev,
	turbo: config.turbo,
	dir: './src/web',
	customServer: true
});
const handle = nextApp.getRequestHandler();
let terminator: HttpTerminator;

if (config.dev) {
	loadEnvConfig('.', config.dev);
	console.clear();
}

nextApp.prepare()
	.then(async () => {
		try {
			const app = express();

			await loadEnv();

			app.response.success = responseSuccess;
			app.response.error = responseError;

			app.use(cors());
			app.use(express.json());
			app.use(express.static('public'));
			app.use('/api', await apiLoader());

			app.get('*', async (req, res) => {
				const parsedUrl = parse(req.url!, true);
				await handle(req, res, parsedUrl);
			});

			app.use((error: any, req: Request, res: Response, next: NextFunction) => {
				if (error instanceof ServerError) {
					return res.error(error.status, error);
				} else {
					console.error(red('[ERROR] ') + 'Path : ' + req.path + ' : ' + error);
					res.error(500, config.dev ? error : null);
				}
			});

			const server = app.listen(config.port, async () => {
				if (config.dev) {
					console.log(cyan(figlet.textSync('NEXT TS', {font: 'Graffiti'})));
				}
				console.log(`\n> Server is running on http://localhost:${config.port} ${cyan('[' + (config.dev ? 'Development' : 'Production') + ' mode]')} ${(config.turbo && config.dev) ? magenta('[Turbo]') : ''}`
				);
			});

			terminator = createHttpTerminator({server});
		} catch (error) {
			console.error(error);
			process.exit(1);
		}
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

process.on('exit', shutdown);

async function shutdown() {
	console.log(cyan('Server stopped'));
	if (terminator) {
		await terminator.terminate();
	}
	await nextApp.close();
}