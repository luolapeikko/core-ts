import {StringAssert, StringCore, StringPredicate} from './';

// Type guards
const value: unknown = 'hello world';

if (StringCore.is(value)) {
	console.log(value.toUpperCase()); // value is typed as string
}

const emptyValue: unknown = '';
if (StringCore.isEmpty(emptyValue)) {
	console.log('Empty string'); // value is typed as EmptyString (or '')
}

// Predicates for filtering
const files = ['readme.md', 'package.json', 'src/index.ts'];
const markdownFiles = files.filter(StringPredicate.endsWith('.md')); // ['readme.md']

// Assertions
function processString(input: unknown) {
	StringAssert.assert(input); // First assert it's a string
	StringAssert.assertNotEmpty(input); // Then assert it's not empty
	return input.trim(); // input is now typed as non-empty string
}

// Example usage
const testInput = 'test string';
const result = processString(testInput);
console.log('Processed string:', result);
