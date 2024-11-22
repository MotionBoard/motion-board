export const config = {
	port: parseInt(process.env.PORT || '3000', 10),
	dev: process.env.NODE_ENV !== 'production',
	turbo: !process.env.DISABLE_TURBO
};