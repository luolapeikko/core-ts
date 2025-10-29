import {describe, expect, it} from 'vitest';
import {NumberCore} from './';

describe('NumberCore', () => {
	describe('isNumber and isNotNumber', () => {
		it('identifies valid numbers', () => {
			expect(NumberCore.isNumber(123)).toBe(true);
			expect(NumberCore.isNumber(-123.456)).toBe(true);
			expect(NumberCore.isNumber(0)).toBe(true);
			expect(NumberCore.isNumber(Number.MAX_VALUE)).toBe(true);
			expect(NumberCore.isNumber(Number.MIN_VALUE)).toBe(true);
		});

		it('rejects invalid numbers', () => {
			expect(NumberCore.isNumber(NaN)).toBe(false);
			expect(NumberCore.isNumber('123')).toBe(false);
			expect(NumberCore.isNumber(null)).toBe(false);
			expect(NumberCore.isNumber(undefined)).toBe(false);
			expect(NumberCore.isNumber({})).toBe(false);
			expect(NumberCore.isNumber([])).toBe(false);
		});

		it('properly negates with isNotNumber', () => {
			expect(NumberCore.isNotNumber(123)).toBe(false);
			expect(NumberCore.isNotNumber('123')).toBe(true);
			expect(NumberCore.isNotNumber(NaN)).toBe(true);
		});
	});

	describe('isInt and isNotInt', () => {
		it('identifies integers', () => {
			expect(NumberCore.isInt(123)).toBe(true);
			expect(NumberCore.isInt(-123)).toBe(true);
			expect(NumberCore.isInt(0)).toBe(true);
		});

		it('rejects non-integers', () => {
			expect(NumberCore.isInt(123.456)).toBe(false);
			expect(NumberCore.isInt(-123.456)).toBe(false);
			expect(NumberCore.isInt(NaN)).toBe(false);
			expect(NumberCore.isInt('123')).toBe(false);
		});

		it('properly negates with isNotInt', () => {
			expect(NumberCore.isNotInt(123.456)).toBe(true);
			expect(NumberCore.isNotInt(123)).toBe(false);
			expect(NumberCore.isNotInt('123')).toBe(true);
		});
	});

	describe('isFloat and isNotFloat', () => {
		it('identifies floats', () => {
			expect(NumberCore.isFloat(123.456)).toBe(true);
			expect(NumberCore.isFloat(-123.456)).toBe(true);
			expect(NumberCore.isFloat(0.1)).toBe(true);
		});

		it('rejects non-floats', () => {
			expect(NumberCore.isFloat(123)).toBe(false);
			expect(NumberCore.isFloat(-123)).toBe(false);
			expect(NumberCore.isFloat(NaN)).toBe(false);
			expect(NumberCore.isFloat('123.456')).toBe(false);
		});

		it('properly negates with isNotFloat', () => {
			expect(NumberCore.isNotFloat(123)).toBe(true);
			expect(NumberCore.isNotFloat(123.456)).toBe(false);
			expect(NumberCore.isNotFloat('123.456')).toBe(true);
		});
	});

	describe('isBigInt and isNotBigInt', () => {
		it('identifies bigints', () => {
			expect(NumberCore.isBigInt(123n)).toBe(true);
			expect(NumberCore.isBigInt(-123n)).toBe(true);
			expect(NumberCore.isBigInt(0n)).toBe(true);
		});

		it('rejects non-bigints', () => {
			expect(NumberCore.isBigInt(123)).toBe(false);
			expect(NumberCore.isBigInt('123')).toBe(false);
			expect(NumberCore.isBigInt(null)).toBe(false);
		});

		it('properly negates with isNotBigInt', () => {
			expect(NumberCore.isNotBigInt(123)).toBe(true);
			expect(NumberCore.isNotBigInt(123n)).toBe(false);
			expect(NumberCore.isNotBigInt('123')).toBe(true);
		});
	});

	describe('isFinite and isNotFinite', () => {
		it('identifies finite numbers', () => {
			expect(NumberCore.isFinite(123)).toBe(true);
			expect(NumberCore.isFinite(-123.456)).toBe(true);
			expect(NumberCore.isFinite(0)).toBe(true);
		});

		it('rejects non-finite numbers', () => {
			expect(NumberCore.isFinite(Infinity)).toBe(false);
			expect(NumberCore.isFinite(-Infinity)).toBe(false);
			expect(NumberCore.isFinite(NaN)).toBe(false);
			expect(NumberCore.isFinite('123')).toBe(false);
		});

		it('properly negates with isNotFinite', () => {
			expect(NumberCore.isNotFinite(Infinity)).toBe(true);
			expect(NumberCore.isNotFinite(123)).toBe(false);
			expect(NumberCore.isNotFinite('123')).toBe(true);
		});
	});

	describe('isSafeInteger and isNotSafeInteger', () => {
		it('identifies safe integers', () => {
			expect(NumberCore.isSafeInteger(123)).toBe(true);
			expect(NumberCore.isSafeInteger(-123)).toBe(true);
			expect(NumberCore.isSafeInteger(0)).toBe(true);
			expect(NumberCore.isSafeInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
			expect(NumberCore.isSafeInteger(Number.MIN_SAFE_INTEGER)).toBe(true);
		});

		it('rejects unsafe integers', () => {
			expect(NumberCore.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
			expect(NumberCore.isSafeInteger(Number.MIN_SAFE_INTEGER - 1)).toBe(false);
			expect(NumberCore.isSafeInteger(123.456)).toBe(false);
			expect(NumberCore.isSafeInteger(NaN)).toBe(false);
			expect(NumberCore.isSafeInteger('123')).toBe(false);
		});

		it('properly negates with isNotSafeInteger', () => {
			expect(NumberCore.isNotSafeInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(true);
			expect(NumberCore.isNotSafeInteger(123)).toBe(false);
			expect(NumberCore.isNotSafeInteger('123')).toBe(true);
		});
	});

	describe('buildValueErr', () => {
		it('builds error for Number type', () => {
			const err = NumberCore.buildValueErr('not a number');
			expect(err).toBeInstanceOf(TypeError);
			expect(err.message).toContain('Number');
		});

		it('builds error for Integer type', () => {
			const err = NumberCore.buildValueErr(123.456, 'Integer');
			expect(err).toBeInstanceOf(TypeError);
			expect(err.message).toContain('Integer');
		});

		it('builds error for BigInt type', () => {
			const err = NumberCore.buildValueErr(123, 'BigInt');
			expect(err).toBeInstanceOf(TypeError);
			expect(err.message).toContain('BigInt');
		});

		it('builds negated errors', () => {
			const err = NumberCore.buildValueErr(123, 'Number', true);
			expect(err).toBeInstanceOf(TypeError);
			expect(err.message).toContain('not a Number');
		});
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new NumberCore();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
