import {describe, expect, it} from 'vitest';
import {JsonAssert} from './';

describe('JsonAssert', () => {
	describe('assert', () => {
		it('passes for JSON serializable objects', () => {
			expect(() => JsonAssert.assertJSONSerializable({toJSON: () => ({})})).not.toThrow();
		});

		it('throws for non-JSON serializable objects', () => {
			expect(() => JsonAssert.assertJSONSerializable({})).toThrow('Invalid value: expected a JSONSerializable, got {} [object]');
			expect(() => JsonAssert.assertJSONSerializable(123)).toThrow('Invalid value: expected a JSONSerializable, got 123 [number]');
			expect(() => JsonAssert.assertJSONSerializable(null)).toThrow('Invalid value: expected a JSONSerializable, got null [object]');
		});
	});

	describe('assertNot', () => {
		it('passes for non-JSON serializable objects', () => {
			expect(() => JsonAssert.assertNotJSONSerializable({})).not.toThrow();
			expect(() => JsonAssert.assertNotJSONSerializable(123)).not.toThrow();
			expect(() => JsonAssert.assertNotJSONSerializable(null)).not.toThrow();
		});

		it('throws for JSON serializable objects', () => {
			expect(() => JsonAssert.assertNotJSONSerializable({toJSON: () => ({})})).toThrow('Invalid value: expected not a JSONSerializable, got {} [object]');
		});
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new JsonAssert();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
