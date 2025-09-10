import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | number) {
	return new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(new Date(date))
}

export function absoluteUrl(path: string) {
	return `${process.env.NEXT_PUBLIC_APP_URL || ""}${path}`
}


/**
 * Converts a snake_case string to camelCase
 * @param str - The string to convert
 * @returns The converted camelCase string
 */
export const snakeToCamel = (str: string): string => {
	return str.replace(/([-_][a-z])/g, group =>
		group.toUpperCase()
			.replace('-', '')
			.replace('_', '')
	);
};

/**
 * Converts a snake_case string to normal text with spaces
 * @param str - The string to convert (e.g., "hello_world")
 * @returns The converted string with spaces (e.g., "hello world")
 */
export const snakeToText = (str: string): string => {
	return str
		.split('_')
		.join(' ');
};