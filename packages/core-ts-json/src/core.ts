import {ErrorValue} from '@luolapeikko/core-ts-error';
import type {IsNotGuard} from '@luolapeikko/core-ts-type';

export type ToJsonObject = {toJSON: () => any};

/**
 * The `JsonCore` class provides utility functions for JSON type checks.
 * @see {@link https://luolapeikko.github.io/core-ts} for full documentation.
 * @since v0.0.1
 */
export class JsonCore {
	/**
	 * Type guard that checks if a value is JSON serializable (has a `toJSON` method).
	 * @param {unknown} value - The value to check.
	 * @returns {value is ToJsonObject} True if the value is JSON serializable, false otherwise.
	 */
	public static isJSONSerializable(value: unknown): value is ToJsonObject {
		return typeof value === 'object' && value !== null && 'toJSON' in value && typeof value.toJSON === 'function';
	}

	/**
	 * Type guard that checks if a value is not JSON serializable (does not have a `toJSON` method).
	 * @template T - The type of the value being checked.
	 * @param {T} value - The value to check.
	 * @returns {value is IsNotGuard<T, ToJsonObject>} True if the value is not JSON serializable, false otherwise.
	 */
	public static isNotJSONSerializable<T = unknown>(value: T): value is IsNotGuard<T, ToJsonObject> {
		return !JsonCore.isJSONSerializable(value);
	}

	/**
	 * Builds value error.
	 * @param {unknown} value - The invalid value.
	 * @param {boolean} [isNot] - Whether the error should be for `!JSONSerializable`.
	 * @returns {TypeError} The created error.
	 * @since v0.0.1
	 */
	public static buildValueErr(value: unknown, isNot = false): TypeError {
		return ErrorValue.builder(value, 'JSONSerializable', isNot);
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
