import type {IsGuard, PrefixedString, SuffixedString} from '@luolapeikko/core-ts-type';
import {StringCore} from './core';

/**
 * The `StringPredicate` class provides predicate functions for string type checks.
 * @since v0.0.1
 */
export class StringPredicate {
	/**
	 * Checks if the given value starts with the specified prefix.
	 * @template P - Prefix to check for.
	 * @template T - Input value type.
	 * @example
	 * const values = ["apple", "banana", "apricot"] as const;
	 * const aStrings = values.filter(StringPredicate.startsWith("a"));
	 * console.log(aStrings); // ["apple", "apricot"]
	 * @param {string} prefix - The prefix to check for.
	 * @returns {(value: T) => value is IsGuard<T, PrefixedString<P>>} A predicate function that checks if the value starts with the specified prefix.
	 * @since v0.0.1
	 */
	public static startsWith<P extends string>(prefix: P): <T>(value: T) => value is IsGuard<T, PrefixedString<P>> {
		return <T>(value: T) => StringCore.startsWith<T, P>(value, prefix);
	}

	/**
	 * Checks if the given value ends with the specified suffix.
	 * @template S - Suffix to check for.
	 * @template T - Input value type.
	 * @example
	 * const values = ["file.png", "document.pdf", "image.jpeg"] as const;
	 * const pngStrings = values.filter(StringPredicate.endsWith("png"));
	 * console.log(pngStrings); // ["file.png"]
	 * @param {string} suffix - The suffix to check for.
	 * @returns {(value: T) => value is IsGuard<T, SuffixedString<S>>} A predicate function that checks if the value ends with the specified suffix.
	 * @since v0.0.1
	 */
	public static endsWith<S extends string>(suffix: S): <T>(value: T) => value is IsGuard<T, SuffixedString<S>> {
		return <T>(value: T) => StringCore.endsWith<T, S>(value, suffix);
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
