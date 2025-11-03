import {describe, expect, it} from 'vitest';
import {IterPredicate} from './';

const arr: string[] = ['a', 'b', 'c'];

describe('IterPredicate', () => {
	describe('oneOf and notOneOf', () => {
		it('oneOf creates predicate function', () => {
			const data = arr.filter(IterPredicate.oneOf('a' as const));
			expect(arr.filter(IterPredicate.oneOf('a'))).toEqual(['a']);
			expect(arr.filter(IterPredicate.oneOf('z'))).toEqual([]);
		});

		it('notOneOf creates predicate function', () => {
			expect(arr.filter(IterPredicate.notOneOf('a'))).toEqual(['b', 'c']);
			expect(arr.filter(IterPredicate.notOneOf('z'))).toEqual(['a', 'b', 'c']);
		});
	});

	describe('anyOf and notAnyOf', () => {
		it('anyOf creates predicate function', () => {
			expect(arr.filter(IterPredicate.anyOf(['b', 'x']))).toEqual(['b']);
			expect(arr.filter(IterPredicate.anyOf(['y', 'x']))).toEqual([]);
		});

		it('notAnyOf creates predicate function', () => {
			expect(arr.filter(IterPredicate.notAnyOf(['b', 'x']))).toEqual(['a', 'c']);
			expect(arr.filter(IterPredicate.notAnyOf(['y', 'x']))).toEqual(['a', 'b', 'c']);
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
