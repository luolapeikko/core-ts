import {AsyncIterCore} from './core';

/**
 * The `AsyncIterPredicate` class provides predicate functions for async iterable type checks.
 * @since v0.0.1
 */
export class AsyncIterPredicate {
	/**
	 * Creates a predicate that checks if an async iterable (or iterable) yields a specific value.
	 * @template T The type of elements to compare.
	 * @param {T} compareValue - The value to search for.
	 * @returns {(iterable: AsyncIterable<T> | Iterable<T>) => Promise<boolean>} A function that resolves to `true` if the value is yielded.
	 * @since v0.0.1
	 */
	public static oneOf<T>(compareValue: T | Promise<T>): <R extends T>(value: R) => Promise<boolean> {
		return async <R extends T>(value: R): Promise<boolean> => value === (await compareValue);
	}

	/**
	 * Creates a predicate that checks if an async iterable (or iterable) does not yield a specific value.
	 * @template T The type of elements to compare.
	 * @param {T} compareValue - The value to check against.
	 * @returns {(iterable: AsyncIterable<T> | Iterable<T>) => Promise<boolean>} A function that resolves to `true` if the value is not yielded.
	 * @since v0.0.1
	 */
	public static notOneOf<T>(compareValue: T | Promise<T>): <R extends T>(value: R) => Promise<boolean> {
		return async <R extends T>(value: R): Promise<boolean> => value !== (await compareValue);
	}

	/**
	 * Creates a predicate that checks if an async iterable (or iterable) yields any of the specified values.
	 * @template T The type of elements to compare.
	 * @param {Iterable<T> | AsyncIterable<T>} compareValues - The values to search for.
	 * @returns {(iterable: AsyncIterable<T> | Iterable<T>) => Promise<boolean>} A function that resolves to `true` if any value is yielded.
	 * @since v0.0.1
	 */
	public static anyOf<T>(compareValues: Iterable<T> | AsyncIterable<T>): <R extends T>(value: R) => Promise<boolean> {
		const valuesPromise = AsyncIterCore.asSet(compareValues);
		return async <R extends T>(value: R): Promise<boolean> => {
			const values = await valuesPromise;
			return values.has(value);
		};
	}

	/**
	 * Creates a predicate that checks if an async iterable (or iterable) yields none of the specified values.
	 * @template T The type of elements to compare.
	 * @param {Iterable<T> | AsyncIterable<T>} compareValues - The values to verify are not yielded.
	 * @returns {(iterable: AsyncIterable<T> | Iterable<T>) => Promise<boolean>} A function that resolves to `true` if none of the values are yielded.
	 * @since v0.0.1
	 */
	public static notAnyOf<T>(compareValues: Iterable<T> | AsyncIterable<T>): <R extends T>(value: R) => Promise<boolean> {
		const valuesPromise = AsyncIterCore.asSet(compareValues);
		return async <R extends T>(value: R): Promise<boolean> => {
			const values = await valuesPromise;
			return !values.has(value);
		};
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
