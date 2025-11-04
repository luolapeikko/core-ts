/**
 * Empty {@link String} type.
 * @since v0.0.1
 */
export type EmptyString = '';

/**
 * {@link String} type that represents a number.
 * @since v0.0.1
 */
export type NumberString = `${number}`;

/**
 * Prefixed {@link String} type.
 * @template P - The prefix to include in the {@link String}.
 * @since v0.0.1
 */
export type PrefixedString<P extends string> = `${P}${string}`;

/**
 * Suffixed {@link String} type.
 * @template S - The suffix to include in the {@link String}.
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
