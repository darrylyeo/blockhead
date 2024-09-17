export type MoxieAuctionId = string
export type MoxieOrderId = string
export type MoxieSubjectId = string


// Functions
export const moxieSubjectIdRegex = /^id:(?<networkId>[a-z]+)|fid:(?<farcasterUserId>\d+)|cid:(?<farcasterChannelId>[a-z0-9]+(?:-[a-z0-9]+)*)$/
