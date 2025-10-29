import {describe, expect, it} from 'vitest';
import {StringCore} from './';

describe('StringCore', () => {
	it('is detects strings', () => {
		expect(StringCore.is('hello')).toBe(true);
		expect(StringCore.is(123)).toBe(false);
	});

	it('isEmpty and isNotEmpty', () => {
		expect(StringCore.isEmpty('')).toBe(true);
		expect(StringCore.isEmpty('a')).toBe(false);
		expect(StringCore.isNotEmpty('a')).toBe(true);
	});

	it('case checks', () => {
		expect(StringCore.isLowerCase('hello')).toBe(true);
		expect(StringCore.isUpperCase('HELLO')).toBe(true);
	});

	it('startsWith and endsWith', () => {
		expect(StringCore.startsWith('hello', 'he')).toBe(true);
		expect(StringCore.endsWith('hello', 'lo')).toBe(true);
	});

	it('numeric checks', () => {
		expect(StringCore.isNumeric('123')).toBe(true);
		expect(StringCore.isNumeric('12.3')).toBe(true);
		expect(StringCore.isNumeric('abc')).toBe(false);
	});

	it('negative checks and error builder', () => {
		expect(StringCore.isNot('a')).toBe(false);
		expect(StringCore.isNot(1)).toBe(true);

		expect(StringCore.isNotLowerCase('abc')).toBe(false);
		expect(StringCore.isNotLowerCase('ABC')).toBe(true);

		expect(StringCore.isNotUpperCase('ABC')).toBe(false);
		expect(StringCore.isNotUpperCase('abc')).toBe(true);

		expect(StringCore.isNotNumeric('123')).toBe(false);
		expect(StringCore.isNotNumeric('abc')).toBe(true);

		const err = StringCore.buildValueErr(123, 'String');
		expect(err).toBeInstanceOf(TypeError);
		expect(err.message).toContain('Invalid value');
	});
	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new StringCore();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
