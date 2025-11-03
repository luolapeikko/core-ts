import {assertType, describe, it} from 'vitest';
import {NullishCore as N} from './core';

describe('Test NullishCore functions', () => {
	describe('Type tests', () => {
		it('should assert valid types', () => {
			assertType<undefined>(undefined);
			assertType<null>(null);
			assertType<null | undefined>(null);
			assertType<null | undefined>(undefined);
		});
	});
	describe('Function tests', () => {
		it('isUndefined', () => {
			const value = undefined as string | undefined;
			if (N.isUndefined(value)) {
				assertType<undefined>(value);
			} else {
				assertType<string>(value);
			}
		});
		it('isUndefined unknown', () => {
			const value: unknown = undefined;
			if (N.isUndefined(value)) {
				assertType<undefined>(value);
			} else {
				assertType<unknown>(value);
			}
		});
		it('isUndefined with generics', () => {
			const value = undefined as string | undefined;
			if (N.isUndefined<string | undefined>(value)) {
				assertType<undefined>(value);
			} else {
				assertType<string>(value);
			}
		});
		it('isNotUndefined', () => {
			const value = 'test' as string | undefined;
			if (N.isNotUndefined(value)) {
				assertType<string>(value);
			} else {
				assertType<undefined>(value);
			}
		});
		it('isNotUndefined with union', () => {
			const value = 'test' as string | null | undefined;
			if (N.isNotUndefined(value)) {
				assertType<string | null>(value);
			} else {
				assertType<undefined>(value);
			}
		});
		it('isNull', () => {
			const value = null as string | null;
			if (N.isNull(value)) {
				assertType<null>(value);
			} else {
				assertType<string>(value);
			}
		});
		it('isNull unknown', () => {
			const value: unknown = null;
			if (N.isNull(value)) {
				assertType<null>(value);
			} else {
				assertType<unknown>(value);
			}
		});
		it('isNull with generics', () => {
			const value = null as string | null;
			if (N.isNull<string | null>(value)) {
				assertType<null>(value);
			} else {
				assertType<string>(value);
			}
		});
		it('isNotNull', () => {
			const value = 'test' as string | null;
			if (N.isNotNull(value)) {
				assertType<string>(value);
			} else {
				assertType<null>(value);
			}
		});
		it('isNotNull with union', () => {
			const value = 'test' as string | null | undefined;
			if (N.isNotNull(value)) {
				assertType<string | undefined>(value);
			} else {
				assertType<null>(value);
			}
		});
		it('isNullish', () => {
			const value = null as string | null | undefined;
			if (N.isNullish(value)) {
				assertType<null | undefined>(value);
			} else {
				assertType<string>(value);
			}
		});
		it('isNullish unknown', () => {
			const value: unknown = null;
			if (N.isNullish(value)) {
				assertType<null | undefined>(value);
			} else {
				assertType<unknown>(value);
			}
		});
		it('isNullish with generics', () => {
			const value = null as string | null | undefined;
			if (N.isNullish<string | null | undefined>(value)) {
				assertType<null | undefined>(value);
			} else {
				assertType<string>(value);
			}
		});
		it('isNotNullish', () => {
			const value = 'test' as string | null | undefined;
			if (N.isNotNullish(value)) {
				assertType<string>(value);
			} else {
				assertType<null | undefined>(value);
			}
		});
		it('isNotNullish with union types - KNOWN ISSUE', () => {
			const value = 'test' as string | number | null | undefined;
			if (N.isNotNullish(value)) {
				assertType<string | number>(value);
			} else {
				assertType<null | undefined>(value);
			}
		});
		it('isNotNullish with filter - KNOWN ISSUE', () => {
			const arr = ['a', null, 'b', undefined] as Array<string | null | undefined>;
			assertType<string[]>(arr.filter(N.isNotNullish));
		});
		it('isNotNullish unknown', () => {
			const value: unknown = 'test';
			if (N.isNotNullish(value)) {
				assertType<unknown>(value);
			} else {
				assertType<null | undefined>(value);
			}
		});
		it('isNotNullish with const variable assignment', () => {
			const value = 'test' as string | null | undefined;
			if (N.isNotNullish(value)) {
				assertType<string>(value);
			} else {
				assertType<null | undefined>(value);
			}
		});
	});
});
