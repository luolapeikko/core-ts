import {describe, expectTypeOf, it} from 'vitest';
import {RecordMapper} from './mapper';

const data = {a: 1, b: 2, c: 3};

describe('Test RecordMapper function types', () => {
	it('pick', () => {
		expectTypeOf([data].map(RecordMapper.pick(['a', 'c']))).toEqualTypeOf<Pick<typeof data, 'a' | 'c'>[]>();
	});
	it('omit', () => {
		expectTypeOf([data].map(RecordMapper.omit(['b']))).toEqualTypeOf<Omit<typeof data, 'b'>[]>();
	});
});
