# Core TypeScript Array (@luolapeikko/core-ts-array)

Array type guards, assertions, and predicates for TypeScript applications.

## Features

- Type guards for array validation
- Assertion functions that throw TypeError
- Predicate functions for functional programming
- Support for empty arrays, non-empty arrays, and element validation

## Installation

```bash
npm install @luolapeikko/core-ts-array
```

## Full documentation

See https://luolapeikko.github.io/core-ts/ for detailed API documentation and usage examples for each package.

## Usage

```typescript
import {
  ArrayCore,
  ArrayAssert,
  ArrayPredicate,
} from "@luolapeikko/core-ts-array";

// Type guards
const value: unknown = [1, 2, 3];

if (ArrayCore.is(value)) {
  console.log(`Array length: ${value.length}`); // value is typed as unknown[] | readonly unknown[]
}

// Assertions
function processArray(input: unknown): string[] {
  ArrayAssert.assert(input);
  return input.map((item) => String(item)); // input is now typed as unknown[] | readonly unknown[]
}
const data: unknown = ["hello", "world"];
const result: string[] = processArray(data);

// Core utilities - checking array contents
const numbers: number[] = [1, 2, 3, 4, 5];
ArrayCore.oneOf(numbers, 2); // true
ArrayCore.anyOf(numbers, [2, 4]); // true
ArrayCore.allOf(numbers, [1, 2, 3, 4, 5]); // true

// Predicates for filtering arrays
numbers.filter(ArrayPredicate.oneOf(1)); // [1]
numbers.filter(ArrayPredicate.anyOf([2, 4])); // [2, 4]
```
