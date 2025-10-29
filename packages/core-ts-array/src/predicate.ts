import {ArrayCore} from './core';

/**
 * The `ArrayPredicate` class provides predicate functions for array type checks.
 * @since v0.0.1
 */
export class ArrayPredicate {
	/**
	 * Creates a predicate function that checks if an array contains a specific value.
	 * @template T The type of elements to compare.
	 * @param {T} value - The value to search for.
	 * @returns {function(Array<T>): boolean} A function that returns `true` if the array contains the value.
	 * @since v0.0.1
	 */
	public static oneOf<T>(value: T): (arr: readonly T[]) => boolean {
		return (arr: readonly T[]) => ArrayCore.oneOf<T>(arr, value);
	}

	/**
	 * Creates a predicate function that checks if an array does not contain a specific value.
	 * @template T The type of elements to compare.
	 * @param {T} value - The value to search for.
	 * @returns {function(Array<T>): boolean} A function that returns `true` if the array does not contain the value.
	 * @since v0.0.1
	 */
	public static notOneOf<T>(value: T): (arr: readonly T[]) => boolean {
		return (arr: readonly T[]) => ArrayCore.notOneOf(arr, value);
	}

	/**
	 * Creates a predicate function that checks if an array contains any of the specified values.
	 * @template T The type of elements to compare.
	 * @param {Array<T>} values - The values to search for.
	 * @returns {function(Array<T>): boolean} A function that returns `true` if the array contains any of the values.
	 * @since v0.0.1
	 */
	public static anyOf<T>(values: readonly T[]): (arr: readonly T[]) => boolean {
		return (arr: readonly T[]) => ArrayCore.anyOf(arr, values);
	}

	/**
	 * Creates a predicate function that checks if an array contains none of the specified values.
	 * @template T The type of elements to compare.
	 * @param {Array<T>} values - The values to check against.
	 * @returns {function(Array<T>): boolean} A function that returns `true` if the array contains none of the values.
	 * @since v0.0.1
	 */
	public static notAnyOf<T>(values: readonly T[]): (arr: readonly T[]) => boolean {
		return (arr: readonly T[]) => ArrayCore.notAnyOf(arr, values);
	}

	/**
	 * Creates a predicate function that checks if every element of the array is present in the specified values (subset check).
	 * @template T The type of elements to compare.
	 * @param {Array<T>} values - The superset against which to check membership.
	 * @returns {function(Array<T>): boolean} A function that returns `true` if all elements of the array belong to `values`.
	 * @since v0.0.1
	 */
	public static allOf<T>(values: readonly T[]): (arr: readonly T[]) => boolean {
		return (arr: readonly T[]) => ArrayCore.allOf(arr, values);
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
