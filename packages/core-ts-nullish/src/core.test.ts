import {describe, expect, it} from 'vitest';
import {NullishCore} from './';

describe('NullishCore', () => {
	describe('isUndefined', () => {
		it('returns true for undefined', () => {
			expect(NullishCore.isUndefined(undefined)).toBe(true);
		});

		it('returns false for other values', () => {
			expect(NullishCore.isUndefined(null)).toBe(false);
			expect(NullishCore.isUndefined('')).toBe(false);
			expect(NullishCore.isUndefined(0)).toBe(false);
			expect(NullishCore.isUndefined(false)).toBe(false);
			expect(NullishCore.isUndefined({})).toBe(false);
		});
	});

	describe('isNotUndefined', () => {
		it('returns false for undefined', () => {
			expect(NullishCore.isNotUndefined(undefined)).toBe(false);
		});

		it('returns true for other values', () => {
			expect(NullishCore.isNotUndefined(null)).toBe(true);
			expect(NullishCore.isNotUndefined('')).toBe(true);
			expect(NullishCore.isNotUndefined(0)).toBe(true);
			expect(NullishCore.isNotUndefined(false)).toBe(true);
			expect(NullishCore.isNotUndefined({})).toBe(true);
		});
	});

	describe('isNull', () => {
		it('returns true for null', () => {
			expect(NullishCore.isNull(null)).toBe(true);
		});

		it('returns false for other values', () => {
			expect(NullishCore.isNull(undefined)).toBe(false);
			expect(NullishCore.isNull('')).toBe(false);
			expect(NullishCore.isNull(0)).toBe(false);
			expect(NullishCore.isNull(false)).toBe(false);
			expect(NullishCore.isNull({})).toBe(false);
		});
	});

	describe('isNotNull', () => {
		it('returns false for null', () => {
			expect(NullishCore.isNotNull(null)).toBe(false);
		});

		it('returns true for other values', () => {
			expect(NullishCore.isNotNull(undefined)).toBe(true);
			expect(NullishCore.isNotNull('')).toBe(true);
			expect(NullishCore.isNotNull(0)).toBe(true);
			expect(NullishCore.isNotNull(false)).toBe(true);
			expect(NullishCore.isNotNull({})).toBe(true);
		});
	});

	describe('isNullish', () => {
		it('returns true for null and undefined', () => {
			expect(NullishCore.isNullish(null)).toBe(true);
			expect(NullishCore.isNullish(undefined)).toBe(true);
		});

		it('returns false for other values', () => {
			expect(NullishCore.isNullish('')).toBe(false);
			expect(NullishCore.isNullish(0)).toBe(false);
			expect(NullishCore.isNullish(false)).toBe(false);
			expect(NullishCore.isNullish({})).toBe(false);
		});
	});

	describe('isNotNullish', () => {
		it('returns false for null and undefined', () => {
			expect(NullishCore.isNotNullish(null)).toBe(false);
			expect(NullishCore.isNotNullish(undefined)).toBe(false);
		});

		it('returns true for other values', () => {
			expect(NullishCore.isNotNullish('')).toBe(true);
			expect(NullishCore.isNotNullish(0)).toBe(true);
			expect(NullishCore.isNotNullish(false)).toBe(true);
			expect(NullishCore.isNotNullish({})).toBe(true);
		});
	});

	describe('buildValueErr', () => {
		it('builds TypeError for undefined checks', () => {
			const err = NullishCore.buildValueErr('test', 'Undefined');
			expect(err).toBeInstanceOf(TypeError);
			expect(err.message).toContain('expected an Undefined');
			expect(err.message).toContain('got "test"');
		});

		it('builds TypeError for null checks', () => {
			const err = NullishCore.buildValueErr('test', 'Null');
			expect(err).toBeInstanceOf(TypeError);
			expect(err.message).toContain('expected a Null');
			expect(err.message).toContain('got "test"');
		});

		it('builds TypeError for nullish checks', () => {
			const err = NullishCore.buildValueErr('test', 'Nullish');
			expect(err).toBeInstanceOf(TypeError);
			expect(err.message).toContain('expected a Nullish');
			expect(err.message).toContain('got "test"');
		});

		it('includes "not" in message when isNot=true', () => {
			const err = NullishCore.buildValueErr(null, 'Null', true);
			expect(err.message).toContain('expected not a Null');
			expect(err.message).toContain('got null');
		});
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new NullishCore();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
