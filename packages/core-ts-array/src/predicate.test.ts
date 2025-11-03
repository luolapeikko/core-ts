import {describe, expect, it} from 'vitest';
import {ArrayPredicate} from './';

const arr: string[] = ['a', 'b', 'c'];

describe('ArrayPredicate', () => {
	describe('oneOf and notOneOf', () => {
		it('oneOf creates predicate function', () => {
			const data = arr.filter(ArrayPredicate.oneOf('a' as const));
			expect(arr.filter(ArrayPredicate.oneOf('a'))).toEqual(['a']);
			expect(arr.filter(ArrayPredicate.oneOf('z'))).toEqual([]);
		});

		it('notOneOf creates predicate function', () => {
			expect(arr.filter(ArrayPredicate.notOneOf('a'))).toEqual(['b', 'c']);
			expect(arr.filter(ArrayPredicate.notOneOf('z'))).toEqual(['a', 'b', 'c']);
		});
	});

	describe('anyOf and notAnyOf', () => {
		it('anyOf creates predicate function', () => {
			expect(arr.filter(ArrayPredicate.anyOf(['b', 'x']))).toEqual(['b']);
			expect(arr.filter(ArrayPredicate.anyOf(['y', 'x']))).toEqual([]);
		});

		it('notAnyOf creates predicate function', () => {
			expect(arr.filter(ArrayPredicate.notAnyOf(['b', 'x']))).toEqual(['a', 'c']);
			expect(arr.filter(ArrayPredicate.notAnyOf(['y', 'x']))).toEqual(['a', 'b', 'c']);
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
