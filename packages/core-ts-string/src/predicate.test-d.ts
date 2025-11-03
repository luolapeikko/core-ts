import {describe, expectTypeOf, it} from 'vitest';
import {StringPredicate} from './predicate';

const arr: string[] = ['apple', 'banana', 'apricot'];

describe('Test StringPredicate function types', () => {
	it('startsWith', () => {
		expectTypeOf(arr.filter(StringPredicate.startsWith('a'))).toEqualTypeOf<`a${string}`[]>();
	});
	it('endsWith', () => {
		expectTypeOf(arr.filter(StringPredicate.endsWith('a'))).toEqualTypeOf<`${string}a`[]>();
	});
});
