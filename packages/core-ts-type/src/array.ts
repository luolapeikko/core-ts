/**
 * A non-empty {@link Array}.
 * @template T The type of the {@link Array}
 * @since v0.0.1
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * A non-empty {@link ReadonlyArray}.
 * @template T The type of the {@link ReadonlyArray}
 * @since v0.0.1
 */
export type NonEmptyReadonlyArray<T> = readonly [T, ...T[]];

/**
 * Type for any {@link Array} or {@link ReadonlyArray}
 * @template T The type of the {@link Array} or {@link ReadonlyArray}
 * @since v0.0.1
 */
export type AnyArray<T> = Array<T> | ReadonlyArray<T>;
