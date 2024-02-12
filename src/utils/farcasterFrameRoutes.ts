// Shims
import shimMapGroupBy from 'map.groupby'
shimMapGroupBy.shim()


// Types
import type { SvelteComponent, ComponentProps } from 'svelte'
import type { FarcasterFrameServerMeta, FarcasterFrameButton } from '$/api/farcaster/frame'

export type FarcasterFrameRoutes<
	FrameRoute extends string,
	RouteParams extends Record<string, string | undefined>,
> = Record<
	FrameRoute,
	FarcasterFramePage<FrameRoute, RouteParams>,
>

export type FarcasterFramePage<
	FrameRoute extends string,
	RouteParams extends Record<string, string | undefined>,
	Component extends SvelteComponent = SvelteComponent,
	HasTextInput extends boolean = boolean,
> = {
	version?: FarcasterFrameServerMeta['version'],
	image?: Partial<FarcasterFrameServerMeta['image']>,
	textInput?: HasTextInput extends true ? string : never,
	actions?: FarcasterFrameActionResolver<FrameRoute, RouteParams>[],
	pageLoad?: (_: { layoutData: Record<string, any> }) => Promise<ComponentProps<Component>>,
	pageComponent?: Component,
}

export type FarcasterFrameActionResolver<
	FrameRoute extends string,
	RouteParams extends Record<string, string | undefined>,
	HasTextInput extends boolean = boolean,
> = (
	| FarcasterFrameAction<FrameRoute, RouteParams, HasTextInput>
	| (
		(_: {
			svelteKitRouteParams?: RouteParams,
			signaturePacket: FarcasterFrameSignaturePacket,
		}) => (
			| FarcasterFrameAction<FrameRoute, RouteParams, HasTextInput>
			| undefined
		)
	)
)

export type FarcasterFrameAction<
	FrameRoute extends string,
	RouteParams extends Record<string, string | undefined>,
	HasTextInput extends boolean,
> = (
	& {
		label: string,
	}
	& (
		| {
			toAppRoute: string,
			toFrameRoute?: FrameRoute,
		}
		| {
			toFrameRoute?: FrameRoute,
		}
		| {
			toExternalUrl?: string,
		}
		| {
			mint?: string,
		}
		| {
			onClick: (_: {
				svelteKitRouteParams?: RouteParams,
				signaturePacket: FarcasterFrameSignaturePacket<HasTextInput>,
			}) => (
				| {
					toAppRoute: string,
					toFrameRoute?: FrameRoute,
				}
				| {
					toFrameRoute?: FrameRoute,
				}
			)
		}
	)
)

export type FarcasterFrameRouteSearchParams<
	FrameRoute extends string,
> = {
	farcasterFrameRouteFrom?: FrameRoute,
	farcasterFrameRouteTo?: FrameRoute,
}


// Submenus
export const createSubmenu = <
	RouteParams extends Record<string, string | undefined>,
	FrameRoute extends string,
	MenuRoute extends string,
>({
	baseRoute,
	menuRoute,
	actions,
}: {
	baseRoute: FrameRoute,
	menuRoute: MenuRoute,
	actions: FarcasterFrameActionResolver<FrameRoute, RouteParams>[],
}) => (
	Object.fromEntries(
		[
			...((
				Map.groupBy(actions, (_, i) => Math.floor(i / 2))
			) as Map<number, FarcasterFrameActionResolver<FrameRoute, RouteParams>[]>)
				.entries(),
		].map(([pageNumber, actions], i, { length: totalPages }) => ([
			`${baseRoute}#${menuRoute}/${pageNumber}`,
			{
				actions: [
					{
						label: '‹ Cancel',
						toFrameRoute: baseRoute,
					},
					...actions,
					{
						label: `More (${pageNumber + 1}/${totalPages})`,
						toFrameRoute: `${baseRoute}#${menuRoute}/${(pageNumber + 1) % totalPages}`
					},
				]
			},
		]))
	) as unknown as FarcasterFrameRoutes<`${FrameRoute}#${MenuRoute}/${number}`, RouteParams>
)


// Functions
import { isTruthy } from './isTruthy'

export const createImageUrl = ({
	origin,
	appRoute,
	frameRoute,
}: {
	origin: string,
	appRoute: string,
	frameRoute: string,
}) => {
	const url = new URL(
		appRoute,
		origin,
	)

	url.searchParams.set('farcasterFrameRoute', frameRoute)

	return url.toString()
}

export const createRedirectUrl = ({
	origin,
	appRoute,
	fromFrameRoute,
	toFrameRoute,
}: {
	origin: string,
	appRoute: string,
	fromFrameRoute?: string,
	toFrameRoute?: string,
}) => {
	const url = new URL(
		appRoute,
		origin,
	)

	if(fromFrameRoute)
		url.searchParams.set('farcasterFrameRouteFrom', fromFrameRoute)

	if(toFrameRoute)
		url.searchParams.set('farcasterFrameRouteTo', toFrameRoute)

	return url.toString()
}

export const renderButtonFromAction = <
	FrameRoute extends string,
	RouteParams extends Record<string, string | undefined>,
	HasTextInput extends boolean,
>({
	origin,
	appRoute,
	action,
}: {
	origin: string,
	appRoute: string,
	action: FarcasterFrameAction<FrameRoute, RouteParams, HasTextInput>
}): FarcasterFrameButton | undefined => (
	'toAppRoute' in action ?
		{
			label: action.label,
			action: 'post',
			targetUrl: createRedirectUrl({
				origin,
				appRoute: action.toAppRoute,
				toFrameRoute: action.toFrameRoute,
			}),
		}
	: 'toFrameRoute' in action ?
		{
			label: action.label,
			action: 'post',
			targetUrl: createRedirectUrl({
				origin,
				appRoute,
				toFrameRoute: action.toFrameRoute,
			}),
		}
	: 'toExternalUrl' in action ?
		{
			label: action.label,
			action: 'link',
			targetUrl: action.toExternalUrl,
		}
	: 'mint' in action ?
		{
			label: action.label,
			action: 'mint',
			targetUrl: action.mint,
		}
	:
		undefined
)


// Server handlers
import { type FarcasterFrameSignaturePacket, createFarcasterFrameServerResponse, serializeFarcasterFrameServerMeta } from '$/api/farcaster/frame'

export const getInitialFarcasterFrameServerMeta = async <
	RouteParams extends Record<string, string | undefined>,
	FrameRoute extends string,
>({
	url,
	routeParams: svelteKitRouteParams,
	imageUrl,
	farcasterFrameRoutes: frameRoutes,
}: {
	url: URL,
	routeParams: RouteParams,
	imageUrl: string,
	farcasterFrameRoutes: FarcasterFrameRoutes<FrameRoute, RouteParams>,
}) => {
	const frameRoute = Object.keys(frameRoutes)[0] as keyof typeof frameRoutes
	const framePage = frameRoutes[frameRoute]

	const origin = url.origin
	const appRoute = url.pathname

	return serializeFarcasterFrameServerMeta({
		image: {
			url: imageUrl,
			aspectRatio: '1.91:1',
		},
		postUrl: createRedirectUrl({
			origin,
			appRoute,
			fromFrameRoute: frameRoute,
		}),
		buttons: framePage.actions && (
			await Promise.all(
				framePage.actions
					.map(async actionResolver => {
						const action = 
							actionResolver && typeof actionResolver === 'function' ?
								await actionResolver?.({
									svelteKitRouteParams,
								})
							:
								actionResolver

						return action && renderButtonFromAction({
							origin,
							appRoute,
							action,
						})
					}),
			)
		)
			.filter(isTruthy)
	})
}

export const handleFarcasterFrameRouteButtonClick = async <
	RouteParams extends Record<string, string | undefined>,
	FrameRoute extends string,
>({
	url,
	routeParams: svelteKitRouteParams,
	farcasterFrameRoutes: frameRoutes,
	farcasterFrameRouteFrom: fromFrameRoute,
	farcasterFrameRouteTo: toFrameRoute,
	farcasterFrameSignaturePacket: signaturePacket,
}: {
	url: URL,
	routeParams: RouteParams,
	farcasterFrameRoutes: FarcasterFrameRoutes<FrameRoute, Record<string, string | undefined>>,
	farcasterFrameRouteFrom: FrameRoute,
	farcasterFrameRouteTo: FrameRoute,
	farcasterFrameSignaturePacket: FarcasterFrameSignaturePacket,
}): Promise<Response> => {
	// Context
	const origin = url.origin
	const appRoute = url.pathname

	const fromFramePage = frameRoutes[fromFrameRoute]
	const toFramePage = frameRoutes[toFrameRoute]

	const {
		untrustedData: {
			buttonIndex,
		},	
	} = signaturePacket


	// Farcaster client POSTs to button fc:frame:button:$idx:target
	if(toFramePage){
		const imageUrl = createImageUrl({
			origin,
			appRoute,
			frameRoute: toFrameRoute,
		})

		const newUrl = createRedirectUrl({
			origin,
			appRoute,
			fromFrameRoute: toFrameRoute,
		})

		return createFarcasterFrameServerResponse({
			image: {
				url: imageUrl,
				aspectRatio: '1.91:1',
			},
			postUrl: newUrl,
			buttons: toFramePage?.actions && (
				await Promise.all(
					toFramePage.actions?.map(async actionResolver => {
						const action = 
							actionResolver && typeof actionResolver === 'function' ?
								await actionResolver?.({
									svelteKitRouteParams,
									signaturePacket,
								})
							:
								actionResolver

						return action && renderButtonFromAction({
							origin,
							appRoute,
							action,
						})
					})
				)
			)
				.filter(isTruthy),
		})
	}

	// Farcaster client POSTs to base fc:frame:post_url
	else if(fromFramePage){
		const actionResolver = fromFramePage?.actions?.[buttonIndex - 1]

		if(actionResolver && 'onClick' in actionResolver){
			const action = await actionResolver.onClick?.({
				svelteKitRouteParams,
				signaturePacket,
			})

			const newUrl = 
				'toAppRoute' in action ?
					createRedirectUrl({
						origin,
						appRoute: action.toAppRoute,
						toFrameRoute: action.toFrameRoute,
					})
				: 'toFrameRoute' in action ?
					createRedirectUrl({
						origin,
						appRoute: url.href,
						toFrameRoute: action.toFrameRoute,
					})
				:
					createRedirectUrl({
						origin,
						appRoute: url.href,
						fromFrameRoute,
					})

			return handleFarcasterFrameRoutePostRedirect({
				url: newUrl,
				signaturePacket,
			})
		}

		// fc:frame:button:$idx:action = "post" – manually POST to button fc:frame:button:$idx:target
		else {
			const action =
				actionResolver && typeof actionResolver === 'function' ?
					await actionResolver?.({
						svelteKitRouteParams,
						signaturePacket,
					})
				:
					actionResolver
			
			const button = action && renderButtonFromAction({
				origin,
				appRoute,
				action,
			})

			if(button && button.action === 'post' && button.targetUrl){
				const { origin, pathname: appRoute, searchParams } = new URL(button.targetUrl)

				const {
					farcasterFrameRouteFrom: fromFrameRoute,
					farcasterFrameRouteTo: toFrameRoute,
				} = Object.fromEntries(searchParams.entries()) as unknown as FarcasterFrameRouteSearchParams<FrameRoute>
				
				return await handleFarcasterFrameRouteButtonClick({
					url: new URL(appRoute, origin),
					routeParams: svelteKitRouteParams,
					farcasterFrameRoutes: frameRoutes,
					farcasterFrameRouteFrom: fromFrameRoute,
					farcasterFrameRouteTo: toFrameRoute,
					farcasterFrameSignaturePacket: signaturePacket,
				})
			}

			// Error – Farcaster client may have incorrect behavior
			return createFarcasterFrameServerResponse({
				image: {
					url: url.toString(),
					aspectRatio: '1.91:1',
				},
				postUrl: url.toString(),
				textInput: 'Error',
				buttons: [
					{
						label: 'Restart',
						action: 'post',
						targetUrl: createRedirectUrl({
							origin,
							appRoute,
							toFrameRoute: '/',
						}),
					}
				]
			})
		}
	}

	else {
		return handleFarcasterFrameRoutePostRedirect({
			url,
			signaturePacket,
		})
	}
}


import { error } from '@sveltejs/kit'

const handleFarcasterFrameRoutePostRedirect = async ({
	url,
	signaturePacket,
}: {
	url: string,
	signaturePacket: FarcasterFrameSignaturePacket,
}) => {
	const { origin, pathname: appRoute } = new URL(url)

	delete signaturePacket.untrustedData.buttonIndex
	delete signaturePacket.untrustedData.inputText

	try {
		const postRedirectUrl = new URL(appRoute, origin)
		postRedirectUrl.searchParams.set('fromFarcasterFrameRoutePostRedirect', 'true')
		return await fetch(postRedirectUrl)
	}catch(e){
		return error(500, `Invalid redirect: ${e.message}`)
	}
}
