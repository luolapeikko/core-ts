import type {IsGuard, IsNotGuard} from '@luolapeikko/core-ts-type';
import {AsyncIterCore} from './core';

/**
 * The `AsyncIterAssert` class provides utility functions for async iterable type assertions.
 * @since v0.0.1
 */
export class AsyncIterAssert {
	/**
	 * Asserts that the given value is an `AsyncIterable`.
	 * @template T The input type.
	 * @param {unknown} value - The value to assert.
	 * @throws {TypeError} If the value is not an async iterable.
	 * @since v0.0.1
	 */
	public static assert<T = unknown>(value: T): asserts value is IsGuard<T, AsyncIterable<unknown>> {
		if (AsyncIterCore.isNot(value)) {
			throw AsyncIterCore.buildValueErr(value);
		}
	}

	/**
	 * Asserts that the given value is *not* an `AsyncIterable`.
	 * @template T The input type.
	 * @param {unknown} value - The value to assert.
	 * @throws {TypeError} If the value is an async iterable.
	 * @since v0.0.1
	 */
	public static assertNot<T = unknown>(value: T): asserts value is IsNotGuard<T, AsyncIterable<unknown>> {
		if (AsyncIterCore.is(value)) {
			throw AsyncIterCore.buildValueErr(value, true);
		}
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
