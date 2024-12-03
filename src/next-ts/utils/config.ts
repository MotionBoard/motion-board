import ip from 'ip';

export const config = {
	port: parseInt(process.env.PORT || '3000', 10),
	dev: process.env.NODE_ENV !== 'production',
	turbo: !process.env.DISABLE_TURBO,
	host: process.argv.length > 2 && process.argv[2] === '-h' ? ip.address() : 'localhost'
};