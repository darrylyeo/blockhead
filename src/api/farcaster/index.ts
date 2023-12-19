import type { Ethereum } from '../../data/networks/types'

export type FarcasterUserId = number
export type FarcasterUserName = string
export type FarcasterCastId = `0x${string}`
// export type FarcasterCastId = `${FarcasterUserId}-${`0x${string}`}`

export type FarcasterUser = {
	id: FarcasterUserId;
	name: FarcasterUserName;
	displayName: string;

	avatar?: {
		url: string;
	};

	bio: {
		text: string;
		mentions?: string[];
	};

	isActive?: boolean;

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
	image: string;
	leads?: FarcasterUserId[];
}


export type FarcasterCast = {
	id: FarcasterCastId;

	author: Partial<FarcasterUser>;
	text: string;
	timestamp: number;

	embeds: Partial<Record<
		'image' | 'url' | 'cast',
		{
			castId?: FarcasterCastId;
			url?: string;
		}[]
	>>;
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
