import {ErrorValue} from '@luolapeikko/core-ts-error';
import type {IsGuard, IsNotGuard} from '@luolapeikko/core-ts-type';

/**
 * The `IterCore` class provides utility functions for iterable type checks.
 * @since v0.0.1
 */
export class IterCore {
	/**
	 * Type guard that checks if a value is iterable.
	 * @template T - The type of elements contained in the iterable.
	 * @param {unknown} value - The value to check for iterability.
	 * @returns {boolean} `true` if the value implements the `Iterable` interface; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static is<T = unknown>(value: T): value is IsGuard<T, Iterable<unknown>> {
		return typeof (value as any)?.[Symbol.iterator] === 'function';
	}

	/**
	 * Type guard that checks if a value is not iterable.
	 * @template T - The type of elements contained in the iterable.
	 * @param {unknown} value - The value to check for non-iterability.
	 * @returns {boolean} `true` if the value does not implement the `Iterable` interface; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static isNot<T = unknown>(value: unknown): value is IsNotGuard<unknown, Iterable<T>> {
		return !IterCore.is(value);
	}

	/**
	 * Checks if the iterable contains the specified value.
	 * @example
	 * const values = ['a', 'b', 'c'] as const;
	 * IterCore.oneOf(values, 'a'); // true
	 * IterCore.oneOf(values, 'd'); // false
	 * @template T The type of elements contained in the iterable.
	 * @param {Iterable<T>} iterables - The iterable to check.
	 * @param {T} value - The value to check against.
	 * @returns {boolean} `true` if the iterable contains the value; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static oneOf<T>(iterables: Iterable<T>, value: T): boolean {
		return new Set(iterables).has(value);
	}

	/**
	 * Checks if the iterable does not contain the specified value.
	 * @example
	 * const values = ['a', 'b', 'c'] as const;
	 * IterCore.notOneOf(values, 'a'); // false
	 * IterCore.notOneOf(values, 'd'); // true
	 * @template T The type of elements contained in the iterable.
	 * @param {Iterable<T>} iterables - The iterable to check.
	 * @param {T} value - The value to check against.
	 * @returns {boolean} `true` if the iterable does not contain the value; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static notOneOf<T>(iterables: Iterable<T>, value: T): boolean {
		return !IterCore.oneOf(iterables, value);
	}

	/**
	 * Checks if the iterable contains any of the specified values.
	 * @template T The type of elements contained in the iterable.
	 * @param {Iterable<T>} iterables - The iterable to check.
	 * @param {Iterable<T>} values - The values to test for membership in `iterables`.
	 * @returns {boolean} `true` if at least one value from `values` exists in the iterable; otherwise, `false`.
	 * @example
	 * IterCore.anyOf(['a', 'b', 'c'], ['c', 'x']) // => true
	 * @example
	 * IterCore.anyOf(new Set([1, 2]), [3, 4]) // => false
	 * @since v0.0.1
	 */
	public static anyOf<T>(iterables: Iterable<T>, values: Iterable<T>): boolean {
		// try to use Set.prototype.intersection, else fallback to loop
		if (typeof Set.prototype.intersection === 'function') {
			return new Set(iterables).intersection(new Set(values)).size > 0;
			/* c8 ignore next 8 */
		} else {
			for (const current of iterables) {
				if (IterCore.oneOf(values, current)) {
					return true;
				}
			}
			return false;
		}
	}

	/**
	 * Checks that the iterable does not contain any of the specified values.
	 * @template T The type of elements contained in the iterable.
	 * @param {Iterable<T>} iterables - The iterable to check.
	 * @param {Iterable<T>} values - The values to verify are not in `iterables`.
	 * @returns {boolean} `true` if none of the `values` exist in the iterable; otherwise, `false`.
	 * @example
	 * IterCore.notAnyOf(['a', 'b'], ['x', 'y']) // => true
	 * @example
	 * IterCore.notAnyOf([1, 2, 3], [2, 4]) // => false
	 * @since v0.0.1
	 */
	public static notAnyOf<T>(iterables: Iterable<T>, values: Iterable<T>): boolean {
		return !IterCore.anyOf(iterables, values);
	}

	/**
	 * Checks if every element of the iterable is present in the specified values (subset check).
	 * @template T The type of elements contained in the iterable.
	 * @param {Iterable<T>} iterables - The iterable whose elements are checked.
	 * @param {Iterable<T>} values - The superset against which to check membership.
	 * @returns {boolean} `true` if all elements of `iterables` exist in `values`; otherwise, `false`.
	 * @example
	 * IterCore.allOf(['a', 'b'], ['a', 'b', 'c']) // => true
	 * @example
	 * IterCore.allOf([1, 3], [1, 2]) // => false
	 * @since v0.0.1
	 */
	public static allOf<T>(iterables: Iterable<T>, values: Iterable<T>): boolean {
		// try to use Set.prototype.intersection, else fallback to loop
		if (typeof Set.prototype.intersection === 'function') {
			const iterablesSet = new Set(iterables);
			return iterablesSet.intersection(new Set(values)).size === iterablesSet.size;
			/* c8 ignore next 8 */
		} else {
			for (const current of iterables) {
				if (!IterCore.oneOf(values, current)) {
					return false;
				}
			}
			return true;
		}
	}

	/**
	 * Builds value error.
	 * @param {unknown} value - The invalid value.
	 * @param {boolean} [isNot] - Whether the error should be for `!${typeName}`.
	 * @returns {TypeError} The created error.
	 * @since v0.0.1
	 */
	public static buildValueErr(value: unknown, isNot = false): TypeError {
		return ErrorValue.builder(value, 'Iterable', isNot);
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
