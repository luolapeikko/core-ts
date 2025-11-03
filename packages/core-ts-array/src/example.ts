import {ArrayAssert, ArrayCore, ArrayPredicate} from './';

const value: unknown = [1, 2, 3];

// Type guards
if (ArrayCore.is(value)) {
	console.log(`Array length: ${value.length}`); // value is typed as unknown[] | readonly unknown[]
}

// Assertions
ArrayAssert.assert(value); // assert value is an array

// Core utilities - checking array contents
const numbers: number[] = [1, 2, 3, 4, 5];
ArrayCore.oneOf(numbers, 2); // true
ArrayCore.anyOf(numbers, [2, 4]); // true
ArrayCore.allOf(numbers, [1, 2, 3, 4, 5]); // true

// Predicates for filtering arrays
numbers.filter(ArrayPredicate.oneOf(1)); // [1]
numbers.filter(ArrayPredicate.anyOf([2, 4])); // [2, 4]
