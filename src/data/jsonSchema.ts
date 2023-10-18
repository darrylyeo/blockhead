export type JsonSchema = {
	$id: string,
	$schema: string,
	description: string,
	properties?: Record<string, unknown>,
	required?: string[],
	title: string,
	type: string,
}
