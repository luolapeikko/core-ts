import {ErrorValue} from '@luolapeikko/core-ts-error';
import type {IsGuard, IsNotGuard} from '@luolapeikko/core-ts-type';

/**
 * The `AsyncIterCore` class provides utility functions for async iterable type checks.
 * @since v0.0.1
 */
export class AsyncIterCore {
	/**
	 * Type guard that checks if a value is an async iterable.
	 * @template T - The type of elements contained in the async iterable.
	 * @param {unknown} value - The value to check for async iterability.
	 * @returns {boolean} `true` if the value implements the `AsyncIterable` interface; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static is<T = unknown>(value: T): value is IsGuard<T, AsyncIterable<unknown>> {
		return typeof (value as any)?.[Symbol.asyncIterator] === 'function';
	}

	/**
	 * Type guard that checks if a value is not an async iterable.
	 * @template T - The type of elements contained in the async iterable.
	 * @param {unknown} value - The value to check for non-async-iterability.
	 * @returns {boolean} `true` if the value does not implement the `AsyncIterable` interface; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static isNot<T = unknown>(value: T): value is IsNotGuard<T, AsyncIterable<unknown>> {
		return !AsyncIterCore.is(value);
	}

	/**
	 * Checks if the async iterable (or iterable) contains the specified value.
	 * @template T The type of elements contained in the iterable.
	 * @param {AsyncIterable<T> | Iterable<T>} iterable - The async iterable or iterable to check.
	 * @param {T} value - The value to check against.
	 * @returns {Promise<boolean>} `true` if the iterable yields the value; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static async oneOf<T>(iterable: AsyncIterable<T> | Iterable<T>, value: T): Promise<boolean> {
		for await (const current of iterable) {
			if (current === value) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Checks if the async iterable (or iterable) does not contain the specified value.
	 * @template T The type of elements contained in the iterable.
	 * @param {AsyncIterable<T> | Iterable<T>} iterable - The async iterable or iterable to check.
	 * @param {T} value - The value to check against.
	 * @returns {Promise<boolean>} `true` if the iterable does not yield the value; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static async notOneOf<T>(iterable: AsyncIterable<T> | Iterable<T>, value: T): Promise<boolean> {
		return !(await AsyncIterCore.oneOf(iterable, value));
	}

	/**
	 * Checks if the async iterable (or iterable) contains any of the specified values.
	 * @template T The type of elements contained in the iterable.
	 * @param {AsyncIterable<T> | Iterable<T>} iterable - The async iterable or iterable to check.
	 * @param {Iterable<T>} values - The values to test for membership in `iterable`.
	 * @returns {Promise<boolean>} `true` if at least one value from `values` is yielded by the iterable; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static async anyOf<T>(iterable: AsyncIterable<T> | Iterable<T>, values: Iterable<T>): Promise<boolean> {
		const valuesSet = new Set(values);
		for await (const current of iterable) {
			if (valuesSet.has(current)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Checks that the async iterable (or iterable) does not contain any of the specified values.
	 * @template T The type of elements contained in the iterable.
	 * @param {AsyncIterable<T> | Iterable<T>} iterables - The async iterable or iterable to check.
	 * @param {Iterable<T>} values - The values to verify are not yielded by `iterables`.
	 * @returns {Promise<boolean>} `true` if none of the `values` are yielded; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static async notAnyOf<T>(iterables: AsyncIterable<T> | Iterable<T>, values: Iterable<T>): Promise<boolean> {
		return !(await AsyncIterCore.anyOf(iterables, values));
	}

	/**
	 * Checks if every element yielded by the async iterable (or iterable) is present in the specified values (subset check).
	 * @template T The type of elements contained in the iterable.
	 * @param {AsyncIterable<T> | Iterable<T>} iterables - The async iterable or iterable whose elements are checked.
	 * @param {Iterable<T>} values - The superset against which to check membership.
	 * @returns {Promise<boolean>} `true` if all yielded elements exist in `values`; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static async allOf<T>(iterables: AsyncIterable<T> | Iterable<T>, values: Iterable<T>): Promise<boolean> {
		const valuesSet = new Set(values);
		for await (const current of iterables) {
			if (!valuesSet.has(current)) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Builds value error.
	 * @param {unknown} value - The invalid value.
	 * @param {boolean} [isNot] - Whether the error should be for `!${typeName}`.
	 * @returns {TypeError} The created error.
	 * @since v0.0.1
	 */
	public static buildValueErr(value: unknown, isNot = false): TypeError {
		return ErrorValue.builder(value, 'AsyncIterable', isNot);
	}
}
