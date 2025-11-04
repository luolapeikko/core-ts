import {UnknownError} from './UnknownError';

export class ErrorCast {
	/**
	 * Get or create an {@link Error} from the given value, if it's not an error or string, it will be wrapped in an {@link UnknownError}.
	 * @param {unknown} cause - {@link Error} instance or error message.
	 * @returns {Error | UnknownError} {@link Error} or {@link UnknownError} instance.
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
