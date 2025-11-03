import {describe, expectTypeOf, it} from 'vitest';
import {IterPredicate} from './predicate';

const arr: string[] = ['a', 'b', 'c'];

const constArr = ['a', 'b', 'c'] as const;

describe('Test IterPredicate function types', () => {
	describe('base compare type', () => {
		it('oneOf', () => {
			expectTypeOf(arr.filter(IterPredicate.oneOf('a' as const))).toEqualTypeOf<'a'[]>();
			expectTypeOf(constArr.filter(IterPredicate.oneOf('a' as const))).toEqualTypeOf<'a'[]>();
		});
		it('notOneOf', () => {
			expectTypeOf(arr.filter(IterPredicate.notOneOf('a' as const))).toEqualTypeOf<string[]>();
			expectTypeOf(constArr.filter(IterPredicate.notOneOf('a' as const))).toEqualTypeOf<('b' | 'c')[]>();
		});
		it('anyOf', () => {
			expectTypeOf(arr.filter(IterPredicate.anyOf(['a', 'b'] as const))).toEqualTypeOf<('a' | 'b')[]>();
			expectTypeOf(constArr.filter(IterPredicate.anyOf(['a', 'b'] as const))).toEqualTypeOf<('a' | 'b')[]>();
		});
		it('notAnyOf', () => {
			expectTypeOf(arr.filter(IterPredicate.notAnyOf(['a', 'b'] as const))).toEqualTypeOf<string[]>();
			expectTypeOf(constArr.filter(IterPredicate.notAnyOf(['a', 'b'] as const))).toEqualTypeOf<'c'[]>();
		});
	});
	describe('different compare type', () => {
		it('oneOf with not matching compare type', () => {
			expectTypeOf(arr.filter(IterPredicate.oneOf(1 as const))).toEqualTypeOf<never[]>();
			expectTypeOf(constArr.filter(IterPredicate.oneOf(1 as const))).toEqualTypeOf<never[]>();
		});
		it('notOneOf with not matching compare type', () => {
			expectTypeOf(arr.filter(IterPredicate.notOneOf(1 as const))).toEqualTypeOf<string[]>();
			expectTypeOf(constArr.filter(IterPredicate.notOneOf(1 as const))).toEqualTypeOf<('a' | 'b' | 'c')[]>();
		});
		it('anyOf with not matching compare type', () => {
			expectTypeOf(arr.filter(IterPredicate.anyOf([1, 2] as const))).toEqualTypeOf<never[]>();
			expectTypeOf(constArr.filter(IterPredicate.anyOf([1, 2] as const))).toEqualTypeOf<never[]>();
		});
		it('notAnyOf with not matching compare type', () => {
			expectTypeOf(arr.filter(IterPredicate.notAnyOf([1, 2] as const))).toEqualTypeOf<string[]>();
			expectTypeOf(constArr.filter(IterPredicate.notAnyOf([1, 2] as const))).toEqualTypeOf<('a' | 'b' | 'c')[]>();
		});
	});
});
