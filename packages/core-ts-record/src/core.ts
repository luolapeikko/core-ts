import {ErrorValue} from '@luolapeikko/core-ts-error';
import type {IsGuard, IsNotGuard, ObjectMappedArray, ObjectMappedArrayTuples} from '@luolapeikko/core-ts-type';

/**
 * The `RecordCore` class provides utility functions for record type checks.
 * @since v0.0.1
 */
export class RecordCore {
	/**
	 * Type guard to check if a value is a `Record<string, unknown>`.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is a `Record<string, unknown>`; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static is<T = unknown>(value: T): value is IsGuard<T, Record<string, unknown>> {
		return typeof value === 'object' && value !== null && !Array.isArray(value);
	}

	public static isNot<T = unknown>(value: T): value is IsNotGuard<T, Record<string, unknown>> {
		return !RecordCore.is(value);
	}

	/**
	 * Type-safe Object.keys() with overload for NonEmptyArray
	 * @example
	 * const result1: NonEmptyReadonlyArray<'key'> = RecordCore.keys({key: 'value'} as const);
	 * const result2: Array<'key'> = RecordCore.keys({key: 'value'});
	 * const result3: Array<string> = RecordCore.keys<Record<string, string>>({key: 'value'});
	 * const result4: [] = RecordCore.keys({});
	 * @template R - The object shape
	 * @param {R} value - The object shape to get the values from
	 * @returns {ObjectMappedArray<R, keyof R>} Array of object keys
	 * @since v0.0.1
	 */
	public static keys<R extends object>(value: R): ObjectMappedArray<R, keyof R> {
		return Object.keys(value) as ObjectMappedArray<R, keyof R>;
	}

	/**
	 * Type-safe Object.values() with overload for NonEmptyArray
	 * @example
	 * const result1: NonEmptyReadonlyArray<'value'> = RecordCore.values({key: 'value'} as const);
	 * const result2: Array<string> = RecordCore.values({key: 'value'});
	 * const result3: [] = RecordCore.values({});
	 * @template R - The object shape
	 * @param {R} value - The object shape to get the values from
	 * @returns {ObjectMappedArray<R, R[keyof R]>} Array of object values
	 * @since v0.0.1
	 */
	public static values<R extends object>(value: R): ObjectMappedArray<R, R[keyof R]> {
		return Object.values(value) as ObjectMappedArray<R, R[keyof R]>;
	}

	/**
	 * Type-safe Object.entries() with overload for NonEmptyArray
	 * @example
	 * const result1: NonEmptyReadonlyArray<['key', 'value']> = RecordCore.entries({key: 'value'} as const);
	 * const result2: Array<['key', string]> = RecordCore.entries({key: 'value'});
	 * const result3: Array<[string, string]> = RecordCore.entries<Record<string, string>>({key: 'value'});
	 * const result4: [] = RecordCore.entries({});
	 * @template R - The object shape
	 * @param {R} value - The object shape to get the values from
	 * @returns {ObjectMappedArrayTuples<R>} Array of tuples with key and value
	 * @since v0.0.1
	 */
	public static entries<R extends object>(value: R): ObjectMappedArrayTuples<R> {
		return Object.entries(value) as ObjectMappedArrayTuples<R>;
	}

	public static fromEntries<R extends object>(value: ObjectMappedArrayTuples<R>): R {
		return Object.fromEntries(value) as R;
	}

	public static omit<R extends object, K extends keyof R>(keys: Iterable<K>, obj: R): Omit<R, K> {
		return Array.from(keys).reduce(
			(acc, key) => {
				delete acc[key];
				return acc;
			},
			{...obj},
		);
	}

	public static pick<R extends object, K extends keyof R>(keys: Iterable<K>, obj: R): Pick<R, K> {
		return Array.from(keys).reduce(
			(acc, key) => {
				acc[key] = obj[key];
				return acc;
			},
			{} as Pick<R, K>,
		);
	}

	public static buildValueErr(value: unknown, isNot = false): TypeError {
		return ErrorValue.builder(value, 'Record', isNot);
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
