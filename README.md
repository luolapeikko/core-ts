# Core TypeScript Utilities

A collection of lightweight, type-safe utility packages for TypeScript that provide robust type checking, assertions, predicates, and casting functions.

## Features

- Each package is modular and can be installed independently
- Provides runtime type validation and assertions
- Includes predicate functions for functional programming

## Packages

### Base Packages

- **[@luolapeikko/core-ts-type](packages/core-ts-type/README.md)** - TypeScript type definitions and utilities
- **[@luolapeikko/core-ts-error](packages/core-ts-error/README.md)** - Error handling and custom error types.

### Data Type Utilities

- **[@luolapeikko/core-ts-string](packages/core-ts-string/README.md)** - String type guards, assertions, and predicates
- **[@luolapeikko/core-ts-number](packages/core-ts-number/README.md)** - Number type guards, assertions, and casting
- **[@luolapeikko/core-ts-array](packages/core-ts-array/README.md)** - Array type guards, assertions, and predicates
- **[@luolapeikko/core-ts-record](packages/core-ts-record/README.md)** - Record/object utilities, mappers, and predicates
- **[@luolapeikko/core-ts-nullish](packages/core-ts-nullish/README.md)** - Null/undefined type guards and assertions

### Iterable Utilities

- **[@luolapeikko/core-ts-iterable](packages/core-ts-iterable/README.md)** - Iterable type guards, assertions, and predicates
- **[@luolapeikko/core-ts-async-iterable](packages/core-ts-async-iterable/README.md)** - Async iterable utilities and type guards

### Full documentation

See https://luolapeikko.github.io/core-ts/ for detailed API documentation and usage examples for each package.

## Installation

Install individual packages as needed.

```bash
npm install @luolapeikko/core-ts-string @luolapeikko/core-ts-number @luolapeikko/core-ts-array
```

## Usage

Each package follows a consistent API pattern with core classes, assert classes, predicate classes, cast classes, and mapper classes (where applicable).:

### Core Classes

Type guards and validation functions:

```typescript
import { StringCore } from "@luolapeikko/core-ts-string";

if (StringCore.is(value)) {
  // value is now typed as string
  console.log(value.toUpperCase());
}

if (StringCore.isEmpty(value)) {
  // value is typed as EmptyString
}
```

### Assert Classes

Assertion functions that throw TypeError if validation fails:

```typescript
import { NumberAssert } from "@luolapeikko/core-ts-number";

function processNumber(input: unknown) {
  NumberAssert.assertNumber(input);
  // input is now typed as number
  return input * 2;
}
```

### Predicate Classes

Higher-order functions for filtering and functional programming:

```typescript
import { ArrayPredicate } from "@luolapeikko/core-ts-array";

const files = ["image.png", "document.pdf", "photo.jpg"];
const images = files.filter(StringPredicate.endsWith(".png")); // ['image.png']

const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(ArrayPredicate.oneOf([2, 4, 6])); // [2, 4]
```

### Cast Classes

Safe type conversion with validation:

```typescript
import { NumberCast } from "@luolapeikko/core-ts-number";

const num = NumberCast.numberFrom("123"); // 123 (number)
const int = NumberCast.intFrom("123.45"); // 123 (integer)
// Throws TypeError if conversion fails
```

### Mapper Classes

Object manipulation utilities:

```typescript
import { RecordMapper } from "@luolapeikko/core-ts-record";

const user = {
  name: "John",
  age: 30,
  email: "john@example.com",
  password: "secret",
};
const publicUser = RecordMapper.omit(user, ["password"]);
// { name: 'John', age: 30, email: 'john@example.com' }

const nameOnly = RecordMapper.pick(user, ["name"]);
// { name: 'John' }
```

## Development

### Requirements

- Node.js LTS
- pnpm 10+

### Setup

```bash
git clone https://github.com/luolapeikko/core-ts.git
cd core-ts
pnpm install
```

### Scripts

```bash
pnpm build         # Build all packages
pnpm test          # Run tests with coverage
pnpm validate      # TypeScript validation
pnpm lint          # Code linting
pnpm lint:fix      # Auto-fix linting issues
```

### Project Structure (pnpm workspace)

```
core-ts/
├── packages/
│   ├── core-ts-type/           # Type definitions
│   ├── core-ts-error/          # Error utilities
│   ├── core-ts-string/         # String utilities
│   ├── core-ts-number/         # Number utilities
│   ├── core-ts-array/          # Array utilities
│   ├── core-ts-record/         # Record/object utilities
│   ├── core-ts-nullish/        # Null/undefined utilities
│   ├── core-ts-iterable/       # Iterable utilities
│   └── core-ts-async-iterable/ # Async iterable utilities
```
