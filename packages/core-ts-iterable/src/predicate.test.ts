import {describe, expect, it} from 'vitest';
import {IterPredicate} from './';

describe('IterPredicate', () => {
	describe('oneOf and notOneOf', () => {
		const arr = ['a', 'b', 'c'] as const;
		const containsA = IterPredicate.oneOf('a');
		const notContainsD = IterPredicate.notOneOf('d');

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
		const arr = ['a', 'b', 'c'] as const;
		const values1 = ['b', 'x'];
		const values2 = ['x', 'y'];

		const containsAny1 = IterPredicate.anyOf(values1);
		const containsAny2 = IterPredicate.anyOf(values2);
		const containsNone2 = IterPredicate.notAnyOf(values2);

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
		const arr = ['a', 'b', 'c'] as const;
		const values1 = ['a', 'b', 'c'];
		const values2 = ['a', 'b'];

		const containsAll1 = IterPredicate.allOf(values1);
		const containsAll2 = IterPredicate.allOf(values2);

		it('creates predicate function', () => {
			expect(containsAll1(arr)).toBe(true);
			expect(containsAll2(arr)).toBe(false);
		});
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new IterPredicate();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
