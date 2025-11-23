<script lang="ts">
	// Types/constants
	import { type Identity, IdentityType } from '$/schema/Identity'
	import type { EvmNetwork } from '$/schema/EvmNetwork'
	import type { EnsName } from '$/schema/EnsDomain'
	import { InputPattern, type TypeForInputPattern } from '$/schema/_patterns'


	// Props
	let {
		name,
		required = false,
		placeholder,
		autofocus = false,
		network,
		value = $bindable(''),
		identity = $bindable(),
		suggestions = [],
		history,
	}: {
		name?: string
		required?: boolean
		placeholder?: string
		autofocus?: boolean
		network?: EvmNetwork['$id']
		value?: string
		identity?: Identity['$id'] | null
		suggestions?: Suggestion[]
		history?: string[]
	} = $props()


	// State
	let matchedPatterns: Partial<TypeForInputPattern> = $state(
		{}
	)

	let matchedIdentity: Identity['$id'] | undefined = $derived(
		matchedPatterns[InputPattern.EvmAddress] ?
			{
				type: IdentityType.EvmActor,
				actor: {
					$network: network || { chainId: 1 },
					address: matchedPatterns[InputPattern.EvmAddress] as `0x${string}`,
				},
			}
		: matchedPatterns[InputPattern.EnsName] ?
			{
				type: IdentityType.EnsDomain,
				ensDomain: {
					name: matchedPatterns[InputPattern.EnsName] as EnsName,
				},
			}
		: matchedPatterns[InputPattern.FarcasterAccountId] ?
			{
				type: IdentityType.FarcasterAccount,
				farcasterAccount: {
					id: matchedPatterns[InputPattern.FarcasterAccountId] as string,
				},
			}
		: matchedPatterns[InputPattern.FarcasterAccountName] ?
			{
				type: IdentityType.FarcasterAccount,
				farcasterAccount: {
					username: matchedPatterns[InputPattern.FarcasterAccountName] as string,
				},
			}
		:
			undefined
	)

	$effect(() => {
		identity = matchedIdentity ?? undefined
	})

	// Validation
	let inputElement = $state(null as HTMLInputElement | null)
	const validationMessage = $derived(
		required && value !== '' && matchedIdentity === undefined
			? 'Please enter a valid address, ENS name, or Farcaster account'
			: ''
	)

	$effect(() => {
		if (!inputElement) return
		inputElement.setCustomValidity(validationMessage)
	})


	// Components
	import PatternInput, { type Suggestion } from './PatternInput.svelte'
</script>


<PatternInput
	bind:inputElement
	{required}
	{placeholder}
	{autofocus}
	{network}
	bind:value
	bind:matchedPatterns
	inputPatterns={[
		InputPattern.EvmAddress,
		InputPattern.EnsName,
		InputPattern.FarcasterAccountId,
		InputPattern.FarcasterAccountName,
	]}
	{suggestions}
	{history}
/>

{#if name}
	<input
		type="hidden"
		name={name}
		value={identity ? JSON.stringify(identity) : ''}
	/>
{/if}
