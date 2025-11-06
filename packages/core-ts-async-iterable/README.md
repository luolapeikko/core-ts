# Core TypeScript Async Iterable (@luolapeikko/core-ts-async-iterable)

Async iterable type guards, assertions, and predicates for TypeScript applications.

## Features

- Type guards for async iterable validation
- Assertion functions that throw TypeError
- Predicate functions for functional programming
- Support for async iteration, element validation, and collection operations

## Installation

```bash
npm install @luolapeikko/core-ts-async-iterable
```

## Full documentation

See https://luolapeikko.github.io/core-ts/ for detailed API documentation and usage examples for each package.

## Usage

```typescript
import {
  AsyncIterableCore,
  AsyncIterableAssert,
  AsyncIterablePredicate,
} from "@luolapeikko/core-ts-async-iterable";

const undefinedValue: unknown = undefined;
// Type guard
if (AsyncIterCore.is(undefinedValue)) {
  console.log("Value is async iterable"); // value is typed as AsyncIterable<unknown>
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
  yield "hello";
  yield "world";
})();

// Convert async iterable to array or set
await AsyncIterCore.asArray(asyncGen); // Promise<['hello', 'world']>
await AsyncIterCore.asSet(asyncGen); // Promise<Set<'hello' | 'world'>>

// Filtering with predicate
for await (const value of AsyncIterCore.filter(
  asyncGen,
  AsyncIterPredicate.oneOf("hello")
)) {
  console.log(`Filtered value: ${value}`); // Outputs 'hello'
}
```
