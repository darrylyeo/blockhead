// Types
import type { SvelteComponent } from 'svelte'


// Fonts
import { fonts } from './fonts'


// Functions
import satori from 'satori'
import { html as toReactNode } from 'satori-html'
import { Resvg } from '@resvg/resvg-js'

export const svelteComponentToImageResponse = async (
	component: SvelteComponent,
	props: Record<string, any>,
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

	const html = `${result.html}<style>${result.css.code}</style>`

	const reactNode = toReactNode(html)

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
