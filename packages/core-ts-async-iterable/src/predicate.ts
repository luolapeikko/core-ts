import {AsyncIterCore} from './core';

/**
 * The `AsyncIterPredicate` class provides predicate functions for async iterable type checks.
 * @since v0.0.1
 */
export class AsyncIterPredicate {
	/**
	 * Creates a predicate that checks if an async iterable (or iterable) yields a specific value.
	 * @template T The type of elements to compare.
	 * @param {T} value - The value to search for.
	 * @returns {(iterable: AsyncIterable<T> | Iterable<T>) => Promise<boolean>} A function that resolves to `true` if the value is yielded.
	 * @since v0.0.1
	 */
	public static oneOf<T>(value: T): (iterable: AsyncIterable<T> | Iterable<T>) => Promise<boolean> {
		return async (iterable: AsyncIterable<T> | Iterable<T>) => AsyncIterCore.oneOf(iterable, value);
	}

	/**
	 * Creates a predicate that checks if an async iterable (or iterable) does not yield a specific value.
	 * @template T The type of elements to compare.
	 * @param {T} value - The value to check against.
	 * @returns {(iterable: AsyncIterable<T> | Iterable<T>) => Promise<boolean>} A function that resolves to `true` if the value is not yielded.
	 * @since v0.0.1
	 */
	public static notOneOf<T>(value: T): (iterable: AsyncIterable<T> | Iterable<T>) => Promise<boolean> {
		return async (iterable: AsyncIterable<T> | Iterable<T>) => AsyncIterCore.notOneOf(iterable, value);
	}

	/**
	 * Creates a predicate that checks if an async iterable (or iterable) yields any of the specified values.
	 * @template T The type of elements to compare.
	 * @param {Iterable<T>} values - The values to search for.
	 * @returns {(iterable: AsyncIterable<T> | Iterable<T>) => Promise<boolean>} A function that resolves to `true` if any value is yielded.
	 * @since v0.0.1
	 */
	public static anyOf<T>(values: Iterable<T>): (iterable: AsyncIterable<T> | Iterable<T>) => Promise<boolean> {
		return async (iterable: AsyncIterable<T> | Iterable<T>) => AsyncIterCore.anyOf(iterable, values);
	}

	/**
	 * Creates a predicate that checks if an async iterable (or iterable) yields none of the specified values.
	 * @template T The type of elements to compare.
	 * @param {Iterable<T>} values - The values to verify are not yielded.
	 * @returns {(iterable: AsyncIterable<T> | Iterable<T>) => Promise<boolean>} A function that resolves to `true` if none of the values are yielded.
	 * @since v0.0.1
	 */
	public static notAnyOf<T>(values: Iterable<T>): (iterable: AsyncIterable<T> | Iterable<T>) => Promise<boolean> {
		return async (iterable: AsyncIterable<T> | Iterable<T>) => AsyncIterCore.notAnyOf(iterable, values);
	}

	/**
	 * Creates a predicate that checks if every yielded element is present in the specified values (subset check).
	 * @template T The type of elements to compare.
	 * @param {Iterable<T>} values - The superset against which to check membership.
	 * @returns {(iterable: AsyncIterable<T> | Iterable<T>) => Promise<boolean>} A function that resolves to `true` if all yielded elements belong to `values`.
	 * @since v0.0.1
	 */
	public static allOf<T>(values: Iterable<T>): (iterable: AsyncIterable<T> | Iterable<T>) => Promise<boolean> {
		return async (iterable: AsyncIterable<T> | Iterable<T>) => AsyncIterCore.allOf(iterable, values);
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
