import {ErrorValue} from '@luolapeikko/core-ts-error';
import type {IsGuard, IsNotGuard, NumberFnMapping, WithIsCore} from '@luolapeikko/core-ts-type';

/**
 * The `NumberCore` class provides utility functions for number type checks.
 * @since v0.0.1
 */
export class NumberCore {
	public static isNumber<T = unknown>(value: NoInfer<T> | number): value is IsGuard<T, number> {
		return typeof value === 'number' && !Number.isNaN(value);
	}

	public static isNotNumber<T = unknown>(value: T): value is IsNotGuard<T, number> {
		return !NumberCore.isNumber(value);
	}

	public static isInt<T = unknown>(value: NoInfer<T> | number): value is IsGuard<T, number> {
		return NumberCore.isNumber(value) && Number.isInteger(value as number);
	}

	public static isNotInt<T = unknown>(value: T): value is IsNotGuard<T, number> {
		return !NumberCore.isInt(value);
	}

	public static isFloat<T = unknown>(value: NoInfer<T> | number): value is IsGuard<T, number> {
		return NumberCore.isNumber(value) && !Number.isInteger(value as number);
	}

	public static isNotFloat<T = unknown>(value: T): value is IsNotGuard<T, number> {
		return !NumberCore.isFloat(value);
	}

	public static isBigInt<T = unknown>(value: NoInfer<T> | bigint): value is IsGuard<T, bigint> {
		return typeof value === 'bigint';
	}

	public static isNotBigInt<T = unknown>(value: T): value is IsNotGuard<T, bigint> {
		return !NumberCore.isBigInt(value);
	}

	public static isFinite<T = unknown>(value: NoInfer<T> | number): value is IsGuard<T, number> {
		return NumberCore.isNumber(value) && Number.isFinite(value as number);
	}

	public static isNotFinite<T = unknown>(value: T): value is IsNotGuard<T, number> {
		return !NumberCore.isFinite(value);
	}

	public static isSafeInteger<T = unknown>(value: NoInfer<T> | number): value is IsGuard<T, number> {
		return NumberCore.isNumber(value) && Number.isSafeInteger(value as number);
	}

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
