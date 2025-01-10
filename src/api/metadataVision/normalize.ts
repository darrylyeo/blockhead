// Types
import type { UrlMetadata } from '$/data/urlMetadata'
import type { getUrlMetadata } from '.'


// Functions
export const normalizeUrlMetadata = (data: Awaited<ReturnType<typeof getUrlMetadata>>): UrlMetadata => ({
	url: data.url,
	...data.title && {
		title: data.title,
	},
	...data.description && {
		description: data.description,
	},
	...data.logo && {
		logo: {
			url: data.logo,
		},
	},
	...data.image && {
		image: {
			url: data.image,
		},
	},
	...data.video && {
		video: {
			url: data.video,
		},
	},
	...data.audio && {
		audio: {
			url: data.audio,
		},
	},
	...data.author && {
		publisher: data.author,
	},
	...data.date && {
		date: new Date(data.date).valueOf(),
	},
	...data.datePublished && {
		datePublished: new Date(data.datePublished).valueOf(),
	},
	...data.dateModified && {
		dateModified: new Date(data.dateModified).valueOf(),
	},
	...data.feed && {
		feed: data.feed,
	},
	...data.lang && {
		language: data.lang,
	},
})
