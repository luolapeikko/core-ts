import {describe, expectTypeOf, it} from 'vitest';
import {JsonCore, type ToJsonObject} from './core';

const test = {};

const test2 = {toJSON: () => 'test'} as {toJSON: () => any} | string;

describe('Core Json tests', () => {
	describe('hasToJSON', () => {
		it('it should assert valid IsGuard', () => {
			if (JsonCore.isJSONSerializable(test)) {
				expectTypeOf(test).toEqualTypeOf<ToJsonObject>();
			}
		});
		it('it should assert valid IsNotGuard', () => {
			if (!JsonCore.isJSONSerializable(test)) {
				expectTypeOf(test).toEqualTypeOf<{}>();
			}
		});
		it('it should assert valid IsGuard', () => {
			if (JsonCore.isJSONSerializable(test2)) {
				expectTypeOf(test2).toEqualTypeOf<ToJsonObject>();
			}
		});
		it('it should assert valid IsNotGuard', () => {
			if (!JsonCore.isJSONSerializable(test2)) {
				expectTypeOf(test2).toEqualTypeOf<string>();
			}
		});
	});
	describe('hasNotToJSON', () => {
		it('it should assert valid IsGuard', () => {
			if (JsonCore.isNotJSONSerializable(test)) {
				expectTypeOf(test).toEqualTypeOf<{}>();
			}
		});
		it('it should assert valid IsNotGuard (never as expected)', () => {
			if (!JsonCore.isNotJSONSerializable(test)) {
				expectTypeOf(test).toEqualTypeOf<never>();
			}
		});
		it('it should assert valid IsGuard', () => {
			if (JsonCore.isNotJSONSerializable(test2)) {
				expectTypeOf(test2).toEqualTypeOf<string>();
			}
		});
		it('it should assert valid IsNotGuard', () => {
			if (!JsonCore.isNotJSONSerializable(test2)) {
				expectTypeOf(test2).toEqualTypeOf<ToJsonObject>();
			}
		});
	});
});
