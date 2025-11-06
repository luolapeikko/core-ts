import {ErrorValue} from '@luolapeikko/core-ts-error';
import type {EmptyString, IsGuard, IsNotGuard, NumberString, PrefixedString, StringFnMapping, SuffixedString, WithIsCore} from '@luolapeikko/core-ts-type';

/**
 * The `StringCore` class provides utility functions for {@link String} type checks.
 * @see {@link https://luolapeikko.github.io/core-ts} for full documentation.
 * @since v0.0.1
 */
export class StringCore {
	/**
	 * Type guard to check if a value is a {@link String}.
	 * @template T - Input value type.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is a {@link String}; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static is<T = unknown>(value: NoInfer<T> | string): value is IsGuard<T, string> {
		return typeof value === 'string';
	}

	/**
	 * Type guard to check if a value is **not** a {@link String}.
	 * @template T - Input value type.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is not a {@link String}; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static isNot<T = unknown>(value: T): value is IsNotGuard<T, string> {
		return !StringCore.is(value);
	}

	/**
	 * Type guard to check if a value is an {@link EmptyString}.
	 * @example
	 * StringCore.isEmpty(''); // true
	 * StringCore.isEmpty('hello'); // false
	 * StringCore.isEmpty(123); // false (not a string)
	 * @template T - Input value type.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is an empty string; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static isEmpty<T = unknown>(value: NoInfer<T> | string): value is IsGuard<T, EmptyString> {
		return StringCore.is(value) && value.length === 0;
	}

	/**
	 * Type guard to check if a value is **not** a {@link EmptyString}.
	 * @example
	 * StringCore.isNotEmpty('hello'); // true
	 * StringCore.isNotEmpty(''); // false
	 * StringCore.isNotEmpty(123); // false (not a string)
	 * @template T - Input value type.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is a not empty string; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static isNotEmpty<T = unknown>(value: T): value is IsNotGuard<T, EmptyString> {
		return StringCore.is(value) && value.length > 0;
	}

	/**
	 * Type guard to check if a value is a {@link Lowercase} {@link String}.
	 * @example
	 * StringCore.isLowerCase('hello'); // true
	 * StringCore.isLowerCase('HELLO'); // false
	 * StringCore.isLowerCase(123); // false (not a string)
	 * @template T - Input value type.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is a {@link Lowercase} {@link String}; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static isLowerCase<T = unknown>(value: NoInfer<T> | string): value is IsGuard<T, Lowercase<string>> {
		return StringCore.is(value) && value === value.toLowerCase();
	}

	/**
	 * Type guard to check if a value is **not** a {@link Lowercase} {@link String}.
	 * @example
	 * StringCore.isNotLowerCase('HELLO'); // true
	 * StringCore.isNotLowerCase('hello'); // false
	 * StringCore.isNotLowerCase(123); // true (not a string)
	 * @template T - Input value type.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is **not** a {@link Lowercase} {@link String}; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static isNotLowerCase<T = unknown>(value: T): value is IsNotGuard<T, Lowercase<string>> {
		return !StringCore.isLowerCase(value);
	}

	/**
	 * Type guard to check if a value is an {@link Uppercase} {@link String}.
	 * @example
	 * StringCore.isUpperCase('HELLO'); // true
	 * StringCore.isUpperCase('hello'); // false
	 * StringCore.isUpperCase(123); // false (not a string)
	 * @template T - Input value type.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is an {@link Uppercase} {@link String}; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static isUpperCase<T = unknown>(value: NoInfer<T> | string): value is IsGuard<T, Uppercase<string>> {
		return StringCore.is(value) && value === value.toUpperCase();
	}

	/**
	 * Type guard to check if a value is **not** an {@link Uppercase} {@link String}.
	 * @example
	 * StringCore.isNotUpperCase('hello'); // true
	 * StringCore.isNotUpperCase('HELLO'); // false
	 * StringCore.isNotUpperCase(123); // true (not a string)
	 * @template T - Input value type.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is **not** an {@link Uppercase} {@link String}; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static isNotUpperCase<T = undefined>(value: T): value is IsNotGuard<T, Uppercase<string>> {
		return !StringCore.isUpperCase(value);
	}

	/**
	 * Type guard to check if a {@link String} value starts with the specified prefix.
	 * @example
	 * StringCore.startsWith('hello', 'he'); // true
	 * StringCore.startsWith('hello', 'el'); // false
	 * StringCore.startsWith(123, 'he'); // false (not a string)
	 * @template T - Input value type.
	 * @template P - The prefix to check.
	 * @param {unknown} value - The value to check.
	 * @param {P} prefix - The expected prefix.
	 * @returns {value is PrefixedString<P>} `true` if the {@link String} value starts with the prefix; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static startsWith<T = unknown, P extends string = string>(value: NoInfer<T> | string, prefix: P): value is IsGuard<T, PrefixedString<P>> {
		return StringCore.is(value) && value.startsWith(prefix);
	}

	/**
	 * Type guard to check if a {@link String} value ends with the specified suffix.
	 * @example
	 * StringCore.endsWith('hello', 'lo'); // true
	 * StringCore.endsWith('hello', 'he'); // false
	 * StringCore.endsWith(123, 'lo'); // false (not a string)
	 * @template T - Input value type.
	 * @template S - The suffix to check.
	 * @param {unknown} value - The value to check.
	 * @param {S} suffix - The expected suffix.
	 * @returns {value is SuffixedString<S>} `true` if the {@link String} value ends with the suffix; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static endsWith<T = unknown, S extends string = string>(value: NoInfer<T> | string, suffix: S): value is IsGuard<T, SuffixedString<S>> {
		return StringCore.is(value) && value.endsWith(suffix);
	}

	/**
	 * Type guard to check if a value is a {@link NumberString}.
	 * @example
	 * StringCore.isNumeric('123'); // true
	 * StringCore.isNumeric('12.3'); // true
	 * StringCore.isNumeric('abc'); // false
	 * StringCore.isNumeric(123); // false (not a string)
	 * @template T - Input value type.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is a {@link NumberString}; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static isNumeric<T = unknown>(value: NoInfer<T> | string): value is IsGuard<T, NumberString> {
		return StringCore.is(value) && !Number.isNaN(Number(value)) && !Number.isNaN(parseFloat(value));
	}

	/**
	 * Type guard to check if a value is **not** a {@link NumberString}.
	 * @example
	 * StringCore.isNotNumeric('abc'); // true
	 * StringCore.isNotNumeric('123'); // false
	 * StringCore.isNotNumeric(123); // true (not a string)
	 * @template T - Input value type.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is **not** a {@link NumberString}; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static isNotNumeric<T = unknown>(value: T): value is IsNotGuard<T, NumberString> {
		return !StringCore.isNumeric(value);
	}

	/**
	 * Builds value error.
	 * @param {unknown} value - The invalid value.
	 * @param {'String' | 'EmptyString' | 'LowerCaseString' | 'UpperCaseString' | 'NumberString'} typeName - The expected type name.
	 * @param {boolean} [isNot] - Whether the error should be for `!${typeName}`.
	 * @returns {TypeError} The created error.
	 * @since v0.0.1
	 */
	public static buildValueErr(
		value: unknown,
		typeName: 'String' | 'EmptyString' | 'LowerCaseString' | 'UpperCaseString' | 'NumberString' | 'PrefixedString' | 'SuffixedString',
		isNot = false,
	): TypeError {
		return ErrorValue.builder(value, typeName, isNot);
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/**
 * Check that we have all methods implemented
 */
type BaseType = WithIsCore<StringFnMapping> & {
	startsWith<R = unknown, P extends string = string>(value: NoInfer<R> | string, prefix: P): value is IsGuard<R, PrefixedString<P>>;
	endsWith<R = unknown, S extends string = string>(value: NoInfer<R> | string, suffix: S): value is IsGuard<R, SuffixedString<S>>;
};
void 0 as unknown as typeof StringCore satisfies BaseType;
