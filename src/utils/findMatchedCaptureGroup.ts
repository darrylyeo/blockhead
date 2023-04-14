
export const findMatchedCaptureGroup = <T extends string>(regex: RegExp, string: string) => (
	(Object.entries(string.match(regex)?.groups ?? {}).find(_ => _[1]) ?? []) as [T, RegExpMatchArray] | []
)

export const findMatchedCaptureGroupName = <T extends string>(regex: RegExp, string: string) =>
	findMatchedCaptureGroup<T>(regex, string)[0]
