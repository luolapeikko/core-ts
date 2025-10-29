import type {ErrorBuildFunc} from '@luolapeikko/core-ts-type';

export class ErrorValue {
	private static errorBuilderInstance: ErrorBuildFunc = ErrorValue.valueBuilder;

	public static builder(value: unknown, typeName: string, isNot: boolean): TypeError {
		return new TypeError(ErrorValue.errorBuilderInstance(value, typeName, isNot));
	}

	public static setCustomErrorStringFunction(customErrorFunction: ErrorBuildFunc | undefined): void {
		ErrorValue.errorBuilderInstance = customErrorFunction ?? ErrorValue.valueBuilder;
	}

	public static prefixBuilder(message: string): string {
		return `Invalid value: ${message}`;
	}

	public static messageBuilder(typeName: string, message: string): string {
		return ErrorValue.prefixBuilder(`${typeName} error, ${message}`);
	}

	private static getStringValue(value: unknown): string | undefined {
		switch (typeof value) {
			case 'bigint':
				return value.toString();
			case 'function':
			case 'symbol':
				return undefined;
			case 'number':
				return Number.isNaN(value) ? 'NaN' : JSON.stringify(value);
			default:
				return JSON.stringify(value);
		}
	}

	private static valueBuilder(value: unknown, typeName: string, isNot: boolean): string {
		const strValue = ErrorValue.getStringValue(value);
		const gotString = strValue === undefined ? `got [${typeof value}]` : `got ${strValue} [${typeof value}]`;
		const expectedString = `expected ${isNot ? 'not ' : ''}${ErrorValue.getArticle(typeName)} ${typeName}`;
		return ErrorValue.prefixBuilder(`${expectedString}, ${gotString}`);
	}

	private static getArticle(word: string): 'a' | 'an' {
		const lower = word.trim().toLowerCase();
		// Some common exceptions where the first letter doesn't match the sound
		const specialCases = [
			/^honest/,
			/^hour/,
			/^heir/,
			/^herb\b/, // American English
		];
		if (specialCases.some((re) => re.test(lower))) {
			return 'an';
		}
		const hardU = [/^uni/, /^user/, /^usual/]; // words where "u" sounds like "you"
		if (hardU.some((re) => re.test(lower))) {
			return 'a';
		}
		// Default: check first character
		return /^[aeiou]/.test(lower) ? 'an' : 'a';
	}

	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
