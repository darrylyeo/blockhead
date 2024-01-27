import sharp from 'sharp'

export const svgToImageResponse = async ({
	headers,
	svg,
}: {
	headers: Headers,
	svg: string,
}) => {
	if (headers.get('accept')?.includes('image/svg+xml')) {
		return new Response(
			svg,
			{
				headers: new Headers({
					'Content-Type': 'image/svg+xml',
				}),
			}
		)
	}

	else // if (headers.get('accept')?.includes('image/*')) {
		return new Response(
			await sharp(
				Buffer.from(svg)
			)
				.png()
				.toBuffer(),
			{
				headers: new Headers({
					'Content-Type': 'image/png',
				}),
			}
		)
	// }
}
