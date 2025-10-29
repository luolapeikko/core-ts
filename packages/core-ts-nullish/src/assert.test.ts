import {describe, expect, it} from 'vitest';
import {NullishAssert} from './';

describe('NullishAssert', () => {
	describe('assertUndefined', () => {
		it('passes for undefined', () => {
			expect(() => NullishAssert.assertUndefined(undefined)).not.toThrow();
		});

		it('throws for other values', () => {
			expect(() => NullishAssert.assertUndefined(null)).toThrow(/expected an Undefined/);
			expect(() => NullishAssert.assertUndefined('')).toThrow(/expected an Undefined/);
			expect(() => NullishAssert.assertUndefined(0)).toThrow(/expected an Undefined/);
			expect(() => NullishAssert.assertUndefined(false)).toThrow(/expected an Undefined/);
		});
	});

	describe('assertNotUndefined', () => {
		it('passes for non-undefined values', () => {
			expect(() => NullishAssert.assertNotUndefined(null)).not.toThrow();
			expect(() => NullishAssert.assertNotUndefined('')).not.toThrow();
			expect(() => NullishAssert.assertNotUndefined(0)).not.toThrow();
			expect(() => NullishAssert.assertNotUndefined(false)).not.toThrow();
			expect(() => NullishAssert.assertNotUndefined({})).not.toThrow();
		});

		it('throws for undefined', () => {
			expect(() => NullishAssert.assertNotUndefined(undefined)).toThrow(/expected not an Undefined/);
		});
	});

	describe('assertNull', () => {
		it('passes for null', () => {
			expect(() => NullishAssert.assertNull(null)).not.toThrow();
		});

		it('throws for other values', () => {
			expect(() => NullishAssert.assertNull(undefined)).toThrow(/expected a Null/);
			expect(() => NullishAssert.assertNull('')).toThrow(/expected a Null/);
			expect(() => NullishAssert.assertNull(0)).toThrow(/expected a Null/);
			expect(() => NullishAssert.assertNull(false)).toThrow(/expected a Null/);
		});
	});

	describe('assertNotNull', () => {
		it('passes for non-null values', () => {
			expect(() => NullishAssert.assertNotNull(undefined)).not.toThrow();
			expect(() => NullishAssert.assertNotNull('')).not.toThrow();
			expect(() => NullishAssert.assertNotNull(0)).not.toThrow();
			expect(() => NullishAssert.assertNotNull(false)).not.toThrow();
			expect(() => NullishAssert.assertNotNull({})).not.toThrow();
		});

		it('throws for null', () => {
			expect(() => NullishAssert.assertNotNull(null)).toThrow(/expected not a Null/);
		});
	});

	describe('assertNullish', () => {
		it('passes for null and undefined', () => {
			expect(() => NullishAssert.assertNullish(null)).not.toThrow();
			expect(() => NullishAssert.assertNullish(undefined)).not.toThrow();
		});

		it('throws for other values', () => {
			expect(() => NullishAssert.assertNullish('')).toThrow(/expected a Nullish/);
			expect(() => NullishAssert.assertNullish(0)).toThrow(/expected a Nullish/);
			expect(() => NullishAssert.assertNullish(false)).toThrow(/expected a Nullish/);
		});
	});

	describe('assertNotNullish', () => {
		it('passes for non-nullish values', () => {
			expect(() => NullishAssert.assertNotNullish('')).not.toThrow();
			expect(() => NullishAssert.assertNotNullish(0)).not.toThrow();
			expect(() => NullishAssert.assertNotNullish(false)).not.toThrow();
			expect(() => NullishAssert.assertNotNullish({})).not.toThrow();
		});

		it('throws for null and undefined', () => {
			expect(() => NullishAssert.assertNotNullish(null)).toThrow(/expected not a Nullish/);
			expect(() => NullishAssert.assertNotNullish(undefined)).toThrow(/expected not a Nullish/);
		});
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new NullishAssert();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
