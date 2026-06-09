import type {IsGuard, IsNotGuard} from '@luolapeikko/core-ts-type';
import {JsonCore, type ToJsonObject} from './core';

export class JsonAssert {
	/**
	 * Asserts that the given value is JSON serializable (has a `toJSON` method).
	 * @template T - The type of the value being checked.
	 * @param {NoInfer<T> | ToJsonObject} value - The value to check.
	 * @throws {TypeError} Throws {@link TypeError} if the given value is **not** JSON serializable.
	 */
	public static assertJSONSerializable<T = unknown>(value: NoInfer<T> | ToJsonObject): asserts value is IsGuard<T, ToJsonObject> {
		if (JsonCore.isNotJSONSerializable(value)) {
			throw JsonCore.buildValueErr(value);
		}
	}
	/**
	 * Asserts that the given value is not JSON serializable (does not have a `toJSON` method).
	 * @template T - The type of the value being checked.
	 * @param {T} value - The value to check.
	 * @throws {TypeError} Throws {@link TypeError} if the given value is JSON serializable.
	 */
	public static assertNotJSONSerializable<T = unknown>(value: T): asserts value is IsNotGuard<T, ToJsonObject> {
		if (JsonCore.isJSONSerializable(value)) {
			throw JsonCore.buildValueErr(value, true);
		}
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
