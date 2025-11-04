/**
 * The `ArrayPredicate` class provides predicate functions for {@link Array} type checks.
 * @since v0.0.1
 */
export class ArrayPredicate {
	/**
	 * Creates a predicate function that checks if an {@link Array} contains a specific value.
	 * @template T The type of the compare value (may be more specific than R).
	 * @template R The type of elements being tested.
	 * @param {T} compareValue - The value to search for.
	 * @returns {function(R): value is T & R} A function that returns `true` if the value matches compareValue.
	 * @example
	 * const arr = ['a', 'b', 'c'] as string[];
	 * const result = arr.filter(ArrayPredicate.oneOf('a' as const)); // result is ('a')[]
	 * @since v0.0.1
	 */
	public static oneOf<T>(compareValue: T): <R>(value: R) => value is T & R {
		return <R>(value: R): value is T & R => (value as unknown) === compareValue;
	}

	/**
	 * Creates a predicate function that checks if an {@link Array} does not contain a specific value.
	 * @template T The type of the compare value to exclude.
	 * @template R The type of elements being tested.
	 * @param {T} compareValue - The value to search for.
	 * @returns {function(R): value is Exclude<R, T>} A function that returns `true` if the value does not match compareValue.
	 * @example
	 * const arr = ['a', 'b', 'c'] as const;
	 * const result = arr.filter(ArrayPredicate.notOneOf('a' as const)); // result is ('b' | 'c')[]
	 * @since v0.0.1
	 */
	public static notOneOf<T>(compareValue: T): <R>(value: R) => value is Exclude<R, T> {
		return <R>(value: R): value is Exclude<R, T> => (value as unknown) !== compareValue;
	}

	/**
	 * Creates a predicate function that checks if an {@link Array} contains any of the specified values.
	 * @template T The type of elements to compare.
	 * @param {AnyArray<T>} compareValues - The values to search for.
	 * @returns {function(AnyArray<T>): boolean} A function that returns `true` if the {@link Array} contains any of the values.
	 * @since v0.0.1
	 */
	public static anyOf<T>(compareValues: Iterable<T>): <R>(value: R) => value is T & R {
		const valueSet = new Set(compareValues);
		return <R>(value: R): value is T & R => valueSet.has(value as unknown as T);
	}

	/**
	 * Creates a predicate function that checks if an {@link Array} contains none of the specified values.
	 * @template T The type of elements to compare.
	 * @param {AnyArray<T>} compareValues - The values to check against.
	 * @returns {function(AnyArray<T>): boolean} A function that returns `true` if the {@link Array} contains none of the values.
	 * @since v0.0.1
	 */
	public static notAnyOf<T>(compareValues: Iterable<T>): <R>(value: R) => value is Exclude<R, T> {
		const valueSet = new Set(compareValues);
		return <R>(value: R): value is Exclude<R, T> => !valueSet.has(value as unknown as T);
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
