import type {AnyArray, IsGuard, IsNotGuard} from '@luolapeikko/core-ts-type';
import {ArrayCore} from './core';

/**
 * The `ArrayAssert` class provides utility functions for array type assertions.
 * @since v0.0.1
 */
export class ArrayAssert {
	/**
	 * Asserts that the given value is an array.
	 * @template T - The type of elements contained in the array.
	 * @param {unknown} value - The value to check.
	 * @throws {TypeError} If the value is not an array.
	 * @since v0.0.1
	 */
	public static assert<T = unknown>(value: NoInfer<T> | AnyArray<unknown>): asserts value is IsGuard<T, AnyArray<unknown>> {
		if (!ArrayCore.is(value)) {
			throw ArrayCore.buildValueErr(value);
		}
	}

	/**
	 * Asserts that the given value is not an array.
	 * @template T - The type of elements that would be contained in the array.
	 * @param {unknown} value - The value to check.
	 * @throws {TypeError} If the value is an array.
	 * @since v0.0.1
	 */
	public static assertNot<T = unknown>(value: unknown): asserts value is IsNotGuard<T, AnyArray<unknown>> {
		if (ArrayCore.is(value)) {
			throw ArrayCore.buildValueErr(value, true);
		}
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
