// Shims
import shimMapGroupBy from 'map.groupby'
shimMapGroupBy.shim()


// Types
import type { SvelteComponent, ComponentProps } from 'svelte'
import type { FarcasterFrameServerMeta, FarcasterFrameButton } from '$/api/farcaster/frame'

export type FarcasterFramePage<
	FrameRoute extends string,
	RouteParams extends Record<string, string | undefined>,
	Component extends SvelteComponent,
> = {
	version?: FarcasterFrameServerMeta['version'],
	image?: Partial<FarcasterFrameServerMeta['image']>,
	textInput?: string,
	buttons?: FarcasterFrameRouteButton<FrameRoute, RouteParams>[],
	pageLoad?: () => Promise<ComponentProps<Component>>,
	pageComponent?: Component,
}

export type FarcasterFrameRoutes<
	FrameRoute extends string,
	RouteParams extends Record<string, string | undefined>,
	Component extends SvelteComponent,
> = Record<
	FrameRoute,
	FarcasterFramePage<FrameRoute, RouteParams, Component>
>

type FarcasterFrameRouteButton<
	FrameRoute extends string,
	RouteParams extends Record<string, string | undefined>,
> =
	FarcasterFrameButton
	& {
		toAppRoute?: (params: RouteParams) => string,
		toFrameRoute?: FrameRoute,
	}


// Submenus
export const createSubmenu = <
	RouteParams extends Record<string, string | undefined>,
	FrameRoute extends string,
	MenuRoute extends string,
>({
	baseRoute,
	menuRoute,
	buttons,
}: {
	baseRoute: FrameRoute,
	menuRoute: MenuRoute,
	buttons: FarcasterFrameRouteButton<FrameRoute, RouteParams>[],
}) => (
	Object.fromEntries(
		[
			...((
				Map.groupBy(buttons, (_, i) => Math.floor(i / 2))
			) as Map<number, FarcasterFrameRouteButton<FrameRoute, RouteParams>[]>)
				.entries(),
		].map(([pageNumber, buttons], i, { length: totalPages }) => ([
			`${baseRoute}#${menuRoute}/${pageNumber}`,
			{
				buttons: [
					{
						label: '← Cancel',
						toFrameRoute: baseRoute,
					},
					...buttons,
					{
						label: `More (${pageNumber + 1}/${totalPages})`,
						toFrameRoute: `${baseRoute}#${menuRoute}/${(pageNumber + 1) % totalPages}`
					},
				]
			},
		]))
	) as FarcasterFrameRoutes<`${FrameRoute}#${MenuRoute}/${number}`, RouteParams>
)


// Server Handler
import { type FarcasterFrameSignaturePacket, createFarcasterFrameServerResponse } from '$/api/farcaster/frame'

export const handleFarcasterFrameRouteButtonClick = async <
	FrameRoute extends string,
>({
	farcasterFrameRoutes,
	url,
	farcasterFrameRoute,
	farcasterFrameSignaturePacket,
}: {
	farcasterFrameRoutes: FarcasterFrameRoutes<FrameRoute, Record<string, string | undefined>>,
	url: URL,
	farcasterFrameRoute: FrameRoute,
	signaturePacket: FarcasterFrameSignaturePacket,
}) => {
	// Context
	const oldFrameRoutePath = farcasterFrameRoute ?? '/'

	const {
		untrustedData: {
			buttonIndex,
		},	
	} = farcasterFrameSignaturePacket


	// Internal state
	const oldFrameRoute = farcasterFrameRoutes[oldFrameRoutePath]

	const buttonClicked = oldFrameRoute.buttons?.[buttonIndex - 1]

	const newFrameRoutePath = buttonClicked?.toFrameRoute

	const newFrameRoute = newFrameRoutePath ? farcasterFrameRoutes[newFrameRoutePath] : undefined


	// Response
	const newUrl = new URL(url)

	if(newFrameRoutePath)
		newUrl.searchParams.set('farcasterFrameRoute', newFrameRoutePath)

	return createFarcasterFrameServerResponse({
		image: {
			url: newUrl.toString(),
		},
		postUrl: newUrl.toString(),
		buttons: newFrameRoute?.buttons,
	})
}
