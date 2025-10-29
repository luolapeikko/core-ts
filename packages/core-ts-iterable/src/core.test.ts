import {describe, expect, it} from 'vitest';
import {IterCore} from './';

describe('IterCore', () => {
	it('is detects iterables', () => {
		expect(IterCore.is([1, 2, 3])).toBe(true);
		expect(IterCore.is('abc')).toBe(true);
		expect(IterCore.is(new Set([1, 2]))).toBe(true);
		expect(IterCore.is({})).toBe(false);
		expect(IterCore.is(123)).toBe(false);
		expect(IterCore.is(null)).toBe(false);
	});

	it('isNot detects non-iterables', () => {
		expect(IterCore.isNot([1, 2, 3])).toBe(false);
		expect(IterCore.isNot('abc')).toBe(false);
		expect(IterCore.isNot({})).toBe(true);
		expect(IterCore.isNot(123)).toBe(true);
		expect(IterCore.isNot(null)).toBe(true);
	});

	it('oneOf and notOneOf', () => {
		const arr = ['a', 'b', 'c'] as const;
		expect(IterCore.oneOf(arr, 'a')).toBe(true);
		expect(IterCore.oneOf(arr, 'd')).toBe(false);
		expect(IterCore.notOneOf(arr, 'a')).toBe(false);
		expect(IterCore.notOneOf(arr, 'd')).toBe(true);
	});

	it('anyOf and notAnyOf', () => {
		const arr = ['a', 'b', 'c'] as const;
		const values1 = ['b', 'x'];
		const values2 = ['x', 'y'];
		expect(IterCore.anyOf(arr, values1)).toBe(true);
		expect(IterCore.anyOf(arr, values2)).toBe(false);
		expect(IterCore.notAnyOf(arr, values1)).toBe(false);
		expect(IterCore.notAnyOf(arr, values2)).toBe(true);
	});

	it('allOf', () => {
		const arr = ['a', 'b', 'c'] as const;
		const values1 = ['a', 'b', 'c'];
		const values2 = ['a', 'b'];
		const values3 = ['a', 'b', 'c', 'd'];
		expect(IterCore.allOf(arr, values1)).toBe(true);
		expect(IterCore.allOf(arr, values2)).toBe(false);
		expect(IterCore.allOf(arr, values3)).toBe(true);
	});

	it('negative checks', () => {
		const arr = ['a', 'b', 'c'] as const;
		const values = ['x', 'y'];
		expect(IterCore.notOneOf(arr, 'a')).toBe(false);
		expect(IterCore.notOneOf(arr, 'x')).toBe(true);
		expect(IterCore.notAnyOf(arr, values)).toBe(true);
	});

	it('error builder', () => {
		const err = IterCore.buildValueErr(123);
		expect(err).toBeInstanceOf(TypeError);
		expect(err.message).toContain('Invalid value');
		const errNot = IterCore.buildValueErr([], true);
		expect(errNot).toBeInstanceOf(TypeError);
		expect(errNot.message).toContain('Invalid value');
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new IterCore();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
