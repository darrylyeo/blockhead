// Context
import type { RequestHandler } from './$types'
import { type FrameRoute, farcasterFrameRoutes } from './farcasterFrameRoutes'


// OpenGraph/Farcaster Frame Image Generator
import type { OpenGraphImageGeneratorParams } from '$/opengraph/imageGenerator'

type FarcasterFrameImageGeneratorParams = OpenGraphImageGeneratorParams & {
	farcasterFrameRoute: FrameRoute
}

// SVG → sharp → PNG
// import { renderPreviewSvg } from '$/opengraph/renderPreviewSvg'
// import { svgToImageResponse } from '$/opengraph/svgToImageResponse'

// Svelte → satori-html → satori → resvg-js → PNG
import { svelteComponentToImageResponse } from '$/opengraph/svelteComponentToImageResponse'

import { load as layoutLoad } from './layout.opengraph'
import LayoutComponent from './layout.opengraph.svelte'

const generateOpenGraphImage: RequestHandler = async ({
	request,
	url,
	params,
}) => {
	// Context
	const {
		width,
		height,
		farcasterFrameRoute = '/',
	} = Object.fromEntries(url.searchParams.entries()) as unknown as FarcasterFrameImageGeneratorParams


	// Internal state
	const layoutData = await layoutLoad(params)

	const pageComponent = farcasterFrameRoutes[farcasterFrameRoute]?.pageComponent

	const pageData = await farcasterFrameRoutes[farcasterFrameRoute]?.pageLoad?.({
		layoutData,
	}) ?? layoutData


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
		LayoutComponent,
		{
			width,
			height,
			url,
			data: layoutData,
			pageComponent,
			pageProps: {
				data: pageData,
			},
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
	params,
}) => {
	const {
		farcasterFrameRoute,
	} = Object.fromEntries(url.searchParams.entries()) as unknown as FarcasterFrameImageGeneratorParams

	const farcasterFrameSignaturePacket = await request.json() as FarcasterFrameSignaturePacket

	return handleFarcasterFrameRouteButtonClick({
		url,
		params,
		farcasterFrameRoute,
		farcasterFrameSignaturePacket,
		farcasterFrameRoutes,
	})
}


// Request handlers
export const GET: RequestHandler = generateOpenGraphImage

export const POST: RequestHandler = handleFarcasterFrameButtonClick
