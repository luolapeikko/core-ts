import type {AnyArray, IsGuard, IsNotGuard} from '@luolapeikko/core-ts-type';
import {ArrayCore} from './core';

/**
 * The `ArrayAssert` class provides utility functions for {@link Array} type assertions.
 * @see {@link https://luolapeikko.github.io/core-ts} for full documentation.
 * @since v0.0.1
 */
export class ArrayAssert {
	/**
	 * Asserts that the given value is an {@link Array}.
	 * @template T - The type of elements contained in the array.
	 * @param {unknown} value - The value to check.
	 * @throws {TypeError} Throws {@link TypeError} if the given value is **not** an instance of the {@link Array} class.
	 * @since v0.0.1
	 */
	public static assert<T = unknown>(value: NoInfer<T> | AnyArray<unknown>): asserts value is IsGuard<T, AnyArray<unknown>> {
		if (!ArrayCore.is(value)) {
			throw ArrayCore.buildValueErr(value);
		}
	}

	/**
	 * Asserts that the given value is **not** an {@link Array}.
	 * @template T - The type of elements that would be contained in the array.
	 * @param {unknown} value - The value to check.
	 * @throws {TypeError} Throws {@link TypeError} if the given value is an instance of the {@link Array} class.
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
