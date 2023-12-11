import type { Ethereum } from '../../data/networks/types'
import type { FarcasterUser, FarcasterUserId, FarcasterCast, FarcasterChannel, FarcasterCastId } from '../farcaster'

import { ActiveStatus, type User as UserV1, type Cast as CastV1, type CastWithInteractions as CastWithInteractionsV1 } from './v1'
import type { Cast as CastV2, CastWithInteractions as CastWithInteractionsV2, EmbedCastId, EmbedUrl, EmbeddedCast, User as UserV2 } from './v2'

import { isTruthy } from '../../utils/isTruthy'

type Channel = {
	name: string;
	parent_url: string;
	image: string;
	channelId: string;
	lead_fid: FarcasterUserId;
}


export const normalizeUserV1 = (
	user: UserV1,
	viewerUserId?: FarcasterUserId,
): FarcasterUser => ({
	id: user.fid,
	name: user.username,
	displayName: user.displayName,

	avatar: {
		url: user.pfp.url,
	},

	bio: {
		text: user.profile.bio.text,
		mentions: user.profile.bio.mentions,
	},

	isActive: user.activeStatus === ActiveStatus.Active,

	verifications: user.verifications,

	summary: {
		followerCount: user.followerCount,
		followingCount: user.followingCount,
	},

	context: user.viewerContext && viewerUserId !== undefined
		? {
			[viewerUserId]: {
				following: user.viewerContext.following,
				followedBy: user.viewerContext.followedBy,
				liked: user.viewerContext.liked,
				recasted: user.viewerContext.recasted,
			},
		}
		: undefined,
})

export const normalizeUserV2 = (
	user: UserV2,
	viewerUserId?: FarcasterUserId,
): FarcasterUser => ({
	id: user.fid,
	name: user.username,
	displayName: user.display_name,

	avatar: {
		url: user.pfp_url,
	},

	bio: user.profile && {
		text: user.profile.bio.text,
		mentions: user.profile.bio.mentioned_profiles,
	},

	isActive: user.active_status === ActiveStatus.Active,

	verifications: user.verifications,

	summary: {
		followerCount: user.follower_count,
		followingCount: user.following_count,
	},

	context: user.viewer_context && viewerUserId !== undefined
		? {
			[viewerUserId]: {
				following: user.viewer_context.following,
				followedBy: user.viewer_context.followed_by,
			},
		}
		: undefined,
})

export const normalizeChannel = (channel: Channel): FarcasterChannel => ({
	id: channel.channelId,
	url: channel.parent_url,
	name: channel.name,
	image: channel.image,
	leads: [channel.lead_fid],
})

export const normalizeCastWithInteractions = (cast: CastWithInteractionsV1): CastWithInteractionsV2 => ({
	hash: cast.hash,
	parent_hash: cast.parentHash,
	parent_url: cast.parentUrl,
	parent_author: cast.parentAuthor,
	author: cast.author,
	text: cast.text,
	timestamp: cast.timestamp,
	embeds: cast.embeds,
	reactions: {
		likes: Array.from({ length: cast.reactions.count }, (_, i) => ({
			fid: cast.reactions.fids[i],
			fname: cast.reactions.fnames[i],
		})),
	},
})


export const normalizeCastV1 = (cast: CastV1 | CastWithInteractionsV1): FarcasterCast => ({
	id: cast.hash as `0x${string}`,
	author: {
		id: cast.author.fid as FarcasterUserId,
	},
	text: cast.text,
	embeds: cast.embeds,
	reactions: 'reactions' in cast && {
		likes: cast.reactions.fids.map(fid => ({
			id: fid,
		})),
		recasts: cast.reactions.recasts.map(reaction => ({
			id: reaction.fid,
			name: reaction.fname,
		})),
	},
	parent: {
		id: cast.parentHash as `0x${string}`,
	}
})

export const normalizeCastV2 = (cast: CastV2 | CastWithInteractionsV2): FarcasterCast => ({
	id: cast.hash as FarcasterCastId,
	text: cast.text,
	...normalizeCastEmbeds(cast),

	author: normalizeUserV2(cast.author),

	timestamp: new Date(cast.timestamp).valueOf(),

	...'mentioned_profiles' in cast && {
		mentionedUsers: cast.mentioned_profiles.map(user => normalizeUserV2(user)),
	},

	...'reactions' in cast && {
		reactions: {
			likes: cast.reactions.likes.map(reaction => ({
				id: reaction.fid,
			})),
			recasts: cast.reactions.recasts.map(reaction => ({
				id: reaction.fid,
				name: reaction.fname,
			})),
		},
	},

	parent: {
		id: cast.parent_hash as FarcasterCastId,
		author: {
			id: Number(cast.parent_author?.fid) ?? undefined as FarcasterUserId | undefined,
		}
	},
	...cast.parent_url && {
		parentUrl: cast.parent_url,
	},

	...'replies' in cast && {
		repliesCount: cast.replies.count,
	},
})


const normalizeCastEmbeds = (cast: CastV2) => {
	const embeds: Record<'image' | 'url' | 'cast', EmbeddedCast[]> = Object.groupBy(
		cast.embeds.map(embed => (
			'cast_id' in embed
				? {
					castId: embed.cast_id,
				}
				: {
					url: embed.url,
				}
		)),
		(embed) => (
			'url' in embed ?
				embed.url.match(/\.(png|jpe?g|gif)$/i) ?
					'image'
				:
					'url'
			: 'cast_id' in embed ?
				'cast'
			:
				undefined
		)
	)

	// const encodeCastId = (castIdObject: CastId) => `${castIdObject.fid}-${castIdObject.hash}` as FarcasterCastId

	const castEmbeds: {
		clientUrl?: string,
		userId?: FarcasterUserId,
		castId?: FarcasterCastId,
	}[] = [
		...((embeds.cast ?? []) as EmbedCastId[])
			.map(embed => embed.cast_id)
			.map(castId => ({
				userId: castId.fid,
				castId: castId.hash as FarcasterCastId,
			})),
			// .map(encodeCastId),
		...extractCastEmbeds(cast.text)
	]

	const imageEmbeds = ((embeds.image ?? []) as EmbedUrl[]).map(embed => embed.url)
	const urlEmbeds = ((embeds.url ?? []) as EmbedUrl[]).map(embed => embed.url)

	// const evmAddressEmbeds = [...new Set(cast.text.match(/(?:0x)?[0-9a-f]{40}/gi))]
	// const evmAddressEmbeds = [
	// 	...Array.from(
	// 		cast.text.matchAll(regex),
	// 		// cast.text.matchAll(/(?<networkSlug>[a-z]+:)?(?<address>(?:0x)?[0-9a-f]{40})/gi),
	// 		match => match?.groups && ({
	// 			networkSlug: match.groups.networkSlug as string | undefined,
	// 			address: match.groups.address as Ethereum.Address,
	// 		})
	// 	)
	// 		.filter(isTruthy)
	// ]

	const evmAddressEmbeds = [
		// /(?<networkSlug>[a-z]+:)?(?<address>(?:0x)?[0-9a-f]{40})/gi,
		new RegExp(`${RegExp.escape(`https://mint.fun`)}/(?<networkSlug>[a-z]+)/(?<address>(?:0x)?[0-9a-f]{40})`, 'gi'),
		new RegExp(`${RegExp.escape(`https://zora.co/collect`)}/(?<networkSlug>[a-z]+)/(?<address>(?:0x)?[0-9a-f]{40})/(?<tokenId>[0-9]+)`, 'gi'),
		new RegExp(`${RegExp.escape(`https://titles.xyz/collect`)}/(?<networkSlug>[a-z]+)/(?<address>(?:0x)?[0-9a-f]{40})`, 'gi'),
	].flatMap(regex => (
		Array.from(
			cast.text.matchAll(regex),
			match => match?.groups && ({
				link: match[0],
				networkSlug: match.groups.networkSlug as Ethereum.NetworkSlug | undefined,
				address: match.groups.address as Ethereum.Address,
				tokenId: match.groups.tokenId !== undefined ? BigInt(match.groups.tokenId) : undefined,
			})
		)
			.filter(isTruthy)
	))
	// const console.log({ embeds, castEmbeds, imageEmbeds, urlEmbeds })

	return {
		embeds,
		castEmbeds,
		imageEmbeds,
		urlEmbeds,
		evmAddressEmbeds,
	}
}

const extractCastEmbeds = (text: string) => (
	// Array.from(
	// 	text.matchAll(new RegExp(`https://warpcast.com/(?<userId>.*)/(?<castId>0x[0-9a-f]{8})`, 'gi')),
	// 	match => match?.groups && ({
	// 		userId: Number(match.groups.userId) as FarcasterUserId | undefined,
	// 		castId: match.groups.castId as FarcasterCastId | undefined,
	// 	})
	// )
	// 	.filter(isTruthy)
	[
		new RegExp(`https://warpcast.com/(?<userId>.*)/(?<castIdShort>0x[0-9a-f]{8})`, 'gi'),
	].flatMap(regex => (
		Array.from(
			text.matchAll(regex),
			match => match?.groups && ({
				clientUrl: match[0],
				userId: Number(match.groups.userId) as FarcasterUserId | undefined,
				castId: match.groups.castId as FarcasterCastId | undefined,
				castIdShort: match.groups.castIdShort as `0x${string}` | undefined,
			})
		)
			.filter(isTruthy)
	))
)
