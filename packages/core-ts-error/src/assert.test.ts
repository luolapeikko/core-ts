import {describe, expect, it} from 'vitest';
import {ErrorAssert} from './';

describe('ErrorAssert', () => {
	describe('assert', () => {
		it('does not throw for Error instances', () => {
			expect(() => ErrorAssert.assert(new Error('ok'))).not.toThrow();
		});

		it('throws TypeError for non-Error values', () => {
			expect(() => ErrorAssert.assert('not an error')).toThrowError(TypeError);
		});
	});

	describe('assertNot', () => {
		it('does not throw for non-Error values', () => {
			expect(() => ErrorAssert.assertNot('a string')).not.toThrow();
		});

		it('throws TypeError for Error instances', () => {
			expect(() => ErrorAssert.assertNot(new Error('oops'))).toThrowError(TypeError);
		});
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new ErrorAssert();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
