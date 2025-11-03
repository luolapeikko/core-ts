import {assertType, describe, it} from 'vitest';
import type {IsGuard, IsNotGuard} from './core';

describe('Core Type tests', () => {
	it('it should assert valid IsGuard', () => {
		assertType<IsGuard<unknown, string>>('test');
	});
	it('it should assert valid IsNotGuard', () => {
		assertType<IsNotGuard<unknown, number>>('test');
	});
});
