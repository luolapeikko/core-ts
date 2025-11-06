import {ErrorValue} from '@luolapeikko/core-ts-error';
import type {IsGuard, IsNotGuard, NumberFnMapping, WithIsCore} from '@luolapeikko/core-ts-type';

/**
 * The `NumberCore` class provides utility functions for number type checks.
 * @see {@link https://luolapeikko.github.io/core-ts} for full documentation.
 * @since v0.0.1
 */
export class NumberCore {
	/**
	 * Checks if a value is a {@link Number}.
	 * @param value - The value to check.
	 * @returns True if the value is a {@link Number}, false otherwise.
	 */
	public static isNumber<T = unknown>(value: NoInfer<T> | number): value is IsGuard<T, number> {
		return typeof value === 'number' && !Number.isNaN(value);
	}

	/**
	 * Checks if a value is **not** a {@link Number}.
	 * @param value - The value to check.
	 * @returns True if the value is **not** a {@link Number}, false otherwise.
	 */
	public static isNotNumber<T = unknown>(value: T): value is IsNotGuard<T, number> {
		return !NumberCore.isNumber(value);
	}

	/**
	 * Checks if a value is an integer {@link Number}.
	 * @param value - The value to check.
	 * @returns True if the value is an integer {@link Number}, false otherwise.
	 */
	public static isInt<T = unknown>(value: NoInfer<T> | number): value is IsGuard<T, number> {
		return NumberCore.isNumber(value) && Number.isInteger(value as number);
	}

	/**
	 * Checks if a value is **not** an integer {@link Number}.
	 * @param value - The value to check.
	 * @returns True if the value is **not** an integer {@link Number}, false otherwise.
	 */
	public static isNotInt<T = unknown>(value: T): value is IsNotGuard<T, number> {
		return !NumberCore.isInt(value);
	}

	/**
	 * Checks if a value is a floating-point {@link Number}.
	 * @param value - The value to check.
	 * @returns True if the value is a floating-point {@link Number}, false otherwise.
	 */
	public static isFloat<T = unknown>(value: NoInfer<T> | number): value is IsGuard<T, number> {
		return NumberCore.isNumber(value) && !Number.isInteger(value as number);
	}

	/**
	 * Checks if a value is **not** a floating-point {@link Number}.
	 * @param value - The value to check.
	 * @returns True if the value is **not** a floating-point {@link Number}, false otherwise.
	 */
	public static isNotFloat<T = unknown>(value: T): value is IsNotGuard<T, number> {
		return !NumberCore.isFloat(value);
	}

	/**
	 * Checks if a value is a bigint {@link BigInt}.
	 * @param value - The value to check.
	 * @returns True if the value is a bigint {@link BigInt}, false otherwise.
	 */
	public static isBigInt<T = unknown>(value: NoInfer<T> | bigint): value is IsGuard<T, bigint> {
		return typeof value === 'bigint';
	}

	/**
	 * Checks if a value is **not** a bigint {@link BigInt}.
	 * @param value - The value to check.
	 * @returns True if the value is **not** a bigint {@link BigInt}, false otherwise.
	 */
	public static isNotBigInt<T = unknown>(value: T): value is IsNotGuard<T, bigint> {
		return !NumberCore.isBigInt(value);
	}

	/**
	 * Checks if a value is a finite {@link Number}.
	 * @param value - The value to check.
	 * @returns True if the value is a finite {@link Number}, false otherwise.
	 */
	public static isFinite<T = unknown>(value: NoInfer<T> | number): value is IsGuard<T, number> {
		return NumberCore.isNumber(value) && Number.isFinite(value as number);
	}

	/**
	 * Checks if a value is **not** a finite {@link Number}.
	 * @param value - The value to check.
	 * @returns True if the value is **not** a finite {@link Number}, false otherwise.
	 */
	public static isNotFinite<T = unknown>(value: T): value is IsNotGuard<T, number> {
		return !NumberCore.isFinite(value);
	}

	/**
	 * Checks if a value is a safe integer {@link Number}.
	 * @param value - The value to check.
	 * @returns True if the value is a safe integer {@link Number}, false otherwise.
	 */
	public static isSafeInteger<T = unknown>(value: NoInfer<T> | number): value is IsGuard<T, number> {
		return NumberCore.isNumber(value) && Number.isSafeInteger(value as number);
	}

	/**
	 * Checks if a value is **not** a safe integer {@link Number}.
	 * @param value - The value to check.
	 * @returns True if the value is **not** a safe integer {@link Number}, false otherwise.
	 */
	public static isNotSafeInteger<T = unknown>(value: T): value is IsNotGuard<T, number> {
		return !NumberCore.isSafeInteger(value);
	}

	public static buildValueErr(
		value: unknown,
		typeName: 'Number' | 'Integer' | 'Float' | 'Finite' | 'BigInt' | 'SafeInteger' = 'Number',
		isNot = false,
	): TypeError {
		return ErrorValue.builder(value, typeName, isNot);
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/**
 * Check that we have all methods implemented
 */
void 0 as unknown as typeof NumberCore satisfies WithIsCore<NumberFnMapping>;
