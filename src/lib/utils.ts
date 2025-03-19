import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges multiple class names into a single string.
 *
 * This function uses the `clsx` library to merge the given class names into a single string.
 * It also removes any duplicate class names.
 *
 * @example
 * cn('text-red-500', 'hover:text-red-700') // 'text-red-500 hover:text-red-700'
 * cn('text-red-500', 'text-red-500') // 'text-red-500'
 * @param {...ClassValue} inputs The class names to merge.
 * @returns A single string containing the merged class names.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
