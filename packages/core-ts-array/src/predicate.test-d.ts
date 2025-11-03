import {describe, expectTypeOf, it} from 'vitest';
import {ArrayPredicate} from './predicate';

const arr: string[] = ['a', 'b', 'c'];

const constArr = ['a', 'b', 'c'] as const;

describe('Test ArrayPredicate function types', () => {
	describe('base compare type', () => {
		it('oneOf', () => {
			expectTypeOf(arr.filter(ArrayPredicate.oneOf('a' as const))).toEqualTypeOf<'a'[]>();
			expectTypeOf(constArr.filter(ArrayPredicate.oneOf('a' as const))).toEqualTypeOf<'a'[]>();
		});
		it('notOneOf', () => {
			expectTypeOf(arr.filter(ArrayPredicate.notOneOf('a' as const))).toEqualTypeOf<string[]>();
			expectTypeOf(constArr.filter(ArrayPredicate.notOneOf('a' as const))).toEqualTypeOf<('b' | 'c')[]>();
		});
		it('anyOf', () => {
			expectTypeOf(arr.filter(ArrayPredicate.anyOf(['a', 'b'] as const))).toEqualTypeOf<('a' | 'b')[]>();
			expectTypeOf(constArr.filter(ArrayPredicate.anyOf(['a', 'b'] as const))).toEqualTypeOf<('a' | 'b')[]>();
		});
		it('notAnyOf', () => {
			expectTypeOf(arr.filter(ArrayPredicate.notAnyOf(['a', 'b'] as const))).toEqualTypeOf<string[]>();
			expectTypeOf(constArr.filter(ArrayPredicate.notAnyOf(['a', 'b'] as const))).toEqualTypeOf<'c'[]>();
		});
	});
	describe('different compare type', () => {
		it('oneOf with not matching compare type', () => {
			expectTypeOf(arr.filter(ArrayPredicate.oneOf(1 as const))).toEqualTypeOf<never[]>();
			expectTypeOf(constArr.filter(ArrayPredicate.oneOf(1 as const))).toEqualTypeOf<never[]>();
		});
		it('notOneOf with not matching compare type', () => {
			expectTypeOf(arr.filter(ArrayPredicate.notOneOf(1 as const))).toEqualTypeOf<string[]>();
			expectTypeOf(constArr.filter(ArrayPredicate.notOneOf(1 as const))).toEqualTypeOf<('a' | 'b' | 'c')[]>();
		});
		it('anyOf with not matching compare type', () => {
			expectTypeOf(arr.filter(ArrayPredicate.anyOf([1, 2] as const))).toEqualTypeOf<never[]>();
			expectTypeOf(constArr.filter(ArrayPredicate.anyOf([1, 2] as const))).toEqualTypeOf<never[]>();
		});
		it('notAnyOf with not matching compare type', () => {
			expectTypeOf(arr.filter(ArrayPredicate.notAnyOf([1, 2] as const))).toEqualTypeOf<string[]>();
			expectTypeOf(constArr.filter(ArrayPredicate.notAnyOf([1, 2] as const))).toEqualTypeOf<('a' | 'b' | 'c')[]>();
		});
	});
});
