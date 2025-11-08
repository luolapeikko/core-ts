import {describe, expect, it} from 'vitest';
import {LoadableCore} from './';

describe('StringCore', () => {
	it('is detects strings', async () => {
		expect(await LoadableCore.resolve('hello')).toBe('hello');
		expect(await LoadableCore.resolve(() => 'hello')).toBe('hello');
		expect(await LoadableCore.resolve(Promise.resolve('hello'))).toBe('hello');
		expect(await LoadableCore.resolve(() => Promise.resolve('hello'))).toBe('hello');
	});
	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new LoadableCore();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
