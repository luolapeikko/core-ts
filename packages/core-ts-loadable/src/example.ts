import type {Loadable} from '@luolapeikko/core-ts-type';
import {LoadableCore} from './core';

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
