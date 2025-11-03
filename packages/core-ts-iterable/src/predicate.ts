/**
 * The `IterPredicate` class provides predicate functions for iterable type checks.
 * @since v0.0.1
 */
export class IterPredicate {
	/**
	 * Creates a predicate function that checks if a value equals a specific compare value.
	 * @template T The type of the compare value (may be more specific than R).
	 * @template R The type of elements being tested.
	 * @param {T} compareValue - The value to compare against.
	 * @returns {function(R): value is T & R} A function that returns `true` when the value strictly equals `compareValue`.
	 * @example
	 * const arr = ['a', 'b', 'c'] as string[];
	 * const result = arr.filter(IterPredicate.oneOf('a' as const)); // result is ('a')[]
	 * @since v0.0.1
	 */
	public static oneOf<T>(compareValue: T): <R>(value: R) => value is T & R {
		return <R>(value: R): value is T & R => (value as unknown) === compareValue;
	}

	/**
	 * Creates a predicate function that checks if a value does not equal a specific compare value.
	 * @template T The type of the compare value to exclude.
	 * @template R The type of elements being tested.
	 * @param {T} compareValue - The value to exclude.
	 * @returns {function(R): value is Exclude<R, T>} A function that returns `true` when the value does not equal `compareValue`.
	 * @example
	 * const arr = ['a', 'b', 'c'] as const;
	 * const result = arr.filter(IterPredicate.notOneOf('a' as const)); // result is ('b' | 'c')[]
	 * @since v0.0.1
	 */
	public static notOneOf<T>(compareValue: T): <R>(value: R) => value is Exclude<R, T> {
		return <R>(value: R): value is Exclude<R, T> => (value as unknown) !== compareValue;
	}

	/**
	 * Creates a predicate function that checks if a value is included in a set of compare values.
	 * @template T The type of elements to compare.
	 * @template R The type of elements being tested.
	 * @param {Iterable<T>} values - The acceptable values.
	 * @returns {function(R): value is T & R} A function that returns `true` if the value is found in `values`.
	 * @since v0.0.1
	 */
	public static anyOf<T>(values: Iterable<T>): <R>(value: R) => value is T & R {
		const valueSet = new Set(values);
		return <R>(value: R): value is T & R => valueSet.has(value as unknown as T);
	}

	/**
	 * Creates a predicate function that checks if a value is not included in a set of compare values.
	 * @template T The type of elements to compare.
	 * @template R The type of elements being tested.
	 * @param {Iterable<T>} values - The values to exclude.
	 * @returns {function(R): value is Exclude<R, T>} A function that returns `true` if the value is not found in `values`.
	 * @since v0.0.1
	 */
	public static notAnyOf<T>(values: Iterable<T>): <R>(value: R) => value is Exclude<R, T> {
		const valueSet = new Set(values);
		return <R>(value: R): value is Exclude<R, T> => !valueSet.has(value as unknown as T);
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
