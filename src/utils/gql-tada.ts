import type { TadaDocumentNode } from 'gql.tada'

export const getFragmentFields = (
	document: TadaDocumentNode,
) => (
	(
		document.kind === 'Document' &&
		document.definitions[0]?.kind === 'FragmentDefinition' &&
		document.definitions[0]?.selectionSet?.selections?.length
	) ?
		document.definitions[0]
			.selectionSet
			.selections
			.filter(selection => selection.kind === 'Field')
			.map(field => field.name.value)
			.join('\n')
	:
		''
)
