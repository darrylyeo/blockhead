// Context
import type { RequestHandler, RouteParams } from './$types'
import { type FrameRoute, farcasterFrameRoutes } from './farcasterFrameRoutes'


// OpenGraph/Farcaster Frame Image Generator
import { type OpenGraphImageGeneratorParams, openGraphImageGeneratorMeta } from '$/opengraph/imageGenerator'

type FarcasterFrameImageGeneratorParams = OpenGraphImageGeneratorParams & {
	farcasterFrameRoute: FrameRoute,
}

// SVG → sharp → PNG
// import { renderPreviewSvg } from '$/opengraph/renderPreviewSvg'
// import { svgToImageResponse } from '$/opengraph/svgToImageResponse'

// Svelte → satori-html → satori → resvg-js → PNG
import { svelteComponentToImageResponse } from '$/opengraph/svelteComponentToImageResponse'

import { load as layoutLoad } from './layout.opengraph'
import LayoutComponent from './layout.opengraph.svelte'

const generateOpenGraphImage = async ({
	request,
	url,
	params,
	fetch,
}: Pick<Parameters<RequestHandler>[0], 'request' | 'url' | 'params' | 'fetch'>) => {
	// Context
	const {
		width,
		height,
		farcasterFrameRoute = '/',
	} = Object.fromEntries(url.searchParams.entries()) as unknown as FarcasterFrameImageGeneratorParams


	// Internal state
	const layoutData = await layoutLoad({
		params,
		fetch,
	})

	const framePage = farcasterFrameRoutes[farcasterFrameRoute]

	const pageComponent = framePage?.pageComponent

	const pageData = await framePage?.pageLoad?.({
		layoutData,
		fetch,
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
	// 			primaryColor: getNetworkColor(network) ?? getNetworkColor(ethereumMainnet),
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
				pageData,
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
import { type FarcasterFrameSignaturePacket, createFarcasterFrameServerResponse, parseFarcasterFrameServerMeta } from '$/api/farcaster/frame'
import { type FarcasterFrameRouteSearchParams, handleFarcasterFrameRouteButtonClick, getInitialFarcasterFrameServerMeta } from '$/utils/farcasterFrameRoutes'

const handleFarcasterFrameButtonClick = async ({
	request,
	url,
	params,
}: Pick<Parameters<RequestHandler>[0], 'request' | 'url' | 'params'>) => {
	const {
		farcasterFrameRouteFrom,
		farcasterFrameRouteTo,
	} = Object.fromEntries(url.searchParams.entries()) as unknown as FarcasterFrameRouteSearchParams<FrameRoute>

	const farcasterFrameSignaturePacket = await request.json() as FarcasterFrameSignaturePacket

	return await handleFarcasterFrameRouteButtonClick({
		url,
		routeParams: params,
		farcasterFrameRoutes,
		farcasterFrameRouteFrom,
		farcasterFrameRouteTo,
		farcasterFrameSignaturePacket,
	})
}

const handleFarcasterFrameRoutePostRedirect = async ({
	url,
	params,
}: {
	url: URL,
	params: RouteParams,
}) => {
	const openGraphImageMeta = openGraphImageGeneratorMeta({
		pageUrl: url,
	})

	const frameMetadata = await getInitialFarcasterFrameServerMeta({
		url,
		routeParams: params,
		imageUrl: openGraphImageMeta.url,
		farcasterFrameRoutes,
	})

	return createFarcasterFrameServerResponse(
		parseFarcasterFrameServerMeta(
			Object.fromEntries(
				frameMetadata
					.map(({ property, content }) => [property, content])
			)
		)
	)
}


// Request handlers
export const GET: RequestHandler = async ({
	request,
	url,
	params,
	fetch,
}) => {
	if(url.searchParams.get('fromFarcasterFrameRoutePostRedirect'))
		return await handleFarcasterFrameRoutePostRedirect({
			url,
			params,
		})

	return generateOpenGraphImage({
		request,
		url,
		params,
		fetch,
	})
}

export const POST: RequestHandler = handleFarcasterFrameButtonClick
