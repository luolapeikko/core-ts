/**
 * The `RecordPredicate` class provides predicate functions for record type checks.
 * @since v0.0.1
 */
export class RecordPredicate {
	/**
	 * Creates a predicate function that checks if a specific property of a record is equal to a given value.
	 * @template T - The type of the record (strict overload).
	 * @template K - The key of the property to check.
	 * @template V - The value type of the property (loose overload).
	 * @param {K} key - The key of the property to check.
	 * @param {T[K]} value - The value or iterable values to compare against.
	 * @returns {(target: T) => boolean} A function that takes a record and returns true if the property is equal to the value.
	 * @example
	 * // Strict object structure
	 * const isAdmin = RecordPredicate.propEq<User, 'role'>('role', 'admin');
	 * const admins = users.filter(isAdmin);
	 * @example
	 * // Loosely typed object
	 * const isPublished = RecordPredicate.propEq('status', 'published');
	 * const publishedPosts = posts.filter(isPublished);
	 * @since v0.0.1
	 */
	public static propEq<T extends Record<PropertyKey, any>, K extends keyof T>(key: K, value: T[K] | Iterable<T[K]>): (target: T) => boolean;
	public static propEq<V, K extends PropertyKey>(key: K, value: V | Iterable<V>): (obj: Partial<Record<K, V>>) => boolean;
	public static propEq<V, K extends PropertyKey>(key: K, value: V | Iterable<V>): (obj: Partial<Record<K, V>>) => boolean {
		if (typeof (value as any)?.[Symbol.iterator] === 'function' && typeof value !== 'string') {
			const targetSet = new Set(value as Iterable<V>);
			return (obj: Partial<Record<K, V>>): boolean => targetSet.has(obj[key] as V);
		}
		return (obj: Partial<Record<K, V>>): boolean => obj[key] === value;
	}

	/**
	 * Creates a predicate function that checks if a specific property of a record is not equal to a given value.
	 * @template T - The type of the record (strict overload).
	 * @template K - The key of the property to check.
	 * @template V - The value type of the property (loose overload).
	 * @param {K} key - The key of the property to check.
	 * @param {T[K]} value - The value to compare against.
	 * @returns {(target: T) => boolean} A function that takes a record and returns true if the property is not equal to the value.
	 * @example
	 * // Strict object structure
	 * const isNotAdmin = RecordPredicate.propNotEq<User, 'role'>('role', 'admin');
	 * const nonAdmins = users.filter(isNotAdmin);
	 * @example
	 * // Loosely typed object
	 * const isNotPublished = RecordPredicate.propNotEq('status', 'published');
	 * const draftsOrArchived = posts.filter(isNotPublished);
	 * @since v0.0.1
	 */
	public static propNotEq<T extends Record<PropertyKey, any>, K extends keyof T>(key: K, value: T[K] | Iterable<T[K]>): (target: T) => boolean;
	public static propNotEq<V, K extends PropertyKey>(key: K, value: V | Iterable<V>): (obj: Partial<Record<K, V>>) => boolean;
	public static propNotEq<V, K extends PropertyKey>(key: K, value: V | Iterable<V>): (obj: Partial<Record<K, V>>) => boolean {
		if (typeof (value as any)?.[Symbol.iterator] === 'function' && typeof value !== 'string') {
			const targetSet = new Set(value as Iterable<V>);
			return (obj: Partial<Record<K, V>>): boolean => !targetSet.has(obj[key] as V);
		}
		return (obj: Partial<Record<K, V>>): boolean => obj[key] !== value;
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
