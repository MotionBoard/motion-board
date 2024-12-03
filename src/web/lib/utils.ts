import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {MultiselectValuesType} from '@/components/ui/multiselect';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function twoLetters(name: string) {
	const splt = name.split(' ');
	return (splt.length > 1 ? splt[0][0] + splt[1][0] : splt[0].slice(0, 2)).toUpperCase();
}

export function numberToK(number: number) {
	if (number > 999) {
		return (number / 1000).toFixed(number < 10000 ? 1 : 0) + 'k';
	}
	return number.toLocaleString();
}