import {describe, expect, it} from 'vitest';
import {IterAssert} from './';

describe('IterAssert', () => {
	describe('assert', () => {
		it('passes for iterables', () => {
			expect(() => IterAssert.assert([1, 2, 3])).not.toThrow();
			expect(() => IterAssert.assert('abc')).not.toThrow();
			expect(() => IterAssert.assert(new Set([1, 2]))).not.toThrow();
		});

		it('throws for non-iterables', () => {
			expect(() => IterAssert.assert({})).toThrow(/expected an Iterable/);
			expect(() => IterAssert.assert(123)).toThrow(/expected an Iterable/);
			expect(() => IterAssert.assert(null)).toThrow(/expected an Iterable/);
		});
	});

	describe('assertNot', () => {
		it('passes for non-iterables', () => {
			expect(() => IterAssert.assertNot({})).not.toThrow();
			expect(() => IterAssert.assertNot(123)).not.toThrow();
			expect(() => IterAssert.assertNot(null)).not.toThrow();
		});

		it('throws for iterables', () => {
			expect(() => IterAssert.assertNot([1, 2, 3])).toThrow(/expected not an Iterable/);
			expect(() => IterAssert.assertNot('abc')).toThrow(/expected not an Iterable/);
			expect(() => IterAssert.assertNot(new Set([1, 2]))).toThrow(/expected not an Iterable/);
		});
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new IterAssert();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
