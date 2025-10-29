import {describe, expect, it} from 'vitest';
import {ErrorCast} from './';

describe('ErrorCast', () => {
	it('from returns Error for Error input', () => {
		const err = new Error('boom');
		expect(ErrorCast.from(err)).toBe(err);
	});

	it('from wraps string into Error', () => {
		const err = ErrorCast.from('msg');
		expect(err).toBeInstanceOf(Error);
		expect(err.message).toBe('msg');
	});

	it('from wraps unknown into UnknownError', () => {
		const unknown = {foo: 'bar'};
		const err = ErrorCast.from(unknown);
		expect(err).toBeInstanceOf(Error);
		expect(err.message).toContain('Unknown error');
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new ErrorCast();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
