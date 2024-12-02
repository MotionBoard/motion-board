import crypto from 'crypto';

export function encrypt(data: string) {
	const key = Buffer.from(process.env.ENCRYPT_KEY!, 'hex');
	const iv = Buffer.from(process.env.ENCRYPT_IV!, 'hex');
	const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
	return cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
}

export function decrypt(data: string) {
	const key = Buffer.from(process.env.ENCRYPT_KEY!, 'hex');
	const iv = Buffer.from(process.env.ENCRYPT_IV!, 'hex');
	const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
	return decipher.update(data, 'base64', 'utf8') + decipher.final('utf8');
}