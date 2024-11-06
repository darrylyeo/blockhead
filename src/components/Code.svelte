<script lang="ts">
	// Types/constants
	import { all as allGrammars } from '@wooorm/starry-night'

	const languages = {
		'sol': 'Solidity',
		'vyper': 'Vyper',
		'huff': 'Huff',
	} as const


	// Inputs
	export let code: string
	export let extension: keyof typeof languages | undefined
	export let language: string | undefined

	// (Computed)
	$: if(extension && language === undefined)
		language = languages[extension]


	// Internal state
	$: grammarFlag = language?.toLowerCase()
	$: grammars = allGrammars.filter(grammar => grammarFlag ? grammar.names?.includes(grammarFlag) : false)


	// Functions
	import { createStarryNight } from '@wooorm/starry-night'


	// Components
	import CodeFragment from './CodeFragment.svelte'
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Parsing {language} code..."
	fromPromise={async () => {
		const starryNight = await createStarryNight(grammars)

		const scope = grammarFlag && starryNight.flagToScope(grammarFlag)
		if(!scope) throw new Error(`No scope found for language ${language}.`)

		const node = starryNight.highlight(code, scope)

		return node
	}}
	let:result={node}
>
	{#if node}
		<CodeFragment
			{node}
			{...$$restProps}
		/>
	{/if}
</Loader>
