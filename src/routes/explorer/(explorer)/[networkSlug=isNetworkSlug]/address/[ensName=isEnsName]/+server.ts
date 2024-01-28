// Constants
import { getNetworkColor, networksBySlug } from '$/data/networks'
import { NetworkProvider } from '$/data/networkProviders/types'


// Functions
import { getViemPublicClient } from '$/data/networkProviders'
import { normalize } from 'viem/ens'

import { Etherscan } from '$/api/etherscan'
import { normalizeContractSource as normalizeContractSourceEtherscan } from '$/api/etherscan/normalize'


// OpenGraph
import { renderPreviewSvg } from '$/opengraph/renderPreviewSvg'
import { svgToImageResponse } from '$/opengraph/svgToImageResponse'


// Request handlers
import type { RequestHandler } from './$types'

import type { OpenGraphImageGeneratorParams } from '$/opengraph/imageGenerator'

/**
 * OpenGraph Image generator
 */
export const GET: RequestHandler = async ({
	request,
	url,
	params,
}) => {
	// Context
	const { networkSlug, ensName } = params

	const {
		width,
		height,
	} = Object.fromEntries(url.searchParams.entries()) as unknown as OpenGraphImageGeneratorParams


	// Internal state
	const network = networksBySlug[networkSlug]

	const publicClient = getViemPublicClient({
		network: networksBySlug['ethereum'],
		networkProvider: NetworkProvider.Alchemy,
	})

	const address = publicClient && (
		await publicClient.getEnsAddress({
			name: normalize(ensName),
		})
			.catch(() => undefined)
			|| undefined
	)
	
	const bytecode = publicClient && address && (
		await publicClient.getBytecode({ address })
			.then(contractBytecode => contractBytecode === undefined ? undefined : contractBytecode)
	)

	const contractMetadata = bytecode && await Etherscan.Contracts.getSource({
		chainId: network.chainId,
		contractAddress: address,
	})
		.then(normalizeContractSourceEtherscan)

	const addressType = bytecode && contractMetadata ? 'Contract' : 'Account'

	const contractName = contractMetadata && Object.values(contractMetadata.contractMetadata.settings.compilationTarget)?.[0]

	const sourcePaths = contractMetadata ? Object.keys(contractMetadata.contractMetadata.sources) : undefined


	// Render
	const svg = renderPreviewSvg({
		width,
		height,
		title:
			contractName
				? `${contractName} (${ensName})`
				: `${ensName}`,
		subtitle: address,
		annotation: `${network.name} ${addressType}`,
		body: sourcePaths?.join('\n'),
		url,
		primaryColor: getNetworkColor(network) ?? getNetworkColor(networksBySlug['ethereum']),
	})


	// Response
	return svgToImageResponse({
		headers: request.headers,
		svg,
	})
}
