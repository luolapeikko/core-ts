# Core TypeScript Nullish (@luolapeikko/core-ts-nullish)

Null/undefined type guards and assertions for TypeScript applications.

## Features

- Type guards for null/undefined validation
- Assertion functions that throw TypeError
- Support for nullish value detection and non-nullish validation

## Installation

```bash
npm install @luolapeikko/core-ts-nullish
```

## Usage

```typescript
import { NullishCore, NullishAssert } from '@luolapeikko/core-ts-nullish';

// Type guards
if (NullishCore.is(value)) {
  console.log('Value is null or undefined'); // value is typed as null | undefined
}

if (NullishCore.isNot(value)) {
  console.log(`Value: ${value}`); // value is typed as NonNullish<typeof value>
}

// Assertions
function processValue(input: unknown) {
  NullishAssert.assertNot(input);
  return input.toString(); // input is now typed as non-nullish
}

// Practical examples
const userInput: string | null | undefined = getUserInput();

if (NullishCore.isNot(userInput)) {
  // userInput is now typed as string
  console.log(`Processing: ${userInput.toUpperCase()}`);
}

// Safe processing
function safeProcess(value: unknown) {
  if (NullishCore.isNot(value)) {
    // Value is guaranteed to be non-nullish
    return String(value).length;
  }
  return 0;
}
```