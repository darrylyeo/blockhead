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
			svelteKitRouteParams: RouteParams,
			signaturePacket: FarcasterFrameSignaturePacket,
		}) => (
			FarcasterFrameAction<FrameRoute, RouteParams, HasTextInput>
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
				svelteKitRouteParams: RouteParams,
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

export const createRedirectUrl = ({
	url,
	appRoute,
	fromFrameRoute,
	toFrameRoute,
}: {
	url: URL,
	appRoute: string,
	fromFrameRoute?: string,
	toFrameRoute?: string,
}) => {
	const newUrl = new URL(
		appRoute,
		url.origin,
	)

	if(fromFrameRoute)
		newUrl.searchParams.set('farcasterFrameRouteFrom', fromFrameRoute)

	if(toFrameRoute)
		newUrl.searchParams.set('farcasterFrameRouteTo', toFrameRoute)

	return newUrl.toString()
}

export const renderButtonFromAction = <
	FrameRoute extends string,
	RouteParams extends Record<string, string | undefined>,
	HasTextInput extends boolean,
>({
	url,
	action,
}: {
	url: URL,
	action: FarcasterFrameAction<FrameRoute, RouteParams, HasTextInput>
}): FarcasterFrameButton | undefined => (
	'toAppRoute' in action ?
		{
			label: action.label,
			action: 'post',
			targetUrl: createRedirectUrl({
				url,
				appRoute: action.toAppRoute,
				toFrameRoute: action.toFrameRoute,
			}),
		}
	: 'toFrameRoute' in action ?
		{
			label: action.label,
			action: 'post',
			targetUrl: createRedirectUrl({
				url,
				appRoute: url.href,
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
import type { openGraphImageGeneratorMeta } from '$/opengraph/imageGenerator'
import { type FarcasterFrameSignaturePacket, createFarcasterFrameServerResponse, serializeFarcasterFrameServerMeta } from '$/api/farcaster/frame'

export const getInitialFarcasterFrameServerMeta = async <
	RouteParams extends Record<string, string | undefined>,
	FrameRoute extends string,
>({
	url,
	routeParams: svelteKitRouteParams,
	openGraphImageMeta,
	farcasterFrameRoutes: frameRoutes,
}: {
	url: URL,
	routeParams: RouteParams,
	openGraphImageMeta: ReturnType<typeof openGraphImageGeneratorMeta>
	farcasterFrameRoutes: FarcasterFrameRoutes<FrameRoute, RouteParams>,
}) => {
	const frameRoute = Object.keys(frameRoutes)[0] as keyof typeof frameRoutes
	const framePage = frameRoutes[frameRoute]

	return serializeFarcasterFrameServerMeta({
		image: {
			url: openGraphImageMeta.url,
			aspectRatio: '1.91:1',
		},
		postUrl: createRedirectUrl({
			url,
			appRoute: url.href,
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

						return renderButtonFromAction({
							url,
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
}) => {
	// Context
	const fromFramePage = frameRoutes[fromFrameRoute]
	const toFramePage = frameRoutes[toFrameRoute]

	const {
		untrustedData: {
			buttonIndex,
		},	
	} = signaturePacket


	// Farcaster client POSTs to base fc:frame:post_url
	if(fromFramePage){
		const actionResolver = fromFramePage?.actions?.[buttonIndex - 1]

		if(actionResolver && 'onClick' in actionResolver){
			const action = await actionResolver.onClick?.({
				svelteKitRouteParams,
				signaturePacket,
			})

			const newUrl = 
				'toAppRoute' in action ?
					createRedirectUrl({
						url,
						appRoute: action.toAppRoute,
						toFrameRoute: action.toFrameRoute,
					})
				: 'toFrameRoute' in action ?
					createRedirectUrl({
						url,
						appRoute: url.href,
						toFrameRoute: action.toFrameRoute,
					})
				:
					url

			return await fetch(newUrl.toString())
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
				url,
				action,
			})

			if(button && button.action === 'post' && button.targetUrl){
				const newUrl = new URL(button.targetUrl)

				return await fetch(newUrl.toString())
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
							url,
							appRoute: url.href,
							toFrameRoute: '/',
						}),
					}
				]
			})
		}
	}

	// Farcaster client POSTs to button fc:frame:button:$idx:target
	else if(toFramePage){
		return createFarcasterFrameServerResponse({
			image: {
				url: url.toString(),
				aspectRatio: '1.91:1',
			},
			postUrl: url.toString(),
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

						return renderButtonFromAction({
							url,
							action,
						})
					})
				)
			)
				.filter(isTruthy),
		})
	}
}
