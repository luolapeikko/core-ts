import {describe, expect, it} from 'vitest';
import {ArrayCore} from './';

describe('ArrayCore', () => {
	it('is detects arrays', () => {
		expect(ArrayCore.is([1, 2, 3])).toBe(true);
		expect(ArrayCore.is('abc')).toBe(false);
		expect(ArrayCore.is(new Set([1, 2]))).toBe(false);
		expect(ArrayCore.is({})).toBe(false);
		expect(ArrayCore.is(123)).toBe(false);
		expect(ArrayCore.is(null)).toBe(false);
	});

	it('isNot detects non-arrays', () => {
		expect(ArrayCore.isNot([1, 2, 3])).toBe(false);
		expect(ArrayCore.isNot('abc')).toBe(true);
		expect(ArrayCore.isNot({})).toBe(true);
		expect(ArrayCore.isNot(123)).toBe(true);
		expect(ArrayCore.isNot(null)).toBe(true);
	});

	it('oneOf and notOneOf', () => {
		const arr = ['a', 'b', 'c'] as const;
		expect(ArrayCore.oneOf(arr, 'a')).toBe(true);
		expect(ArrayCore.oneOf(arr, 'd')).toBe(false);
		expect(ArrayCore.notOneOf(arr, 'a')).toBe(false);
		expect(ArrayCore.notOneOf(arr, 'd')).toBe(true);
	});

	it('anyOf and notAnyOf', () => {
		const arr = ['a', 'b', 'c'] as const;
		const values1 = ['b', 'x'] as const;
		const values2 = ['x', 'y'] as const;
		expect(ArrayCore.anyOf(arr, values1)).toBe(true);
		expect(ArrayCore.anyOf(arr, values2)).toBe(false);
		expect(ArrayCore.notAnyOf(arr, values1)).toBe(false);
		expect(ArrayCore.notAnyOf(arr, values2)).toBe(true);
	});

	it('allOf', () => {
		const arr = ['a', 'b', 'c'] as const;
		const values1 = ['a', 'b', 'c'] as const;
		const values2 = ['a', 'b'] as const;
		const values3 = ['a', 'b', 'c', 'd'] as const;
		expect(ArrayCore.allOf(arr, values1)).toBe(true);
		expect(ArrayCore.allOf(arr, values2)).toBe(false);
		expect(ArrayCore.allOf(arr, values3)).toBe(true);
	});

	it('negative checks', () => {
		const arr = ['a', 'b', 'c'] as const;
		const values = ['x', 'y'] as const;
		expect(ArrayCore.notOneOf(arr, 'a')).toBe(false);
		expect(ArrayCore.notOneOf(arr, 'x')).toBe(true);
		expect(ArrayCore.notAnyOf(arr, values)).toBe(true);
	});

	it('error builder', () => {
		const err = ArrayCore.buildValueErr(123);
		expect(err).toBeInstanceOf(TypeError);
		expect(err.message).toContain('Invalid value');
		const errNot = ArrayCore.buildValueErr([], true);
		expect(errNot).toBeInstanceOf(TypeError);
		expect(errNot.message).toContain('Invalid value');
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new ArrayCore();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
