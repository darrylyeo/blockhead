import type { Ethereum } from '$/data/networks/types'

export type FarcasterUserId = number
export type FarcasterUserName = string
export type FarcasterCastId = `0x${string}`
export type FarcasterCastShortId = `0x${string}`
export type FarcasterChannelSlug = string

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

	custodyAddress: Ethereum.Address;
	verifications: string[];

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
	id: string;
	url: string;
	name: string;
	image?: string;
	leads?: FarcasterUserId[];
}


export type FarcasterCast = {
	id: FarcasterCastId;

	author: Partial<FarcasterUser>;
	text: string;
	timestamp: number;

	castEmbeds?: {
		clientUrl?: string;
		userId?: FarcasterUserId;
		castId?: FarcasterCastId;
		castIdShort?: string;
	}[];
	imageEmbeds?: string[];
	urlEmbeds?: string[];
	evmAddressEmbeds?: {
		link: string;
		chainId?: Ethereum.ChainID;
		networkSlug?: Ethereum.NetworkSlug;
		address: Ethereum.Address;
		tokenId?: bigint;
	}[];
	evmTransactionEmbeds?: {
		link: string;
		chainId?: Ethereum.ChainID;
		networkSlug?: Ethereum.NetworkSlug;
		transactionId: Ethereum.TransactionID;
	}[];

	mentionedUsers?: Partial<FarcasterUser>[];

	reactions?: {
		likes?: Partial<Pick<FarcasterUser, 'id' | 'name'>>[];
		recasts?: Partial<Pick<FarcasterUser, 'id' | 'name'>>[];
	};
	
	parent?: Partial<FarcasterCast>;
	parentUrl?: string;
	replies?: FarcasterCast[];
	repliesCount?: number;
}


import { isTruthy } from '$/utils/isTruthy'

import { chainIdByDomain as chainIdByDomainEtherscan } from '../etherscan'

export const extractCastEmbeds = ({
	embeds,
	text,
}: {
	embeds: ({
		castId: FarcasterCastId;
	} | {
		url?: string;
	})[];
	text: string,
}): Pick<FarcasterCast, 'castEmbeds' | 'imageEmbeds' | 'urlEmbeds' | 'evmAddressEmbeds' | 'evmTransactionEmbeds'> => {
	const embedGroups: Partial<Record<
		'image' | 'url' | 'cast',
		{
			castId?: FarcasterCastId;
			url?: string;
		}[]
	>> = Object.groupBy(
		embeds,
		embed => (
			'url' in embed && embed.url ?
				new URL(embed.url).pathname.match(/\.(png|jpe?g|gif|webp)$/i) ?
					'image'
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
			new RegExp(`https://warpcast.com/(?<userId>.*)/(?<castIdShort>0x[0-9a-f]{8})`, 'gi'),
			new RegExp(`https://warpcast.com/~/conversations/(?<castId>0x[0-9a-f]{40})`, 'gi'),
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
	]

	const imageEmbeds = (embedGroups.image ?? [])
		.map(embed => embed.url!)

	const urlEmbeds = (embedGroups.url ?? [])
		.map(embed => embed.url!)
		.filter(url => !castEmbeds.some(clientUrl => clientUrl === url))

	const evmAddressEmbeds = [
		new RegExp(`(?<explorerDomain>${Object.keys(chainIdByDomainEtherscan).map(RegExp.escape).join('|')})/address/(?<address>0x[0-9a-f]{40})`, 'gi'),
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
		new RegExp(`(?<explorerDomain>${Object.keys(chainIdByDomainEtherscan).map(RegExp.escape).join('|')})/tx/(?<transactionId>0x[0-9a-f]{64})`, 'gi'),
	].flatMap(regex => (
		Array.from(
			text.matchAll(regex),
			match => match?.groups && ({
				link: match[0],
				chainId: match.groups.explorerDomain !== undefined ? chainIdByDomainEtherscan[match.groups.explorerDomain] : undefined,
				transactionId: match.groups.transactionId as Ethereum.TransactionID,
			})
		)
			.filter(isTruthy)
	))

	return {
		castEmbeds,
		imageEmbeds,
		urlEmbeds,
		evmAddressEmbeds,
		evmTransactionEmbeds,
	}
}

export const getChannelFromUrl = (channelUrl: string): FarcasterChannel | undefined => {
	const channelSlug = channelUrl.match(new RegExp(`${RegExp.escape(`https://warpcast.com/~/channel/`)}(?<channelSlug>[a-z0-9-]+)`))?.groups?.channelSlug

	return channelSlug
		? {
			id: channelSlug,
			url: channelUrl,
			name: `/${channelSlug}`,
			image: undefined,
		}
		: undefined
}
