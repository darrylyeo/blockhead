export const findMatchedCaptureGroup = <T extends string>(regex: RegExp, string: string) =>
	Object.entries(string.match(regex)?.groups ?? {}).find(_ => _[1])?.[0] as T
