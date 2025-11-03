import {describe, expect, it} from 'vitest';
import {AsyncIterCore, AsyncIterPredicate} from './';

async function* createAsyncIterable<T>(items: T[]): AsyncIterable<T> {
	for (const item of items) {
		yield item;
	}
}

describe('AsyncIterCore', () => {
	it('is detects async iterables', () => {
		const asyncIterable = createAsyncIterable([1, 2, 3]);
		expect(AsyncIterCore.is(asyncIterable)).toBe(true);
		expect(AsyncIterCore.is([1, 2, 3])).toBe(false);
		expect(AsyncIterCore.is('abc')).toBe(false);
		expect(AsyncIterCore.is({})).toBe(false);
		expect(AsyncIterCore.is(123)).toBe(false);
		expect(AsyncIterCore.is(null)).toBe(false);
	});

	it('isNot detects non-async iterables', () => {
		const asyncIterable = createAsyncIterable([1, 2, 3]);
		expect(AsyncIterCore.isNot(asyncIterable)).toBe(false);
		expect(AsyncIterCore.isNot([1, 2, 3])).toBe(true);
		expect(AsyncIterCore.isNot('abc')).toBe(true);
		expect(AsyncIterCore.isNot({})).toBe(true);
		expect(AsyncIterCore.isNot(123)).toBe(true);
		expect(AsyncIterCore.isNot(null)).toBe(true);
	});

	it('oneOf and notOneOf', async () => {
		expect(await AsyncIterCore.oneOf(createAsyncIterable(['a', 'b', 'c']), 'a')).toBe(true);
		expect(await AsyncIterCore.oneOf(createAsyncIterable(['a', 'b', 'c']), 'd')).toBe(false);
		expect(await AsyncIterCore.notOneOf(createAsyncIterable(['a', 'b', 'c']), 'a')).toBe(false);
		expect(await AsyncIterCore.notOneOf(createAsyncIterable(['a', 'b', 'c']), 'd')).toBe(true);

		// Also works with regular iterables
		const arr = ['a', 'b', 'c'];
		expect(await AsyncIterCore.oneOf(arr, 'a')).toBe(true);
		expect(await AsyncIterCore.oneOf(arr, 'd')).toBe(false);
		expect(await AsyncIterCore.notOneOf(arr, 'a')).toBe(false);
		expect(await AsyncIterCore.notOneOf(arr, 'd')).toBe(true);
	});

	it('anyOf and notAnyOf', async () => {
		const values1 = ['b', 'x'];
		const values2 = ['x', 'y'];

		expect(await AsyncIterCore.anyOf(createAsyncIterable(['a', 'b', 'c']), values1)).toBe(true);
		expect(await AsyncIterCore.anyOf(createAsyncIterable(['a', 'b', 'c']), values2)).toBe(false);
		expect(await AsyncIterCore.notAnyOf(createAsyncIterable(['a', 'b', 'c']), values1)).toBe(false);
		expect(await AsyncIterCore.notAnyOf(createAsyncIterable(['a', 'b', 'c']), values2)).toBe(true);

		// Also works with regular iterables
		const arr = ['a', 'b', 'c'];
		expect(await AsyncIterCore.anyOf(arr, values1)).toBe(true);
		expect(await AsyncIterCore.anyOf(arr, values2)).toBe(false);
		expect(await AsyncIterCore.notAnyOf(arr, values1)).toBe(false);
		expect(await AsyncIterCore.notAnyOf(arr, values2)).toBe(true);
	});

	it('allOf', async () => {
		const values1 = ['a', 'b', 'c'];
		const values2 = ['a', 'b'];
		const values3 = ['a', 'b', 'c', 'd'];

		expect(await AsyncIterCore.allOf(createAsyncIterable(['a', 'b', 'c']), values1)).toBe(true);
		expect(await AsyncIterCore.allOf(createAsyncIterable(['a', 'b', 'c']), values2)).toBe(false);
		expect(await AsyncIterCore.allOf(createAsyncIterable(['a', 'b', 'c']), values3)).toBe(true);

		// Also works with regular iterables
		const arr = ['a', 'b', 'c'];
		expect(await AsyncIterCore.allOf(arr, values1)).toBe(true);
		expect(await AsyncIterCore.allOf(arr, values2)).toBe(false);
		expect(await AsyncIterCore.allOf(arr, values3)).toBe(true);
	});

	it('filter with AsyncIterable and sync predicate', async () => {
		const asyncIterable = createAsyncIterable([1, 2, 3, 4, 5]);
		const filtered = AsyncIterCore.filter(asyncIterable, (x) => x % 2 === 0);
		const result = [];
		for await (const item of filtered) {
			result.push(item);
		}
		expect(result).toEqual([2, 4]);
	});

	it('filter with AsyncIterable and async predicate', async () => {
		const asyncIterable = createAsyncIterable(['hello', 'world', 'test']);
		const asyncPredicate = async (x: string) => x.length > 4;
		const filtered = AsyncIterCore.filter(asyncIterable, asyncPredicate);
		const result = [];
		for await (const item of filtered) {
			result.push(item);
		}
		expect(result).toEqual(['hello', 'world']);
	});

	it('filter with regular Iterable and sync predicate', async () => {
		const arr = [1, 2, 3, 4, 5];
		const filtered = AsyncIterCore.filter(arr, (x) => x > 3);
		const result = [];
		for await (const item of filtered) {
			result.push(item);
		}
		expect(result).toEqual([4, 5]);
	});

	it('filter with regular Iterable and async predicate', async () => {
		const arr = ['a', 'ab', 'abc', 'abcd'];
		const asyncPredicate = async (x: string) => {
			// Simulate async operation
			return Promise.resolve(x.length >= 3);
		};
		const filtered = AsyncIterCore.filter(arr, asyncPredicate);
		const result = [];
		for await (const item of filtered) {
			result.push(item);
		}
		expect(result).toEqual(['abc', 'abcd']);
	});

	it('filter returns empty when no items match', async () => {
		const asyncIterable = createAsyncIterable([1, 2, 3]);
		const result = [];
		for await (const item of AsyncIterCore.filter(asyncIterable, (x) => x > 10)) {
			result.push(item);
		}
		expect(result).toEqual([]);
	});

	it('filter returns empty when no items match', async () => {
		const asyncIterable = createAsyncIterable([1, 2, 3]);
		const result = [];
		const test = AsyncIterPredicate.oneOf(10);
		for await (const item of AsyncIterCore.filter(asyncIterable, AsyncIterPredicate.oneOf(10))) {
			result.push(item);
		}
		expect(result).toEqual([]);
	});

	it('error builder', () => {
		const err = AsyncIterCore.buildValueErr(123);
		expect(err).toBeInstanceOf(TypeError);
		expect(err.message).toContain('Invalid value');
		const errNot = AsyncIterCore.buildValueErr([], true);
		expect(errNot).toBeInstanceOf(TypeError);
		expect(errNot.message).toContain('Invalid value');
	});
});
