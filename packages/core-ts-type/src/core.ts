import type {MappingShape} from './mapper';

export type IsGuard<T, Base> = Extract<T, Base>;

export type IsNotGuard<T, Base> = Exclude<T, Base>;

export type WithIsPositiveCore<T extends MappingShape> = {
	[Key in keyof T as Key extends string ? `is${Key}` : never]: <R = unknown>(value: R) => value is IsGuard<R, T[Key][1]>;
};

export type WithIsNegativeCore<T extends MappingShape> = {
	[Key in keyof T as Key extends string ? `isNot${Key}` : never]: <R = unknown>(value: R) => value is IsNotGuard<R, T[Key][1]>;
};

export type WithIsCore<T extends MappingShape> = WithIsPositiveCore<T> & WithIsNegativeCore<T>;

export type WithAssertPositiveCore<T extends MappingShape> = {
	[Key in keyof T as Key extends string ? `assert${Key}` : never]: <R = unknown>(value: R) => asserts value is IsGuard<R, T[Key][1]>;
};

export type WithAssertNegativeCore<T extends MappingShape> = {
	[Key in keyof T as Key extends string ? `assertNot${Key}` : never]: <R = unknown>(value: R) => asserts value is IsNotGuard<R, T[Key][1]>;
};

export type WithAssertCore<T extends MappingShape> = WithAssertPositiveCore<T> & WithAssertNegativeCore<T>;
