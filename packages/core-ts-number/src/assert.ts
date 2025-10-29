import type {IsGuard, IsNotGuard, NumberFnMapping, WithAssertCore} from '@luolapeikko/core-ts-type';
import {NumberCore} from './core';

/**
 * The `NumberAssert` class provides utility functions for number type assertions.
 * @since v0.0.1
 */
export class NumberAssert {
	/**
	 * Asserts that a given value is a `number`.
	 * @template T The input type.
	 * @param {unknown} value - The value to assert.
	 * @throws {TypeError} If the value is not a number.
	 * @since v0.0.1
	 */
	public static assertNumber<T = unknown>(value: T): asserts value is IsGuard<T, number> {
		if (NumberCore.isNotNumber(value)) {
			throw NumberCore.buildValueErr(value, 'Number');
		}
	}

	/**
	 * Asserts that a given value is *not* a `number`.
	 * @template T The input type.
	 * @param {unknown} value - The value to assert.
	 * @throws {TypeError} If the value is a number.
	 * @since v0.0.1
	 */
	public static assertNotNumber<T = unknown>(value: T): asserts value is IsNotGuard<T, number> {
		if (NumberCore.isNumber(value)) {
			throw NumberCore.buildValueErr(value, 'Number', true);
		}
	}

	/**
	 * Asserts that a given value is an integer `number`.
	 * @template T The input type.
	 * @param {unknown} value - The value to assert.
	 * @throws {TypeError} If the value is not an integer number.
	 * @since v0.0.1
	 */
	public static assertInt<T = unknown>(value: T): asserts value is IsGuard<T, number> {
		if (NumberCore.isNotInt(value)) {
			throw NumberCore.buildValueErr(value, 'Integer');
		}
	}

	/**
	 * Asserts that a given value is *not* an integer `number`.
	 * @template T The input type.
	 * @param {unknown} value - The value to assert.
	 * @throws {TypeError} If the value is an integer number.
	 * @since v0.0.1
	 */
	public static assertNotInt<T = unknown>(value: T): asserts value is IsNotGuard<T, number> {
		if (NumberCore.isInt(value)) {
			throw NumberCore.buildValueErr(value, 'Integer', true);
		}
	}

	/**
	 * Asserts that a given value is a floating-point `number`.
	 * @template T The input type.
	 * @param {unknown} value - The value to assert.
	 * @throws {TypeError} If the value is not a floating-point number.
	 * @since v0.0.1
	 */
	public static assertFloat<T = unknown>(value: T): asserts value is IsGuard<T, number> {
		if (NumberCore.isNotFloat(value)) {
			// Float doesn't have a dedicated typeName in buildValueErr; use 'Number'
			throw NumberCore.buildValueErr(value, 'Number');
		}
	}

	/**
	 * Asserts that a given value is *not* a floating-point `number`.
	 * @template T The input type.
	 * @param {unknown} value - The value to assert.
	 * @throws {TypeError} If the value is a floating-point number.
	 * @since v0.0.1
	 */
	public static assertNotFloat<T = unknown>(value: T): asserts value is IsNotGuard<T, number> {
		if (NumberCore.isFloat(value)) {
			throw NumberCore.buildValueErr(value, 'Number', true);
		}
	}

	/**
	 * Asserts that a given value is a `bigint`.
	 * @template T The input type.
	 * @param {unknown} value - The value to assert.
	 * @throws {TypeError} If the value is not a bigint.
	 * @since v0.0.1
	 */
	public static assertBigInt<T = unknown>(value: T): asserts value is IsGuard<T, bigint> {
		if (NumberCore.isNotBigInt(value)) {
			throw NumberCore.buildValueErr(value, 'BigInt');
		}
	}

	/**
	 * Asserts that a given value is *not* a `bigint`.
	 * @template T The input type.
	 * @param {unknown} value - The value to assert.
	 * @throws {TypeError} If the value is a bigint.
	 * @since v0.0.1
	 */
	public static assertNotBigInt<T = unknown>(value: T): asserts value is IsNotGuard<T, bigint> {
		if (NumberCore.isBigInt(value)) {
			throw NumberCore.buildValueErr(value, 'BigInt', true);
		}
	}

	/**
	 * Asserts that a given value is a finite `number` (neither `Infinity` nor `-Infinity`).
	 * @template T The input type.
	 * @param {unknown} value - The value to assert.
	 * @throws {TypeError} If the value is not a finite number.
	 * @since v0.0.1
	 */
	public static assertFinite<T = unknown>(value: T): asserts value is IsGuard<T, number> {
		if (NumberCore.isNotFinite(value)) {
			throw NumberCore.buildValueErr(value, 'Finite');
		}
	}

	/**
	 * Asserts that a given value is *not* a finite `number`.
	 * @template T The input type.
	 * @param {unknown} value - The value to assert.
	 * @throws {TypeError} If the value is a finite number.
	 * @since v0.0.1
	 */
	public static assertNotFinite<T = unknown>(value: T): asserts value is IsNotGuard<T, number> {
		if (NumberCore.isFinite(value)) {
			throw NumberCore.buildValueErr(value, 'Finite', true);
		}
	}

	public static assertSafeInteger<T = unknown>(value: T): asserts value is IsGuard<T, number> {
		if (NumberCore.isNotSafeInteger(value)) {
			throw NumberCore.buildValueErr(value, 'SafeInteger');
		}
	}

	public static assertNotSafeInteger<T = unknown>(value: T): asserts value is IsNotGuard<T, number> {
		if (NumberCore.isSafeInteger(value)) {
			throw NumberCore.buildValueErr(value, 'SafeInteger', true);
		}
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/**
 * Check that we have all methods implemented
 */
void 0 as unknown as typeof NumberAssert satisfies WithAssertCore<NumberFnMapping>;
