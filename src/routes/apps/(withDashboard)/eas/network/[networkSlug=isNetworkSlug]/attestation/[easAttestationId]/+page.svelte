<script lang="ts">
	// Types/constants
	import { EasProvider, easProviderIcons } from '$/api/eas/provider'


	// Context
	import {
		network,
	} from '$/routes/apps/_appsContext'

	import {
		easAttestationId,
	} from '$/routes/apps/_appsParams'

	import { preferences } from '$/state/preferences'
	$: easProvider = $preferences.easProvider ?? EasProvider.Easscan


	// Functions
	import { createQuery } from '@tanstack/svelte-query'


	// Components
	import Loader from '$/components/Loader.svelte'
	import EasAttestation from '../../../../EasAttestation.svelte'
</script>


<Loader
	loadingMessage={`Loading attestation from ${easProvider}...`}
	loadingIcon={easProviderIcons[easProvider]}
	{...{
		[EasProvider.Easscan]: {
			fromQuery: createQuery({
				queryKey: ['EasAttestation', {
					easProvider,
					chainId: $network.chainId,
					attestationId: $easAttestationId,
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
			network={$network}
			{attestation}
			isOpen
		/>
	{/if}
</Loader>
