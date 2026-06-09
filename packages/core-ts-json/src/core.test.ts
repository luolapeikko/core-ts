import {describe, expect, it} from 'vitest';
import {JsonCore} from './';

describe('JsonCore', () => {
	describe('isJSONSerializable', () => {
		it('is defined', () => {
			expect(JsonCore.isJSONSerializable({})).toBe(false);
			expect(JsonCore.isJSONSerializable({toJSON: () => {}})).toBe(true);
		});
	});
	describe('isNotJSONSerializable', () => {
		it('is defined', () => {
			expect(JsonCore.isNotJSONSerializable({})).toBe(true);
			expect(JsonCore.isNotJSONSerializable({toJSON: () => {}})).toBe(false);
		});
	});
});
