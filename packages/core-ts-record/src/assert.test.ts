import {describe, expect, it} from 'vitest';
import {RecordAssert} from './';

describe('RecordAssert', () => {
	describe('assert', () => {
		it('should not throw for valid records', () => {
			expect(() => RecordAssert.assert({})).not.toThrow();
			expect(() => RecordAssert.assert({key: 'value'})).not.toThrow();
			expect(() => RecordAssert.assert({a: 1, b: 2})).not.toThrow();
		});

		it('should throw TypeError for non-records', () => {
			expect(() => RecordAssert.assert(null)).toThrow(TypeError);
			expect(() => RecordAssert.assert(undefined)).toThrow(TypeError);
			expect(() => RecordAssert.assert(123)).toThrow(TypeError);
			expect(() => RecordAssert.assert('string')).toThrow(TypeError);
			expect(() => RecordAssert.assert([])).toThrow(TypeError);
			expect(() => RecordAssert.assert([1, 2, 3])).toThrow(TypeError);
		});
	});

	describe('assertNot', () => {
		it('should not throw for non-records', () => {
			expect(() => RecordAssert.assertNot(null)).not.toThrow();
			expect(() => RecordAssert.assertNot(undefined)).not.toThrow();
			expect(() => RecordAssert.assertNot(123)).not.toThrow();
			expect(() => RecordAssert.assertNot('string')).not.toThrow();
			expect(() => RecordAssert.assertNot([])).not.toThrow();
		});

		it('should throw TypeError for valid records', () => {
			expect(() => RecordAssert.assertNot({})).toThrow(TypeError);
			expect(() => RecordAssert.assertNot({key: 'value'})).toThrow(TypeError);
			expect(() => RecordAssert.assertNot({a: 1, b: 2})).toThrow(TypeError);
		});
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new RecordAssert();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
