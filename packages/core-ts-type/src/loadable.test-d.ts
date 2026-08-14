import {assertType, describe, expectTypeOf, it} from 'vitest';
import type {Loadable} from './loadable';

export interface SomeProps {
	disabled?: Loadable<boolean>;
}

describe('Core Type tests', () => {
	it('it should assert valid IsGuard', () => {
		assertType<Loadable<string>>('test');
		assertType<Loadable<string>>((_arg: Date) => 'test');
	});
	it('should resolve invalid loadables as never', () => {
		expectTypeOf<Loadable<() => string>>().toEqualTypeOf<never>();
		expectTypeOf<Loadable<Promise<string>>>().toEqualTypeOf<never>();
		expectTypeOf<Loadable<() => string>>().not.toEqualTypeOf<Loadable<string>>();
		expectTypeOf<Loadable<Promise<string>>>().not.toEqualTypeOf<Loadable<string>>();
	});
	it('should not have error on boolean', () => {
		const isFetchDisabled = false as boolean;
		const _testOptions = {
			disabled: () => isFetchDisabled,
		} satisfies Partial<SomeProps>;
	});
});
