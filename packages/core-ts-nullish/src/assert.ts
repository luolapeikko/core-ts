import type {IsGuard, IsNotGuard, NullishFnMapping, WithAssertCore} from '@luolapeikko/core-ts-type';
import {NullishCore} from './core';

/**
 * The `NullishAssert` class provides utility functions for nullish type assertions.
 * @since v0.0.1
 */
export class NullishAssert {
	/**
	 * Asserts that the given value is undefined.
	 * @example
	 * const res: undefined = someCall():
	 * NullishAssert.assertUndefined(res);
	 * @throws {TypeError} If the given value is not undefined.
	 * @param {unknown} value - The value to assert.
	 * @since v0.0.1
	 */
	public static assertUndefined<T = unknown>(value: T): asserts value is IsGuard<T, undefined> {
		if (!NullishCore.isUndefined(value)) {
			throw NullishCore.buildValueErr(value, 'Undefined');
		}
	}

	/**
	 * Asserts that the given value is NOT undefined.
	 * @example
	 * function add(a: number, b: number): number {
	 *   NullishAssert.assertNotUndefined(a);
	 *   NullishAssert.assertNotUndefined(b);
	 *   return a + b;
	 * }
	 * @throws {TypeError} If the given value is undefined.
	 * @param {unknown} value - The value to assert.
	 * @since v0.0.1
	 */
	public static assertNotUndefined<T = unknown>(value: T): asserts value is IsNotGuard<T, undefined> {
		if (!NullishCore.isNotUndefined(value)) {
			throw NullishCore.buildValueErr(value, 'Undefined', true);
		}
	}

	/**
	 * Asserts that the given value is `null`.
	 * @example
	 * const res: null = someCall():
	 * NullishAssert.assertNull(res);
	 * @throws {TypeError} If the given value is not null or undefined.
	 * @param {unknown} value - The value to assert.
	 * @since v0.0.1
	 */
	public static assertNull<T = unknown>(value: T): asserts value is IsGuard<T, null> {
		if (!NullishCore.isNull(value)) {
			throw NullishCore.buildValueErr(value, 'Null');
		}
	}

	/**
	 * Asserts that the given value is NOT `null`.
	 * @example
	 * function add(a: number, b: number): number {
	 *   NullishAssert.assertNotNull(a);
	 *   NullishAssert.assertNotNull(b);
	 *   return a + b;
	 * }
	 * @throws {TypeError} If the given value is null or undefined.
	 * @param {unknown} value - The value to assert.
	 * @since v0.0.1
	 */
	public static assertNotNull<T = unknown>(value: T): asserts value is IsNotGuard<T, null> {
		if (!NullishCore.isNotNull(value)) {
			throw NullishCore.buildValueErr(value, 'Null', true);
		}
	}

	/**
	 * Asserts that the given value is null or undefined.
	 * @example
	 * const res: null | undefined = someCall():
	 * NullishAssert.assertNullish(res);
	 * @throws {TypeError} If the given value is not null or undefined.
	 * @param {unknown} value - The value to assert.
	 * @since v0.0.1
	 */
	public static assertNullish<T = unknown>(value: T): asserts value is IsGuard<T, null | undefined> {
		if (!NullishCore.isNullish(value)) {
			throw NullishCore.buildValueErr(value, 'Nullish');
		}
	}

	/**
	 * Asserts that the given value is NOT `null` or `undefined`.
	 * @example
	 * function add(a: number, b: number): number {
	 *   NullishAssert.assertNotNullish(a);
	 *   NullishAssert.assertNotNullish(b);
	 *   return a + b;
	 * }
	 * @throws {TypeError} If the given value is null or undefined.
	 * @param {unknown} value - The value to assert.
	 * @since v0.0.1
	 */
	public static assertNotNullish<T = unknown>(value: T): asserts value is IsNotGuard<T, null | undefined> {
		if (!NullishCore.isNotNullish(value)) {
			throw NullishCore.buildValueErr(value, 'Nullish', true);
		}
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/**
 * Check that we have all methods implemented
 */
void 0 as unknown as typeof NullishAssert satisfies WithAssertCore<NullishFnMapping>;
