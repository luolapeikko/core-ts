import type {Loadable, ResolvedLoadable} from '@luolapeikko/core-ts-type';

export class LoadableCore {
	/**
	 * Resolves a {@link Loadable} to a {@link Promise}.
	 * @example
	 * async function demo(loadable: Loadable<string>) {
	 *   const value: string = await LoadableCore.resolve(loadable);
	 * }
	 * @template T The Loadable type.
	 * @param {T} loadable - Loadable value to resolve.
	 * @returns {ResolvedLoadable<T>} Resolved value or Promise that resolves to the value.
	 * @since v0.0.3
	 */
	public static resolve<T extends Loadable<unknown>>(loadable: T): ResolvedLoadable<T> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		return (typeof loadable === 'function' ? loadable() : loadable) as ResolvedLoadable<T>;
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
