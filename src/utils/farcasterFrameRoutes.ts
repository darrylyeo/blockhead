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
	pageLoad?: () => Promise<ComponentProps<Component>>,
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
	frameRoute,
}: {
	url: URL,
	appRoute: string,
	frameRoute?: string,
}) => {
	const newUrl = new URL(
		appRoute,
		url.origin,
	)

	if(frameRoute)
		newUrl.searchParams.set('farcasterFrameRoute', frameRoute)

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
				frameRoute: action.toFrameRoute,
			}),
		}
	: 'toFrameRoute' in action ?
		{
			label: action.label,
			action: 'post',
			targetUrl: createRedirectUrl({
				url,
				appRoute: url.href,
				frameRoute: action.toFrameRoute,
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


// Server Handler
import { type FarcasterFrameSignaturePacket, createFarcasterFrameServerResponse } from '$/api/farcaster/frame'

export const handleFarcasterFrameRouteButtonClick = async <
	RouteParams extends Record<string, string | undefined>,
	FrameRoute extends string,
>({
	url,
	routeParams: svelteKitRouteParams,
	farcasterFrameRoutes: frameRoutes,
	farcasterFrameRoute: frameRoute,
	farcasterFrameSignaturePacket: signaturePacket,
}: {
	url: URL,
	routeParams: RouteParams,
	farcasterFrameRoutes: FarcasterFrameRoutes<FrameRoute, Record<string, string | undefined>>,
	farcasterFrameRoute: FrameRoute,
	farcasterFrameSignaturePacket: FarcasterFrameSignaturePacket,
}) => {
	// Context
	const framePage = frameRoutes[frameRoute]

	const {
		untrustedData: {
			buttonIndex,
		},	
	} = signaturePacket

	const actionResolver = framePage?.actions?.[buttonIndex - 1]

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
					frameRoute: action.toFrameRoute,
				})
			: 'toFrameRoute' in action ?
				createRedirectUrl({
					url,
					appRoute: url.href,
					frameRoute: action.toFrameRoute,
				})
			:
				url

		return await fetch(newUrl.toString())
	}

	return createFarcasterFrameServerResponse({
		image: {
			url: url.toString(),
			aspectRatio: '1.91:1',
		},
		postUrl: url.toString(),
		buttons: framePage?.actions && (
			await Promise.all(
				framePage.actions?.map(async actionResolver => {
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
