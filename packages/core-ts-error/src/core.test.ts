import {describe, expect, it} from 'vitest';
import {ErrorCore} from './';

describe('ErrorCore', () => {
	it('is and isNot', () => {
		expect(ErrorCore.is(new Error())).toBe(true);
		expect(ErrorCore.isNot('x')).toBe(true);
	});

	it('buildValueErr returns TypeError and message', () => {
		const err = ErrorCore.buildValueErr('x');
		expect(err).toBeInstanceOf(TypeError);
		expect(err.message).toContain('Invalid value');
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new ErrorCore();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
