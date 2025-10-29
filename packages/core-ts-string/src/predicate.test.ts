import {describe, expect, it} from 'vitest';
import {StringPredicate} from './';

describe('StringPredicate', () => {
	it('should use startsWith to filter values', () => {
		const values = ['apple', 'banana', 'apricot'] as const;
		expect(values.filter(StringPredicate.startsWith('a'))).to.be.deep.equal(['apple', 'apricot']);
	});

	it('should use endsWith to filter values', () => {
		const values = ['file.png', 'document.pdf', 'image.jpeg'] as const;
		expect(values.filter(StringPredicate.endsWith('png'))).to.be.deep.equal(['file.png']);
	});
	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new StringPredicate();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
