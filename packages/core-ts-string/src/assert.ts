import type {EmptyString, IsGuard, IsNotGuard, NumberString, PrefixedString, StringFnMapping, SuffixedString, WithAssertCore} from '@luolapeikko/core-ts-type';
import {StringCore} from './core';

/**
 * The `StringAssert` class provides utility functions for string type assertions.
 * @since v0.0.1
 */
export class StringAssert {
	/**
	 * Asserts that a given value is a `string`.
	 * @param {unknown} value - Value to check.
	 * @throws {TypeError} If the value is not a string.
	 * @since v0.0.1
	 */
	public static assert<T = unknown>(value: NoInfer<T> | string): asserts value is IsGuard<T, string> {
		if (!StringCore.is(value)) {
			throw StringCore.buildValueErr(value, 'String');
		}
	}

	/**
	 * Asserts that a given value is *not* a `string`.
	 * @param {unknown} value - Value to check.
	 * @throws {TypeError} If the value is a string.
	 * @since v0.0.1
	 */
	public static assertNot<T = unknown>(value: unknown): asserts value is IsNotGuard<T, string> {
		if (StringCore.is(value)) {
			throw StringCore.buildValueErr(value, 'String', true);
		}
	}

	/**
	 * Asserts that a given value is an `EmptyString`.
	 * @param {unknown} value - Value to check.
	 * @throws {TypeError} If the value is not an empty string.
	 * @example
	 * StringAssert.assertEmpty(''); // ok
	 * // StringAssert.assertEmpty('a'); // throws TypeError
	 * @since v0.0.1
	 */
	public static assertEmpty<T = unknown>(value: NoInfer<T> | string): asserts value is IsGuard<T, EmptyString> {
		if (!StringCore.isEmpty(value)) {
			throw StringCore.buildValueErr(value, 'EmptyString');
		}
	}

	/**
	 * Asserts that a given value is a *not* an `EmptyString`.
	 * @param {unknown} value - Value to check.
	 * @throws {TypeError} If the value is an empty string.
	 * @example
	 * StringAssert.assertNotEmpty('a'); // ok
	 * // StringAssert.assertNotEmpty(''); // throws TypeError
	 * @since v0.0.1
	 */
	public static assertNotEmpty<T = unknown>(value: T): asserts value is IsNotGuard<T, EmptyString> {
		if (StringCore.isEmpty(value)) {
			throw StringCore.buildValueErr(value, 'EmptyString', true);
		}
	}

	/**
	 * Asserts that a given value is a numeric `string`.
	 * Accepts integers and decimal forms (e.g. `'123'`, `'12.3'`).
	 * @param {unknown} value - Value to check.
	 * @throws {TypeError} If the value is not a numeric string.
	 * @example
	 * StringAssert.assertNumeric('123'); // ok
	 * // StringAssert.assertNumeric('abc'); // throws TypeError
	 * @since v0.0.1
	 */
	public static assertNumeric<T = unknown>(value: NoInfer<T> | string): asserts value is IsGuard<T, NumberString> {
		if (!StringCore.isNumeric(value)) {
			throw StringCore.buildValueErr(value, 'NumberString');
		}
	}

	/**
	 * Asserts that a given value is not a numeric `string`.
	 * @param {unknown} value - Value to check.
	 * @throws {TypeError} If the value is a numeric string.
	 * @example
	 * StringAssert.assertNotNumeric('abc'); // ok
	 * // StringAssert.assertNotNumeric('123'); // throws TypeError
	 * @since v0.0.1
	 */
	public static assertNotNumeric<T = unknown>(value: T): asserts value is IsNotGuard<T, NumberString> {
		if (StringCore.isNumeric(value)) {
			throw StringCore.buildValueErr(value, 'NumberString', true);
		}
	}

	/**
	 * Asserts that a given value is a lower-case `string`.
	 * @param {unknown} value - Value to check.
	 * @throws {TypeError} If the value is not a lower-case string.
	 * @example
	 * StringAssert.assertLowerCase('abc'); // ok
	 * // StringAssert.assertLowerCase('ABC'); // throws TypeError
	 * @since v0.0.1
	 */
	public static assertLowerCase<T = unknown>(value: NoInfer<T> | string): asserts value is IsGuard<T, Lowercase<string>> {
		if (!StringCore.isLowerCase(value)) {
			throw StringCore.buildValueErr(value, 'LowerCaseString');
		}
	}

	/**
	 * Asserts that a given value is not a lower-case `string`.
	 * @param {unknown} value - Value to check.
	 * @throws {TypeError} If the value is a lower-case string.
	 * @example
	 * StringAssert.assertNotLowerCase('ABC'); // ok
	 * // StringAssert.assertNotLowerCase('abc'); // throws TypeError
	 * @since v0.0.1
	 */
	public static assertNotLowerCase<T = unknown>(value: T): asserts value is IsNotGuard<T, Lowercase<string>> {
		if (StringCore.isLowerCase(value)) {
			throw StringCore.buildValueErr(value, 'LowerCaseString', true);
		}
	}

	/**
	 * Asserts that a given value is an upper-case `string`.
	 * @param {unknown} value - Value to check.
	 * @throws {TypeError} If the value is not an upper-case string.
	 * @example
	 * StringAssert.assertUpperCase('ABC'); // ok
	 * // StringAssert.assertUpperCase('abc'); // throws TypeError
	 * @since v0.0.1
	 */
	public static assertUpperCase<T = unknown>(value: NoInfer<T> | string): asserts value is IsGuard<T, Uppercase<string>> {
		if (!StringCore.isUpperCase(value)) {
			throw StringCore.buildValueErr(value, 'UpperCaseString');
		}
	}

	/**
	 * Asserts that a given value is not an upper-case `string`.
	 * @param {unknown} value - Value to check.
	 * @throws {TypeError} If the value is an upper-case string.
	 * @example
	 * StringAssert.assertNotUpperCase('abc'); // ok
	 * // StringAssert.assertNotUpperCase('ABC'); // throws TypeError
	 * @since v0.0.1
	 */
	public static assertNotUpperCase<T = unknown>(value: T): asserts value is IsNotGuard<T, Uppercase<string>> {
		if (StringCore.isUpperCase(value)) {
			throw StringCore.buildValueErr(value, 'UpperCaseString', true);
		}
	}

	/**
	 * Asserts that a given value starts with the provided prefix.
	 * @template P extends string
	 * @param {unknown} value - Value to check.
	 * @param {P} prefix - Prefix to check for.
	 * @throws {TypeError} If the value does not start with the given prefix.
	 * @example
	 * StringAssert.assertStartsWith('hello', 'he'); // ok
	 * // StringAssert.assertStartsWith('hello', 'he2'); // throws TypeError
	 * @since v0.0.1
	 */
	public static assertStartsWith<T = unknown, P extends string = string>(
		value: NoInfer<T> | string,
		prefix: P,
	): asserts value is IsGuard<T, PrefixedString<P>> {
		if (!StringCore.startsWith(value, prefix)) {
			throw StringCore.buildValueErr(value, 'PrefixedString');
		}
	}

	/**
	 * Asserts that a given value ends with the provided suffix.
	 * @template S extends string
	 * @param {unknown} value - Value to check.
	 * @param {S} suffix - Suffix to check for.
	 * @throws {TypeError} If the value does not end with the given suffix.
	 * @example
	 * StringAssert.assertEndsWith('hello', 'lo'); // ok
	 * // StringAssert.assertEndsWith('hello', 'lo2'); // throws TypeError
	 * @since v0.0.1
	 */
	public static assertEndsWith<T = unknown, S extends string = string>(value: NoInfer<T> | string, suffix: S): asserts value is IsGuard<T, SuffixedString<S>> {
		if (!StringCore.endsWith(value, suffix)) {
			throw StringCore.buildValueErr(value, 'SuffixedString');
		}
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/**
 * Check that we have all methods implemented
 */
type BaseType = WithAssertCore<StringFnMapping> & {
	assertStartsWith<T = unknown, P extends string = string>(value: NoInfer<T> | string, prefix: P): asserts value is IsGuard<T, PrefixedString<P>>;
	assertEndsWith<T = unknown, S extends string = string>(value: NoInfer<T> | string, suffix: S): asserts value is IsGuard<T, SuffixedString<S>>;
};
void 0 as unknown as typeof StringAssert satisfies BaseType;
