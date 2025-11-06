# Core TypeScript Iterable (@luolapeikko/core-ts-iterable)

Iterable type guards, assertions, and predicates for TypeScript applications.

## Features

- Type guards for iterable validation
- Assertion functions that throw TypeError
- Predicate functions for functional programming
- Support for empty iterables, element validation, and collection operations

## Installation

```bash
npm install @luolapeikko/core-ts-iterable
```

## Full documentation

See https://luolapeikko.github.io/core-ts/ for detailed API documentation and usage examples for each package.

## Usage

```typescript
import {
  IterableCore,
  IterableAssert,
  IterablePredicate,
} from "@luolapeikko/core-ts-iterable";

// Type guards
if (IterableCore.is(value)) {
  console.log("Value is iterable"); // value is typed as Iterable<unknown>
}

// Assertions
function processIterable(input: unknown) {
  IterableAssert.assert(input);
  for (const item of input) {
    // input is now typed as non-empty iterable
    console.log(item);
  }
}

// Collection operations
const numbers = [1, 2, 3, 4, 5];
const hasEven = IterableCore.anyOf(numbers, [2, 4]); // true
const allPositive = IterableCore.allOf(numbers, [1, 2, 3, 4, 5]); // true
```
