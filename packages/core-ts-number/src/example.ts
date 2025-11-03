import {NumberAssert, NumberCast, NumberCore} from './';

// Type guards
const value: unknown = 42;

if (NumberCore.isNumber(value)) {
	console.log(`Number: ${value.toFixed(2)}`); // value is typed as number
}

if (NumberCore.isInt(value)) {
	console.log(`Integer: ${value}`); // value is typed as Integer
}

// Assertions
function processNumber(input: unknown) {
	NumberAssert.assertFinite(input);
	return input * 2; // input is now a finite number
}

// Casting
const userInput = '42';
const numValue = NumberCast.intFrom(userInput); // 42 as Integer
const floatValue = NumberCast.numberFrom('3.14'); // 3.14 as number

// Example usage
const testNumber = 123;
const result = processNumber(testNumber);
console.log('Processed number:', result);
