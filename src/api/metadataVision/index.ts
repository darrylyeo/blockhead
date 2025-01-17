/**
 * metadata.vision
 * Get OG metadata for any website with a simple API.
 * 
 * {@link https://docs.metadata.vision}
 * 
 * ## Usage
 * Prefix the URL you want to get metadata for with `og.metadata.vision`
 * 
 * ### Request
 * `https://og.metadata.vision/https://ensdata.net`
 * 
 * ### Response
 * ```json
 * {
 *  "ok": true,
 *  "data": {
 *    "logo": "https://ensdata.net/favicon.png",
 *    "author": null,
 *    "date": null,
 *    "datePublished": null,
 *    "dateModified": null,
 *    "description": "Look up Ethereum Name Service text records for any address and get them back in convenient JSON format. Reverse lookup the primary ENS for a wallet address. Match a wallet address or ENS name to a Farcaster profile.",
 *    "feed": null,
 *    "image": "https://ensdata.net/og-image.png",
 *    "audio": null,
 *    "lang": null,
 *    "publisher": null,
 *    "title": "𝐄𝐍𝐒 𝐃𝐚𝐭𝐚 — free API to lookup ENS & Farcaster records",
 *    "video": null,
 *    "url": "https://ensdata.net/"
 *  }
 * }
 * ```
 * 
 * ## Cache
 * All responses are cached for 24 hours from the initial request for a given URL.
 */
export const getUrlMetadata = async (url: string) => (
	await fetch(`https://og.metadata.vision/${url}`)
		.then(async response => {
			const result = await response.json() as (
				| {
					ok: true
					data: {
						logo: string | null
						author: string | null
						date: string | null
						datePublished: string | null
						dateModified: string | null
						description: string | null
						feed: string | null
						image: string | null
						audio: string | null
						lang: string | null
						publisher: string | null
						title: string | null
						video: string | null
						url: string
					}
				}
				| {
					ok: false
					message: string
				}
			)

			if(result.ok !== true)
				throw new Error(result.message)

			if(!response.ok)
				throw result

			return result.data
		})
)
