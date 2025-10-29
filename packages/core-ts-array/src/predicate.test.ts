import {describe, expect, it} from 'vitest';
import {ArrayPredicate} from './';

describe('ArrayPredicate', () => {
	describe('oneOf and notOneOf', () => {
		const arr: string[] = ['a', 'b', 'c'];
		const containsA = ArrayPredicate.oneOf('a');
		const notContainsD = ArrayPredicate.notOneOf('d');

		it('oneOf creates predicate function', () => {
			expect(containsA(arr)).toBe(true);
			expect(containsA(['x', 'y'])).toBe(false);
		});

		it('notOneOf creates predicate function', () => {
			expect(notContainsD(arr)).toBe(true);
			expect(notContainsD(['d', 'e'])).toBe(false);
		});
	});

	describe('anyOf and notAnyOf', () => {
		const arr: string[] = ['a', 'b', 'c'];
		const values1: string[] = ['b', 'x'];
		const values2: string[] = ['x', 'y'];

		const containsAny1 = ArrayPredicate.anyOf(values1);
		const containsAny2 = ArrayPredicate.anyOf(values2);
		const containsNone2 = ArrayPredicate.notAnyOf(values2);

		it('anyOf creates predicate function', () => {
			expect(containsAny1(arr)).toBe(true);
			expect(containsAny2(arr)).toBe(false);
		});

		it('notAnyOf creates predicate function', () => {
			expect(containsNone2(arr)).toBe(true);
			expect(containsNone2(['x', 'y'])).toBe(false);
		});
	});

	describe('allOf', () => {
		const arr: string[] = ['a', 'b', 'c'];
		const values1: string[] = ['a', 'b', 'c'];
		const values2: string[] = ['a', 'b'];

		const containsAll1 = ArrayPredicate.allOf(values1);
		const containsAll2 = ArrayPredicate.allOf(values2);

		it('creates predicate function', () => {
			expect(containsAll1(arr)).toBe(true);
			expect(containsAll2(arr)).toBe(false);
		});
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new ArrayPredicate();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
