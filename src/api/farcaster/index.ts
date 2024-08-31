import type { Ethereum } from '$/data/networks/types'

export type FarcasterUserId = number
export type FarcasterUserName = string
export type FarcasterCastId = `0x${string}`
export type FarcasterCastShortId = `0x${string}`
export type FarcasterChannelId = string

export type FarcasterUser = {
	id: FarcasterUserId;
	name: FarcasterUserName;
	displayName: string;

	avatar?: {
		url: string;
	};

	bio: {
		text: string;
		mentionedUsers?: string[];
	};

	isActive?: boolean;
	isPowerUser?: boolean;

	custodyAddress?: Ethereum.Address;
	verifiedAddresses?: {
		ethereum: Ethereum.Address[];
		solana: string[];
	},

	summary: {
		followerCount: number;
		followingCount: number;
	};

	context?: Record<
		FarcasterUserId,
		{
			following: boolean;
			followedBy: boolean;
			liked?: boolean;
			recasted?: boolean;
		}
	>;
}

export type FarcasterChannel = {
	id: FarcasterChannelId;

	/**
	 * cast parentUrl
	 */
	url: string;

	name?: string;
	description?: string;
	image?: string;

	createdAt?: number;

	leads?: FarcasterUserId[];

	summary?: {
		followerCount: number;
	},
}


export type FarcasterCast = {
	id: FarcasterCastId;

	author: Partial<FarcasterUser>;
	text: string;
	timestamp: number;

	castEmbeds?: (
		| {
			clientUrl: string;
		}
		| {
			castId: FarcasterCastId;
		}
		| {
			userId: FarcasterUserId;
			castIdShort: string;
		}
	)[];
	imageEmbeds?: string[];
	videoEmbeds?: string[];
	urlEmbeds?: string[];
	evmAddressEmbeds?: {
		link: string;
		chainId?: Ethereum.ChainId;
		networkSlug?: Ethereum.NetworkSlug;
		address: Ethereum.Address;
		tokenId?: bigint;
	}[];
	evmTransactionEmbeds?: {
		link: string;
		chainId?: Ethereum.ChainId;
		networkSlug?: Ethereum.NetworkSlug;
		transactionId: Ethereum.TransactionId;
	}[];

	mentionedUsers?: Partial<FarcasterUser>[];

	reactions?: {
		likes?: Partial<Pick<FarcasterUser, 'id' | 'name'>>[];
		likesCount?: number;
		recasts?: Partial<Pick<FarcasterUser, 'id' | 'name'>>[];
		recastsCount?: number;
	};

	rootCast?: Partial<FarcasterCast>;
	parentCast?: Partial<FarcasterCast>;

	replies?: FarcasterCast[];
	repliesCount?: number;

	channel?: FarcasterChannel | Pick<FarcasterChannel, 'id'> | Pick<FarcasterChannel, 'url'>;
}


import { chainIdByDomain as chainIdByDomainEtherscan } from '../etherscan'
import { networkByExplorerUrl } from '$/data/networks'

const chainIdByExplorerUrl = {
	...chainIdByDomainEtherscan, 
	...Object.fromEntries(
		Object.entries(networkByExplorerUrl)
		.map(([url, network]) => [url, network.chainId])
		)
	}


import anchorme from 'anchorme'
import { isTruthy } from '$/utils/isTruthy'

import shimRegexpEscape from 'regexp.escape'
shimRegexpEscape.shim()

const imageCdns = [
	'https://imagedelivery.net',
	'https://i.imgur.com',
]

const imageUrlRegex = new RegExp(
	[
		`^(?:${
			imageCdns
				.map(RegExp.escape)
				.join('|')
		})`,
		`[.](png|jpe?g|gif|webp)$`,
	].join('|'),
	'i'
)

const videoCdns = [
	'https://stream.warpcast.com',
]

const videoUrlRegex = new RegExp(
	[
		`^(?:${
			videoCdns
				.map(RegExp.escape)
				.join('|')
		})`,
		`[.](m3u8|.mp4)$`,
	].join('|'),
	'i'
)

export const extractCastEmbeds = ({
	embeds = [],
	text,
}: {
	embeds?: ({
		castId: FarcasterCastId;
	} | {
		url?: string;
	})[];
	text: string,
}): Pick<FarcasterCast, 'castEmbeds' | 'imageEmbeds' | 'urlEmbeds' | 'evmAddressEmbeds' | 'evmTransactionEmbeds'> => {
	const embedGroups: Partial<Record<
		'image' | 'video' | 'url' | 'cast',
		{
			castId?: FarcasterCastId;
			url?: string;
		}[]
	>> = Object.groupBy(
		[
			...embeds,

			...text && (
				anchorme
					.list(text, false)
					.filter(item => item.isURL)
					.map(item => item.string)
					.filter(url => !embeds.some(embed => 'url' in embed && embed.url === url))
					.map(url => ({
						url,
					}))
			),
		],
		embed => (
			'url' in embed && embed.url ?
				String(embed.url).match(imageUrlRegex) ?
					'image'
				: String(embed.url).match(videoUrlRegex) ?
					'video'
				:
					'url'
			: 'castId' in embed ?
				'cast'
			:
				undefined
		)
	)

	const castEmbeds: {
		clientUrl?: string,
		userId?: FarcasterUserId,
		castId?: FarcasterCastId,
	}[] = [
		...embedGroups.cast ?? [],
		...[
			new RegExp(`${RegExp.escape(`https://warpcast.com`)}/(?<userId>.*)/(?<castIdShort>0x[0-9a-f]{8})`, 'gi'),
			new RegExp(`${RegExp.escape(`https://warpcast.com/~/conversations`)}/(?<castId>0x[0-9a-f]{40})`, 'gi'),
		].flatMap(regex => (
			Array.from(
				text.matchAll(regex),
				match => match?.groups && ({
					clientUrl: match[0],
					userId: Number(match.groups.userId) as FarcasterUserId | undefined,
					castId: match.groups.castId as FarcasterCastId | undefined,
					castIdShort: match.groups.castIdShort as `0x${string}` | undefined,
				} as NonNullable<FarcasterCast['castEmbeds']>[number])
			)
				.filter(isTruthy)
		))
	]

	const imageEmbeds = (embedGroups.image ?? [])
		.map(embed => embed.url!)

	const videoEmbeds = (embedGroups.video ?? [])
		.map(embed => embed.url!)

	const urlEmbeds = (embedGroups.url ?? [])
		.map(embed => embed.url!)
		.filter(url => !castEmbeds.some(clientUrl => clientUrl === url))

	const evmAddressEmbeds = [
		new RegExp(`(?<explorerDomain>${Object.keys(chainIdByExplorerUrl).map(RegExp.escape).join('|')})/address/(?<address>0x[0-9a-f]{40})`, 'gi'),
		new RegExp(`${RegExp.escape(`https://mint.fun`)}/(?<networkSlug>[a-z]+)/(?<address>0x?[0-9a-f]{40})`, 'gi'),
		new RegExp(`${RegExp.escape(`https://zora.co/collect`)}/(?<networkSlug>[a-z]+):(?<address>0x?[0-9a-f]{40})(?:/(?<tokenId>[0-9]+))?`, 'gi'),
		new RegExp(`${RegExp.escape(`https://titles.xyz/collect`)}/(?<networkSlug>[a-z]+)/(?<address>0x?[0-9a-f]{40})`, 'gi'),
	].flatMap(regex => (
		Array.from(
			text.matchAll(regex),
			match => match?.groups && ({
				link: match[0],
				networkSlug: match.groups.networkSlug as Ethereum.NetworkSlug | undefined,
				address: match.groups.address as Ethereum.Address,
				tokenId: match.groups.tokenId !== undefined ? BigInt(match.groups.tokenId) : undefined,
			})
		)
			.filter(isTruthy)
	))

	const evmTransactionEmbeds = [
		new RegExp(`(?<explorerDomain>${Object.keys(chainIdByExplorerUrl).map(RegExp.escape).join('|')})/tx/(?<transactionId>0x[0-9a-f]{64})`, 'gi'),
	].flatMap(regex => (
		Array.from(
			text.matchAll(regex),
			match => match?.groups && ({
				link: match[0],
				chainId: match.groups.explorerDomain !== undefined ? chainIdByExplorerUrl[match.groups.explorerDomain] : undefined,
				transactionId: match.groups.transactionId as Ethereum.TransactionId,
			})
		)
			.filter(isTruthy)
	))

	return {
		castEmbeds,
		imageEmbeds,
		videoEmbeds,
		urlEmbeds,
		evmAddressEmbeds,
		evmTransactionEmbeds,
	}
}

export const getChannelIdFromUrl = (channelUrl: string) => (
	channelUrl.match(
		new RegExp(`${RegExp.escape(`https://warpcast.com/~/channel/`)}(?<channelId>[a-z0-9-]+)`)
	)
		?.groups
		?.channelId
	?? undefined
) as FarcasterChannelId | undefined
