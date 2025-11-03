import {RecordAssert, RecordCore, RecordMapper, RecordPredicate} from './';

// Type guards
const value: unknown = {name: 'John', age: 30};

if (RecordCore.is(value)) {
	console.log(`Object keys: ${RecordCore.keys(value)}`); // value is typed as Record<string, unknown>
}

// Assertions
function processRecord(input: unknown) {
	RecordAssert.assert(input);
	return RecordCore.values(input); // input is now typed as record, get values safely
}

// Core utilities
const data = {a: 1, b: 2, c: 3};
const keys = RecordCore.keys(data); // ['a', 'b', 'c']
const values = RecordCore.values(data); // [1, 2, 3]
const picked = RecordCore.pick(['a', 'c'], data); // { a: 1, c: 3 }
const omitted = RecordCore.omit(['b'], data); // { a: 1, c: 3 }

// Mapping utilities
const pickMapper = RecordMapper.pick(['a', 'c']); // Function to pick keys
const propMapper = RecordMapper.prop('name'); // Function to get property
const mappedData = pickMapper(data); // Apply the pick mapper
const testObj = {name: 'Test', value: 42};
const nameValue = propMapper(testObj); // Apply the prop mapper

// Predicates for filtering
const objects = [{name: 'John'}, {name: 'Jane'}, {age: 30}];
const johnObjects = objects.filter(RecordPredicate.propEq('name', 'John')); // [{ name: 'John' }]

// Example usage
const testRecord = {foo: 'bar', baz: 42};
const result = processRecord(testRecord);
