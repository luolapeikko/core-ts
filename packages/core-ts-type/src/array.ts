/**
 * A non-empty array.
 * @template T The type of the array
 * @since v0.0.1
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * A non-empty readonly array.
 * @template T The type of the array
 * @since v0.0.1
 */
export type NonEmptyReadonlyArray<T> = readonly [T, ...T[]];

export type AnyArray<T> = Array<T> | ReadonlyArray<T>;
