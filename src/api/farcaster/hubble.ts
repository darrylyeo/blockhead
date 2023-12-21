import type { FarcasterCastId, FarcasterUser, FarcasterCast } from '.'


const get = async ({
	endpoint,
	path,
	params
}: {
	endpoint: string,
	path: string,
	params: Record<string, any>,
}) => (
	await fetch(`${endpoint}${path}?${new URLSearchParams(
		Object.entries(params)
			.filter(([, value]) => value !== undefined)
			.map(([key, value]) => [key, String(value)])
	)}`)
		.then(response => response.json())
)


/**
 * Hubble HTTP APIs
 * @link https://www.thehubble.xyz/docs/httpapi/httpapi.html
 */
export namespace Hubble {
	type Pagination = {
		pageSize?: number,
		reverse?: 0 | 1,
		pageToken?: string,
	}
	
	enum Network {
		Mainnet = 'FARCASTER_NETWORK_MAINNET',
	}

	export type Message<Type extends MessageType> = {
		data: {
			type: Type,
			fid: number,
			timestamp: number,
			network: Network,
		} & (
			Type extends MessageType.CastAdd ? {
				castAddBody: {
					text: string,
					mentionsPositions: number[],
					embeds: {
						url: string;
						castId?: FarcasterCastId,
					}[],
					embedsPositions?: number[],
					parentCastId?: {
						fid: number,
						hash: string,
					},
				},
			} : Type extends MessageType.UserDataAdd ? {
				type: MessageType.UserDataAdd,
				fid: number,
				timestamp: number,
				network: Network,
				userDataBody: {
					type: UserDataMessageType,
					value: string,
				},
			} : Type extends MessageType.ReactionAdd ? {
				type: MessageType.ReactionAdd,
				fid: number,
				timestamp: number,
				network: Network,
				reactionBody: {
					type: ReactionMessageType,
					targetCastId: {
						fid: number,
						hash: `0x${string}`,
					}
				},
			} : {}
		),
		hash: string,
		hashScheme: string,
		signature: string,
		signatureScheme: string,
		signer: string,
	}
	
	export enum MessageType {
		CastAdd = 'MESSAGE_TYPE_CAST_ADD',
		UserDataAdd = 'MESSAGE_TYPE_USER_DATA_ADD',
		ReactionAdd = 'MESSAGE_TYPE_REACTION_ADD',
	}
	
	export enum UserDataMessageType {
		Pfp = 'USER_DATA_TYPE_PFP',
		Display = 'USER_DATA_TYPE_DISPLAY',
		Bio = 'USER_DATA_TYPE_BIO',
		Url = 'USER_DATA_TYPE_URL',
		Username = 'USER_DATA_TYPE_USERNAME',
	}
	
	export enum ReactionMessageType {
		Like = 'REACTION_TYPE_LIKE',
		Recast = 'REACTION_TYPE_RECAST',
	}


	/**
	 * Info API
	 * @link https://www.thehubble.xyz/docs/httpapi/info.html
	 */
	export namespace Info {
		/**
		 * Get the Hub's info
		 *
		 * @param dbstats Whether to return DB stats
		 */
		export const info = async (
			endpoint: string,
			{
				dbstats = 1,
			}: {
				dbstats?: 0 | 1,
			} = {}
		) => (
			await get({
				endpoint,
				path: '/v1/info',
				params: {
					dbstats: String(dbstats),
				}
			})
		) as {
			version: string,
			isSyncing: boolean,
			nickname: string,
			rootHash: string,
			dbStats: {
				numMessages: number,
				numFidEvents: number,
				numFnameEvents: number,
			},
			peerId: string,
			hubOperatorFid: number,
		}
	}

	/**
	 * Casts API
	 * @link https://www.thehubble.xyz/docs/httpapi/casts.html
	*/
	export namespace Casts {
		/**
		 * Get a cast by its FID and Hash.
		 *
		 * @param fid The FID of the cast's creator
		 * @param hash The cast's hash
		 */
		export const castById = async (
			endpoint: string,
			{
				fid,
				hash,
			}: {
				fid: number,
				hash: string,
			},
		) => (
			await get({
				endpoint,
				path: '/v1/castById',
				params: {
					fid: String(fid),
					hash,
				}
			})
		) as Message<MessageType.CastAdd>


		/**
		 * Fetch all casts for authored by an FID.
		 *
		 * @param fid The FID of the cast's creator
		 */
		export const castsByFid = async (
			endpoint: string,
			{
				fid,
			}: {
				fid: number,
			},
			{
				pageSize,
				reverse,
				pageToken,
			}: Pagination,
		) => (
			await get({
				endpoint,
				path: '/v1/castsByFid',
				params: {
					fid: String(fid),
					pageSize: String(pageSize),
					reverse: reverse !== undefined ? String(reverse) : undefined,
					pageToken,
				}
			})
		) as {
			messages: Message<MessageType.CastAdd>[],
			nextPageToken: string,
		}

		/**
		 * Fetch all casts by parent cast's FID and Hash OR by the parent's URL
		 *
		 * @param fid The FID of the parent cast
		 * @param hash The parent cast's hash	
		 * @param url The URL of the parent cast	
		 */
		export const castsByParent = async (
			endpoint: string,
			{
				fid,
				hash,
				url,
			}: {
				fid: number,
				hash: string,
			} | {
				url: string,
			},
			{
				pageSize = 100,
				reverse = 0,
				pageToken,
			}: Pagination = {},
		) => (
			await get({
				endpoint,
				path: '/v1/castsByParent',
				params: {
					fid: String(fid),
					hash,
					url,
					pageSize: String(pageSize),
					reverse: reverse !== undefined ? String(reverse) : undefined,
					pageToken,
				}
			})
		) as {
			messages: Message<MessageType.CastAdd>[],
			nextPageToken: string,
		}

		/**
		 * Fetch all casts that mention an FID
		 *
		 * @param fid fid
		 * @param url The URL of the parent cast	
		 */
		export const castsByMention = async (
			endpoint: string,
			{
				fid,
				hash,
				url,
			}: {
				fid: number,
				hash: string,
				url?: string,
			},
			{
				pageSize = 100,
				reverse = 0,
				pageToken,
			}: Pagination = {},
		) => (
			await get({
				endpoint,
				path: '/v1/castsByMention',
				params: {
					fid: String(fid),
					hash,
					url,
					pageSize: String(pageSize),
					reverse: reverse !== undefined ? String(reverse) : undefined,
					pageToken,
				}
			})
		) as {
			messages: Message<MessageType.CastAdd>[],
			nextPageToken: string,
		}
	}

	/**
	 * Reactions API
	 * @link https://www.thehubble.xyz/docs/httpapi/reactions.html
	 */
	export namespace Reactions {
		enum ReactionType {
			/**
			 * Like the target cast
			 */
			REACTION_TYPE_LIKE = 1,
		
			/**
			 * Share target cast to the user's audience
			 */
			REACTION_TYPE_RECAST = 2,
		}


		/**
		 * Get a reaction by its created FID and target Cast.
		 * 
		 * @param fid The FID of the reaction's creator
		 * @param target_fid The FID of the cast's creator
		 * @param target_hash The cast's hash
		 * @param reaction_type The type of reaction, either as a numerical enum value or string representation
		 */
		export const reaction = async (
			endpoint: string,
			{
				fid,
				targetFid,
				targetHash: targetHash,
				reactionType: reactionType,
			}: {
				fid: number,
				targetFid: number,
				targetHash: string,
				reactionType: ReactionType,
			}
		) => (
			await get({
				endpoint,
				path: '/v1/reactionById',
				params: {
					fid: String(fid),
					target_fid: String(targetFid),
					target_hash: targetHash,
					reaction_type: String(reactionType),
				}
			})
		) as Message<MessageType.ReactionAdd>

		/**
		 * Get all reactions by an FID
		 * 
		 * @param fid The FID of the reaction's creator
		 * @param reaction_type The type of reaction, either as a numerical enum value or string representation
		 */
		export const reactionsByFid = async (
			endpoint: string,
			{
				fid,
				reactionType,
			}: {
				fid: number,
				reactionType: ReactionType,
			},
			{
				pageSize = 100,
				reverse = 0,
				pageToken,
			}: Pagination = {},
		) => (
			await get({
				endpoint,
				path: '/v1/reactionsByFid',
				params: {
					fid: String(fid),
					reaction_type: String(reactionType),
					pageSize: String(pageSize),
					reverse: reverse !== undefined ? String(reverse) : undefined,
					pageToken,
				}
			})
		) as {
			messages: Message<MessageType.ReactionAdd>[],
			nextPageToken: string,
		}

		/**
		 * Get all reactions to a cast
		 * 
		 * @param
		 * @param target_hash The hash of the cast
		 * @param reaction_type The type of reaction, either as a numerical enum value or string representation
		 */
		export const reactionsByCast = async (
			endpoint: string,
			{
				targetFid,
				targetHash,
				reactionType,
			}: {
				targetFid: number,
				targetHash: string,
				reactionType: ReactionType,
			},
			{
				pageSize = 100,
				reverse = 0,
				pageToken,
			}: Pagination = {},
		) => (
			await get({
				endpoint,
				path: '/v1/reactionsByCast',
				params: {
					target_fid: String(targetFid),
					target_hash: targetHash,
					reaction_type: String(reactionType),
					pageSize: String(pageSize),
					reverse: reverse !== undefined ? String(reverse) : undefined,
					pageToken,
				}
			})
		) as {
			messages: Message<MessageType.ReactionAdd>[],
			nextPageToken: string,
		}

		/**
		 * Get all reactions to cast's target URL
		 * 
		 * @param url The URL of the parent cast
		 * @param reaction_type The type of reaction, either as a numerical enum value or string representation
		 */
		export const reactionsByTarget = async (
			endpoint: string,
			{
				url,
				reactionType,
			}: {
				url: string,
				reactionType: ReactionType,
			},
			{
				pageSize = 100,
				reverse = 0,
				pageToken,
			}: Pagination = {},
		) => (
			await get({
				endpoint,
				path: '/v1/reactionsByTarget',
				params: {
					url,
					reaction_type: String(reactionType),
					pageSize: String(pageSize),
					reverse: reverse !== undefined ? String(reverse) : undefined,
					pageToken,
				}
			})
		) as {
			messages: Message<MessageType.ReactionAdd>[],
			nextPageToken: string,
		}
	}


	/** 
	 * Links API
	 * @link https://www.thehubble.xyz/docs/httpapi/links.html
	 */
	export namespace Links {
		/**
		 * Get a link by its FID and target FID.
		 * 
		 * @param fid The FID of the link's originator
		 * @param target_fid The FID of the target of the link
		 * @param link_type The type of link, as a string value
		 */
		export const linkById = async (
			endpoint: string,
			{
				fid,
				targetFid,
				linkType,
			}: {
				fid: number,
				targetFid: number,
				linkType: string,
			}
		) => (
			await get({
				endpoint,
				path: '/v1/linkById',
				params: {
					fid: String(fid),
					target_fid: String(targetFid),
					link_type: linkType,
				}
			})
		) as Message

		/**
		 * Get all links from a source FID
		 * 
		 * @param fid The FID of the reaction's creator
		 * @param link_type The type of link, as a string value
		 */
		export const linksByFid = async (
			endpoint: string,
			{
				fid,
				linkType,
			}: {
				fid: number,
				linkType: string,
			},
			{
				pageSize = 100,
				reverse = 0,
				pageToken,
			}: Pagination = {},
		) => (
			await get({
				endpoint,
				path: '/v1/linksByFid',
				params: {
					fid: String(fid),
					link_type: linkType,
					pageSize: String(pageSize),
					reverse: reverse !== undefined ? String(reverse) : undefined,
					pageToken,
				}
			})
		) as {
			messages: Message[],
			nextPageToken: string,
		}

		/**
		 * Get all links to a target FID
		 * 
		 * @param target_fid The FID of the reaction's creator
		 * @param link_type The type of link, as a string value
		 */
		export const linksByTargetFid = async (
			endpoint: string,
			{
				targetFid,
				linkType,
			}: {
				targetFid: number,
				linkType: string,
			},
			{
				pageSize = 100,
				reverse = 0,
				pageToken,
			}: Pagination = {},
		) => (
			await get({
				endpoint,
				path: '/v1/linksByTargetFid',
				params: {
					target_fid: String(targetFid),
					link_type: linkType,
					pageSize: String(pageSize),
					reverse: reverse !== undefined ? String(reverse) : undefined,
					pageToken,
				}
			})
		) as {
			messages: Message[],
			nextPageToken: string,
		}
	}


	/**
	 * UserData API
	 * @link https://www.thehubble.xyz/docs/httpapi/userdata.html
	 */
	export namespace UserData {
		/**
		 * Get UserData for a FID.
		 * 
		 * @param fid The FID that's being requested
		 * @param user_data_type The type of user data, either as a numerical value or type string. If this is ommited, all user data for the FID is returned
		 */
		export const userDataByFid = async (
			endpoint: string,
			{
				fid,
				userDataType,
			}: {
				fid: number,
				userDataType?: number,
			}
		) => (
			await get({
				endpoint,
				path: '/v1/userDataByFid',
				params: {
					fid: String(fid),
					user_data_type: userDataType !== undefined ? String(userDataType) : '',
				}
			})
		) as Message<MessageType.UserDataAdd>
	}


	/**
	 * FIDs API
	 * @link https://www.thehubble.xyz/docs/httpapi/fids.html
	 */
	export namespace Fids {
		/**
		 * Get a list of all the FIDs
		 */
		export const fids = async (
			endpoint: string,
			{
				pageSize,
				reverse,
				pageToken,
			}: Pagination = {},
		) => (
			await get({
				endpoint,
				path: '/v1/fids',
				params: {
					pageSize: String(pageSize),
					reverse: reverse !== undefined ? String(reverse) : undefined,
					pageToken,
				}
			})
		) as {
			fids: number[],
			nextPageToken: string,
		}
	}


	/**
	 * Storage API
	 * @link https://www.thehubble.xyz/docs/httpapi/storagelimits.html
	 */
	export namespace Storage {
		/**
		 * Get an FID's storage limits.
		 * 
		 * @param fid The FID that's being requested
		 */
		export const storageLimitsByFid = async (
			endpoint: string,
			{
				fid,
			}: {
				fid: number,
			}
		) => (
			await get({
				endpoint,
				path: '/v1/storageLimitsByFid',
				params: {
					fid: String(fid),
				}
			})
		) as {
			limits: {
				storeType: string,
				limit: number,
			}[],
		}
	}


	/**
	 * Username Proofs API
	 * @link https://www.thehubble.xyz/docs/httpapi/usernameproofs.html
	 */
	export namespace UsernameProofs {
		/**
		 * Get an proof for a username by the Farcaster username
		 * 
		 * @param name The Farcaster username or ENS address
		 */
		export const userNameProofByName = async (
			endpoint: string,
			{
				name,
			}: {
				name: string,
			}
		) => (
			await get({
				endpoint,
				path: '/v1/userNameProofByName',
				params: {
					name,
				}
			})
		) as {
			timestamp: number,
			name: string,
			owner: string,
			signature: string,
			fid: number,
			type: string,
		}

		/**
		 * Get a list of proofs provided by an FID
		 * 
		 * @param fid The FID being requested
		 */
		export const userNameProofsByFid = async (
			endpoint: string,
			{
				fid,
			}: {
				fid: number,
			}
		) => (
			await get({
				endpoint,
				path: '/v1/userNameProofsByFid',
				params: {
					fid: String(fid),
				}
			})
		) as {
			proofs: {
				timestamp: number,
				name: string,
				owner: string,
				signature: string,
				fid: number,
				type: string,
			}[],
		}
	}


	/**
	 * Verifications API
	 * @link https://www.thehubble.xyz/docs/httpapi/verification.html
	 */
	export namespace Verifications {
		/**
		 * Get a list of verifications provided by an FID
		 * 
		 * @param fid The FID being requested
		 * @param address The optional ETH address to filter by
		 */
		export const verificationsByFid = async (
			endpoint: string,
			{
				fid,
				address,
			}: {
				fid: number,
				address: string,
			},
			{
				pageSize,
				reverse,
				pageToken,
			}: Pagination = {},
		) => (
			await get({
				endpoint,
				path: '/v1/verificationsByFid',
				params: {
					fid: String(fid),
					address,
					pageSize: String(pageSize),
					reverse: reverse !== undefined ? String(reverse) : undefined,
					pageToken,
				}
			})
		) as {
			messages: Message[],
			nextPageToken: string,
		}
	}


	/**
	 * On Chain API
	 * @link https://www.thehubble.xyz/docs/httpapi/onchain.html
	 */
	export namespace OnChain {
		/**
		 * Get a list of signers provided by an FID
		 * 
		 * @param fid The FID being requested
		 * @param signer The optional key of signer
		 */
		export const onChainSignersByFid = async (
			endpoint: string,
			{
				fid,
				signer,
			}: {
				fid: number,
				signer: string,
			}
		) => (
			await get({
				endpoint,
				path: '/v1/onChainSignersByFid',
				params: {
					fid: String(fid),
					signer,
				}
			})
		) as {
			events: {
				type: string,
				chainId: number,
				blockNumber: number,
				blockHash: string,
				blockTimestamp: number,
				transactionHash: string,
				logIndex: number,
				fid: number,
				signerEventBody: {
					key: string,
					keyType: number,
					eventType: string,
					metadata: string,
					metadataType: number,
				},
				txIndex: number,
			}[],
		}

		/**
		 * Get a list of signers provided by an FID
		 * 
		 * @param fid The FID being requested
		 * @param eventType The numeric of string value of the event type being requested. This parameter is required
		 */
		export const onChainEventsByFid = async (
			endpoint: string,
			{
				fid,
				eventType,
			}: {
				fid: number,
				eventType: number,
			}
		) => (
			await get({
				endpoint,
				path: '/v1/onChainEventsByFid',
				params: {
					fid: String(fid),
					event_type: String(eventType),
				}
			})
		) as {
			events: {
				type: string,
				chainId: number,
				blockNumber: number,
				blockHash: string,
				blockTimestamp: number,
				transactionHash: string,
				logIndex: number,
				fid: number,
				signerEventBody: {
					key: string,
					keyType: number,
					eventType: string,
					metadata: string,
					metadataType: number,
				},
				txIndex: number,
			}[],
		}

		/**
		 * Get a list of on chain events for a given Address
		 * 
		 * @param address The ETH address being requested
		 */
		export const onChainIdRegistryEventByAddress = async (
			endpoint: string,
			{
				address,
			}: {
				address: string,
			}
		) => (
			await get({
				endpoint,
				path: '/v1/onChainIdRegistryEventByAddress',
				params: {
					address,
				}
			})
		) as {
			type: string,
			chainId: number,
			blockNumber: number,
			blockHash: string,
			blockTimestamp: number,
			transactionHash: string,
			logIndex: number,
			fid: number,
			idRegisterEventBody: {
				to: string,
				eventType: string,
				from: string,
				recoveryAddress: string,
			},
			txIndex: number,
		}
	}

	
	/**
	 * SubmitMessage API
	 * @link https://www.thehubble.xyz/docs/httpapi/submitmessage.html
	 */
	export namespace SubmitMessage {
		/**
		 * Submit a signed protobuf-serialized message to the Hub
		 * 
		 * @param message The message to be submitted
		 */
		export const submitMessage = async (
			endpoint: string,
			// {
			// 	message,
			// }: {
			// 	message: SignedSerializedMessage,
			// }
		) => (
			await fetch(`${endpoint}/v1/submitMessage`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/octet-stream',
				},
				// body: Message.encode(message).finish(),
			})
				.then(response => response.json())
		) as Message
	}


	/**
	 * Events API
	 * @link https://www.thehubble.xyz/docs/httpapi/events.html
	 */
	export namespace Events {
		type Event = {
			type: string,
			id: number,
			mergeUsernameProofBody: {
				usernameProof: {
					timestamp: number,
					name: string,
					owner: string,
					signature: string,
					fid: number,
					type: string,
				},
			},
		}


		/**
		 * Get an event by its Id
		 * 
		 * @param eventId The Hub Id of the event
		 */
		export const eventById = async (
			endpoint: string,
			{
				eventId,
			}: {
				eventId: number,
			}
		) => (
			await get({
				endpoint,
				path: '/v1/eventById',
				params: {
					event_id: String(eventId),
				}
			})
		) as Event

		/**
		 * Get a page of Hub events
		 * 
		 * @param fromEventId An optional Hub Id to start getting events from. This is also returned from the API as nextPageEventId, which can be used to page through all the Hub events. Set it to 0 to start from the first event
		 */
		export const events = async (
			endpoint: string,
			{
				fromEventId,
			}: {
				fromEventId: number,
			}
		) => (
			await get({
				endpoint,
				path: '/v1/events',
				params: {
					from_event_id: String(fromEventId),
				}
			})
		) as {
			nextPageEventId: number,
			events: Event[],
		}
	}
}
