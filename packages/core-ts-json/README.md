# Core TypeScript JSON (@luolapeikko/core-ts-json)

JSON serializability type guards, assertions, and predicates for TypeScript applications.

## Features
- Type guards for JSON serializability validation
- Assertion functions that throw TypeError

## Installation

```bash
npm install @luolapeikko/core-ts-json
```

## Full documentation

See https://luolapeikko.github.io/core-ts/ for detailed API documentation and usage examples for each package.

## Usage

```typescript
import {
  JsonCore,
  JsonAssert,
} from "@luolapeikko/core-ts-json";

// Type guards
if (JsonCore.isJSONSerializable(value)) {
  console.log("Value is JSON serializable"); // value is typed as ToJsonObject
}

// Assertions
function processJsonSerializable(input: unknown) {
  JsonAssert.assertJSONSerializable(input);
  // input is now typed as ToJsonObject
  console.log(input.toJSON());
}
```