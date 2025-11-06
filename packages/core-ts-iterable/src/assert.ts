import type {IsGuard, IsNotGuard} from '@luolapeikko/core-ts-type';
import {IterCore} from './core';

/**
 * The `IterAssert` class provides utility functions for iterable type assertions.
 * @see {@link https://luolapeikko.github.io/core-ts} for full documentation.
 * @since v0.0.1
 */
export class IterAssert {
	/**
	 * Asserts that the given value is an {@link Iterable}.
	 * @template T - The input type.
	 * @param {unknown} value - The value to check.
	 * @returns {void} Nothing, throws if assertion fails.
	 * @throws {TypeError} Throws {@link TypeError} if the given value is **not** an {@link Iterable}.
	 * @since v0.0.1
	 */
	public static assert<T = unknown>(value: NoInfer<T> | Iterable<unknown>): asserts value is IsGuard<T, Iterable<unknown>> {
		if (!IterCore.is(value)) {
			throw IterCore.buildValueErr(value);
		}
	}

	/**
	 * Asserts that the given value is **not** an {@link Iterable}.
	 * @template T - The input type.
	 * @param {unknown} value - The value to check.
	 * @returns {void} Nothing, throws if assertion fails.
	 * @throws {TypeError} Throws {@link TypeError} if the given value is an {@link Iterable}.
	 * @since v0.0.1
	 */
	public static assertNot<T = unknown>(value: unknown): asserts value is IsNotGuard<T, Iterable<unknown>> {
		if (IterCore.is(value)) {
			throw IterCore.buildValueErr(value, true);
		}
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
