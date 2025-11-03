import {NullishAssert, NullishCore} from './';

// Type guards
const value: unknown = null;

if (NullishCore.isNullish(value)) {
	console.log('Value is null or undefined'); // value is typed as null | undefined
}

if (NullishCore.isNotNullish(value)) {
	console.log(`Value: ${value}`); // value is typed as NonNullish<typeof value>
}

// Assertions
function processValue(input: unknown) {
	NullishAssert.assertNotNullish(input);
	// Since input is unknown, we need to convert to string explicitly
	return String(input);
}

// Practical examples
function getUserInput(): string | null | undefined {
	return Math.random() > 0.5 ? 'hello' : null;
}

const userInput: string | null | undefined = getUserInput();

// Use type guard to narrow the type - need to use a const inside the block
const maybeInput = userInput;
if (NullishCore.isNotNullish(maybeInput)) {
	// maybeInput is now typed as string (non-nullish version of the union)
	console.log(`Processing: ${maybeInput.toUpperCase()}`);
}

// Safe processing
function safeProcess(value: unknown) {
	if (NullishCore.isNotNullish(value)) {
		// Value is guaranteed to be non-nullish
		return String(value).length;
	}
	return 0;
}

// Example usage
const testValue = 'hello world';
const result = processValue(testValue);
console.log('Processed value:', result);
console.log('Safe process result:', safeProcess(testValue));
