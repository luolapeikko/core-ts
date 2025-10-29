import {afterEach, describe, expect, it} from 'vitest';
import {ErrorValue} from './';

describe('errorUtils', () => {
	afterEach(() => {
		// restore default behaviour
		ErrorValue.setCustomErrorStringFunction(undefined);
	});

	describe('errorPrefixBuilder', () => {
		it('prefixes messages correctly', () => {
			expect(ErrorValue.prefixBuilder('expected a Error, got "x"')).toBe('Invalid value: expected a Error, got "x"');
		});
	});

	describe('errorMessageBuilder', () => {
		it('builds typed message', () => {
			expect(ErrorValue.messageBuilder('Error', 'something went wrong')).toBe('Invalid value: Error error, something went wrong');
		});
	});

	describe('valueErrorBuilder', () => {
		it('handles string values', () => {
			const err = ErrorValue.builder('hi', 'Error', false);
			expect(err).toBeInstanceOf(TypeError);
			expect(err.message).toContain('got "hi" [string]');
		});

		it('handles numbers and NaN', () => {
			const n = ErrorValue.builder(42, 'Error', false);
			expect(n.message).toContain('got 42 [number]');

			const nan = ErrorValue.builder(NaN, 'Error', false);
			expect(nan.message).toContain('got NaN [number]');
		});

		it('handles bigint', () => {
			const bi = ErrorValue.builder(123n, 'Error', false);
			expect(bi.message).toContain('got 123 [bigint]');
		});

		it('handles function and symbol as unknown stringified types', () => {
			const fn = ErrorValue.builder(() => {}, 'Error', false);
			expect(fn.message).toContain('got [function]');

			const sym = ErrorValue.builder(Symbol('s'), 'Error', false);
			expect(sym.message).toContain('got [symbol]');
		});

		it('includes not when isNot=true', () => {
			const notErr = ErrorValue.builder('x', 'Error', true);
			expect(notErr.message).toContain('expected not ');
		});
	});

	describe('setCustomErrorStringFunction', () => {
		it('allows custom error builder', () => {
			ErrorValue.setCustomErrorStringFunction((value, typeName, isNot) => `CUSTOM:${String(value)}|${typeName}|${isNot}`);
			const e = ErrorValue.builder('abc', 'Error', false);
			expect(e.message).toBe('CUSTOM:abc|Error|false');
		});
	});

	describe('getArticle special cases', () => {
		it('uses "an" for special cases like honest, hour, heir, herb', () => {
			const a = ErrorValue.builder('x', 'honestThing', false);
			expect(a.message).toContain('expected an honestThing');

			const b = ErrorValue.builder('x', 'hourglass', false);
			expect(b.message).toContain('expected an hourglass');

			const c = ErrorValue.builder('x', 'heirloom', false);
			expect(c.message).toContain('expected an heirloom');

			const d = ErrorValue.builder('x', 'herb', false);
			expect(d.message).toContain('expected an herb');
		});

		it('uses "a" for hard U words like uni, user, usual', () => {
			const a = ErrorValue.builder('x', 'uniqueThing', false);
			expect(a.message).toContain('expected a uniqueThing');

			const b = ErrorValue.builder('x', 'userType', false);
			expect(b.message).toContain('expected a userType');

			const c = ErrorValue.builder('x', 'usualCase', false);
			expect(c.message).toContain('expected a usualCase');
		});
	});
	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new ErrorValue();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
