import {describe, expect, it} from 'vitest';
import {ArrayAssert} from './';

describe('ArrayAssert', () => {
	describe('assert', () => {
		it('passes for arrays', () => {
			expect(() => ArrayAssert.assert([1, 2, 3])).not.toThrow();
		});

		it('throws for non-arrays', () => {
			expect(() => ArrayAssert.assert({})).toThrow(/expected an Array/);
			expect(() => ArrayAssert.assert(123)).toThrow(/expected an Array/);
			expect(() => ArrayAssert.assert(null)).toThrow(/expected an Array/);
		});
	});

	describe('assertNot', () => {
		it('passes for non-arrays', () => {
			expect(() => ArrayAssert.assertNot({})).not.toThrow();
			expect(() => ArrayAssert.assertNot(123)).not.toThrow();
			expect(() => ArrayAssert.assertNot(null)).not.toThrow();
		});

		it('throws for arrays', () => {
			expect(() => ArrayAssert.assertNot([1, 2, 3])).toThrow(/expected not an Array/);
		});
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new ArrayAssert();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
