import {expect, test} from 'vitest';
import {AsyncIterAssert} from './';

test('AsyncIterAssert.assert passes for valid async iterable', () => {
	const asyncIterable = {
		[Symbol.asyncIterator]() {
			return {
				next() {
					return Promise.resolve({value: undefined, done: true});
				},
			};
		},
	};
	expect(() => AsyncIterAssert.assert(asyncIterable)).not.toThrow();
});

test('AsyncIterAssert.assert throws for non-async iterable', () => {
	expect(() => AsyncIterAssert.assert({})).toThrow();
});

test('AsyncIterAssert.assertNot passes for non-async iterable', () => {
	expect(() => AsyncIterAssert.assertNot({})).not.toThrow();
});

test('AsyncIterAssert.assertNot throws for valid async iterable', () => {
	const asyncIterable = {
		[Symbol.asyncIterator]() {
			return {
				next() {
					return Promise.resolve({value: undefined, done: true});
				},
			};
		},
	};
	expect(() => AsyncIterAssert.assertNot(asyncIterable)).toThrow();
});

test('AsyncIterAssert cannot be instantiated', () => {
	// @ts-expect-error testing private constructor
	expect(() => new AsyncIterAssert()).toThrow('This class should not be instantiated.');
});
