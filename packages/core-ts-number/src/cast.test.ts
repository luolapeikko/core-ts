import {describe, expect, it} from 'vitest';
import {NumberCast} from './';

describe('NumberCast', () => {
	describe('numberFrom', () => {
		it('converts valid number strings', () => {
			expect(NumberCast.numberFrom('123')).toBe(123);
			expect(NumberCast.numberFrom('-123.456')).toBe(-123.456);
			expect(NumberCast.numberFrom('0')).toBe(0);
		});

		it('converts actual numbers', () => {
			expect(NumberCast.numberFrom(123)).toBe(123);
			expect(NumberCast.numberFrom(-123.456)).toBe(-123.456);
			expect(NumberCast.numberFrom(0)).toBe(0);
		});

		it('converts bigints within safe range', () => {
			expect(NumberCast.numberFrom(123n)).toBe(123);
			expect(NumberCast.numberFrom(-123n)).toBe(-123);
			expect(NumberCast.numberFrom(0n)).toBe(0);
		});

		it('throws for unsafe bigints', () => {
			const hugeBigInt = BigInt(Number.MAX_SAFE_INTEGER) + 1n;
			expect(() => NumberCast.numberFrom(hugeBigInt)).toThrow(RangeError);
		});

		it('throws for invalid inputs', () => {
			expect(() => NumberCast.numberFrom('not a number')).toThrow(TypeError);
			expect(() => NumberCast.numberFrom(null)).toThrow(TypeError);
			expect(() => NumberCast.numberFrom(undefined)).toThrow(TypeError);
			expect(() => NumberCast.numberFrom('invalid' as string)).toThrow(TypeError);
		});
	});

	describe('intFrom', () => {
		it('converts valid integer strings', () => {
			expect(NumberCast.intFrom('123')).toBe(123);
			expect(NumberCast.intFrom('-123')).toBe(-123);
			expect(NumberCast.intFrom('0')).toBe(0);
		});

		it('converts float strings by truncating', () => {
			expect(NumberCast.intFrom('123.456')).toBe(123);
			expect(NumberCast.intFrom('-123.456')).toBe(-123);
		});

		it('converts actual integers', () => {
			expect(NumberCast.intFrom(123)).toBe(123);
			expect(NumberCast.intFrom(-123)).toBe(-123);
			expect(NumberCast.intFrom(0)).toBe(0);
		});

		it('converts floats by truncating', () => {
			expect(NumberCast.intFrom(123.456)).toBe(123);
			expect(NumberCast.intFrom(-123.456)).toBe(-123);
		});

		it('converts bigints within safe range', () => {
			expect(NumberCast.intFrom(123n)).toBe(123);
			expect(NumberCast.intFrom(-123n)).toBe(-123);
			expect(NumberCast.intFrom(0n)).toBe(0);
		});

		it('throws for unsafe bigints', () => {
			const hugeBigInt = BigInt(Number.MAX_SAFE_INTEGER) + 1n;
			expect(() => NumberCast.intFrom(hugeBigInt)).toThrow(RangeError);
		});

		it('throws for invalid inputs', () => {
			expect(() => NumberCast.intFrom('not a number')).toThrow(TypeError);
			expect(() => NumberCast.intFrom(null)).toThrow(TypeError);
			expect(() => NumberCast.intFrom(undefined)).toThrow(TypeError);
			expect(() => NumberCast.intFrom('invalid' as string)).toThrow(TypeError);
		});
	});

	describe('floatFrom', () => {
		it('converts valid float strings', () => {
			expect(NumberCast.floatFrom('123.456')).toBe(123.456);
			expect(NumberCast.floatFrom('-123.456')).toBe(-123.456);
			expect(NumberCast.floatFrom('0.0')).toBe(0.0);
		});

		it('converts actual floats', () => {
			expect(NumberCast.floatFrom(123.456)).toBe(123.456);
			expect(NumberCast.floatFrom(-123.456)).toBe(-123.456);
		});

		it('converts integers to floats', () => {
			expect(NumberCast.floatFrom(123)).toBe(123.0);
			expect(NumberCast.floatFrom(-123)).toBe(-123.0);
			expect(NumberCast.floatFrom(0)).toBe(0.0);
		});

		it('converts bigints within safe range', () => {
			expect(NumberCast.floatFrom(123n)).toBe(123.0);
			expect(NumberCast.floatFrom(-123n)).toBe(-123.0);
			expect(NumberCast.floatFrom(0n)).toBe(0.0);
		});

		it('throws for unsafe bigints', () => {
			const hugeBigInt = BigInt(Number.MAX_SAFE_INTEGER) + 1n;
			expect(() => NumberCast.floatFrom(hugeBigInt)).toThrow(RangeError);
		});

		it('throws for invalid inputs', () => {
			expect(() => NumberCast.floatFrom('not a number')).toThrow(TypeError);
			expect(() => NumberCast.floatFrom(null)).toThrow(TypeError);
			expect(() => NumberCast.floatFrom(undefined)).toThrow(TypeError);
			expect(() => NumberCast.floatFrom('invalid')).toThrow(TypeError);
		});
	});

	describe('bigintFrom', () => {
		it('converts valid integer strings', () => {
			expect(NumberCast.bigintFrom('123')).toBe(123n);
			expect(NumberCast.bigintFrom('-123')).toBe(-123n);
			expect(NumberCast.bigintFrom('0')).toBe(0n);
		});

		it('converts float strings by truncating', () => {
			expect(NumberCast.bigintFrom('123.456')).toBe(123n);
			expect(NumberCast.bigintFrom('-123.456')).toBe(-123n);
		});

		it('converts integers', () => {
			expect(NumberCast.bigintFrom(123)).toBe(123n);
			expect(NumberCast.bigintFrom(-123)).toBe(-123n);
			expect(NumberCast.bigintFrom(0)).toBe(0n);
		});

		it('converts floats by truncating', () => {
			expect(NumberCast.bigintFrom(123.456)).toBe(123n);
			expect(NumberCast.bigintFrom(-123.456)).toBe(-123n);
		});

		it('keeps existing bigints', () => {
			expect(NumberCast.bigintFrom(123n)).toBe(123n);
			expect(NumberCast.bigintFrom(-123n)).toBe(-123n);
			expect(NumberCast.bigintFrom(0n)).toBe(0n);
		});

		it('throws for invalid inputs', () => {
			expect(() => NumberCast.bigintFrom('not a number')).toThrow(TypeError);
			expect(() => NumberCast.bigintFrom(null)).toThrow(TypeError);
			expect(() => NumberCast.bigintFrom(undefined)).toThrow(TypeError);
			expect(() => NumberCast.bigintFrom('invalid' as string)).toThrow(TypeError);
		});
	});

	describe('error handling', () => {
		it('throws on invalid bigint casting', () => {
			expect(() => NumberCast.bigintFrom('invalid')).toThrow(TypeError);
			expect(() => NumberCast.bigintFrom('12.3.4')).toThrow(TypeError);
			expect(() => NumberCast.bigintFrom('1e1000')).toThrow(TypeError);
		});
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new NumberCast();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
