import {IterCore} from './core';

/**
 * The `IterPredicate` class provides predicate functions for iterable type checks.
 * @since v0.0.1
 */
export class IterPredicate {
	/**
	 * Creates a predicate function that checks if an iterable contains a specific value.
	 * @template T The type of elements to compare.
	 * @param {T} value - The value to search for.
	 * @returns {function(Iterable<T>): boolean} A function that returns `true` if the iterable contains the value.
	 * @since v0.0.1
	 */
	public static oneOf<T>(value: T): (iterable: Iterable<T>) => boolean {
		return (iterable: Iterable<T>) => IterCore.oneOf<T>(iterable, value);
	}

	/**
	 * Creates a predicate function that checks if an iterable does not contain a specific value.
	 * @template T The type of elements to compare.
	 * @param {T} value - The value to search for.
	 * @returns {function(Iterable<T>): boolean} A function that returns `true` if the iterable does not contain the value.
	 * @since v0.0.1
	 */
	public static notOneOf<T>(value: T): (iterable: Iterable<T>) => boolean {
		return (iterable: Iterable<T>) => IterCore.notOneOf(iterable, value);
	}

	/**
	 * Creates a predicate function that checks if an iterable contains any of the specified values.
	 * @template T The type of elements to compare.
	 * @param {Iterable<T>} values - The values to search for.
	 * @returns {function(Iterable<T>): boolean} A function that returns `true` if the iterable contains any of the values.
	 * @since v0.0.1
	 */
	public static anyOf<T>(values: Iterable<T>): (iterable: Iterable<T>) => boolean {
		return (iterable: Iterable<T>) => IterCore.anyOf(iterable, values);
	}

	/**
	 * Creates a predicate function that checks if an iterable contains none of the specified values.
	 * @template T The type of elements to compare.
	 * @param {Iterable<T>} values - The values to check against.
	 * @returns {function(Iterable<T>): boolean} A function that returns `true` if the iterable contains none of the values.
	 * @since v0.0.1
	 */
	public static notAnyOf<T>(values: Iterable<T>): (iterable: Iterable<T>) => boolean {
		return (iterable: Iterable<T>) => IterCore.notAnyOf(iterable, values);
	}

	/**
	 * Creates a predicate function that checks if every element of the iterable is present in the specified values (subset check).
	 * @template T The type of elements to compare.
	 * @param {Iterable<T>} values - The superset against which to check membership.
	 * @returns {function(Iterable<T>): boolean} A function that returns `true` if all elements of the iterable belong to `values`.
	 * @since v0.0.1
	 */
	public static allOf<T>(values: Iterable<T>): (iterable: Iterable<T>) => boolean {
		return (iterable: Iterable<T>) => IterCore.allOf(iterable, values);
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
