# Core TypeScript String (@luolapeikko/core-ts-loadable)

Loadable type functions for TypeScript applications.

## Features

- Resolver to handle argument as "value", () => "value", Promise<"value"> or () => Promise<"value">

## Installation

```bash
npm install @luolapeikko/core-ts-loadable
```

## Full documentation

See https://luolapeikko.github.io/core-ts/ for detailed API documentation and usage examples for each package.

## Usage

```typescript
import type {Loadable} from '@luolapeikko/core-ts-type';
import {LoadableCore} from '@luolapeikko/core-ts-loadable';

// example resolving a Loadable string
async function demo(loadable: Loadable<string>) {
	const value: string = await LoadableCore.resolve(loadable);
}

// example usage
async function example() {
	const directValue: string = await LoadableCore.resolve('hello');
	const functionValue: string = await LoadableCore.resolve(() => 'hello');
	const promiseValue: string = await LoadableCore.resolve(Promise.resolve('hello'));
	const asyncFunctionValue: string = await LoadableCore.resolve(() => Promise.resolve('hello'));
}
```
