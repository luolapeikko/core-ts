import {ErrorValue} from '@luolapeikko/core-ts-error';
import type {AnyRecord, IsGuard, IsNotGuard, ObjectMappedArray, ObjectMappedArrayTuples} from '@luolapeikko/core-ts-type';

/**
 * The `RecordCore` class provides utility functions for record type checks.
 * @see {@link https://luolapeikko.github.io/core-ts} for full documentation.
 * @since v0.0.1
 */
export class RecordCore {
	/**
	 * Type guard to check if a value is a {@link Record} {@link Object}.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is a {@link Record} {@link Object}; otherwise, `false`.
	 * @since v0.0.1
	 */
	public static is<T = unknown>(value: NoInfer<T> | AnyRecord): value is IsGuard<T, AnyRecord> {
		return typeof value === 'object' && value !== null && !Array.isArray(value);
	}

	/**
	 * Type guard to check if a value is **not** a {@link Record} {@link Object}.
	 * @param value - The value to check.
	 * @returns `true` if the value is **not** a {@link Record} {@link Object}; otherwise, `false`.
	 */
	public static isNot<T = unknown>(value: T): value is IsNotGuard<T, AnyRecord> {
		return !RecordCore.is(value);
	}

	/**
	 * Type-safe {@link Object.keys} with overload for NonEmptyArray
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
	 * Type-safe {@link Object.values} with overload for NonEmptyArray
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
	 * Type-safe {@link Object.entries} with overload for NonEmptyArray
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

	/**
	 * Type-safe {@link Object.fromEntries} to create a record from Iterable of key-value tuples.
	 * @param value - The array of key-value tuples.
	 * @returns A record constructed from the key-value tuples.
	 * @since v0.0.1
	 */
	public static fromEntries<R extends object>(value: ObjectMappedArrayTuples<R>): R {
		return Object.fromEntries(value) as R;
	}

	/**
	 * {@link Omit} specified keys from an {@link Object}.
	 * @param keys - The keys to omit.
	 * @param obj - The object to omit keys from.
	 * @returns A new {@link Object} without the omitted keys.
	 * @since v0.0.1
	 */
	public static omit<R extends object, K extends keyof R>(keys: Iterable<K>, obj: R): Omit<R, K> {
		return Array.from(keys).reduce(
			(acc, key) => {
				delete acc[key];
				return acc;
			},
			{...obj},
		);
	}

	/**
	 * {@link Pick} specified keys from an {@link Object}.
	 * @param keys - The keys to pick.
	 * @param obj - The object to pick keys from.
	 * @returns A new {@link Object} with only the picked keys.
	 * @since v0.0.1
	 */
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
