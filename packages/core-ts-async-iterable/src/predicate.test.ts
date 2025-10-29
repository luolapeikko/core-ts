import {describe, expect, it} from 'vitest';
import {AsyncIterPredicate} from './';

describe('AsyncIterPredicate', () => {
	const createAsyncIterable = <T>(items: T[]) => {
		return {
			async *[Symbol.asyncIterator]() {
				for (const item of items) {
					yield item;
				}
			},
		};
	};

	describe('oneOf and notOneOf', () => {
		const arr = createAsyncIterable(['a', 'b', 'c']);
		const containsA = AsyncIterPredicate.oneOf('a');
		const notContainsD = AsyncIterPredicate.notOneOf('d');

		it('oneOf creates async predicate function', async () => {
			expect(await containsA(arr)).toBe(true);
			expect(await containsA(createAsyncIterable(['x', 'y']))).toBe(false);
		});

		it('notOneOf creates async predicate function', async () => {
			expect(await notContainsD(arr)).toBe(true);
			expect(await notContainsD(createAsyncIterable(['d', 'e']))).toBe(false);
		});
	});

	describe('anyOf and notAnyOf', () => {
		const arr = createAsyncIterable(['a', 'b', 'c']);
		const values1 = ['b', 'x'];
		const values2 = ['x', 'y'];

		const containsAny1 = AsyncIterPredicate.anyOf(values1);
		const containsAny2 = AsyncIterPredicate.anyOf(values2);
		const containsNone2 = AsyncIterPredicate.notAnyOf(values2);

		it('anyOf creates async predicate function', async () => {
			expect(await containsAny1(arr)).toBe(true);
			expect(await containsAny2(arr)).toBe(false);
		});

		it('notAnyOf creates async predicate function', async () => {
			expect(await containsNone2(arr)).toBe(true);
			expect(await containsNone2(createAsyncIterable(['x', 'y']))).toBe(false);
		});
	});

	describe('allOf', () => {
		const arr = createAsyncIterable(['a', 'b', 'c']);
		const values1 = ['a', 'b', 'c'];
		const values2 = ['a', 'b'];

		const containsAll1 = AsyncIterPredicate.allOf(values1);
		const containsAll2 = AsyncIterPredicate.allOf(values2);

		it('creates async predicate function', async () => {
			expect(await containsAll1(arr)).toBe(true);
			expect(await containsAll2(arr)).toBe(false);
		});
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new AsyncIterPredicate();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
