import type {IsGuard, IsNotGuard} from '@luolapeikko/core-ts-type';
import {IterCore} from './core';

/**
 * The `IterAssert` class provides utility functions for iterable type assertions.
 * @since v0.0.1
 */
export class IterAssert {
	/**
	 * Asserts that the given value is an iterable.
	 * @template T - The type of elements contained in the iterable.
	 * @param {unknown} value - The value to check.
	 * @returns {Iterable<T>} The value as an iterable.
	 * @throws {TypeError} If the value is not an iterable.
	 * @since v0.0.1
	 */
	public static assert<T = unknown>(value: T): asserts value is IsGuard<T, Iterable<unknown>> {
		if (!IterCore.is(value)) {
			throw IterCore.buildValueErr(value);
		}
	}

	/**
	 * Asserts that the given value is not an iterable.
	 * @template T - The type of elements that would be contained in the iterable.
	 * @param {unknown} value - The value to check.
	 * @returns {void} Nothing, throws if assertion fails.
	 * @throws {TypeError} If the value is an iterable.
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
