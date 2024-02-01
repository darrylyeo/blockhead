import type { FarcasterFrameServerMeta, FarcasterFrameButton } from '$/api/farcaster/frame'


export type FarcasterFrameRoutes<
	FrameRoute extends string,
	RouteParams extends Record<string, string | undefined>,
> = Record<
	FrameRoute,
	{
		version?: FarcasterFrameServerMeta['version'],
		image?: Partial<FarcasterFrameServerMeta['image']>,
		buttons?: FarcasterFrameRouteButton<FrameRoute, RouteParams>[],
	}
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
