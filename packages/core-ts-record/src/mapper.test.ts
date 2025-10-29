import {describe, expect, it} from 'vitest';
import {RecordMapper} from './';

describe('RecordMapper', () => {
	describe('pick', () => {
		it('should pick specified keys from objects in array', () => {
			type Data = {demo: string; value: number | null};
			const dataArray: Data[] = [
				{demo: 'hello', value: null},
				{demo: 'world', value: 42},
			];
			const output = dataArray.map(RecordMapper.pick(['demo']));
			expect(output).toEqual([{demo: 'hello'}, {demo: 'world'}]);
		});

		it('should pick multiple keys', () => {
			type User = {id: number; name: string; email: string; age: number};
			const users: User[] = [
				{id: 1, name: 'Alice', email: 'alice@example.com', age: 30},
				{id: 2, name: 'Bob', email: 'bob@example.com', age: 25},
			];
			const result = users.map(RecordMapper.pick(['id', 'name']));
			expect(result).toEqual([
				{id: 1, name: 'Alice'},
				{id: 2, name: 'Bob'},
			]);
		});

		it('should work with single object', () => {
			const pickFn = RecordMapper.pick(['a', 'b']);
			const result = pickFn({a: 1, b: 2, c: 3});
			expect(result).toEqual({a: 1, b: 2});
		});

		it('should handle empty keys array', () => {
			const pickFn = RecordMapper.pick([]);
			const result = pickFn({a: 1, b: 2});
			expect(result).toEqual({});
		});
	});

	describe('omit', () => {
		it('should omit specified keys from objects in array', () => {
			type Data = {demo: string; value: number | null};
			const dataArray: Data[] = [
				{demo: 'hello', value: null},
				{demo: 'world', value: 42},
			];
			const output = dataArray.map(RecordMapper.omit(['demo']));
			expect(output).toEqual([{value: null}, {value: 42}]);
		});

		it('should omit multiple keys', () => {
			type User = {id: number; name: string; email: string; age: number};
			const users: User[] = [
				{id: 1, name: 'Alice', email: 'alice@example.com', age: 30},
				{id: 2, name: 'Bob', email: 'bob@example.com', age: 25},
			];
			const result = users.map(RecordMapper.omit(['email', 'age']));
			expect(result).toEqual([
				{id: 1, name: 'Alice'},
				{id: 2, name: 'Bob'},
			]);
		});

		it('should work with single object', () => {
			const omitFn = RecordMapper.omit(['c']);
			const result = omitFn({a: 1, b: 2, c: 3});
			expect(result).toEqual({a: 1, b: 2});
		});

		it('should handle empty keys array', () => {
			const omitFn = RecordMapper.omit([]);
			const result = omitFn({a: 1, b: 2});
			expect(result).toEqual({a: 1, b: 2});
		});
	});

	describe('prop', () => {
		it('should extract property from objects in array', () => {
			type User = {id: number; name: string};
			const users: User[] = [
				{id: 1, name: 'Alice'},
				{id: 2, name: 'Bob'},
			];
			const ids = users.map(RecordMapper.prop('id'));
			expect(ids).toEqual([1, 2]);
		});

		it('should extract property from single object', () => {
			const getProp = RecordMapper.prop('name');
			const result = getProp({id: 1, name: 'Alice'});
			expect(result).toBe('Alice');
		});

		it('should work with array index access', () => {
			const getFirst = RecordMapper.prop(0);
			const result = getFirst(['a', 'b', 'c']);
			expect(result).toBe('a');
		});

		it('should extract various property types', () => {
			const data = [
				{value: 10, label: 'first'},
				{value: 20, label: 'second'},
			];
			const values = data.map(RecordMapper.prop('value'));
			const labels = data.map(RecordMapper.prop('label'));
			expect(values).toEqual([10, 20]);
			expect(labels).toEqual(['first', 'second']);
		});

		it('should handle nested array extraction', () => {
			const arrays = [
				['a', 'b'],
				['c', 'd'],
				['e', 'f'],
			];
			const firsts = arrays.map(RecordMapper.prop(0));
			const seconds = arrays.map(RecordMapper.prop(1));
			expect(firsts).toEqual(['a', 'c', 'e']);
			expect(seconds).toEqual(['b', 'd', 'f']);
		});
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new RecordMapper();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
