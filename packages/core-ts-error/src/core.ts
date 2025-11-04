import type {IsGuard, IsNotGuard} from '@luolapeikko/core-ts-type';
import {ErrorValue} from './value';

/**
 * The `ErrorCore` class provides utility functions for error type checks.
 * @since v0.0.1
 */
export class ErrorCore {
	/**
	 * Checks if the given value is an instance of the {@link Error} class.
	 * @param {NoInfer<T> | Error} err - Value to check.
	 * @returns {boolean} True if the value is an instance of the {@link Error} class; otherwise, false.
	 * @since v0.0.1
	 */
	public static is<T = unknown>(err: NoInfer<T> | Error): err is T & IsGuard<T, Error> {
		return err instanceof Error;
	}

	/**
	 * Checks if the given value is **not** an instance of the {@link Error} class.
	 * @template T - The type of the value to check.
	 * @param {NoInfer<T> | Error} err - The value to check.
	 * @returns {boolean} True if the value is not an instance of the {@link Error} class; otherwise, false.
	 * @since v0.0.1
	 */
	public static isNot<T = unknown>(err: NoInfer<T> | Error): err is IsNotGuard<T, Error> {
		return !(err instanceof Error);
	}

	public static buildValueErr(value: unknown, isNot = false): TypeError {
		return ErrorValue.builder(value, 'Error', isNot);
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
