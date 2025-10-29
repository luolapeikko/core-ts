let haveCause: boolean | undefined;
function haveErrorCause(): boolean {
	if (haveCause !== undefined) {
		return haveCause;
	}
	try {
		// Try creating an Error with a cause
		const err = new Error('test', {cause: new Error('cause')});
		haveCause = 'cause' in err;
		/* c8 ignore next 3 */
	} catch {
		haveCause = false;
	}
	return haveCause;
}

interface ErrorLike {
	name: string;
	message: string;
	stack?: string;
	[key: string]: unknown;
}

function isErrorLike(value: unknown): value is ErrorLike {
	if (value instanceof Error) return true;
	if (typeof value !== 'object' || value === null) return false;
	const maybeError = value as Record<string, unknown>;
	return typeof maybeError.message === 'string' && typeof maybeError.name === 'string';
}

/**
 * Builds an error message from an unknown error value.
 * If the error is a string, it is wrapped in quotes.
 * If the error is an Error instance, its message property is used.
 * Otherwise, the error is JSON stringified.
 * @param {unknown} err - The unknown error value to wrap.
 * @returns {string} A string describing the error.
 */
function toMsg(err: unknown): string {
	let msg: string;
	if (typeof err === 'string') {
		msg = `"${err}"`;
	} else if (isErrorLike(err)) {
		msg = `"${err.message}"`;
	} else {
		msg = JSON.stringify(err);
	}
	return `Unknown error: ${msg}`;
}

export class UnknownError extends TypeError {
	/**
	 * Constructor for the UnknownError class.
	 * @param {unknown} cause - The unknown error cause.
	 */

	constructor(cause: unknown) {
		/* c8 ignore next 13 */
		super(toMsg(cause), haveErrorCause() ? {cause} : undefined);
		// on old runtimes, cause is not supported, so we need to set the stack manually
		if (!haveErrorCause()) {
			if (typeof cause === 'object' && cause !== null) {
				this.stack = (cause as Error).stack;
			}
			if (!this.stack) {
				Error.captureStackTrace(this, this.constructor);
			}
			// Set the prototype explicitly to maintain the correct prototype chain
			// @see https://www.typescriptlang.org/docs/handbook/2/classes.html#extends-clauses
			Object.setPrototypeOf(this, UnknownError.prototype);
		}
	}
}
