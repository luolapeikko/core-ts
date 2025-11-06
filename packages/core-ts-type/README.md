# Core TypeScript Types (@luolapeikko/core-ts-type)

A collection of foundational TypeScript types and utilities for building robust applications.

## Features

- Type definitions for @luolapeikko/core-ts packages

## Installation

```bash
npm install @luolapeikko/core-ts-type
```

## Full documentation

See https://luolapeikko.github.io/core-ts/ for detailed API documentation and usage examples for each package.

## Usage

```typescript
import type { Nullish } from "@luolapeikko/core-ts-type";

function processInput(input: Nullish<string>) {
  if (!input) {
    console.log("Input is null or undefined");
  } else {
    console.log(`Input value: ${input}`);
  }
}
```
