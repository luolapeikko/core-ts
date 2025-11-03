import {ErrorValue} from '@luolapeikko/core-ts-error';
import type {AnyArray, IsGuard, IsNotGuard} from '@luolapeikko/core-ts-type';

/**
 * The `ArrayCore` class provides utility functions for array type checks.
 * @since v0.0.1
 */
export class ArrayCore {
	/**
	 * Type guard that checks if a value is an array.
	 * @template T - The type of elements contained in the array.
	 * @param {unknown} value - The value to check for array-ness.
	 * @returns {boolean} `true` if the value is an array; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static is<T = unknown>(value: NoInfer<T> | AnyArray<unknown>): value is IsGuard<T, AnyArray<unknown>> {
		return Array.isArray(value);
	}

	/**
	 * Type guard that checks if a value is not an array.
	 * @template T - The type of elements contained in the array.
	 * @param {unknown} value - The value to check for non-array-ness.
	 * @returns {boolean} `true` if the value is not an array; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static isNot<T = unknown>(value: unknown): value is IsNotGuard<T, AnyArray<unknown>> {
		return !ArrayCore.is(value);
	}

	/**
	 * Checks if the array contains the specified value.
	 * @template T The type of elements contained in the array.
	 * @param {AnyArray<T>} arr - The array to check.
	 * @param {T} value - The value to check against.
	 * @returns {boolean} `true` if the array contains the value; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static oneOf<T>(arr: AnyArray<T>, value: T): boolean {
		return arr.includes(value);
	}

	/**
	 * Checks if the array does not contain the specified value.
	 * @template T The type of elements contained in the array.
	 * @param {AnyArray<T>} arr - The array to check.
	 * @param {T} value - The value to check against.
	 * @returns {boolean} `true` if the array does not contain the value; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static notOneOf<T>(arr: AnyArray<T>, value: T): boolean {
		return !ArrayCore.oneOf(arr, value);
	}

	/**
	 * Checks if the array contains any of the specified values.
	 * @template T The type of elements contained in the array.
	 * @param {AnyArray<T>} arr - The array to check.
	 * @param {AnyArray<T>} values - The values to test for membership in `arr`.
	 * @returns {boolean} `true` if at least one value from `values` exists in the array; otherwise, `false`.
	 * @example
	 * ArrayCore.anyOf([1, 2, 3], [3, 4]) // => true
	 * @example
	 * ArrayCore.anyOf(['a', 'b'], ['x', 'y']) // => false
	 * @since v0.0.1
	 */
	public static anyOf<T>(arr: AnyArray<T>, values: AnyArray<T>): boolean {
		return arr.some((v) => values.includes(v));
	}

	/**
	 * Checks that the array does not contain any of the specified values.
	 * @template T The type of elements contained in the array.
	 * @param {AnyArray<T>} arr - The array to check.
	 * @param {AnyArray<T>} values - The values to verify are not in `arr`.
	 * @returns {boolean} `true` if none of the `values` exist in the array; otherwise, `false`.
	 * @example
	 * ArrayCore.notAnyOf([1, 2, 3], [4, 5]) // => true
	 * @example
	 * ArrayCore.notAnyOf(['a', 'b'], ['b', 'c']) // => false
	 * @since v0.0.1
	 */
	public static notAnyOf<T>(arr: AnyArray<T>, values: AnyArray<T>): boolean {
		return !ArrayCore.anyOf(arr, values);
	}

	/**
	 * Checks if every element of the array is present in the specified values (subset check).
	 * @template T The type of elements contained in the array.
	 * @param {AnyArray<T>} arr - The array whose elements are checked.
	 * @param {AnyArray<T>} values - The superset against which to check membership.
	 * @returns {boolean} `true` if all elements of `arr` exist in `values`; otherwise, `false`.
	 * @example
	 * ArrayCore.allOf(['a', 'b', 'c'], ['a', 'b', 'c', 'd']) // => true
	 * @example
	 * ArrayCore.allOf([1, 3], [1, 2]) // => false
	 * @since v0.0.1
	 */
	public static allOf<T>(arr: AnyArray<T>, values: AnyArray<T>): boolean {
		return arr.every((v) => values.includes(v));
	}

	/**
	 * Builds value error.
	 * @param {unknown} value - The invalid value.
	 * @param {boolean} [isNot] - Whether the error should be for `!Array`.
	 * @returns {TypeError} The created error.
	 * @since v0.0.1
	 */
	public static buildValueErr(value: unknown, isNot = false): TypeError {
		return ErrorValue.builder(value, 'Array', isNot);
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
