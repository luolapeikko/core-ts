import {AsyncIterAssert, AsyncIterCore, AsyncIterPredicate} from './';

// Type guards
async function example() {
	const undefinedValue: unknown = undefined;
	// Type guard
	if (AsyncIterCore.is(undefinedValue)) {
		console.log('Value is async iterable'); // value is typed as AsyncIterable<unknown>
	}
	// Assertion
	AsyncIterAssert.assert(undefinedValue); // type asserted as AsyncIterable<unknown>

	// Collection operations
	const asyncNumbers = (async function* () {
		yield 1;
		yield 2;
		yield 3;
		yield 4;
		yield 5;
	})();
	await AsyncIterCore.anyOf(asyncNumbers, [2, 4]); // true

	// Predicate usage
	const asyncGen = (async function* () {
		yield 'hello';
		yield 'world';
	})();

	// Convert async iterable to array or set
	await AsyncIterCore.asArray(asyncGen); // Promise<['hello', 'world']>
	await AsyncIterCore.asSet(asyncGen); // Promise<Set<'hello' | 'world'>>

	// Filtering with predicate
	for await (const value of AsyncIterCore.filter(asyncGen, AsyncIterPredicate.oneOf('hello'))) {
		console.log(`Filtered value: ${value}`); // Outputs 'hello'
	}
}
