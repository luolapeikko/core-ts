import {describe, expect, it} from 'vitest';
import {RecordCore} from './';

describe('RecordCore', () => {
	describe('is', () => {
		it('should return true for plain objects', () => {
			expect(RecordCore.is({})).toBe(true);
			expect(RecordCore.is({key: 'value'})).toBe(true);
			expect(RecordCore.is({a: 1, b: 2})).toBe(true);
		});

		it('should return false for non-objects', () => {
			expect(RecordCore.is(null)).toBe(false);
			expect(RecordCore.is(undefined)).toBe(false);
			expect(RecordCore.is(123)).toBe(false);
			expect(RecordCore.is('string')).toBe(false);
			expect(RecordCore.is(true)).toBe(false);
		});

		it('should return false for arrays', () => {
			expect(RecordCore.is([])).toBe(false);
			expect(RecordCore.is([1, 2, 3])).toBe(false);
		});
	});

	describe('isNot', () => {
		it('should return false for plain objects', () => {
			expect(RecordCore.isNot({})).toBe(false);
			expect(RecordCore.isNot({key: 'value'})).toBe(false);
		});

		it('should return true for non-objects', () => {
			expect(RecordCore.isNot(null)).toBe(true);
			expect(RecordCore.isNot([])).toBe(true);
			expect(RecordCore.isNot(123)).toBe(true);
		});
	});

	describe('keys', () => {
		it('should return array of keys for non-empty objects', () => {
			const result = RecordCore.keys({key: 'value'});
			expect(result).toEqual(['key']);
		});

		it('should return empty array for empty object', () => {
			const result = RecordCore.keys({});
			expect(result).toEqual([]);
		});

		it('should return all keys for multi-property object', () => {
			const result = RecordCore.keys({a: 1, b: 2, c: 3});
			expect(result).toEqual(['a', 'b', 'c']);
		});
	});

	describe('values', () => {
		it('should return array of values for non-empty objects', () => {
			const result = RecordCore.values({key: 'value'});
			expect(result).toEqual(['value']);
		});

		it('should return empty array for empty object', () => {
			const result = RecordCore.values({});
			expect(result).toEqual([]);
		});

		it('should return all values for multi-property object', () => {
			const result = RecordCore.values({a: 1, b: 2, c: 3});
			expect(result).toEqual([1, 2, 3]);
		});
	});

	describe('entries', () => {
		it('should return array of entries for non-empty objects', () => {
			const result = RecordCore.entries({key: 'value'});
			expect(result).toEqual([['key', 'value']]);
		});

		it('should return empty array for empty object', () => {
			const result = RecordCore.entries({});
			expect(result).toEqual([]);
		});

		it('should return all entries for multi-property object', () => {
			const result = RecordCore.entries({a: 1, b: 2});
			expect(result).toEqual([
				['a', 1],
				['b', 2],
			]);
		});
	});

	describe('fromEntries', () => {
		it('should reconstruct object from entries', () => {
			const entries: [string, number][] = [
				['a', 1],
				['b', 2],
			];
			const result = RecordCore.fromEntries(entries);
			expect(result).toEqual({a: 1, b: 2});
		});
	});

	describe('omit', () => {
		it('should omit specified keys from object', () => {
			const obj = {a: 1, b: 2, c: 3};
			const result = RecordCore.omit(['b'], obj);
			expect(result).toEqual({a: 1, c: 3});
		});

		it('should omit multiple keys', () => {
			const obj = {a: 1, b: 2, c: 3, d: 4};
			const result = RecordCore.omit(['b', 'd'], obj);
			expect(result).toEqual({a: 1, c: 3});
		});

		it('should return copy when no keys to omit', () => {
			const obj = {a: 1, b: 2};
			const result = RecordCore.omit([], obj);
			expect(result).toEqual({a: 1, b: 2});
			expect(result).not.toBe(obj); // Should be a new object
		});

		it('should not mutate original object', () => {
			const obj = {a: 1, b: 2, c: 3};
			RecordCore.omit(['b'], obj);
			expect(obj).toEqual({a: 1, b: 2, c: 3});
		});
	});

	describe('pick', () => {
		it('should pick specified keys from object', () => {
			const obj = {a: 1, b: 2, c: 3};
			const result = RecordCore.pick(['a', 'c'], obj);
			expect(result).toEqual({a: 1, c: 3});
		});

		it('should pick single key', () => {
			const obj = {a: 1, b: 2, c: 3};
			const result = RecordCore.pick(['b'], obj);
			expect(result).toEqual({b: 2});
		});

		it('should return empty object when no keys to pick', () => {
			const obj = {a: 1, b: 2};
			const result = RecordCore.pick([], obj);
			expect(result).toEqual({});
		});

		it('should not mutate original object', () => {
			const obj = {a: 1, b: 2, c: 3};
			RecordCore.pick(['a'], obj);
			expect(obj).toEqual({a: 1, b: 2, c: 3});
		});
	});

	describe('buildValueErr', () => {
		it('should build error for invalid record', () => {
			const err = RecordCore.buildValueErr(123);
			expect(err).toBeInstanceOf(TypeError);
			expect(err.message).toContain('Invalid value');
		});

		it('should build error with isNot flag', () => {
			const err = RecordCore.buildValueErr({}, true);
			expect(err).toBeInstanceOf(TypeError);
			expect(err.message).toContain('Invalid value');
		});
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new RecordCore();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
