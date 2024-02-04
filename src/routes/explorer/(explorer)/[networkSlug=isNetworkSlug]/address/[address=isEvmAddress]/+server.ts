// Types/constants
import { getNetworkColor, networksBySlug } from '$/data/networks'
import { NetworkProvider } from '$/data/networkProviders/types'


// Context
import type { RequestHandler } from './$types'
import { type FrameRoute, farcasterFrameRoutes } from './farcasterFrameRoutes'


// Data
import { getViemPublicClient } from '$/data/networkProviders'
import { Etherscan } from '$/api/etherscan'
import { normalizeContractSource as normalizeContractSourceEtherscan } from '$/api/etherscan/normalize'


// OpenGraph/Farcaster Frame Image Generator
import type { OpenGraphImageGeneratorParams } from '$/opengraph/imageGenerator'

type FarcasterFrameImageGeneratorParams = OpenGraphImageGeneratorParams & {
	farcasterFrameRoute: FrameRoute
}

// SVG → sharp → PNG
// import { renderPreviewSvg } from '$/opengraph/renderPreviewSvg'
// import { svgToImageResponse } from '$/opengraph/svgToImageResponse'

// Svelte → satori-html → satori → resvg-js → PNG
import OpenGraphGeneratedImage from '$/opengraph/OpenGraphGeneratedImage.svelte'
import { svelteComponentToImageResponse } from '$/opengraph/svelteComponentToImageResponse'

const generateOpenGraphImage: RequestHandler = async ({
	request,
	url,
	params,
}) => {
	// Context
	const { networkSlug, address } = params

	const {
		width,
		height,
		farcasterFrameRoute = '/',
	} = Object.fromEntries(url.searchParams.entries()) as unknown as FarcasterFrameImageGeneratorParams


	// Internal state
	const network = networksBySlug[networkSlug]

	const publicClient = getViemPublicClient({
		network: networksBySlug['ethereum'],
		networkProvider: NetworkProvider.Alchemy,
	})

	const ensName = publicClient && (
		await publicClient.getEnsName({
			address,
		})
			.catch(() => undefined)
	) || undefined
	
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

	const bodyComponent = farcasterFrameRoutes[farcasterFrameRoute]?.pageComponent
	const bodyComponentProps = await farcasterFrameRoutes[farcasterFrameRoute]?.load?.()


	// SVG → sharp → PNG
	// return svgToImageResponse({
	// 	headers: request.headers,
	// 	svg: (
	// 		renderPreviewSvg({
	// 			width,
	// 			height,
	// 			...(
	// 				contractName && address && ensName ?
	// 					{
	// 						title: `${contractName} (${address})`,
	// 						subtitle: ensName,
	// 					}
	// 				: contractName ?
	// 					{
	// 						title: contractName,
	// 						subtitle: address,
	// 					}
	// 				:
	// 					{
	// 						title: address,
	// 					}
	// 			),
	// 			annotation: `${network.name} ${addressType}`,
	// 			body: sourcePaths?.join('\n'),
	// 			url,
	// 			primaryColor: getNetworkColor(network) ?? getNetworkColor(networksBySlug['ethereum']),
	// 		})
	// 	),
	// })


	// Svelte → satori-html → satori → resvg-js → PNG
	const response = await svelteComponentToImageResponse(
		OpenGraphGeneratedImage,
		{
			width,
			height,
			...(
				contractName && address && ensName ?
					{
						title: `${contractName} (${address})`,
						subtitle: ensName,
					}
				: contractName ?
					{
						title: contractName,
						subtitle: address,
					}
				:
					{
						title: address,
					}
			),
			annotation: `${network.name} ${addressType}`,
			bodyComponent,
			bodyComponentProps,
			url,
			primaryColor: getNetworkColor(network) ?? getNetworkColor(networksBySlug['ethereum']),
		},
		{
			headers: request.headers,
			width,
			height,
		},
	)

	return response
}


// Farcaster Frame Server
import type { FarcasterFrameSignaturePacket } from '$/api/farcaster/frame'
import { handleFarcasterFrameRouteButtonClick } from '$/utils/farcasterFrameRoutes'

const handleFarcasterFrameButtonClick: RequestHandler = async ({
	request,
	url,
}) => {
	const {
		farcasterFrameRoute,
	} = Object.fromEntries(url.searchParams.entries()) as unknown as FarcasterFrameImageGeneratorParams

	const farcasterFrameSignaturePacket = await request.json() as FarcasterFrameSignaturePacket

	return handleFarcasterFrameRouteButtonClick({
		url,
		farcasterFrameRoute,
		farcasterFrameSignaturePacket,
		farcasterFrameRoutes,
	})
}


// Request handlers
export const GET: RequestHandler = generateOpenGraphImage

export const POST: RequestHandler = handleFarcasterFrameButtonClick
