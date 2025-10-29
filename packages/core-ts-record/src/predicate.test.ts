import {describe, expect, it} from 'vitest';
import {RecordPredicate} from './';

describe('RecordPredicate', () => {
	describe('propEq', () => {
		it('should filter objects by property equality', () => {
			type User = {name: string; role: string};
			const users: User[] = [
				{name: 'Alice', role: 'admin'},
				{name: 'Bob', role: 'user'},
				{name: 'Charlie', role: 'admin'},
			];

			const admins = users.filter(RecordPredicate.propEq<User, 'role'>('role', 'admin'));
			expect(admins).toEqual([
				{name: 'Alice', role: 'admin'},
				{name: 'Charlie', role: 'admin'},
			]);
		});

		it('should work with loosely typed objects', () => {
			const posts = [
				{title: 'Post 1', status: 'published'},
				{title: 'Post 2', status: 'draft'},
				{title: 'Post 3', status: 'published'},
			];

			const published = posts.filter(RecordPredicate.propEq('status', 'published'));
			expect(published).toEqual([
				{title: 'Post 1', status: 'published'},
				{title: 'Post 3', status: 'published'},
			]);
		});

		it('should handle number values', () => {
			const items = [
				{id: 1, value: 10},
				{id: 2, value: 20},
				{id: 3, value: 10},
			];
			const filtered = items.filter(RecordPredicate.propEq('value', 10));
			expect(filtered).toEqual([
				{id: 1, value: 10},
				{id: 3, value: 10},
			]);
		});

		it('should return false for non-matching values', () => {
			const predicate = RecordPredicate.propEq('status', 'active');
			expect(predicate({status: 'inactive'})).toBe(false);
			expect(predicate({status: 'active'})).toBe(true);
		});

		it('should handle missing properties', () => {
			const predicate = RecordPredicate.propEq('missing', 'value');
			expect(predicate({})).toBe(false);
		});
	});

	describe('propNotEq', () => {
		it('should filter objects by property inequality', () => {
			type User = {name: string; role: string};
			const users: User[] = [
				{name: 'Alice', role: 'admin'},
				{name: 'Bob', role: 'user'},
				{name: 'Charlie', role: 'admin'},
			];

			const nonAdmins = users.filter(RecordPredicate.propNotEq<User, 'role'>('role', 'admin'));
			expect(nonAdmins).toEqual([{name: 'Bob', role: 'user'}]);
		});

		it('should work with loosely typed objects', () => {
			const posts = [
				{title: 'Post 1', status: 'published'},
				{title: 'Post 2', status: 'draft'},
				{title: 'Post 3', status: 'published'},
			];

			const notPublished = posts.filter(RecordPredicate.propNotEq('status', 'published'));
			expect(notPublished).toEqual([{title: 'Post 2', status: 'draft'}]);
		});

		it('should handle number values', () => {
			const items = [
				{id: 1, value: 10},
				{id: 2, value: 20},
				{id: 3, value: 10},
			];
			const filtered = items.filter(RecordPredicate.propNotEq('value', 10));
			expect(filtered).toEqual([{id: 2, value: 20}]);
		});

		it('should return true for non-matching values', () => {
			const predicate = RecordPredicate.propNotEq('status', 'active');
			expect(predicate({status: 'inactive'})).toBe(true);
			expect(predicate({status: 'active'})).toBe(false);
		});

		it('should handle missing properties', () => {
			const predicate = RecordPredicate.propNotEq('missing', 'value');
			expect(predicate({})).toBe(true);
		});
	});

	describe('constructor', () => {
		it('cannot be instantiated', () => {
			expect(() => {
				// @ts-expect-error Testing private constructor
				new RecordPredicate();
			}).toThrow('This class should not be instantiated.');
		});
	});
});
