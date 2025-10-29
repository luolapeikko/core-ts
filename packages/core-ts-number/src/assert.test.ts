import {describe, expect, it} from 'vitest';
import {NumberAssert} from './';

describe('NumberAssert', () => {
	describe('assertNumber and assertNotNumber', () => {
		it('passes for valid numbers', () => {
			expect(() => NumberAssert.assertNumber(123)).not.toThrow();
			expect(() => NumberAssert.assertNumber(-123.456)).not.toThrow();
			expect(() => NumberAssert.assertNumber(0)).not.toThrow();
		});

		it('throws for invalid numbers', () => {
			expect(() => NumberAssert.assertNumber('123')).toThrow(TypeError);
			expect(() => NumberAssert.assertNumber(null)).toThrow(TypeError);
			expect(() => NumberAssert.assertNumber(NaN)).toThrow(TypeError);
		});

		it('passes assertNotNumber for non-numbers', () => {
			expect(() => NumberAssert.assertNotNumber('123')).not.toThrow();
			expect(() => NumberAssert.assertNotNumber(null)).not.toThrow();
			expect(() => NumberAssert.assertNotNumber(NaN)).not.toThrow();
		});

		it('throws assertNotNumber for numbers', () => {
			expect(() => NumberAssert.assertNotNumber(123)).toThrow(TypeError);
			expect(() => NumberAssert.assertNotNumber(-123.456)).toThrow(TypeError);
			expect(() => NumberAssert.assertNotNumber(0)).toThrow(TypeError);
		});
	});

	describe('assertInt and assertNotInt', () => {
		it('passes for valid integers', () => {
			expect(() => NumberAssert.assertInt(123)).not.toThrow();
			expect(() => NumberAssert.assertInt(-123)).not.toThrow();
			expect(() => NumberAssert.assertInt(0)).not.toThrow();
		});

		it('throws for non-integers', () => {
			expect(() => NumberAssert.assertInt(123.456)).toThrow(TypeError);
			expect(() => NumberAssert.assertInt('123')).toThrow(TypeError);
			expect(() => NumberAssert.assertInt(NaN)).toThrow(TypeError);
		});

		it('passes assertNotInt for non-integers', () => {
			expect(() => NumberAssert.assertNotInt(123.456)).not.toThrow();
			expect(() => NumberAssert.assertNotInt('123')).not.toThrow();
			expect(() => NumberAssert.assertNotInt(NaN)).not.toThrow();
		});

		it('throws assertNotInt for integers', () => {
			expect(() => NumberAssert.assertNotInt(123)).toThrow(TypeError);
			expect(() => NumberAssert.assertNotInt(-123)).toThrow(TypeError);
			expect(() => NumberAssert.assertNotInt(0)).toThrow(TypeError);
		});
	});

	describe('assertFloat and assertNotFloat', () => {
		it('passes for valid floats', () => {
			expect(() => NumberAssert.assertFloat(123.456)).not.toThrow();
			expect(() => NumberAssert.assertFloat(-123.456)).not.toThrow();
			expect(() => NumberAssert.assertFloat(0.1)).not.toThrow();
		});

		it('throws for non-floats', () => {
			expect(() => NumberAssert.assertFloat(123)).toThrow(TypeError);
			expect(() => NumberAssert.assertFloat('123.456')).toThrow(TypeError);
			expect(() => NumberAssert.assertFloat(NaN)).toThrow(TypeError);
		});

		it('passes assertNotFloat for non-floats', () => {
			expect(() => NumberAssert.assertNotFloat(123)).not.toThrow();
			expect(() => NumberAssert.assertNotFloat('123.456')).not.toThrow();
			expect(() => NumberAssert.assertNotFloat(NaN)).not.toThrow();
		});

		it('throws assertNotFloat for floats', () => {
			expect(() => NumberAssert.assertNotFloat(123.456)).toThrow(TypeError);
			expect(() => NumberAssert.assertNotFloat(-123.456)).toThrow(TypeError);
			expect(() => NumberAssert.assertNotFloat(0.1)).toThrow(TypeError);
		});
	});

	describe('assertBigInt and assertNotBigInt', () => {
		it('passes for valid bigints', () => {
			expect(() => NumberAssert.assertBigInt(123n)).not.toThrow();
			expect(() => NumberAssert.assertBigInt(-123n)).not.toThrow();
			expect(() => NumberAssert.assertBigInt(0n)).not.toThrow();
		});

		it('throws for non-bigints', () => {
			expect(() => NumberAssert.assertBigInt(123)).toThrow(TypeError);
			expect(() => NumberAssert.assertBigInt('123')).toThrow(TypeError);
			expect(() => NumberAssert.assertBigInt(null)).toThrow(TypeError);
		});

		it('passes assertNotBigInt for non-bigints', () => {
			expect(() => NumberAssert.assertNotBigInt(123)).not.toThrow();
			expect(() => NumberAssert.assertNotBigInt('123')).not.toThrow();
			expect(() => NumberAssert.assertNotBigInt(null)).not.toThrow();
		});

		it('throws assertNotBigInt for bigints', () => {
			expect(() => NumberAssert.assertNotBigInt(123n)).toThrow(TypeError);
			expect(() => NumberAssert.assertNotBigInt(-123n)).toThrow(TypeError);
			expect(() => NumberAssert.assertNotBigInt(0n)).toThrow(TypeError);
		});
	});

	describe('assertFinite and assertNotFinite', () => {
		it('passes for finite numbers', () => {
			expect(() => NumberAssert.assertFinite(123)).not.toThrow();
			expect(() => NumberAssert.assertFinite(-123.456)).not.toThrow();
			expect(() => NumberAssert.assertFinite(0)).not.toThrow();
		});

		it('throws for non-finite numbers', () => {
			expect(() => NumberAssert.assertFinite(Infinity)).toThrow(TypeError);
			expect(() => NumberAssert.assertFinite(-Infinity)).toThrow(TypeError);
			expect(() => NumberAssert.assertFinite(NaN)).toThrow(TypeError);
			expect(() => NumberAssert.assertFinite('123')).toThrow(TypeError);
		});

		it('passes assertNotFinite for non-finite numbers', () => {
			expect(() => NumberAssert.assertNotFinite(Infinity)).not.toThrow();
			expect(() => NumberAssert.assertNotFinite(-Infinity)).not.toThrow();
			expect(() => NumberAssert.assertNotFinite(NaN)).not.toThrow();
			expect(() => NumberAssert.assertNotFinite('123')).not.toThrow();
		});

		it('throws assertNotFinite for finite numbers', () => {
			expect(() => NumberAssert.assertNotFinite(123)).toThrow(TypeError);
			expect(() => NumberAssert.assertNotFinite(-123.456)).toThrow(TypeError);
			expect(() => NumberAssert.assertNotFinite(0)).toThrow(TypeError);
		});
	});

	describe('assertSafeInteger and assertNotSafeInteger', () => {
		it('passes for safe integers', () => {
			expect(() => NumberAssert.assertSafeInteger(123)).not.toThrow();
			expect(() => NumberAssert.assertSafeInteger(-123)).not.toThrow();
			expect(() => NumberAssert.assertSafeInteger(Number.MAX_SAFE_INTEGER)).not.toThrow();
			expect(() => NumberAssert.assertSafeInteger(Number.MIN_SAFE_INTEGER)).not.toThrow();
		});

		it('throws for unsafe integers', () => {
			expect(() => NumberAssert.assertSafeInteger(123.456)).toThrow(TypeError);
			expect(() => NumberAssert.assertSafeInteger(Number.MAX_SAFE_INTEGER + 1)).toThrow(TypeError);
			expect(() => NumberAssert.assertSafeInteger(Number.MIN_SAFE_INTEGER - 1)).toThrow(TypeError);
			expect(() => NumberAssert.assertSafeInteger('123')).toThrow(TypeError);
		});

		it('passes assertNotSafeInteger for unsafe integers', () => {
			expect(() => NumberAssert.assertNotSafeInteger(123.456)).not.toThrow();
			expect(() => NumberAssert.assertNotSafeInteger(Number.MAX_SAFE_INTEGER + 1)).not.toThrow();
			expect(() => NumberAssert.assertNotSafeInteger(Number.MIN_SAFE_INTEGER - 1)).not.toThrow();
			expect(() => NumberAssert.assertNotSafeInteger('123')).not.toThrow();
		});

		it('throws assertNotSafeInteger for safe integers', () => {
			expect(() => NumberAssert.assertNotSafeInteger(123)).toThrow(TypeError);
			expect(() => NumberAssert.assertNotSafeInteger(-123)).toThrow(TypeError);
			expect(() => NumberAssert.assertNotSafeInteger(Number.MAX_SAFE_INTEGER)).toThrow(TypeError);
			expect(() => NumberAssert.assertNotSafeInteger(Number.MIN_SAFE_INTEGER)).toThrow(TypeError);
		});
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new NumberAssert();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
