/**
 * Empty string type.
 * @since v0.0.1
 */
export type EmptyString = '';

/**
 * String type that represents a number.
 * @since v0.0.1
 */
export type NumberString = `${number}`;

/**
 * Prefixed string type.
 * @template P - The prefix to include in the string.
 * @since v0.0.1
 */
export type PrefixedString<P extends string> = `${P}${string}`;

/**
 * Suffixed string type.
 * @template S - The suffix to include in the string.
 * @since v0.0.1
 */
export type SuffixedString<S extends string> = `${string}${S}`;

export type StringFnMapping = {
	'': [string, string];
	Empty: [string, EmptyString];
	LowerCase: [string, Lowercase<string>];
	UpperCase: [string, Uppercase<string>];
	Numeric: [string, NumberString];
};
