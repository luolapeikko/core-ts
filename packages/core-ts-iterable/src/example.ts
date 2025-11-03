import {IterAssert, IterCore, IterPredicate} from './';

// Type guards
const value: unknown = [1, 2, 3];

if (IterCore.is(value)) {
	console.log('Value is iterable'); // value is typed as Iterable<unknown>
}

// Assertions
function processIterable(input: unknown) {
	IterAssert.assert(input);
	for (const item of input) {
		// input is now typed as iterable
		console.log(item);
	}
}

// Collection operations
const numbers = [1, 2, 3, 4, 5];
const hasEven = IterCore.anyOf(numbers, [2, 4]); // true
const allPositive = IterCore.allOf(numbers, [1, 2, 3, 4, 5]); // true

// Predicates for filtering
const iterables = [[1, 2], [3, 4], [5, 6]];
const containsTwo = iterables.filter(IterPredicate.oneOf(2)); // [[1, 2]]

// Example usage
const testIterable = new Set([1, 2, 3]);
processIterable(testIterable);
console.log('Has even:', hasEven);
console.log('All positive:', allPositive);
console.log('Contains two:', containsTwo);
