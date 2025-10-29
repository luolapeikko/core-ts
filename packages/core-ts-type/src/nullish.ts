export type Nullish<T> = T | null | undefined;

export type Nullable<T> = T | null;

export type Undef<T> = T | undefined;

export type NullishFnMapping = {
	Undefined: [undefined, undefined];
	Null: [null, null];
	Nullish: [undefined | null, undefined | null];
};
