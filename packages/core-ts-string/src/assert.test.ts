import {describe, expect, it} from 'vitest';
import {StringAssert} from './';

describe('StringAssert', () => {
	it('assert passes for valid string and throws for non-string', () => {
		expect(() => StringAssert.assert('abc')).not.toThrow();
		expect(() => StringAssert.assert(1)).toThrow(TypeError);
	});

	it('assertNot passes for valid string and throws for non-string', () => {
		expect(() => StringAssert.assertNot(1)).not.toThrow();
		expect(() => StringAssert.assertNot('abc')).toThrow(TypeError);
	});

	it('assertEmpty/assertNotEmpty', () => {
		expect(() => StringAssert.assertEmpty('')).not.toThrow();
		expect(() => StringAssert.assertEmpty('a')).toThrow(TypeError);
		expect(() => StringAssert.assertEmpty(1)).toThrow(TypeError);
		expect(() => StringAssert.assertNotEmpty('a')).not.toThrow();
		expect(() => StringAssert.assertNotEmpty('')).toThrow(TypeError);
	});

	it('numeric asserts', () => {
		expect(() => StringAssert.assertNumeric('123')).not.toThrow();
		expect(() => StringAssert.assertNumeric('abc')).toThrow(TypeError);
		expect(() => StringAssert.assertNotNumeric('abc')).not.toThrow();
		expect(() => StringAssert.assertNotNumeric('123')).toThrow(TypeError);
	});

	it('case and prefix/suffix asserts', () => {
		expect(() => StringAssert.assertLowerCase('abc')).not.toThrow();
		expect(() => StringAssert.assertLowerCase('ABC')).toThrow(TypeError);
		expect(() => StringAssert.assertNotLowerCase('ABC')).not.toThrow();
		expect(() => StringAssert.assertNotLowerCase('abc')).toThrow(TypeError);

		expect(() => StringAssert.assertUpperCase('ABC')).not.toThrow();
		expect(() => StringAssert.assertUpperCase('abc')).toThrow(TypeError);
		expect(() => StringAssert.assertNotUpperCase('abc')).not.toThrow();
		expect(() => StringAssert.assertNotUpperCase('ABC')).toThrow(TypeError);

		expect(() => StringAssert.assertStartsWith('hello', 'he')).not.toThrow();
		expect(() => StringAssert.assertStartsWith('hello', 'he2')).toThrow(TypeError);
		expect(() => StringAssert.assertEndsWith('hello', 'lo')).not.toThrow();
		expect(() => StringAssert.assertEndsWith('hello', 'lo2')).toThrow(TypeError);
	});
	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new StringAssert();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
