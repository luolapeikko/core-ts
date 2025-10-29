import {describe, expect, it} from 'vitest';
import {UnknownError} from './';

describe('UnknownError', () => {
	describe('constructor', () => {
		it('wraps string errors with quotes', () => {
			const err = new UnknownError('something bad');
			expect(err.message).toBe('Unknown error: "something bad"');
			expect(err).toBeInstanceOf(TypeError);
		});

		it('extracts message from Error instances', () => {
			const original = new Error('inner error');
			const err = new UnknownError(original);
			expect(err.message).toBe('Unknown error: "inner error"');
		});

		it('handles error-like objects with message/name', () => {
			const errorLike = {
				name: 'CustomError',
				message: 'custom message',
				extra: 'field',
			};
			const err = new UnknownError(errorLike);
			expect(err.message).toBe('Unknown error: "custom message"');
		});

		it('stringifies plain objects', () => {
			const obj = {foo: 'bar'};
			const err = new UnknownError(obj);
			expect(err.message).toBe('Unknown error: {"foo":"bar"}');
		});

		it('stringifies null', () => {
			const err = new UnknownError(null);
			expect(err.message).toBe('Unknown error: null');
		});

		it('stringifies undefined', () => {
			const err = new UnknownError(undefined);
			expect(err.message).toBe('Unknown error: undefined');
		});
	});
});
