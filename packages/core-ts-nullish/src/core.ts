import {ErrorValue} from '@luolapeikko/core-ts-error';
import type {IsGuard, IsNotGuard, NullishFnMapping, WithIsCore} from '@luolapeikko/core-ts-type';

/**
 * The `NullishCore` class provides utility functions for nullish type checks.
 * @since v0.0.1
 */
export class NullishCore {
	/**
	 * Type guard check if the given value is undefined.
	 * @param {unknown} value The value to check
	 * @returns {value is undefined} True if the value is undefined, otherwise false
	 * @example
	 * const data = ['demo', undefined, 'demo'];
	 * const count = data.filter(NullishCore.isUndefined).length; // 1
	 * @since v0.0.1
	 */
	public static isUndefined<T = unknown>(value: T): value is IsGuard<T, undefined> {
		return value === undefined;
	}

	/**
	 * Type guard check if the given value is not undefined.
	 * @template T The type of the value
	 * @param {T | undefined} value The value to check
	 * @returns {value is T} True if the value is not undefined, otherwise false
	 * @example
	 * const data = ['demo', undefined, 'demo'];
	 * const output: string[] = data.filter(NullishCore.isNotUndefined);
	 * @since v0.0.1
	 */
	public static isNotUndefined<T = unknown>(value: T): value is IsNotGuard<T, undefined> {
		return value !== undefined;
	}

	/**
	 * Type guard check if the given value is `null`.
	 * @template T The type of the value
	 * @param {unknown} value The value to check
	 * @returns {boolean} True if the value is null or undefined, otherwise false
	 * @example
	 * const data = ['demo', null, undefined, 'demo'];
	 * const count = data.filter(NullishCore.isNull).length; // 1
	 * @since v0.0.1
	 */
	public static isNull<T = unknown>(value: T): value is IsGuard<T, null> {
		return value === null;
	}

	/**
	 * Type guard check if the given value is NOT `null`.
	 * @template T The type of the value
	 * @param {Nullable<T>} value The value to check
	 * @returns {value is T} True if the value is neither null nor undefined, otherwise false
	 * @example
	 * const data = ['demo', null, undefined, 'demo'];
	 * const output: (string | undefined)[] = data.filter(NullishCore.isNotNull);
	 * @since v0.0.1
	 */
	public static isNotNull<T = unknown>(value: T): value is IsNotGuard<T, null> {
		return !NullishCore.isNull(value);
	}

	/**
	 * Type guard check if the given value is null or undefined.
	 * @template T The type of the value
	 * @param {unknown} value The value to check
	 * @returns {boolean} True if the value is null or undefined, otherwise false
	 * @example
	 * const data = ['demo', null, undefined, 'demo'];
	 * const count = data.filter(NullishCore.isNullish).length; // 2
	 * @since v0.0.1
	 */
	public static isNullish<T = unknown>(value: T): value is IsGuard<T, null | undefined> {
		return value === null || value === undefined;
	}

	/**
	 * Type guard check if the given value is NOT `null` or `undefined`.
	 * @template T The type of the value
	 * @param {Nullish<T>} value The value to check
	 * @returns {value is T} True if the value is neither null nor undefined, otherwise false
	 * @example
	 * const data = ['demo', null, undefined, 'demo'];
	 * const output: string[] = data.filter(NullishCore.isNotNullish);
	 * @since v0.0.1
	 */
	public static isNotNullish<T = unknown>(value: T): value is IsNotGuard<T, null | undefined> {
		return !NullishCore.isNullish(value);
	}

	/**
	 * Builds value error.
	 * @param {unknown} value - The invalid value.
	 * @param {'Undefined' | 'Null' | 'Nullish'} typeName - The expected type name.
	 * @param {boolean} [isNot] - Whether the error should be for `!${typeName}`.
	 * @returns {TypeError} The created error.
	 * @since v0.0.1
	 */
	public static buildValueErr(value: unknown, typeName: 'Undefined' | 'Null' | 'Nullish', isNot = false): TypeError {
		return ErrorValue.builder(value, typeName, isNot);
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/**
 * Check that we have all methods implemented
 */
void 0 as unknown as typeof NullishCore satisfies WithIsCore<NullishFnMapping>;
