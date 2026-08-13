import {assertType, describe, expectTypeOf, it} from 'vitest';
import type {Loadable} from './loadable';

describe('Core Type tests', () => {
	it('it should assert valid IsGuard', () => {
		assertType<Loadable<string>>('test');
	});
	it('should resolve invalid loadables as never', () => {
		expectTypeOf<Loadable<() => string>>().toEqualTypeOf<never>();
		expectTypeOf<Loadable<Promise<string>>>().toEqualTypeOf<never>();
		expectTypeOf<Loadable<() => string>>().not.toEqualTypeOf<Loadable<string>>();
		expectTypeOf<Loadable<Promise<string>>>().not.toEqualTypeOf<Loadable<string>>();
	});
});
