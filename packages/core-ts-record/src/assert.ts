import type {AnyRecord, IsGuard, IsNotGuard} from '@luolapeikko/core-ts-type';
import {RecordCore} from './core';

/**
 * The `RecordAssert` class provides utility functions for {@link Record} {@link Object} type assertions.
 * @since v0.0.1
 */
export class RecordAssert {
	/**
	 * Asserts that the given value is a {@link Record} {@link Object}.
	 * @template T The input type.
	 * @param {unknown} value - The value to assert.
	 * @throws {TypeError} Throws {@link TypeError} if the given value is **not** a {@link Record} {@link Object}.
	 * @since v0.0.1
	 */
	public static assert<T = unknown>(value: NoInfer<T> | AnyRecord): asserts value is IsGuard<T, AnyRecord> {
		if (RecordCore.isNot(value)) {
			throw RecordCore.buildValueErr(value);
		}
	}

	/**
	 * Asserts that the given value is **not** a {@link Record} {@link Object}.
	 * @template T The input type.
	 * @param {unknown} value - The value to assert.
	 * @throws {TypeError} Throws {@link TypeError} if the given value is a {@link Record} {@link Object}.
	 * @since v0.0.1
	 */
	public static assertNot<T = unknown>(value: unknown): asserts value is IsNotGuard<T, AnyRecord> {
		if (RecordCore.is(value)) {
			throw RecordCore.buildValueErr(value, true);
		}
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
