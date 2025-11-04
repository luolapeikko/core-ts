import type {NonEmptyReadonlyArray} from './array';

/**
 * Support for conditional types
 * @template X Object type
 * @template Y Object type
 * @template A Output object type or never
 * @template B Output object type or never
 * @since v0.0.1
 */
export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

/**
 * @template T The object shape
 * @since v0.0.1
 */
export type IfWritableKeys<T> = {
	[P in keyof T]-?: IfEquals<{[Q in P]: T[P]}, {-readonly [Q in P]: T[P]}, P>;
}[keyof T];

/**
 * @template T The object shape
 * @since v0.0.1
 */
export type IfReadonlyKeys<T> = {
	[P in keyof T]-?: IfEquals<{[Q in P]: T[P]}, {-readonly [Q in P]: T[P]}, never, P>;
}[keyof T];

/**
 * Type for any {@link Record} {@link Object}
 * @since v0.0.1
 */
export type AnyRecord = Record<PropertyKey, any>;

/**
 * Type for an empty {@link Record} {@link Object}
 * @since v0.0.1
 */
export type EmptyObject = Record<string | number | symbol, never>;

/**
 * Check if a {@link Record} is readonly or never
 * @template R - The object shape
 * @since v0.0.1
 */
export type RecordHaveReadonlyKeys<R extends object> = IfReadonlyKeys<R> extends never ? never : R;

/**
 * Check if a {@link Record} is non-readonly or never
 * @template R - The object shape
 * @since v0.0.1
 */
export type RecordHaveWritableKeys<R extends object> = IfWritableKeys<R> extends never ? never : R;

/**
 * Type mapping for {@link Object.keys}, {@link Object.values} as an {@link Array}
 *
 * 1. if R is an empty object, return type `[]`
 * 2. if R has no writable keys, return type `NonEmptyReadonlyArray<T>`
 * 3. otherwise, return type `Array<T>`
 * @template R - The object shape
 * @template T - The type of the values
 * @since v0.2.0
 */
export type ObjectMappedArray<R extends object, T> = R extends EmptyObject ? [] : RecordHaveWritableKeys<R> extends never ? NonEmptyReadonlyArray<T> : T[];

/**
 * Type mapping for {@link Object.entries} as an {@link Array} of tuples
 *
 * 1. if R is an empty object, return type `[]`
 * 2. if R has no writable keys, return type `NonEmptyReadonlyArray<[K1, V1] | [K2, V2] | ...>`
 * 3. otherwise, return type `Array<[K1, V1] | [K2, V2] | ...>`
 * @template R - The object shape
 * @template T - The type of the values
 * @since v0.2.5
 */
export type ObjectMappedArrayTuples<R extends object> = R extends EmptyObject
	? []
	: RecordHaveWritableKeys<R> extends never
		? NonEmptyReadonlyArray<
				{
					[K in keyof R]-?: [K, Exclude<R[K], undefined>];
				}[keyof R]
			>
		: {
				[K in keyof R]-?: [K, Exclude<R[K], undefined>];
			}[keyof R][];
