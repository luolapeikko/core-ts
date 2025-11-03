# Core TypeScript Error (@luolapeikko/core-ts-error)

Error handling utilities and type-safe error building for TypeScript applications.

## Features

- Error building utilities for consistent error messages
- Assertion functions that throw TypeError
- Support for value error construction and unknown error handling
- Foundation package for other @luolapeikko/core-ts modules

## Installation

```bash
npm install @luolapeikko/core-ts-error
```

## Usage

```typescript
import { ErrorCore, ErrorAssert, ErrorCast } from '@luolapeikko/core-ts-error';

// Type guards for Error objects
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

```