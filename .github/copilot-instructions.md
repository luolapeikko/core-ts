---
applyTo: "**"
---
# Project idea
- This project build multiple modules to have basic tools to ...
  - check if instance is valid or not
  - asserts if valid or not
  - on some cases dedicated predicate functions (when have some arguments) to simplify usage (i.e. on filtering)

# Project setup
- uses pnpm workspaces
- typescript paths / references to handle development deps (in tsconfig.base.json)
  - paths in tsconfig.base.json
  - all references described on root tsconfig.json
  - each modules tsconfig.json extending root tsconfig.workspace.json and have references to core-ts-type and core-ts-error.
  - each module have own tsconfig.build.json which extends packages tsconfig.json to remove unit test files and example.ts files from build output.
- vitest is used as unit testing, "pnpm t" command on root folder runs build and vitest with coverage
- biome is used as linting, "pnpm run lint:fix" command on root folder tries to fix all lint issues automatically.
- each package files are
  - core.ts which is base validation class with methods (including core.test.ts for unit tests and sometimes core.test-d.ts for type tests)
    - example: StringCore.is(value) checks if value is string
  - assert.ts which have assert methods (including assert.test.ts for unit tests)
    - example: StringAssert.is(value) asserts if value is string, otherwise throws TypeError with detailed message (built with buildValueErr method in core.ts)
  - predicate.ts which have predicate functions (including predicate.test.ts for unit tests)
    - example: ['file.mp3','file.png'].filter(StringPredicate.endsWith('.mp3')) returns ['file.mp3']
  - cast.ts which have cast functions (including cast.test.ts for unit tests)
    - example: NumberCast.intFrom(value) which tries to convert value to integer number or throws TypeError with detailed message (built with buildValueErr method in core.ts)
  - index.ts which exports everything from core.ts

# New Module creation instructions
- Create package named folder to packages/ directory.
- Add module path to tsconfig.workspace.json.
- Add reference to root tsconfig.json.
- Copy package.json, tsconfig.json and tsconfig.build.json from "core-ts-string" module to new package folder.
- Change new module package.json name to "@luolapeikko/{new package name}" and verify/modify that version is "0.0.1"
- Create src/index.ts with content "export * from './core';"
- Create empty src/core.ts file.

# Project general coding standards

## Naming Conventions
- Use PascalCase for class names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- use # for private class members

## Basic type rules for validation methods
- Basic method template for "true" types (like is*)  "public static is<T = unknown>(value: NoInfer<T> | *TargetType*): value is IsGuard<T, *TargetType*>"
  - NoInfer is used to avoid type narrowing issues on union types.
- Basic method template for "false" types (like isNot*)  "public static isNot<T = unknown>(value: T): value is IsNotGuard<T, *TargetType*>"
  - This must not use NoInfer to allow type narrowing to work correctly.

## JSDoc Comments
- All classes, methods, and functions must have JSDoc comments.
- add @template tag for generic types in JSDoc comments
- Include @since tag with version number in all JSDoc comments.
- Add @throws TypeError on assert methods.
- Parameters and return types should be documented and type annotated.
- On more complex methods like predicate/mapping functions, include examples in JSDoc comments (check unit tests for examples)
- Not methods should use style *not* to indicate negation (i.e. isNotEmpty, isNotString)
- If description mentions type used on method (usually real type is second generics on IsGuard or IsNotGuard), use backticks for type names (i.e. `string`, `Array<T>`) .. as example "Asserts that a given value is a *not* an `EmptyString`."
- Check grammar and spelling carefully.

## Code quality
- Always use "pnpm run lint:fix" to apply all linting rules after change.
- "pnpm run lint" can be used to check linting errors.
- Always check "pnpm run validate" to typescript not give any errors. (this runs tsc --noEmit for each modules)

## Unit testing
- All code files should have same prefix test file on same directory (core.ts with core.test.ts)
- All vitest type testing files use same rule but files suffix is test-d.ts
- Use "pnpm run test" to run all unit tests and verify that coverage is 100%
- If like to get more detailed JSON output about coverage, use "pnpm run coverage" command on root folder.
- All unit tests should be always using file from './' index.ts to verify that exports are working correctly.
- Create or update readme.test.ts file to verify that readme usage examples are working correctly.

## Error Handling
- Each core.ts should have own buildValueErr method to build 
- buildValueErr uses valueErrorBuilder function, but makes typeName strict based on core methods (i.e. on StringCore = typeName:  'String' | 'EmptyString' | 'LowerCaseString' | 'UpperCaseString' | 'NumberString' | 'PrefixedString' | 'SuffixedString')

---
applyTo: "**/*.ts"
---
# Project coding standards for TypeScript and React

## TypeScript Guidelines
- Use TypeScript for all new code
- Follow functional programming principles where possible
- Use interfaces for data structures and type definitions
- Prefer immutable data (const, readonly)
- Use optional chaining (?.) and nullish coalescing (??) operators
- Verify TS code with "pnpm run validate" on root folder.
