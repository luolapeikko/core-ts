import {ErrorAssert, ErrorCast, ErrorCore} from './';

// Type guards for Error objects
const value: unknown = new Error('test error');

if (ErrorCore.is(value)) {
	console.log(`Error message: ${value.message}`); // value is typed as Error
}

// Assertions
function processError(input: unknown) {
	ErrorAssert.assert(input);
	return input.stack; // input is now typed as Error
}

// Casting unknown errors
try {
	throw new Error('Something went wrong');
} catch (error) {
	const typedError = ErrorCast.from(error); // Error object
	console.log(typedError.message);
}

// Example usage
const testError = new TypeError('Test error');
const result = processError(testError);
console.log('Error stack:', result);
