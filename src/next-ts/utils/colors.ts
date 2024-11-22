export function yellow(str: string): string {
	return `\x1b[33m${str}\x1b[0m`;
}

export function red(str: string): string {
	return `\x1b[31m${str}\x1b[0m`;
}

export function green(str: string): string {
	return `\x1b[32m${str}\x1b[0m`;
}

export function blue(str: string): string {
	return `\x1b[34m${str}\x1b[0m`;
}

export function magenta(str: string): string {
	return `\x1b[35m${str}\x1b[0m`;
}

export function cyan(str: string): string {
	return `\x1b[36m${str}\x1b[0m`;
}

export function white(str: string): string {
	return `\x1b[37m${str}\x1b[0m`;
}

export function gray(str: string): string {
	return `\x1b[90m${str}\x1b[0m`;
}

export function black(str: string): string {
	return `\x1b[30m${str}\x1b[0m`;
}

export function bgBlack(str: string): string {
	return `\x1b[40m${str}\x1b[0m`;
}

export function bgRed(str: string): string {
	return `\x1b[41m${str}\x1b[0m`;
}

export function bgGreen(str: string): string {
	return `\x1b[42m${str}\x1b[0m`;
}

export function bgYellow(str: string): string {
	return `\x1b[43m${str}\x1b[0m`;
}

export function bgBlue(str: string): string {
	return `\x1b[44m${str}\x1b[0m`;
}

export function bgMagenta(str: string): string {
	return `\x1b[45m${str}\x1b[0m`;
}

export function bgCyan(str: string): string {
	return `\x1b[46m${str}\x1b[0m`;
}

export function bgWhite(str: string): string {
	return `\x1b[47m${str}\x1b[0m`;
}

export function bgGray(str: string): string {
	return `\x1b[100m${str}\x1b[0m`;
}