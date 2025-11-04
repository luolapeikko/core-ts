import {ErrorValue} from '@luolapeikko/core-ts-error';
import type {Nullish} from '@luolapeikko/core-ts-type';
import {NumberCore} from './core';

export class NumberCast {
	private static readonly floatOnlyRegex = /^-?\d+\.\d+(?:[eE][-+]?\d+)?$/;

	/**
	 * Cast value to {@link Number}
	 * @example
	 * const value: number = NumberCast.numberFrom('1');
	 * @param value - The value to cast
	 * @returns {number} The casted value
	 * @throws {TypeError} Throws {@link TypeError} if the given value cannot be casted as {@link Number}.
	 * @since v0.0.1
	 */
	public static numberFrom(value: Nullish<string | number | bigint>): number {
		return NumberCast.handleNumberFrom(value);
	}

	/**
	 * Cast value to integer {@link Number}
	 * @example
	 * const value: number = NumberCast.intFrom('1');
	 * @param value - The value to cast
	 * @returns {number} The casted value
	 * @throws {TypeError} Throws {@link TypeError} if the given value cannot be casted as integer.
	 * @since v0.0.1
	 */
	public static intFrom(value: Nullish<string | number | bigint>): number {
		return NumberCast.handleIntFrom(value);
	}

	/**
	 * Cast value to floating-point {@link Number}
	 * @example
	 * const value: number = NumberCast.floatFrom('1.1');
	 * @param value - The value to cast
	 * @returns {number} The casted value
	 * @throws {TypeError} Throws {@link TypeError} if the given value cannot be casted as floating-point {@link Number}.
	 * @since v0.0.1
	 */
	public static floatFrom(value: Nullish<string | number | bigint>): number {
		return NumberCast.handleFloatFrom(value);
	}

	/**
	 * Cast value to bigint {@link BigInt}
	 * @example
	 * const value: bigint = NumberCast.bigintFrom('1');
	 * @param value - The value to cast
	 * @returns {bigint} The casted value
	 * @throws {TypeError} Throws {@link TypeError} if the given value cannot be casted as bigint {@link BigInt}.
	 * @since v0.0.1
	 */
	public static bigintFrom(value: Nullish<string | number | bigint>): bigint {
		return NumberCast.handleBigIntFrom(value);
	}

	private static handleBigIntFrom(value: unknown, orgValue?: string): bigint {
		if (NumberCore.isBigInt(value)) {
			return value;
		}
		if (NumberCore.isInt(value)) {
			return NumberCast.castBigInt(value);
		}
		if (NumberCore.isFloat(value)) {
			return NumberCast.castBigInt(Math.trunc(value));
		}
		if (typeof value === 'string') {
			return NumberCast.castBigInt(value);
		}
		throw NumberCore.buildValueErr(orgValue ?? value, 'BigInt');
	}

	private static handleNumberFrom(value: unknown): number {
		if (NumberCore.isFloat(value)) {
			return value;
		}
		if (NumberCore.isInt(value)) {
			return value;
		}
		if (typeof value === 'string') {
			return NumberCast.isFloatStringLike(value)
				? NumberCast.handleFloatFrom(parseFloat(value), {orgValue: value, buildErr: (value) => NumberCore.buildValueErr(value, 'Number')})
				: NumberCast.handleIntFrom(parseInt(value, 10), {orgValue: value, buildErr: (value) => NumberCore.buildValueErr(value, 'Number')});
		}
		if (NumberCore.isBigInt(value)) {
			NumberCast.assertBigIntSafeNumber(value, ErrorValue.messageBuilder(`${value} exceeds safe number range.`, 'Number'));
			return NumberCast.handleIntFrom(Number(value), {orgValue: value, buildErr: (value) => NumberCore.buildValueErr(value, 'Number')});
		}
		throw NumberCore.buildValueErr(value, 'Number');
	}

	private static handleFloatFrom(value: unknown, args?: {orgValue: unknown; buildErr: (value: unknown) => TypeError}): number {
		if (NumberCore.isFloat(value)) {
			return value;
		}
		if (NumberCore.isInt(value)) {
			return value + 0.0; // force int to float
		}
		if (typeof value === 'string') {
			return NumberCast.handleFloatFrom(parseFloat(value), {orgValue: value, buildErr: (value) => NumberCore.buildValueErr(value, 'Float')});
		}
		if (NumberCore.isBigInt(value)) {
			NumberCast.assertBigIntSafeNumber(value, ErrorValue.messageBuilder(`${value} exceeds safe float range.`, 'Float'));
			return NumberCast.handleFloatFrom(Number(value));
		}
		throw args ? args.buildErr(args.orgValue) : NumberCore.buildValueErr(value, 'Float');
	}

	private static handleIntFrom(value: unknown, args?: {orgValue: unknown; buildErr: (value: unknown) => TypeError}): number {
		if (NumberCore.isInt(value)) {
			return value;
		}
		if (NumberCore.isFloat(value)) {
			return Math.trunc(value);
		}
		if (typeof value === 'string') {
			return NumberCast.handleIntFrom(parseInt(value, 10), {orgValue: value, buildErr: (value) => NumberCore.buildValueErr(value, 'Integer')});
		}
		if (NumberCore.isBigInt(value)) {
			NumberCast.assertBigIntSafeNumber(value, ErrorValue.messageBuilder(`${value} exceeds safe integer range.`, 'Integer'));
			return Number(value);
		}
		throw args ? args.buildErr(args.orgValue) : NumberCore.buildValueErr(value, 'Integer');
	}

	private static isFloatStringLike(value: unknown): value is string {
		return typeof value === 'string' && NumberCast.floatOnlyRegex.test(value.trim());
	}

	private static assertBigIntSafeNumber(value: bigint, errorMessage: string): asserts value is bigint {
		if (!(value >= BigInt(Number.MIN_SAFE_INTEGER) && value <= BigInt(Number.MAX_SAFE_INTEGER))) {
			throw new RangeError(errorMessage);
		}
	}

	private static castBigInt(value: string | number): bigint {
		try {
			// BigInt can't handle string float values, so we need to check if the value is a float string-like and pre-handle it accordingly
			return NumberCast.isFloatStringLike(value) ? NumberCast.handleBigIntFrom(NumberCast.intFrom(value), value) : BigInt(Number(value));
			// eslint-disable-next-line sonarjs/no-ignored-exceptions
		} catch {
			// BigInt throws SyntaxError on invalid string, override it with TypeError
			throw NumberCore.buildValueErr(value, 'BigInt');
		}
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
