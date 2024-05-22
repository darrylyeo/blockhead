// Types
import type { SvelteComponent, ComponentProps } from 'svelte'


// Styles/fonts
import css from './styles.opengraph.css?raw'
import { fonts } from './fonts'


// Functions
export const svelteComponentToImageResponse = async <
	Component extends SvelteComponent
>(
	component: Component,
	props: ComponentProps<Component>,
	{
		headers,
		width,
		height,
	}: {
		headers: Headers,
		width: number,
		height: number,
	},
) => {
	const result = component.render(props)

	const html = `${result.html}<style>${css}</style><style>${result.css.code}</style>`

	const { html: toReactNode } = await import('satori-html')
	const reactNode = toReactNode(html)

	const { default: satori } = await import('satori')
	const svg = await satori(
		reactNode,
		{
			fonts,
			width,
			height,
		}
	)

	if (headers.get('accept')?.includes('image/svg+xml'))
		return new Response(
			svg,
			{
				headers: new Headers({
					'Content-Type': 'image/svg+xml',
				}),
			}
		)

	const { Resvg } = await import('@resvg/resvg-js')
	const png = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: width,
		}
	})
		.render()
		.asPng()

	return new Response(
		png,
		{
			headers: {
				'content-type': 'image/png',
			},
		},
	)
}
