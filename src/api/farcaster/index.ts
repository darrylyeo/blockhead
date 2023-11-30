export type FarcasterUserId = number
export type FarcasterUserName = string
export type FarcasterCastId = `0x${string}`

export type FarcasterUser = {
	id: FarcasterUserId;
	name: FarcasterUserName;
	displayName: string;

	avatar?: {
		url: string;
	};

	bio: {
		text: string;
		mentions: string[];
	};

	isActive: boolean;

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
