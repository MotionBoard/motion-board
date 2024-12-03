import type {NextConfig} from 'next';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const {version} = JSON.parse(readFileSync(join(__dirname, '../../package.json'), 'utf8'));

const nextConfig: NextConfig = {
	reactStrictMode: true,
	publicRuntimeConfig: {
		version
	}
};

export default nextConfig;