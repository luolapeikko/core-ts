import {describe, expectTypeOf, it} from 'vitest';
import {RecordCore} from './core';

const data = {a: 1, b: 2, c: 3};

describe('Test RecordCore function types', () => {
	it('pick', () => {
		expectTypeOf(RecordCore.pick(['a', 'c'], data)).toEqualTypeOf<Pick<typeof data, 'a' | 'c'>>();
	});
	it('omit', () => {
		expectTypeOf(RecordCore.omit(['b'], data)).toEqualTypeOf<Omit<typeof data, 'b'>>();
	});
});
