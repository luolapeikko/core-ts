import type {IsGuard, IsNotGuard} from '@luolapeikko/core-ts-type';
import {ErrorCore} from './core';

/**
 * The `ErrorAssert` class provides utility functions for error type assertions.
 * @since v0.0.1
 */
export class ErrorAssert {
	/**
	 * Asserts that the given value is an {@link Error} instance.
	 * @param {unknown} err - Error to assert.
	 * @throws {TypeError} Throws {@link TypeError} if the given value is **not** an instance of the {@link Error} class.
	 * @since v0.0.1
	 * @example
	 * try {
	 *   // ...
	 * } catch (err) {
	 *   ErrCore.assert(err);
	 *   console.log(err.message);
	 * }
	 */
	public static assert<T = unknown>(err: T): asserts err is T & IsGuard<T, Error> {
		if (ErrorCore.isNot(err)) {
			throw ErrorCore.buildValueErr(err);
		}
	}

	/**
	 * Asserts that the given value is **not** an {@link Error}.
	 * @template T The input type.
	 * @param {unknown} err - The value to assert.
	 * @throws {TypeError} Throws {@link TypeError} if the given value is an instance of the {@link Error} class.
	 * @since v0.0.1
	 */
	public static assertNot<T = unknown>(err: T): asserts err is IsNotGuard<T, Error> {
		if (ErrorCore.is(err)) {
			throw ErrorCore.buildValueErr(err, true);
		}
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
