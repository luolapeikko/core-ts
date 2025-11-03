import {describe, expect, it} from 'vitest';
import {AsyncIterCore, AsyncIterPredicate} from './';

function createAsyncIterable<T>(items: T[]) {
	return {
		async *[Symbol.asyncIterator]() {
			for (const item of items) {
				yield item;
			}
		},
	};
}

const data = createAsyncIterable(['a', 'b', 'c']);

describe('AsyncIterPredicate', () => {
	describe('oneOf and notOneOf', () => {
		it('oneOf creates async predicate function', async () => {
			expect(await AsyncIterCore.asArray(AsyncIterCore.filter(data, AsyncIterPredicate.oneOf('a')))).toEqual(['a']);
			expect(await AsyncIterCore.asArray(AsyncIterCore.filter(data, AsyncIterPredicate.oneOf('x')))).toEqual([]);
		});

		it('notOneOf creates async predicate function', async () => {
			expect(await AsyncIterCore.asArray(AsyncIterCore.filter(data, AsyncIterPredicate.notOneOf('a')))).toEqual(['b', 'c']);
			expect(await AsyncIterCore.asArray(AsyncIterCore.filter(data, AsyncIterPredicate.notOneOf('x')))).toEqual(['a', 'b', 'c']);
		});
	});

	describe('anyOf and notAnyOf', () => {
		it('anyOf creates async predicate function', async () => {
			expect(await AsyncIterCore.asArray(AsyncIterCore.filter(data, AsyncIterPredicate.anyOf(['b', 'x'])))).toEqual(['b']);
			expect(await AsyncIterCore.asArray(AsyncIterCore.filter(data, AsyncIterPredicate.anyOf(['x', 'y'])))).toEqual([]);
		});

		it('notAnyOf creates async predicate function', async () => {
			expect(await AsyncIterCore.asArray(AsyncIterCore.filter(data, AsyncIterPredicate.notAnyOf(['b', 'x'])))).toEqual(['a', 'c']);
			expect(await AsyncIterCore.asArray(AsyncIterCore.filter(data, AsyncIterPredicate.notAnyOf(['x', 'y'])))).toEqual(['a', 'b', 'c']);
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
