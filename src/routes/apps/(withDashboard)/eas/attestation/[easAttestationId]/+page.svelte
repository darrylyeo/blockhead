<script lang="ts">
	// Types/constants
	import { EasProvider, easProviderIcons } from '$/api/eas/provider'


	// Context
	import { page } from '$app/stores'
	import { preferences } from '$/state/preferences'

	$: ({
		easAttestationId,
	} = $page.params)

	$: easProvider = $preferences.easProvider ?? EasProvider.Easscan

	let chainId = 1


	// Functions
	import { createQuery } from '@tanstack/svelte-query'


	// Components
	import Loader from '$/components/Loader.svelte'
	import EasAttestation from '../../EasAttestation.svelte'
</script>


<Loader
	loadingMessage={`Loading attestation from ${easProvider}...`}
	loadingIcon={easProviderIcons[easProvider]}
	{...{
		[EasProvider.Easscan]: {
			fromQuery: createQuery({
				queryKey: ['EasAttestation', {
					easProvider,
					chainId,
					attestationId: easAttestationId,
				}],
				queryFn: async ({
					queryKey: [_, {
						chainId,
						attestationId,
					}],
				}) => {
					const { getAttestation } = await import('$/api/eas/easscan')

					const result = await getAttestation({
						chainId,
						attestationId,
					})

					if(!result?.attestation)
						throw `Attestation "${attestationId}" wasn't found.`

					return result.attestation
				},
				staleTime: 10 * 1000,
			}),
		},
	}[easProvider]}
	let:result={attestation}
>
	{#if attestation}
		<EasAttestation
			{attestation}
			isOpen
		/>
	{/if}
</Loader>
