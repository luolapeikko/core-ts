import {UnknownError} from './UnknownError';

export class ErrorCast {
	/**
	 * Get or create an error from the given value, if it's not an error, it will be wrapped in an UnknownError.
	 * @param {unknown} err - Error instance or error message.
	 * @returns {Error | UnknownError} Error instance.
	 * @see {@link UnknownError}
	 * @since v0.0.1
	 * @example
	 * try {
	 *   // ...
	 * } catch (err) {
	 *   console.log(ErrorCast.from(err).message);
	 * }
	 */
	public static from(cause: unknown): Error {
		if (cause instanceof Error) {
			return cause;
		} else if (typeof cause === 'string') {
			return new Error(cause);
		} else {
			return new UnknownError(cause);
		}
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
