/* eslint-disable */
/* prettier-ignore */

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": {
      "name": "Subscription"
    },
    "types": [
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "invitesLeft",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "alreadyInvited",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AlreadyInvitedCheckRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "invited",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "InvitedResult",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "rel",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "RelRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "cur",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CurRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "gdm",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Url",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "GdmRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "gct",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "GctRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "iss",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PrfResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "PriRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "intotal",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "InTotalRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "challenge",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AuthChallengeResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ChallengeRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "verify",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "VerifyRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "txIdToTxHash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "TxHash",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "txId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "TxId",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "claimableHandles",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ClaimableHandles",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "claimableStatus",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ClaimStatus",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "isIDKitPhoneVerified",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "dataAvailabilitySubmitters",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DataAvailabilitySubmittersResult",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "dataAvailabilitySummary",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DataAvailabilitySummaryResult",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "dataAvailabilityTransactions",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DataAvailabilityTransactionsResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "DataAvailabilityTransactionsRequest",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "dataAvailabilityTransaction",
            "type": {
              "kind": "UNION",
              "name": "DataAvailabilityTransactionUnion",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DataAvailabilityTransactionRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "explorePublications",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ExplorePublicationResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ExplorePublicationRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "exploreProfiles",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ExploreProfileResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ExploreProfilesRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "feed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedFeedResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "FeedRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "feedHighlights",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedTimelineResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "FeedHighlightsRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "pendingApprovalFollows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PendingApproveFollowsResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "PendingApprovalFollowsRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "doesFollow",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "DoesFollowResponse",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DoesFollowRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "following",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedFollowingResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "FollowingRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "followers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedFollowersResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "FollowersRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "followerNftOwnedTokenIds",
            "type": {
              "kind": "OBJECT",
              "name": "FollowerNftOwnedTokenIds",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "FollowerNftOwnedTokenIdsRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "mutualFollowersProfiles",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedProfileResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "MutualFollowersProfilesQueryRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "ping",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "hasTxHashBeenIndexed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "TransactionResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "HasTxHashBeenIndexedRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "internalPin",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "InternalPinResult",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "InternalPinRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "enabledModuleCurrencies",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Erc20",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "approvedModuleAllowanceAmount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ApprovedAllowanceAmount",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ApprovedModuleAllowanceAmountRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "generateModuleCurrencyApprovalData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "GenerateModuleCurrencyApproval",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "GenerateModuleCurrencyApprovalDataRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "profileFollowModuleBeenRedeemed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ProfileFollowModuleBeenRedeemedRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "enabledModules",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EnabledModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "unknownEnabledModules",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EnabledModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "nftGalleries",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NftGallery",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "NftGalleriesRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nfts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "NFTsResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "NFTsRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "searchNfts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "NFTsResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "NFTSearchRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nftOwnershipChallenge",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "NftOwnershipChallengeResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "NftOwnershipChallengeRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "notifications",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedNotificationResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "NotificationRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "profileOnChainIdentity",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "OnChainIdentity",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ProfileOnChainIdentityRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "profileInterests",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ProfileInterest",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "profiles",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedProfileResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ProfileQueryRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "profile",
            "type": {
              "kind": "OBJECT",
              "name": "Profile",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SingleProfileQueryRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "recommendedProfiles",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Profile",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "RecommendedProfileOptions",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "defaultProfile",
            "type": {
              "kind": "OBJECT",
              "name": "Profile",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DefaultProfileRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "profileGuardianInformation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ProfileGuardianResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ProfileGuardianRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "globalProtocolStats",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "GlobalProtocolStats",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "GlobalProtocolStatsRequest",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "proxyActionStatus",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "ProxyActionStatusResultUnion",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "proxyActionId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ProxyActionId",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "validatePublicationMetadata",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PublicationValidateMetadataResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ValidatePublicationMetadataRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "publicationMetadataStatus",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PublicationMetadataStatus",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "GetPublicationMetadataStatusRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "publications",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedPublicationResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "PublicationsQueryRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "publication",
            "type": {
              "kind": "UNION",
              "name": "Publication",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "PublicationQueryRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "whoCollectedPublication",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedWhoCollectedResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "WhoCollectedPublicationRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "profilePublicationsForSale",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedProfilePublicationsForSaleResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ProfilePublicationsForSaleRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "allPublicationsTags",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedAllPublicationsTagsResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AllPublicationsTagsRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "publicationsProfileBookmarks",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedPublicationResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "PublicationsProfileBookmarkedQueryRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "forYou",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedForYouResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "PublicationForYouRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "whoReactedPublication",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedWhoReactedResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "WhoReactedPublicationRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "relayQueues",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "RelayQueueResult",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "profilePublicationRevenue",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ProfilePublicationRevenueResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ProfilePublicationRevenueQueryRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "publicationRevenue",
            "type": {
              "kind": "OBJECT",
              "name": "PublicationRevenue",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "PublicationRevenueQueryRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "profileFollowRevenue",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "FollowRevenueResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ProfileFollowRevenueQueryRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "search",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "SearchResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SearchQueryRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "userSigNonces",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserSigNonces",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Int"
      },
      {
        "kind": "SCALAR",
        "name": "Boolean"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AlreadyInvitedCheckRequest",
        "inputFields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "EthereumAddress"
      },
      {
        "kind": "OBJECT",
        "name": "InvitedResult",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "when",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "DateTime"
      },
      {
        "kind": "SCALAR",
        "name": "Void"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "RelRequest",
        "inputFields": [
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "ethereumAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "String"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CurRequest",
        "inputFields": [
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Url"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "GdmRequest",
        "inputFields": [
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "GctRequest",
        "inputFields": [
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "hhh",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PrfResponse",
        "fields": [
          {
            "name": "ss",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "dd",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PriRequest",
        "inputFields": [
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "hhh",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "InTotalRequest",
        "inputFields": [
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "ethereumAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AuthChallengeResult",
        "fields": [
          {
            "name": "text",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ChallengeRequest",
        "inputFields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "VerifyRequest",
        "inputFields": [
          {
            "name": "accessToken",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Jwt",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Jwt"
      },
      {
        "kind": "SCALAR",
        "name": "TxHash"
      },
      {
        "kind": "SCALAR",
        "name": "TxId"
      },
      {
        "kind": "OBJECT",
        "name": "ClaimableHandles",
        "fields": [
          {
            "name": "reservedHandles",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ReservedClaimableHandle",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "canClaimFreeTextHandle",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ReservedClaimableHandle",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "HandleClaimIdScalar",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "handle",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Handle",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "source",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiry",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "HandleClaimIdScalar"
      },
      {
        "kind": "SCALAR",
        "name": "Handle"
      },
      {
        "kind": "ENUM",
        "name": "ClaimStatus",
        "enumValues": [
          {
            "name": "ALREADY_CLAIMED"
          },
          {
            "name": "CLAIM_FAILED"
          },
          {
            "name": "NOT_CLAIMED"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "DataAvailabilitySubmittersResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "DataAvailabilitySubmitterResult",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DataAvailabilitySubmitterResult",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalTransactions",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PaginatedResultInfo",
        "fields": [
          {
            "name": "prev",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "next",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "totalCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Cursor"
      },
      {
        "kind": "OBJECT",
        "name": "DataAvailabilitySummaryResult",
        "fields": [
          {
            "name": "totalTransactions",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DataAvailabilityTransactionsResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "DataAvailabilityTransactionUnion",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "DataAvailabilityTransactionUnion",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "DataAvailabilityPost"
          },
          {
            "kind": "OBJECT",
            "name": "DataAvailabilityComment"
          },
          {
            "kind": "OBJECT",
            "name": "DataAvailabilityMirror"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "DataAvailabilityPost",
        "fields": [
          {
            "name": "transactionId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "submitter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "appId",
            "type": {
              "kind": "SCALAR",
              "name": "Sources",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "verificationStatus",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "DataAvailabilityVerificationStatusUnion",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "publicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Sources"
      },
      {
        "kind": "UNION",
        "name": "DataAvailabilityVerificationStatusUnion",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "DataAvailabilityVerificationStatusSuccess"
          },
          {
            "kind": "OBJECT",
            "name": "DataAvailabilityVerificationStatusFailure"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "DataAvailabilityVerificationStatusSuccess",
        "fields": [
          {
            "name": "verified",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DataAvailabilityVerificationStatusFailure",
        "fields": [
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "MomokaValidatorError",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "MomokaValidatorError",
        "enumValues": [
          {
            "name": "NO_SIGNATURE_SUBMITTER"
          },
          {
            "name": "INVALID_SIGNATURE_SUBMITTER"
          },
          {
            "name": "TIMESTAMP_PROOF_INVALID_SIGNATURE"
          },
          {
            "name": "TIMESTAMP_PROOF_INVALID_TYPE"
          },
          {
            "name": "TIMESTAMP_PROOF_INVALID_DA_ID"
          },
          {
            "name": "TIMESTAMP_PROOF_NOT_SUBMITTER"
          },
          {
            "name": "CAN_NOT_CONNECT_TO_BUNDLR"
          },
          {
            "name": "INVALID_TX_ID"
          },
          {
            "name": "INVALID_FORMATTED_TYPED_DATA"
          },
          {
            "name": "BLOCK_CANT_BE_READ_FROM_NODE"
          },
          {
            "name": "DATA_CANT_BE_READ_FROM_NODE"
          },
          {
            "name": "SIMULATION_NODE_COULD_NOT_RUN"
          },
          {
            "name": "SIMULATION_FAILED"
          },
          {
            "name": "EVENT_MISMATCH"
          },
          {
            "name": "INVALID_EVENT_TIMESTAMP"
          },
          {
            "name": "INVALID_TYPED_DATA_DEADLINE_TIMESTAMP"
          },
          {
            "name": "GENERATED_PUBLICATION_ID_MISMATCH"
          },
          {
            "name": "INVALID_POINTER_SET_NOT_NEEDED"
          },
          {
            "name": "POINTER_FAILED_VERIFICATION"
          },
          {
            "name": "NOT_CLOSEST_BLOCK"
          },
          {
            "name": "BLOCK_TOO_FAR"
          },
          {
            "name": "PUBLICATION_NO_POINTER"
          },
          {
            "name": "PUBLICATION_NONE_DA"
          },
          {
            "name": "PUBLICATION_NONCE_INVALID"
          },
          {
            "name": "PUBLICATION_SIGNER_NOT_ALLOWED"
          },
          {
            "name": "CHAIN_SIGNATURE_ALREADY_USED"
          },
          {
            "name": "POTENTIAL_REORG"
          },
          {
            "name": "UNKNOWN"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Profile",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "bio",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followNftAddress",
            "type": {
              "kind": "SCALAR",
              "name": "ContractAddress",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "metadata",
            "type": {
              "kind": "SCALAR",
              "name": "Url",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "handle",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Handle",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "picture",
            "type": {
              "kind": "UNION",
              "name": "ProfileMedia",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "coverPicture",
            "type": {
              "kind": "UNION",
              "name": "ProfileMedia",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "ownedBy",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "dispatcher",
            "type": {
              "kind": "OBJECT",
              "name": "Dispatcher",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stats",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ProfileStats",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "followModule",
            "type": {
              "kind": "UNION",
              "name": "FollowModule",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "isDefault",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "attributes",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Attribute",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "onChainIdentity",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "OnChainIdentity",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "interests",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ProfileInterest",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "isFollowedByMe",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "isFinalisedOnChain",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "isFollowing",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "who",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "invitedBy",
            "type": {
              "kind": "OBJECT",
              "name": "Profile",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "ProfileId"
      },
      {
        "kind": "SCALAR",
        "name": "ContractAddress"
      },
      {
        "kind": "UNION",
        "name": "ProfileMedia",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "NftImage"
          },
          {
            "kind": "OBJECT",
            "name": "MediaSet"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NftImage",
        "fields": [
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "uri",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Url",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "chainId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "verified",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MediaSet",
        "fields": [
          {
            "name": "onChain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Media",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "original",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Media",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "optimized",
            "type": {
              "kind": "OBJECT",
              "name": "Media",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "small",
            "type": {
              "kind": "OBJECT",
              "name": "Media",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "medium",
            "type": {
              "kind": "OBJECT",
              "name": "Media",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "transformed",
            "type": {
              "kind": "OBJECT",
              "name": "Media",
              "ofType": null
            },
            "args": [
              {
                "name": "params",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "MediaTransformParams",
                    "ofType": null
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Media",
        "fields": [
          {
            "name": "url",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Url",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "width",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "height",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "size",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "mimeType",
            "type": {
              "kind": "SCALAR",
              "name": "MimeType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "altTag",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "cover",
            "type": {
              "kind": "SCALAR",
              "name": "Url",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "MimeType"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "MediaTransformParams",
        "inputFields": [
          {
            "name": "width",
            "type": {
              "kind": "SCALAR",
              "name": "ImageSizeTransform",
              "ofType": null
            },
            "defaultValue": "\"auto\""
          },
          {
            "name": "height",
            "type": {
              "kind": "SCALAR",
              "name": "ImageSizeTransform",
              "ofType": null
            },
            "defaultValue": "\"auto\""
          },
          {
            "name": "keepAspectRatio",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "defaultValue": "true"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "ImageSizeTransform"
      },
      {
        "kind": "OBJECT",
        "name": "Dispatcher",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "canUseRelay",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "sponsor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProfileStats",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalFollowers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalFollowing",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalPosts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalComments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalMirrors",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalPublications",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalCollects",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "commentsTotal",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "forSources",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Sources",
                        "ofType": null
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "postsTotal",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "forSources",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Sources",
                        "ofType": null
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "mirrorsTotal",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "forSources",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Sources",
                        "ofType": null
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "publicationsTotal",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "forSources",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Sources",
                        "ofType": null
                      }
                    }
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "FollowModule",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "FeeFollowModuleSettings"
          },
          {
            "kind": "OBJECT",
            "name": "ProfileFollowModuleSettings"
          },
          {
            "kind": "OBJECT",
            "name": "RevertFollowModuleSettings"
          },
          {
            "kind": "OBJECT",
            "name": "UnknownFollowModuleSettings"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FeeFollowModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "FollowModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ModuleFeeAmount",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "FollowModules",
        "enumValues": [
          {
            "name": "FeeFollowModule"
          },
          {
            "name": "RevertFollowModule"
          },
          {
            "name": "ProfileFollowModule"
          },
          {
            "name": "UnknownFollowModule"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ModuleFeeAmount",
        "fields": [
          {
            "name": "asset",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Erc20",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Erc20",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "symbol",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "decimals",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProfileFollowModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "FollowModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "RevertFollowModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "FollowModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UnknownFollowModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "FollowModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "followModuleReturnData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "FollowModuleData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "FollowModuleData"
      },
      {
        "kind": "OBJECT",
        "name": "Attribute",
        "fields": [
          {
            "name": "displayType",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "traitType",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "key",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "OnChainIdentity",
        "fields": [
          {
            "name": "proofOfHumanity",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "ens",
            "type": {
              "kind": "OBJECT",
              "name": "EnsOnChainIdentity",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sybilDotOrg",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SybilDotOrgIdentity",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "worldcoin",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "WorldcoinIdentity",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EnsOnChainIdentity",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Ens",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Ens"
      },
      {
        "kind": "OBJECT",
        "name": "SybilDotOrgIdentity",
        "fields": [
          {
            "name": "verified",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "source",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SybilDotOrgIdentitySource",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SybilDotOrgIdentitySource",
        "fields": [
          {
            "name": "twitter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SybilDotOrgTwitterIdentity",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SybilDotOrgTwitterIdentity",
        "fields": [
          {
            "name": "handle",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "WorldcoinIdentity",
        "fields": [
          {
            "name": "isHuman",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "ProfileInterest"
      },
      {
        "kind": "SCALAR",
        "name": "InternalPublicationId"
      },
      {
        "kind": "OBJECT",
        "name": "DataAvailabilityComment",
        "fields": [
          {
            "name": "transactionId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "submitter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "appId",
            "type": {
              "kind": "SCALAR",
              "name": "Sources",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "verificationStatus",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "DataAvailabilityVerificationStatusUnion",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "publicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "commentedOnProfile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "commentedOnPublicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DataAvailabilityMirror",
        "fields": [
          {
            "name": "transactionId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "submitter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "appId",
            "type": {
              "kind": "SCALAR",
              "name": "Sources",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "verificationStatus",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "DataAvailabilityVerificationStatusUnion",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "publicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "mirrorOfProfile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "mirrorOfPublicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DataAvailabilityTransactionsRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "SCALAR",
              "name": "ProfileId",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "LimitScalar"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DataAvailabilityTransactionRequest",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ExplorePublicationResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "Publication",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "Publication",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "Post"
          },
          {
            "kind": "OBJECT",
            "name": "Comment"
          },
          {
            "kind": "OBJECT",
            "name": "Mirror"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Post",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "stats",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PublicationStats",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "metadata",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MetadataOutput",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "onChainContentURI",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectModule",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "CollectModule",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referenceModule",
            "type": {
              "kind": "UNION",
              "name": "ReferenceModule",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "appId",
            "type": {
              "kind": "SCALAR",
              "name": "Sources",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hidden",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectNftAddress",
            "type": {
              "kind": "SCALAR",
              "name": "ContractAddress",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "isGated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "isDataAvailability",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "dataAvailabilityProofs",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "collectedBy",
            "type": {
              "kind": "OBJECT",
              "name": "Wallet",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "reaction",
            "type": {
              "kind": "ENUM",
              "name": "ReactionTypes",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ReactionFieldResolverRequest",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "notInterested",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "bookmarked",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "hasCollectedByMe",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "isFinalisedOnChain",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "canComment",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CanCommentResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "profileId",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "canMirror",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CanMirrorResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "profileId",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "canDecrypt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CanDecryptResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "profileId",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              },
              {
                "name": "address",
                "type": {
                  "kind": "SCALAR",
                  "name": "EthereumAddress",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "mirrors",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "InternalPublicationId",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PublicationStats",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalAmountOfMirrors",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalAmountOfCollects",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalAmountOfComments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalUpvotes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalDownvotes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalBookmarks",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "commentsTotal",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "forSources",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Sources",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "customFilters",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "CustomFiltersTypes",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "CustomFiltersTypes",
        "enumValues": [
          {
            "name": "GARDENERS"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MetadataOutput",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Markdown",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "content",
            "type": {
              "kind": "SCALAR",
              "name": "Markdown",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "image",
            "type": {
              "kind": "SCALAR",
              "name": "Url",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "cover",
            "type": {
              "kind": "OBJECT",
              "name": "MediaSet",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "media",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MediaSet",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "attributes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MetadataAttributeOutput",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "locale",
            "type": {
              "kind": "SCALAR",
              "name": "Locale",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tags",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "contentWarning",
            "type": {
              "kind": "ENUM",
              "name": "PublicationContentWarning",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "mainContentFocus",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "PublicationMainFocus",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "animatedUrl",
            "type": {
              "kind": "SCALAR",
              "name": "Url",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "encryptionParams",
            "type": {
              "kind": "OBJECT",
              "name": "EncryptionParamsOutput",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Markdown"
      },
      {
        "kind": "OBJECT",
        "name": "MetadataAttributeOutput",
        "fields": [
          {
            "name": "displayType",
            "type": {
              "kind": "ENUM",
              "name": "PublicationMetadataDisplayTypes",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "traitType",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "PublicationMetadataDisplayTypes",
        "enumValues": [
          {
            "name": "number"
          },
          {
            "name": "string"
          },
          {
            "name": "date"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Locale"
      },
      {
        "kind": "ENUM",
        "name": "PublicationContentWarning",
        "enumValues": [
          {
            "name": "NSFW"
          },
          {
            "name": "SENSITIVE"
          },
          {
            "name": "SPOILER"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "PublicationMainFocus",
        "enumValues": [
          {
            "name": "VIDEO"
          },
          {
            "name": "IMAGE"
          },
          {
            "name": "ARTICLE"
          },
          {
            "name": "TEXT_ONLY"
          },
          {
            "name": "AUDIO"
          },
          {
            "name": "LINK"
          },
          {
            "name": "EMBED"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "EncryptionParamsOutput",
        "fields": [
          {
            "name": "providerSpecificParams",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ProviderSpecificParamsOutput",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "encryptionProvider",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "EncryptionProvider",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "accessCondition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AccessConditionOutput",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "encryptedFields",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EncryptedFieldsOutput",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProviderSpecificParamsOutput",
        "fields": [
          {
            "name": "encryptionKey",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContentEncryptionKey",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "ContentEncryptionKey"
      },
      {
        "kind": "ENUM",
        "name": "EncryptionProvider",
        "enumValues": [
          {
            "name": "LIT_PROTOCOL"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AccessConditionOutput",
        "fields": [
          {
            "name": "nft",
            "type": {
              "kind": "OBJECT",
              "name": "NftOwnershipOutput",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "OBJECT",
              "name": "Erc20OwnershipOutput",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "eoa",
            "type": {
              "kind": "OBJECT",
              "name": "EoaOwnershipOutput",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "profile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileOwnershipOutput",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "follow",
            "type": {
              "kind": "OBJECT",
              "name": "FollowConditionOutput",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "collect",
            "type": {
              "kind": "OBJECT",
              "name": "CollectConditionOutput",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "and",
            "type": {
              "kind": "OBJECT",
              "name": "AndConditionOutput",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "or",
            "type": {
              "kind": "OBJECT",
              "name": "OrConditionOutput",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "NftOwnershipOutput",
        "fields": [
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "chainID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ChainId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ContractType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "tokenIds",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "TokenId",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "ChainId"
      },
      {
        "kind": "ENUM",
        "name": "ContractType",
        "enumValues": [
          {
            "name": "ERC721"
          },
          {
            "name": "ERC1155"
          },
          {
            "name": "ERC20"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "TokenId"
      },
      {
        "kind": "OBJECT",
        "name": "Erc20OwnershipOutput",
        "fields": [
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "chainID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ChainId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "decimals",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "condition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ScalarOperator",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "symbol",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Float"
      },
      {
        "kind": "ENUM",
        "name": "ScalarOperator",
        "enumValues": [
          {
            "name": "EQUAL"
          },
          {
            "name": "NOT_EQUAL"
          },
          {
            "name": "GREATER_THAN"
          },
          {
            "name": "GREATER_THAN_OR_EQUAL"
          },
          {
            "name": "LESS_THAN"
          },
          {
            "name": "LESS_THAN_OR_EQUAL"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "EoaOwnershipOutput",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProfileOwnershipOutput",
        "fields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "FollowConditionOutput",
        "fields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CollectConditionOutput",
        "fields": [
          {
            "name": "publicationId",
            "type": {
              "kind": "SCALAR",
              "name": "InternalPublicationId",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "thisPublication",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AndConditionOutput",
        "fields": [
          {
            "name": "criteria",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AccessConditionOutput",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "OrConditionOutput",
        "fields": [
          {
            "name": "criteria",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AccessConditionOutput",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EncryptedFieldsOutput",
        "fields": [
          {
            "name": "content",
            "type": {
              "kind": "SCALAR",
              "name": "EncryptedValueScalar",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "image",
            "type": {
              "kind": "SCALAR",
              "name": "EncryptedValueScalar",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "media",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "EncryptedMediaSet",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "animation_url",
            "type": {
              "kind": "SCALAR",
              "name": "EncryptedValueScalar",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "external_url",
            "type": {
              "kind": "SCALAR",
              "name": "EncryptedValueScalar",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "EncryptedValueScalar"
      },
      {
        "kind": "OBJECT",
        "name": "EncryptedMediaSet",
        "fields": [
          {
            "name": "original",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EncryptedMedia",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "small",
            "type": {
              "kind": "OBJECT",
              "name": "EncryptedMedia",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "medium",
            "type": {
              "kind": "OBJECT",
              "name": "EncryptedMedia",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EncryptedMedia",
        "fields": [
          {
            "name": "url",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Url",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "width",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "height",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "size",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "mimeType",
            "type": {
              "kind": "SCALAR",
              "name": "MimeType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "altTag",
            "type": {
              "kind": "SCALAR",
              "name": "EncryptedValueScalar",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "cover",
            "type": {
              "kind": "SCALAR",
              "name": "EncryptedValueScalar",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "CollectModule",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "FreeCollectModuleSettings"
          },
          {
            "kind": "OBJECT",
            "name": "FeeCollectModuleSettings"
          },
          {
            "kind": "OBJECT",
            "name": "LimitedFeeCollectModuleSettings"
          },
          {
            "kind": "OBJECT",
            "name": "LimitedTimedFeeCollectModuleSettings"
          },
          {
            "kind": "OBJECT",
            "name": "RevertCollectModuleSettings"
          },
          {
            "kind": "OBJECT",
            "name": "TimedFeeCollectModuleSettings"
          },
          {
            "kind": "OBJECT",
            "name": "MultirecipientFeeCollectModuleSettings"
          },
          {
            "kind": "OBJECT",
            "name": "SimpleCollectModuleSettings"
          },
          {
            "kind": "OBJECT",
            "name": "ERC4626FeeCollectModuleSettings"
          },
          {
            "kind": "OBJECT",
            "name": "AaveFeeCollectModuleSettings"
          },
          {
            "kind": "OBJECT",
            "name": "UnknownCollectModuleSettings"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FreeCollectModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "CollectModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "CollectModules",
        "enumValues": [
          {
            "name": "LimitedFeeCollectModule"
          },
          {
            "name": "FeeCollectModule"
          },
          {
            "name": "LimitedTimedFeeCollectModule"
          },
          {
            "name": "TimedFeeCollectModule"
          },
          {
            "name": "AaveFeeCollectModule"
          },
          {
            "name": "RevertCollectModule"
          },
          {
            "name": "FreeCollectModule"
          },
          {
            "name": "MultirecipientFeeCollectModule"
          },
          {
            "name": "ERC4626FeeCollectModule"
          },
          {
            "name": "SimpleCollectModule"
          },
          {
            "name": "UnknownCollectModule"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FeeCollectModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "CollectModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ModuleFeeAmount",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referralFee",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "LimitedFeeCollectModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "CollectModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectLimit",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ModuleFeeAmount",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referralFee",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "LimitedTimedFeeCollectModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "CollectModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectLimit",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ModuleFeeAmount",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referralFee",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "endTimestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "RevertCollectModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "CollectModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TimedFeeCollectModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "CollectModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ModuleFeeAmount",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referralFee",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "endTimestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MultirecipientFeeCollectModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "CollectModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ModuleFeeAmount",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectLimit",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "referralFee",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "endTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "recipients",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "RecipientDataOutput",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "RecipientDataOutput",
        "fields": [
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "split",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SimpleCollectModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "CollectModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "fee",
            "type": {
              "kind": "OBJECT",
              "name": "ModuleFee",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "collectLimit",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "endTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ModuleFee",
        "fields": [
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ModuleFeeAmount",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referralFee",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ERC4626FeeCollectModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "CollectModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "vault",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ModuleFeeAmount",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectLimit",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "referralFee",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "endTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AaveFeeCollectModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "CollectModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ModuleFeeAmount",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectLimit",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "referralFee",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "endTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UnknownCollectModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "CollectModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectModuleReturnData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "CollectModuleData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "CollectModuleData"
      },
      {
        "kind": "UNION",
        "name": "ReferenceModule",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "FollowOnlyReferenceModuleSettings"
          },
          {
            "kind": "OBJECT",
            "name": "UnknownReferenceModuleSettings"
          },
          {
            "kind": "OBJECT",
            "name": "DegreesOfSeparationReferenceModuleSettings"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FollowOnlyReferenceModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ReferenceModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "ReferenceModules",
        "enumValues": [
          {
            "name": "FollowerOnlyReferenceModule"
          },
          {
            "name": "DegreesOfSeparationReferenceModule"
          },
          {
            "name": "UnknownReferenceModule"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "UnknownReferenceModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ReferenceModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referenceModuleReturnData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ReferenceModuleData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "ReferenceModuleData"
      },
      {
        "kind": "OBJECT",
        "name": "DegreesOfSeparationReferenceModuleSettings",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ReferenceModules",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "commentsRestricted",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "mirrorsRestricted",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "degreesOfSeparation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Wallet",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "defaultProfile",
            "type": {
              "kind": "OBJECT",
              "name": "Profile",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "ReactionTypes",
        "enumValues": [
          {
            "name": "UPVOTE"
          },
          {
            "name": "DOWNVOTE"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ReactionFieldResolverRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "SCALAR",
              "name": "ProfileId",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CanCommentResponse",
        "fields": [
          {
            "name": "result",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CanMirrorResponse",
        "fields": [
          {
            "name": "result",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CanDecryptResponse",
        "fields": [
          {
            "name": "result",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "reasons",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "DecryptFailReason",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "extraDetails",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "DecryptFailReason",
        "enumValues": [
          {
            "name": "UNAUTHORIZED_ADDRESS"
          },
          {
            "name": "DOES_NOT_OWN_NFT"
          },
          {
            "name": "DOES_NOT_OWN_PROFILE"
          },
          {
            "name": "DOES_NOT_FOLLOW_PROFILE"
          },
          {
            "name": "HAS_NOT_COLLECTED_PUBLICATION"
          },
          {
            "name": "UNAUTHORIZED_BALANCE"
          },
          {
            "name": "PROFILE_DOES_NOT_EXIST"
          },
          {
            "name": "MISSING_ENCRYPTION_PARAMS"
          },
          {
            "name": "FOLLOW_NOT_FINALISED_ON_CHAIN"
          },
          {
            "name": "COLLECT_NOT_FINALISED_ON_CHAIN"
          },
          {
            "name": "CAN_NOT_DECRYPT"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Comment",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "stats",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PublicationStats",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "metadata",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MetadataOutput",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "onChainContentURI",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectModule",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "CollectModule",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referenceModule",
            "type": {
              "kind": "UNION",
              "name": "ReferenceModule",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "appId",
            "type": {
              "kind": "SCALAR",
              "name": "Sources",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hidden",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectNftAddress",
            "type": {
              "kind": "SCALAR",
              "name": "ContractAddress",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "isGated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "isDataAvailability",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "dataAvailabilityProofs",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "mainPost",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "MainPostReference",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "commentOn",
            "type": {
              "kind": "UNION",
              "name": "Publication",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "firstComment",
            "type": {
              "kind": "OBJECT",
              "name": "Comment",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "collectedBy",
            "type": {
              "kind": "OBJECT",
              "name": "Wallet",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "rankingScore",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "reaction",
            "type": {
              "kind": "ENUM",
              "name": "ReactionTypes",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ReactionFieldResolverRequest",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "notInterested",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "bookmarked",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "hasCollectedByMe",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "isFinalisedOnChain",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "canComment",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CanCommentResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "profileId",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "canMirror",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CanMirrorResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "profileId",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "canDecrypt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CanDecryptResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "profileId",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              },
              {
                "name": "address",
                "type": {
                  "kind": "SCALAR",
                  "name": "EthereumAddress",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "mirrors",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "InternalPublicationId",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "MainPostReference",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "Post"
          },
          {
            "kind": "OBJECT",
            "name": "Mirror"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Mirror",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "stats",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PublicationStats",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "metadata",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MetadataOutput",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "onChainContentURI",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectModule",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "CollectModule",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referenceModule",
            "type": {
              "kind": "UNION",
              "name": "ReferenceModule",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "appId",
            "type": {
              "kind": "SCALAR",
              "name": "Sources",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hidden",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectNftAddress",
            "type": {
              "kind": "SCALAR",
              "name": "ContractAddress",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "isGated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "isDataAvailability",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "dataAvailabilityProofs",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "mirrorOf",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "MirrorablePublication",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "reaction",
            "type": {
              "kind": "ENUM",
              "name": "ReactionTypes",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ReactionFieldResolverRequest",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "notInterested",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "bookmarked",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "hasCollectedByMe",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "isFinalisedOnChain",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "canComment",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CanCommentResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "profileId",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "canMirror",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CanMirrorResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "profileId",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "canDecrypt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CanDecryptResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "profileId",
                "type": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              },
              {
                "name": "address",
                "type": {
                  "kind": "SCALAR",
                  "name": "EthereumAddress",
                  "ofType": null
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "MirrorablePublication",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "Post"
          },
          {
            "kind": "OBJECT",
            "name": "Comment"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ExplorePublicationRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "TimestampScalar",
              "ofType": null
            }
          },
          {
            "name": "sortCriteria",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "PublicationSortCriteria",
                "ofType": null
              }
            }
          },
          {
            "name": "sources",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Sources",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "publicationTypes",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "PublicationTypes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "noRandomize",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "excludeProfileIds",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "metadata",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PublicationMetadataFilters",
              "ofType": null
            }
          },
          {
            "name": "customFilters",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "CustomFiltersTypes",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "TimestampScalar"
      },
      {
        "kind": "ENUM",
        "name": "PublicationSortCriteria",
        "enumValues": [
          {
            "name": "TOP_COMMENTED"
          },
          {
            "name": "TOP_COLLECTED"
          },
          {
            "name": "TOP_MIRRORED"
          },
          {
            "name": "CURATED_PROFILES"
          },
          {
            "name": "LATEST"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "PublicationTypes",
        "enumValues": [
          {
            "name": "POST"
          },
          {
            "name": "COMMENT"
          },
          {
            "name": "MIRROR"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PublicationMetadataFilters",
        "inputFields": [
          {
            "name": "locale",
            "type": {
              "kind": "SCALAR",
              "name": "Locale",
              "ofType": null
            }
          },
          {
            "name": "contentWarning",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PublicationMetadataContentWarningFilter",
              "ofType": null
            }
          },
          {
            "name": "mainContentFocus",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "PublicationMainFocus",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[ARTICLE, AUDIO, VIDEO, EMBED, IMAGE, LINK, TEXT_ONLY]"
          },
          {
            "name": "tags",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PublicationMetadataTagsFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PublicationMetadataContentWarningFilter",
        "inputFields": [
          {
            "name": "includeOneOf",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "PublicationContentWarning",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PublicationMetadataTagsFilter",
        "inputFields": [
          {
            "name": "oneOf",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "all",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ExploreProfileResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Profile",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ExploreProfilesRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "TimestampScalar",
              "ofType": null
            }
          },
          {
            "name": "sortCriteria",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ProfileSortCriteria",
                "ofType": null
              }
            }
          },
          {
            "name": "customFilters",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "CustomFiltersTypes",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "ProfileSortCriteria",
        "enumValues": [
          {
            "name": "CREATED_ON"
          },
          {
            "name": "MOST_FOLLOWERS"
          },
          {
            "name": "LATEST_CREATED"
          },
          {
            "name": "MOST_POSTS"
          },
          {
            "name": "MOST_COMMENTS"
          },
          {
            "name": "MOST_MIRRORS"
          },
          {
            "name": "MOST_PUBLICATION"
          },
          {
            "name": "MOST_COLLECTS"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PaginatedFeedResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "FeedItem",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "FeedItem",
        "fields": [
          {
            "name": "root",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "FeedItemRoot",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "electedMirror",
            "type": {
              "kind": "OBJECT",
              "name": "ElectedMirror",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "mirrors",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MirrorEvent",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "collects",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "CollectedEvent",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "reactions",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ReactionEvent",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "comments",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Comment",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "FeedItemRoot",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "Post"
          },
          {
            "kind": "OBJECT",
            "name": "Comment"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ElectedMirror",
        "fields": [
          {
            "name": "mirrorId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MirrorEvent",
        "fields": [
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CollectedEvent",
        "fields": [
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ReactionEvent",
        "fields": [
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "reaction",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ReactionTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FeedRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "feedEventItemTypes",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "FeedEventItemType",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[POST, COMMENT, MIRROR, COLLECT_POST, COLLECT_COMMENT]"
          },
          {
            "name": "sources",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Sources",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "metadata",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PublicationMetadataFilters",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "FeedEventItemType",
        "enumValues": [
          {
            "name": "POST"
          },
          {
            "name": "COMMENT"
          },
          {
            "name": "MIRROR"
          },
          {
            "name": "COLLECT_POST"
          },
          {
            "name": "COLLECT_COMMENT"
          },
          {
            "name": "REACTION_POST"
          },
          {
            "name": "REACTION_COMMENT"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PaginatedTimelineResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "Publication",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FeedHighlightsRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "sources",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Sources",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "metadata",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PublicationMetadataFilters",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PendingApproveFollowsResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Profile",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PendingApprovalFollowsRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "DoesFollowResponse",
        "fields": [
          {
            "name": "followerAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "follows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "isFinalisedOnChain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DoesFollowRequest",
        "inputFields": [
          {
            "name": "followInfos",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DoesFollow",
                    "ofType": null
                  }
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DoesFollow",
        "inputFields": [
          {
            "name": "followerAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PaginatedFollowingResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Following",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Following",
        "fields": [
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalAmountOfTimesFollowing",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FollowingRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PaginatedFollowersResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Follower",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Follower",
        "fields": [
          {
            "name": "wallet",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Wallet",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalAmountOfTimesFollowed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FollowersRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FollowerNftOwnedTokenIds",
        "fields": [
          {
            "name": "followerNftAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "tokensIds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FollowerNftOwnedTokenIdsRequest",
        "inputFields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PaginatedProfileResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Profile",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "MutualFollowersProfilesQueryRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "viewingProfileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "yourProfileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "TransactionResult",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "TransactionIndexedResult"
          },
          {
            "kind": "OBJECT",
            "name": "TransactionError"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TransactionIndexedResult",
        "fields": [
          {
            "name": "indexed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "txHash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "TxHash",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "txReceipt",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionReceipt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "metadataStatus",
            "type": {
              "kind": "OBJECT",
              "name": "PublicationMetadataStatus",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TransactionReceipt",
        "fields": [
          {
            "name": "to",
            "type": {
              "kind": "SCALAR",
              "name": "EthereumAddress",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "from",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "SCALAR",
              "name": "ContractAddress",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "transactionIndex",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "root",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "gasUsed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "logsBloom",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "blockHash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "transactionHash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "TxHash",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "logs",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Log",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "confirmations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "cumulativeGasUsed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "effectiveGasPrice",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "byzantium",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Log",
        "fields": [
          {
            "name": "blockNumber",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "blockHash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "transactionIndex",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "removed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "topics",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "transactionHash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "TxHash",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "logIndex",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PublicationMetadataStatus",
        "fields": [
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "PublicationMetadataStatusType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "reason",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "PublicationMetadataStatusType",
        "enumValues": [
          {
            "name": "NOT_FOUND"
          },
          {
            "name": "PENDING"
          },
          {
            "name": "METADATA_VALIDATION_FAILED"
          },
          {
            "name": "SUCCESS"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TransactionError",
        "fields": [
          {
            "name": "reason",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TransactionErrorReasons",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "txReceipt",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionReceipt",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "TransactionErrorReasons",
        "enumValues": [
          {
            "name": "REVERTED"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "HasTxHashBeenIndexedRequest",
        "inputFields": [
          {
            "name": "txHash",
            "type": {
              "kind": "SCALAR",
              "name": "TxHash",
              "ofType": null
            }
          },
          {
            "name": "txId",
            "type": {
              "kind": "SCALAR",
              "name": "TxId",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "InternalPinResult",
        "fields": [
          {
            "name": "referenceItem",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Url",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "ipfs",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "InternalPinRequest",
        "inputFields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Url",
                    "ofType": null
                  }
                }
              }
            }
          },
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ApprovedAllowanceAmount",
        "fields": [
          {
            "name": "currency",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "module",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "allowance",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ApprovedModuleAllowanceAmountRequest",
        "inputFields": [
          {
            "name": "currencies",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ContractAddress",
                    "ofType": null
                  }
                }
              }
            }
          },
          {
            "name": "collectModules",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "CollectModules",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "unknownCollectModules",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ContractAddress",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "followModules",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "FollowModules",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "unknownFollowModules",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ContractAddress",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "referenceModules",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "ReferenceModules",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "unknownReferenceModules",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ContractAddress",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "GenerateModuleCurrencyApproval",
        "fields": [
          {
            "name": "to",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "from",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BlockchainData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "BlockchainData"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "GenerateModuleCurrencyApprovalDataRequest",
        "inputFields": [
          {
            "name": "currency",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "collectModule",
            "type": {
              "kind": "ENUM",
              "name": "CollectModules",
              "ofType": null
            }
          },
          {
            "name": "unknownCollectModule",
            "type": {
              "kind": "SCALAR",
              "name": "ContractAddress",
              "ofType": null
            }
          },
          {
            "name": "followModule",
            "type": {
              "kind": "ENUM",
              "name": "FollowModules",
              "ofType": null
            }
          },
          {
            "name": "unknownFollowModule",
            "type": {
              "kind": "SCALAR",
              "name": "ContractAddress",
              "ofType": null
            }
          },
          {
            "name": "referenceModule",
            "type": {
              "kind": "ENUM",
              "name": "ReferenceModules",
              "ofType": null
            }
          },
          {
            "name": "unknownReferenceModule",
            "type": {
              "kind": "SCALAR",
              "name": "ContractAddress",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ProfileFollowModuleBeenRedeemedRequest",
        "inputFields": [
          {
            "name": "followProfileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "redeemingProfileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "EnabledModules",
        "fields": [
          {
            "name": "collectModules",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EnabledModule",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "followModules",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EnabledModule",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "referenceModules",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EnabledModule",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EnabledModule",
        "fields": [
          {
            "name": "moduleName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "inputParams",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ModuleInfo",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "redeemParams",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ModuleInfo",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "returnDataParms",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ModuleInfo",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ModuleInfo",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "NftGallery",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "NftGalleryId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NFT",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "NftGalleryId"
      },
      {
        "kind": "OBJECT",
        "name": "NFT",
        "fields": [
          {
            "name": "contractName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "symbol",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "owners",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Owner",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contentURI",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "originalContent",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "NFTContent",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "chainId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ChainId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectionName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "ercType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Owner",
        "fields": [
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "NFTContent",
        "fields": [
          {
            "name": "uri",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "metaType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "animatedUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NftGalleriesRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NFTsResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NFT",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NFTsRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "ownerAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "contractAddress",
            "type": {
              "kind": "SCALAR",
              "name": "ContractAddress",
              "ofType": null
            }
          },
          {
            "name": "includeCollections",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "NftCollectionInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "excludeCollections",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "NftCollectionInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "excludeFollowers",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "defaultValue": "true"
          },
          {
            "name": "chainIds",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ChainId",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[1, 137]"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NftCollectionInput",
        "inputFields": [
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "chainId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ChainId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NFTSearchRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "query",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "SCALAR",
              "name": "ProfileId",
              "ofType": null
            }
          },
          {
            "name": "ownerAddress",
            "type": {
              "kind": "SCALAR",
              "name": "EthereumAddress",
              "ofType": null
            }
          },
          {
            "name": "chainIds",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ChainId",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[1, 137]"
          },
          {
            "name": "excludeFollowers",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "defaultValue": "true"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NftOwnershipChallengeResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "NftOwnershipId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "text",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "timeout",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "TimestampScalar",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "NftOwnershipId"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NftOwnershipChallengeRequest",
        "inputFields": [
          {
            "name": "ethereumAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "nfts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "NftOwnershipChallenge",
                    "ofType": null
                  }
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NftOwnershipChallenge",
        "inputFields": [
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "chainId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ChainId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PaginatedNotificationResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "Notification",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "Notification",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "NewFollowerNotification"
          },
          {
            "kind": "OBJECT",
            "name": "NewCollectNotification"
          },
          {
            "kind": "OBJECT",
            "name": "NewCommentNotification"
          },
          {
            "kind": "OBJECT",
            "name": "NewMirrorNotification"
          },
          {
            "kind": "OBJECT",
            "name": "NewMentionNotification"
          },
          {
            "kind": "OBJECT",
            "name": "NewReactionNotification"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NewFollowerNotification",
        "fields": [
          {
            "name": "notificationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "NotificationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "wallet",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Wallet",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "isFollowedByMe",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "NotificationId"
      },
      {
        "kind": "OBJECT",
        "name": "NewCollectNotification",
        "fields": [
          {
            "name": "notificationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "NotificationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "wallet",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Wallet",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectedPublication",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "Publication",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "NewCommentNotification",
        "fields": [
          {
            "name": "notificationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "NotificationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "comment",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Comment",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "NewMirrorNotification",
        "fields": [
          {
            "name": "notificationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "NotificationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "publication",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "MirrorablePublication",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "NewMentionNotification",
        "fields": [
          {
            "name": "notificationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "NotificationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "mentionPublication",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "MentionPublication",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "MentionPublication",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "Post"
          },
          {
            "kind": "OBJECT",
            "name": "Comment"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NewReactionNotification",
        "fields": [
          {
            "name": "notificationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "NotificationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "reaction",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ReactionTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "publication",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "Publication",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NotificationRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "notificationTypes",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "NotificationTypes",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[MIRRORED_POST, MIRRORED_COMMENT, MENTION_POST, MENTION_COMMENT, COMMENTED_COMMENT, COMMENTED_POST, COLLECTED_POST, COLLECTED_COMMENT, FOLLOWED, REACTION_POST, REACTION_COMMENT]"
          },
          {
            "name": "sources",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Sources",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "customFilters",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "CustomFiltersTypes",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "highSignalFilter",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "defaultValue": "true"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "NotificationTypes",
        "enumValues": [
          {
            "name": "MIRRORED_POST"
          },
          {
            "name": "MIRRORED_COMMENT"
          },
          {
            "name": "MENTION_POST"
          },
          {
            "name": "MENTION_COMMENT"
          },
          {
            "name": "COMMENTED_COMMENT"
          },
          {
            "name": "COMMENTED_POST"
          },
          {
            "name": "COLLECTED_POST"
          },
          {
            "name": "COLLECTED_COMMENT"
          },
          {
            "name": "FOLLOWED"
          },
          {
            "name": "REACTION_POST"
          },
          {
            "name": "REACTION_COMMENT"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ProfileOnChainIdentityRequest",
        "inputFields": [
          {
            "name": "profileIds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ProfileId",
                    "ofType": null
                  }
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ProfileQueryRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "profileIds",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "ownedBy",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "EthereumAddress",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "handles",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Handle",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "whoMirroredPublicationId",
            "type": {
              "kind": "SCALAR",
              "name": "InternalPublicationId",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SingleProfileQueryRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "SCALAR",
              "name": "ProfileId",
              "ofType": null
            }
          },
          {
            "name": "handle",
            "type": {
              "kind": "SCALAR",
              "name": "Handle",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "RecommendedProfileOptions",
        "inputFields": [
          {
            "name": "disableML",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "defaultValue": "false"
          },
          {
            "name": "shuffle",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "defaultValue": "false"
          },
          {
            "name": "profileId",
            "type": {
              "kind": "SCALAR",
              "name": "ProfileId",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DefaultProfileRequest",
        "inputFields": [
          {
            "name": "ethereumAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ProfileGuardianResult",
        "fields": [
          {
            "name": "protected",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "disablingProtectionTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ProfileGuardianRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "GlobalProtocolStats",
        "fields": [
          {
            "name": "totalProfiles",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalBurntProfiles",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalPosts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalMirrors",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalComments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalCollects",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalFollows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "totalRevenue",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Erc20Amount",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Erc20Amount",
        "fields": [
          {
            "name": "asset",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Erc20",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "GlobalProtocolStatsRequest",
        "inputFields": [
          {
            "name": "fromTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "UnixTimestamp",
              "ofType": null
            }
          },
          {
            "name": "toTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "UnixTimestamp",
              "ofType": null
            }
          },
          {
            "name": "sources",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Sources",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "UnixTimestamp"
      },
      {
        "kind": "UNION",
        "name": "ProxyActionStatusResultUnion",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "ProxyActionStatusResult"
          },
          {
            "kind": "OBJECT",
            "name": "ProxyActionError"
          },
          {
            "kind": "OBJECT",
            "name": "ProxyActionQueued"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ProxyActionStatusResult",
        "fields": [
          {
            "name": "txHash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "TxHash",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "txId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "TxId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ProxyActionStatusTypes",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "ProxyActionStatusTypes",
        "enumValues": [
          {
            "name": "MINTING"
          },
          {
            "name": "TRANSFERRING"
          },
          {
            "name": "COMPLETE"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ProxyActionError",
        "fields": [
          {
            "name": "reason",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "lastKnownTxId",
            "type": {
              "kind": "SCALAR",
              "name": "TxId",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProxyActionQueued",
        "fields": [
          {
            "name": "queuedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "ProxyActionId"
      },
      {
        "kind": "OBJECT",
        "name": "PublicationValidateMetadataResult",
        "fields": [
          {
            "name": "valid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "reason",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ValidatePublicationMetadataRequest",
        "inputFields": [
          {
            "name": "metadatav1",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PublicationMetadataV1Input",
              "ofType": null
            }
          },
          {
            "name": "metadatav2",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PublicationMetadataV2Input",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PublicationMetadataV1Input",
        "inputFields": [
          {
            "name": "version",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "metadata_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "appId",
            "type": {
              "kind": "SCALAR",
              "name": "Sources",
              "ofType": null
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Markdown",
              "ofType": null
            }
          },
          {
            "name": "content",
            "type": {
              "kind": "SCALAR",
              "name": "Markdown",
              "ofType": null
            }
          },
          {
            "name": "external_url",
            "type": {
              "kind": "SCALAR",
              "name": "Url",
              "ofType": null
            }
          },
          {
            "name": "signatureContext",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PublicationSignatureContextInput",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "attributes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "MetadataAttributeInput",
                    "ofType": null
                  }
                }
              }
            }
          },
          {
            "name": "image",
            "type": {
              "kind": "SCALAR",
              "name": "Url",
              "ofType": null
            }
          },
          {
            "name": "imageMimeType",
            "type": {
              "kind": "SCALAR",
              "name": "MimeType",
              "ofType": null
            }
          },
          {
            "name": "media",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "PublicationMetadataMediaInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "animation_url",
            "type": {
              "kind": "SCALAR",
              "name": "Url",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PublicationSignatureContextInput",
        "inputFields": [
          {
            "name": "signature",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "MetadataAttributeInput",
        "inputFields": [
          {
            "name": "displayType",
            "type": {
              "kind": "ENUM",
              "name": "PublicationMetadataDisplayTypes",
              "ofType": null
            }
          },
          {
            "name": "traitType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PublicationMetadataMediaInput",
        "inputFields": [
          {
            "name": "item",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Url",
                "ofType": null
              }
            }
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "MimeType",
              "ofType": null
            }
          },
          {
            "name": "altTag",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "cover",
            "type": {
              "kind": "SCALAR",
              "name": "Url",
              "ofType": null
            }
          },
          {
            "name": "source",
            "type": {
              "kind": "ENUM",
              "name": "PublicationMediaSource",
              "ofType": null
            },
            "defaultValue": "LENS"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "PublicationMediaSource",
        "enumValues": [
          {
            "name": "LENS"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PublicationMetadataV2Input",
        "inputFields": [
          {
            "name": "version",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "metadata_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "appId",
            "type": {
              "kind": "SCALAR",
              "name": "Sources",
              "ofType": null
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Markdown",
              "ofType": null
            }
          },
          {
            "name": "content",
            "type": {
              "kind": "SCALAR",
              "name": "Markdown",
              "ofType": null
            }
          },
          {
            "name": "external_url",
            "type": {
              "kind": "SCALAR",
              "name": "Url",
              "ofType": null
            }
          },
          {
            "name": "signatureContext",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PublicationSignatureContextInput",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "attributes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "MetadataAttributeInput",
                    "ofType": null
                  }
                }
              }
            }
          },
          {
            "name": "image",
            "type": {
              "kind": "SCALAR",
              "name": "Url",
              "ofType": null
            }
          },
          {
            "name": "imageMimeType",
            "type": {
              "kind": "SCALAR",
              "name": "MimeType",
              "ofType": null
            }
          },
          {
            "name": "media",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "PublicationMetadataMediaInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "animation_url",
            "type": {
              "kind": "SCALAR",
              "name": "Url",
              "ofType": null
            }
          },
          {
            "name": "locale",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Locale",
                "ofType": null
              }
            }
          },
          {
            "name": "tags",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "contentWarning",
            "type": {
              "kind": "ENUM",
              "name": "PublicationContentWarning",
              "ofType": null
            }
          },
          {
            "name": "mainContentFocus",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "PublicationMainFocus",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "GetPublicationMetadataStatusRequest",
        "inputFields": [
          {
            "name": "publicationId",
            "type": {
              "kind": "SCALAR",
              "name": "InternalPublicationId",
              "ofType": null
            }
          },
          {
            "name": "txHash",
            "type": {
              "kind": "SCALAR",
              "name": "TxHash",
              "ofType": null
            }
          },
          {
            "name": "txId",
            "type": {
              "kind": "SCALAR",
              "name": "TxId",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PaginatedPublicationResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "Publication",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PublicationsQueryRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "SCALAR",
              "name": "ProfileId",
              "ofType": null
            }
          },
          {
            "name": "profileIds",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ProfileId",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "publicationTypes",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "PublicationTypes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "commentsOf",
            "type": {
              "kind": "SCALAR",
              "name": "InternalPublicationId",
              "ofType": null
            }
          },
          {
            "name": "commentsOfOrdering",
            "type": {
              "kind": "ENUM",
              "name": "CommentOrderingTypes",
              "ofType": null
            },
            "defaultValue": "RANKING"
          },
          {
            "name": "commentsRankingFilter",
            "type": {
              "kind": "ENUM",
              "name": "CommentRankingFilter",
              "ofType": null
            }
          },
          {
            "name": "sources",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Sources",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "collectedBy",
            "type": {
              "kind": "SCALAR",
              "name": "EthereumAddress",
              "ofType": null
            }
          },
          {
            "name": "publicationIds",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "InternalPublicationId",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "metadata",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PublicationMetadataFilters",
              "ofType": null
            }
          },
          {
            "name": "customFilters",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "CustomFiltersTypes",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "CommentOrderingTypes",
        "enumValues": [
          {
            "name": "DESC"
          },
          {
            "name": "RANKING"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "CommentRankingFilter",
        "enumValues": [
          {
            "name": "NONE_RELEVANT"
          },
          {
            "name": "RELEVANT"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PublicationQueryRequest",
        "inputFields": [
          {
            "name": "publicationId",
            "type": {
              "kind": "SCALAR",
              "name": "InternalPublicationId",
              "ofType": null
            }
          },
          {
            "name": "txHash",
            "type": {
              "kind": "SCALAR",
              "name": "TxHash",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PaginatedWhoCollectedResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Wallet",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "WhoCollectedPublicationRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "publicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PaginatedProfilePublicationsForSaleResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "PublicationForSale",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "PublicationForSale",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "Post"
          },
          {
            "kind": "OBJECT",
            "name": "Comment"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ProfilePublicationsForSaleRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "sources",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Sources",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "metadata",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PublicationMetadataFilters",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PaginatedAllPublicationsTagsResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "TagResult",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TagResult",
        "fields": [
          {
            "name": "tag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "PublicationTag",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "total",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "PublicationTag"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AllPublicationsTagsRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "sort",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TagSortCriteria",
                "ofType": null
              }
            }
          },
          {
            "name": "source",
            "type": {
              "kind": "SCALAR",
              "name": "Sources",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "TagSortCriteria",
        "enumValues": [
          {
            "name": "MOST_POPULAR"
          },
          {
            "name": "ALPHABETICAL"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PublicationsProfileBookmarkedQueryRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "sources",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Sources",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "metadata",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PublicationMetadataFilters",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PaginatedForYouResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "Publication",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PublicationForYouRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "for",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PaginatedWhoReactedResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "WhoReactedResult",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "WhoReactedResult",
        "fields": [
          {
            "name": "reactionId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ReactionId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "reaction",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ReactionTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "reactionAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "ReactionId"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "WhoReactedPublicationRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "publicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "RelayQueueResult",
        "fields": [
          {
            "name": "relayer",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "RelayRoleKey",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "queue",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "RelayRoleKey",
        "enumValues": [
          {
            "name": "CREATE_PROFILE"
          },
          {
            "name": "DISPATCHER_1"
          },
          {
            "name": "DISPATCHER_2"
          },
          {
            "name": "DISPATCHER_3"
          },
          {
            "name": "DISPATCHER_4"
          },
          {
            "name": "DISPATCHER_5"
          },
          {
            "name": "DISPATCHER_6"
          },
          {
            "name": "DISPATCHER_7"
          },
          {
            "name": "DISPATCHER_8"
          },
          {
            "name": "DISPATCHER_9"
          },
          {
            "name": "DISPATCHER_10"
          },
          {
            "name": "PROXY_ACTION_COLLECT_1"
          },
          {
            "name": "PROXY_ACTION_COLLECT_2"
          },
          {
            "name": "PROXY_ACTION_COLLECT_3"
          },
          {
            "name": "PROXY_ACTION_COLLECT_4"
          },
          {
            "name": "PROXY_ACTION_COLLECT_5"
          },
          {
            "name": "PROXY_ACTION_COLLECT_6"
          },
          {
            "name": "PROXY_ACTION_FOLLOW_1"
          },
          {
            "name": "PROXY_ACTION_FOLLOW_2"
          },
          {
            "name": "PROXY_ACTION_FOLLOW_3"
          },
          {
            "name": "PROXY_ACTION_FOLLOW_4"
          },
          {
            "name": "PROXY_ACTION_FOLLOW_5"
          },
          {
            "name": "PROXY_ACTION_FOLLOW_6"
          },
          {
            "name": "PROXY_ACTION_FOLLOW_7"
          },
          {
            "name": "PROXY_ACTION_FOLLOW_8"
          },
          {
            "name": "PROXY_ACTION_FOLLOW_9"
          },
          {
            "name": "PROXY_ACTION_FOLLOW_10"
          },
          {
            "name": "WITH_SIG_1"
          },
          {
            "name": "WITH_SIG_2"
          },
          {
            "name": "WITH_SIG_3"
          },
          {
            "name": "ZK_RELAYER_1"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ProfilePublicationRevenueResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "PublicationRevenue",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PublicationRevenue",
        "fields": [
          {
            "name": "publication",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "Publication",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "revenue",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "RevenueAggregate",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "RevenueAggregate",
        "fields": [
          {
            "name": "total",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Erc20Amount",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ProfilePublicationRevenueQueryRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "sources",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Sources",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "types",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "PublicationTypes",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[COMMENT, MIRROR, POST]"
          },
          {
            "name": "metadata",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PublicationMetadataFilters",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PublicationRevenueQueryRequest",
        "inputFields": [
          {
            "name": "publicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FollowRevenueResult",
        "fields": [
          {
            "name": "revenues",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "RevenueAggregate",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ProfileFollowRevenueQueryRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "SearchResult",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "PublicationSearchResult"
          },
          {
            "kind": "OBJECT",
            "name": "ProfileSearchResult"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PublicationSearchResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "PublicationSearchResultItem",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "SearchRequestTypes",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "PublicationSearchResultItem",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "Post"
          },
          {
            "kind": "OBJECT",
            "name": "Comment"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "SearchRequestTypes",
        "enumValues": [
          {
            "name": "PUBLICATION"
          },
          {
            "name": "PROFILE"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ProfileSearchResult",
        "fields": [
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Profile",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PaginatedResultInfo",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "SearchRequestTypes",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SearchQueryRequest",
        "inputFields": [
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "LimitScalar",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor",
              "ofType": null
            }
          },
          {
            "name": "query",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Search",
                "ofType": null
              }
            }
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "SearchRequestTypes",
                "ofType": null
              }
            }
          },
          {
            "name": "customFilters",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "CustomFiltersTypes",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "sources",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Sources",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Search"
      },
      {
        "kind": "OBJECT",
        "name": "UserSigNonces",
        "fields": [
          {
            "name": "lensHubOnChainSigNonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Nonce",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "peripheryOnChainSigNonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Nonce",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Nonce"
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "invite",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "InviteRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "ach",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AchRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "hel",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "HelRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "gdi",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "GddRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "gci",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "GciRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "gcr",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "GcrRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "dss",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "PrfRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nni",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "NniRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nnv",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "NnvRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "in",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "InRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createAttachMediaData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PublicMediaResults",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "PublicMediaRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "authenticate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AuthenticationResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SignedAuthChallenge",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "refresh",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AuthenticationResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "RefreshRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "broadcastDataAvailability",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "BroadcastDataAvailabilityUnion",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "BroadcastRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "broadcast",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "RelayResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "BroadcastRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "claim",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "RelayResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ClaimHandleRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "idKitPhoneVerifyWebhook",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "IdKitPhoneVerifyWebhookResultStatusType",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "IdKitPhoneVerifyWebhookRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createSetDispatcherTypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetDispatcherBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TypedDataOptions",
                  "ofType": null
                }
              },
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SetDispatcherRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createFollowTypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateFollowBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TypedDataOptions",
                  "ofType": null
                }
              },
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "FollowRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createUnfollowTypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateUnfollowBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TypedDataOptions",
                  "ofType": null
                }
              },
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UnfollowRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createSetFollowModuleTypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetFollowModuleBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TypedDataOptions",
                  "ofType": null
                }
              },
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateSetFollowModuleRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createSetFollowNFTUriTypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetFollowNFTUriBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TypedDataOptions",
                  "ofType": null
                }
              },
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateSetFollowNFTUriRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createToggleFollowTypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateToggleFollowBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TypedDataOptions",
                  "ofType": null
                }
              },
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateToggleFollowRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createSetFollowNFTUriViaDispatcher",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "RelayResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateSetFollowNFTUriRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createCollectTypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateCollectBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TypedDataOptions",
                  "ofType": null
                }
              },
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateCollectRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createNftGallery",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "NftGalleryId",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "NftGalleryCreateRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateNftGalleryInfo",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "NftGalleryUpdateInfoRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateNftGalleryOrder",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "NftGalleryUpdateItemOrderRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateNftGalleryItems",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "NftGalleryUpdateItemsRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "deleteNftGallery",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "NftGalleryDeleteRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "addProfileInterests",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AddProfileInterestsRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "removeProfileInterests",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "RemoveProfileInterestsRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createSetProfileMetadataTypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetProfileMetadataURIBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TypedDataOptions",
                  "ofType": null
                }
              },
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreatePublicSetProfileMetadataURIRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createSetProfileMetadataViaDispatcher",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "RelayResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreatePublicSetProfileMetadataURIRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createSetDefaultProfileTypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SetDefaultProfileBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TypedDataOptions",
                  "ofType": null
                }
              },
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateSetDefaultProfileRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "dismissRecommendedProfiles",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DismissRecommendedProfilesRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createSetProfileImageURITypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetProfileImageUriBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TypedDataOptions",
                  "ofType": null
                }
              },
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UpdateProfileImageRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createSetProfileImageURIViaDispatcher",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "RelayResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UpdateProfileImageRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createBurnProfileTypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateBurnProfileBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TypedDataOptions",
                  "ofType": null
                }
              },
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "BurnProfileRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "proxyAction",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProxyActionId",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ProxyActionRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createDataAvailabilityPostTypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreatePostBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateDataAvailabilityPostRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createDataAvailabilityCommentTypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateCommentBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateDataAvailabilityCommentRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createDataAvailabilityPostViaDispatcher",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "RelayDataAvailabilityResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateDataAvailabilityPostRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createDataAvailabilityCommentViaDispatcher",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "RelayDataAvailabilityResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateDataAvailabilityCommentRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createDataAvailabilityMirrorTypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateMirrorBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateDataAvailabilityMirrorRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createDataAvailabilityMirrorViaDispatcher",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "RelayDataAvailabilityResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateDataAvailabilityMirrorRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createMirrorTypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateMirrorBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TypedDataOptions",
                  "ofType": null
                }
              },
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateMirrorRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "hidePublication",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "HidePublicationRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createPostTypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreatePostBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TypedDataOptions",
                  "ofType": null
                }
              },
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreatePublicPostRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createPostViaDispatcher",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "RelayResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreatePublicPostRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createCommentTypedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateCommentBroadcastItemResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TypedDataOptions",
                  "ofType": null
                }
              },
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreatePublicCommentRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createCommentViaDispatcher",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "RelayResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreatePublicCommentRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createMirrorViaDispatcher",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "RelayResult",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateMirrorRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "addPublicationProfileNotInterested",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "PublicationProfileNotInterestedRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "removePublicationProfileNotInterested",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "PublicationProfileNotInterestedRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "addPublicationProfileBookmark",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "PublicationProfileBookmarkRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "removePublicationProfileBookmark",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "PublicationProfileBookmarkRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "addReaction",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ReactionRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "removeReaction",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ReactionRequest",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "reportPublication",
            "type": {
              "kind": "SCALAR",
              "name": "Void",
              "ofType": null
            },
            "args": [
              {
                "name": "request",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ReportPublicationRequest",
                    "ofType": null
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "InviteRequest",
        "inputFields": [
          {
            "name": "invites",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "EthereumAddress",
                    "ofType": null
                  }
                }
              }
            }
          },
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AchRequest",
        "inputFields": [
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "ethereumAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "handle",
            "type": {
              "kind": "SCALAR",
              "name": "CreateHandle",
              "ofType": null
            }
          },
          {
            "name": "freeTextHandle",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "overrideTradeMark",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "overrideAlreadyClaimed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "CreateHandle"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "HelRequest",
        "inputFields": [
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "handle",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Handle",
                "ofType": null
              }
            }
          },
          {
            "name": "remove",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "GddRequest",
        "inputFields": [
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Url",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "GciRequest",
        "inputFields": [
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "hhh",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "ttt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "GcrRequest",
        "inputFields": [
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "hhh",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "ttt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PrfRequest",
        "inputFields": [
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "hhh",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "ss",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "dd",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NniRequest",
        "inputFields": [
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "n",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "Nfi",
                    "ofType": null
                  }
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Nfi",
        "inputFields": [
          {
            "name": "c",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "i",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ChainId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NnvRequest",
        "inputFields": [
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "n",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "Nfi",
                    "ofType": null
                  }
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "InRequest",
        "inputFields": [
          {
            "name": "secret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "ethereumAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "numInvites",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PublicMediaResults",
        "fields": [
          {
            "name": "signedUrl",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "media",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MediaOutput",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MediaOutput",
        "fields": [
          {
            "name": "item",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Url",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "MimeType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "altTag",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "cover",
            "type": {
              "kind": "SCALAR",
              "name": "Url",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "source",
            "type": {
              "kind": "ENUM",
              "name": "PublicationMediaSource",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PublicMediaRequest",
        "inputFields": [
          {
            "name": "itemCid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "IpfsCid",
                "ofType": null
              }
            }
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "MimeType",
              "ofType": null
            }
          },
          {
            "name": "altTag",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "cover",
            "type": {
              "kind": "SCALAR",
              "name": "Url",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "IpfsCid"
      },
      {
        "kind": "OBJECT",
        "name": "AuthenticationResult",
        "fields": [
          {
            "name": "accessToken",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Jwt",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "refreshToken",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Jwt",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SignedAuthChallenge",
        "inputFields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "signature",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Signature",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Signature"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "RefreshRequest",
        "inputFields": [
          {
            "name": "refreshToken",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Jwt",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "BroadcastDataAvailabilityUnion",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "CreateDataAvailabilityPublicationResult"
          },
          {
            "kind": "OBJECT",
            "name": "RelayError"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CreateDataAvailabilityPublicationResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "proofs",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "dataAvailabilityId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DataAvailabilityId",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "DataAvailabilityId"
      },
      {
        "kind": "OBJECT",
        "name": "RelayError",
        "fields": [
          {
            "name": "reason",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "RelayErrorReasons",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "RelayErrorReasons",
        "enumValues": [
          {
            "name": "REJECTED"
          },
          {
            "name": "HANDLE_TAKEN"
          },
          {
            "name": "EXPIRED"
          },
          {
            "name": "WRONG_WALLET_SIGNED"
          },
          {
            "name": "NOT_ALLOWED"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BroadcastRequest",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BroadcastId",
                "ofType": null
              }
            }
          },
          {
            "name": "signature",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Signature",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "BroadcastId"
      },
      {
        "kind": "UNION",
        "name": "RelayResult",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "RelayerResult"
          },
          {
            "kind": "OBJECT",
            "name": "RelayError"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "RelayerResult",
        "fields": [
          {
            "name": "txHash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "TxHash",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "txId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "TxId",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ClaimHandleRequest",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "HandleClaimIdScalar",
              "ofType": null
            }
          },
          {
            "name": "freeTextHandle",
            "type": {
              "kind": "SCALAR",
              "name": "CreateHandle",
              "ofType": null
            }
          },
          {
            "name": "followModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FollowModuleParams",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FollowModuleParams",
        "inputFields": [
          {
            "name": "feeFollowModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FeeFollowModuleParams",
              "ofType": null
            }
          },
          {
            "name": "profileFollowModule",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "revertFollowModule",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "freeFollowModule",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "unknownFollowModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UnknownFollowModuleParams",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FeeFollowModuleParams",
        "inputFields": [
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ModuleFeeAmountParams",
                "ofType": null
              }
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ModuleFeeAmountParams",
        "inputFields": [
          {
            "name": "currency",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UnknownFollowModuleParams",
        "inputFields": [
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BlockchainData",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "IdKitPhoneVerifyWebhookResultStatusType",
        "enumValues": [
          {
            "name": "SUCCESS"
          },
          {
            "name": "ALREADY_VERIFIED"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "IdKitPhoneVerifyWebhookRequest",
        "inputFields": [
          {
            "name": "sharedSecret",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "worldcoin",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "WorldcoinPhoneVerifyWebhookRequest",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "WorldcoinPhoneVerifyWebhookRequest",
        "inputFields": [
          {
            "name": "nullifierHash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "signalType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "WorldcoinPhoneVerifyType",
                "ofType": null
              }
            }
          },
          {
            "name": "signal",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "WorldcoinPhoneVerifyType",
        "enumValues": [
          {
            "name": "PHONE"
          },
          {
            "name": "ORB"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetDispatcherBroadcastItemResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BroadcastId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiresAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "typedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetDispatcherEIP712TypedData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetDispatcherEIP712TypedData",
        "fields": [
          {
            "name": "types",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetDispatcherEIP712TypedDataTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EIP712TypedDataDomain",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetDispatcherEIP712TypedDataValue",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetDispatcherEIP712TypedDataTypes",
        "fields": [
          {
            "name": "SetDispatcherWithSig",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EIP712TypedDataField",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EIP712TypedDataField",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EIP712TypedDataDomain",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "chainId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ChainId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "version",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "verifyingContract",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetDispatcherEIP712TypedDataValue",
        "fields": [
          {
            "name": "nonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Nonce",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deadline",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UnixTimestamp",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "dispatcher",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TypedDataOptions",
        "inputFields": [
          {
            "name": "overrideSigNonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Nonce",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SetDispatcherRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "dispatcher",
            "type": {
              "kind": "SCALAR",
              "name": "EthereumAddress",
              "ofType": null
            }
          },
          {
            "name": "enable",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CreateFollowBroadcastItemResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BroadcastId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiresAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "typedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateFollowEIP712TypedData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateFollowEIP712TypedData",
        "fields": [
          {
            "name": "types",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateFollowEIP712TypedDataTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EIP712TypedDataDomain",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateFollowEIP712TypedDataValue",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateFollowEIP712TypedDataTypes",
        "fields": [
          {
            "name": "FollowWithSig",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EIP712TypedDataField",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateFollowEIP712TypedDataValue",
        "fields": [
          {
            "name": "nonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Nonce",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deadline",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UnixTimestamp",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profileIds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ProfileId",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "datas",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "BlockchainData",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FollowRequest",
        "inputFields": [
          {
            "name": "follow",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "Follow",
                    "ofType": null
                  }
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Follow",
        "inputFields": [
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "followModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FollowModuleRedeemParams",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FollowModuleRedeemParams",
        "inputFields": [
          {
            "name": "feeFollowModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FeeFollowModuleRedeemParams",
              "ofType": null
            }
          },
          {
            "name": "profileFollowModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ProfileFollowModuleRedeemParams",
              "ofType": null
            }
          },
          {
            "name": "unknownFollowModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UnknownFollowModuleRedeemParams",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FeeFollowModuleRedeemParams",
        "inputFields": [
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ModuleFeeAmountParams",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ProfileFollowModuleRedeemParams",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UnknownFollowModuleRedeemParams",
        "inputFields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BlockchainData",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CreateUnfollowBroadcastItemResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BroadcastId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiresAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "typedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateBurnEIP712TypedData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateBurnEIP712TypedData",
        "fields": [
          {
            "name": "types",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateBurnEIP712TypedDataTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EIP712TypedDataDomain",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateBurnEIP712TypedDataValue",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateBurnEIP712TypedDataTypes",
        "fields": [
          {
            "name": "BurnWithSig",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EIP712TypedDataField",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateBurnEIP712TypedDataValue",
        "fields": [
          {
            "name": "nonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Nonce",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deadline",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UnixTimestamp",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UnfollowRequest",
        "inputFields": [
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetFollowModuleBroadcastItemResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BroadcastId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiresAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "typedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetFollowModuleEIP712TypedData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetFollowModuleEIP712TypedData",
        "fields": [
          {
            "name": "types",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetFollowModuleEIP712TypedDataTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EIP712TypedDataDomain",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetFollowModuleEIP712TypedDataValue",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetFollowModuleEIP712TypedDataTypes",
        "fields": [
          {
            "name": "SetFollowModuleWithSig",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EIP712TypedDataField",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetFollowModuleEIP712TypedDataValue",
        "fields": [
          {
            "name": "nonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Nonce",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deadline",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UnixTimestamp",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "followModule",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "followModuleInitData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "FollowModuleData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateSetFollowModuleRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "followModule",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "FollowModuleParams",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetFollowNFTUriBroadcastItemResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BroadcastId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiresAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "typedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetFollowNFTUriEIP712TypedData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetFollowNFTUriEIP712TypedData",
        "fields": [
          {
            "name": "types",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetFollowNFTUriEIP712TypedDataTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EIP712TypedDataDomain",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetFollowNFTUriEIP712TypedDataValue",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetFollowNFTUriEIP712TypedDataTypes",
        "fields": [
          {
            "name": "SetFollowNFTURIWithSig",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EIP712TypedDataField",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetFollowNFTUriEIP712TypedDataValue",
        "fields": [
          {
            "name": "nonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Nonce",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deadline",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UnixTimestamp",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "followNFTURI",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Url",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateSetFollowNFTUriRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "followNFTURI",
            "type": {
              "kind": "SCALAR",
              "name": "Url",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CreateToggleFollowBroadcastItemResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BroadcastId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiresAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "typedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateToggleFollowEIP712TypedData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateToggleFollowEIP712TypedData",
        "fields": [
          {
            "name": "types",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateToggleFollowEIP712TypedDataTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EIP712TypedDataDomain",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateToggleFollowEIP712TypedDataValue",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateToggleFollowEIP712TypedDataTypes",
        "fields": [
          {
            "name": "ToggleFollowWithSig",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EIP712TypedDataField",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateToggleFollowEIP712TypedDataValue",
        "fields": [
          {
            "name": "nonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Nonce",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deadline",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UnixTimestamp",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profileIds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ProfileId",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "enables",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Boolean",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateToggleFollowRequest",
        "inputFields": [
          {
            "name": "profileIds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ProfileId",
                    "ofType": null
                  }
                }
              }
            }
          },
          {
            "name": "enables",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Boolean",
                    "ofType": null
                  }
                }
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CreateCollectBroadcastItemResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BroadcastId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiresAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "typedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateCollectEIP712TypedData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateCollectEIP712TypedData",
        "fields": [
          {
            "name": "types",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateCollectEIP712TypedDataTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EIP712TypedDataDomain",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateCollectEIP712TypedDataValue",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateCollectEIP712TypedDataTypes",
        "fields": [
          {
            "name": "CollectWithSig",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EIP712TypedDataField",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateCollectEIP712TypedDataValue",
        "fields": [
          {
            "name": "nonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Nonce",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deadline",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UnixTimestamp",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "pubId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "PublicationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BlockchainData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "PublicationId"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateCollectRequest",
        "inputFields": [
          {
            "name": "publicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            }
          },
          {
            "name": "unknownModuleData",
            "type": {
              "kind": "SCALAR",
              "name": "BlockchainData",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NftGalleryCreateRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "NftGalleryName",
                "ofType": null
              }
            }
          },
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "NftInput",
                    "ofType": null
                  }
                }
              }
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "NftGalleryName"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NftInput",
        "inputFields": [
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "chainId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ChainId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NftGalleryUpdateInfoRequest",
        "inputFields": [
          {
            "name": "galleryId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "NftGalleryId",
                "ofType": null
              }
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "NftGalleryName",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NftGalleryUpdateItemOrderRequest",
        "inputFields": [
          {
            "name": "galleryId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "NftGalleryId",
                "ofType": null
              }
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "updates",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "NftUpdateItemOrder",
                    "ofType": null
                  }
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NftUpdateItemOrder",
        "inputFields": [
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "chainId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ChainId",
                "ofType": null
              }
            }
          },
          {
            "name": "newOrder",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NftGalleryUpdateItemsRequest",
        "inputFields": [
          {
            "name": "galleryId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "NftGalleryId",
                "ofType": null
              }
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "toAdd",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "NftInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          },
          {
            "name": "toRemove",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "NftInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NftGalleryDeleteRequest",
        "inputFields": [
          {
            "name": "galleryId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "NftGalleryId",
                "ofType": null
              }
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AddProfileInterestsRequest",
        "inputFields": [
          {
            "name": "interests",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ProfileInterest",
                    "ofType": null
                  }
                }
              }
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "RemoveProfileInterestsRequest",
        "inputFields": [
          {
            "name": "interests",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ProfileInterest",
                    "ofType": null
                  }
                }
              }
            }
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetProfileMetadataURIBroadcastItemResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BroadcastId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiresAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "typedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetProfileMetadataURIEIP712TypedData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetProfileMetadataURIEIP712TypedData",
        "fields": [
          {
            "name": "types",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetProfileMetadataURIEIP712TypedDataTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EIP712TypedDataDomain",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetProfileMetadataURIEIP712TypedDataValue",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetProfileMetadataURIEIP712TypedDataTypes",
        "fields": [
          {
            "name": "SetProfileMetadataURIWithSig",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EIP712TypedDataField",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetProfileMetadataURIEIP712TypedDataValue",
        "fields": [
          {
            "name": "nonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Nonce",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deadline",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UnixTimestamp",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "metadata",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Url",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreatePublicSetProfileMetadataURIRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "metadata",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Url",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "SetDefaultProfileBroadcastItemResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BroadcastId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiresAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "typedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SetDefaultProfileEIP712TypedData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SetDefaultProfileEIP712TypedData",
        "fields": [
          {
            "name": "types",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SetDefaultProfileEIP712TypedDataTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EIP712TypedDataDomain",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SetDefaultProfileEIP712TypedDataValue",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SetDefaultProfileEIP712TypedDataTypes",
        "fields": [
          {
            "name": "SetDefaultProfileWithSig",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EIP712TypedDataField",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SetDefaultProfileEIP712TypedDataValue",
        "fields": [
          {
            "name": "nonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Nonce",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deadline",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UnixTimestamp",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "wallet",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateSetDefaultProfileRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DismissRecommendedProfilesRequest",
        "inputFields": [
          {
            "name": "profileIds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ProfileId",
                    "ofType": null
                  }
                }
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetProfileImageUriBroadcastItemResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BroadcastId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiresAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "typedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetProfileImageUriEIP712TypedData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetProfileImageUriEIP712TypedData",
        "fields": [
          {
            "name": "types",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetProfileImageUriEIP712TypedDataTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EIP712TypedDataDomain",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateSetProfileImageUriEIP712TypedDataValue",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetProfileImageUriEIP712TypedDataTypes",
        "fields": [
          {
            "name": "SetProfileImageURIWithSig",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EIP712TypedDataField",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateSetProfileImageUriEIP712TypedDataValue",
        "fields": [
          {
            "name": "nonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Nonce",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deadline",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UnixTimestamp",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "imageURI",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Url",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UpdateProfileImageRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "url",
            "type": {
              "kind": "SCALAR",
              "name": "Url",
              "ofType": null
            }
          },
          {
            "name": "nftData",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NFTData",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NFTData",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "NftOwnershipId",
                "ofType": null
              }
            }
          },
          {
            "name": "signature",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Signature",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CreateBurnProfileBroadcastItemResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BroadcastId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiresAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "typedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateBurnEIP712TypedData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BurnProfileRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ProxyActionRequest",
        "inputFields": [
          {
            "name": "follow",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FollowProxyAction",
              "ofType": null
            }
          },
          {
            "name": "collect",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CollectProxyAction",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FollowProxyAction",
        "inputFields": [
          {
            "name": "freeFollow",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FreeFollowProxyAction",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FreeFollowProxyAction",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CollectProxyAction",
        "inputFields": [
          {
            "name": "freeCollect",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FreeCollectProxyAction",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FreeCollectProxyAction",
        "inputFields": [
          {
            "name": "publicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CreatePostBroadcastItemResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BroadcastId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiresAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "typedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreatePostEIP712TypedData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreatePostEIP712TypedData",
        "fields": [
          {
            "name": "types",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreatePostEIP712TypedDataTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EIP712TypedDataDomain",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreatePostEIP712TypedDataValue",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreatePostEIP712TypedDataTypes",
        "fields": [
          {
            "name": "PostWithSig",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EIP712TypedDataField",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreatePostEIP712TypedDataValue",
        "fields": [
          {
            "name": "nonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Nonce",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deadline",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UnixTimestamp",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contentURI",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "PublicationUrl",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectModule",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectModuleInitData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "CollectModuleData",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referenceModule",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referenceModuleInitData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ReferenceModuleData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "PublicationUrl"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateDataAvailabilityPostRequest",
        "inputFields": [
          {
            "name": "from",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "contentURI",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Url",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CreateCommentBroadcastItemResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BroadcastId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiresAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "typedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateCommentEIP712TypedData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateCommentEIP712TypedData",
        "fields": [
          {
            "name": "types",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateCommentEIP712TypedDataTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EIP712TypedDataDomain",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateCommentEIP712TypedDataValue",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateCommentEIP712TypedDataTypes",
        "fields": [
          {
            "name": "CommentWithSig",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EIP712TypedDataField",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateCommentEIP712TypedDataValue",
        "fields": [
          {
            "name": "nonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Nonce",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deadline",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UnixTimestamp",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contentURI",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "PublicationUrl",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profileIdPointed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "pubIdPointed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "PublicationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectModule",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectModuleInitData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "CollectModuleData",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referenceModule",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referenceModuleInitData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ReferenceModuleData",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referenceModuleData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ReferenceModuleData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateDataAvailabilityCommentRequest",
        "inputFields": [
          {
            "name": "from",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "commentOn",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            }
          },
          {
            "name": "contentURI",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Url",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "RelayDataAvailabilityResult",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "CreateDataAvailabilityPublicationResult"
          },
          {
            "kind": "OBJECT",
            "name": "RelayError"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CreateMirrorBroadcastItemResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BroadcastId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiresAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "typedData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateMirrorEIP712TypedData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateMirrorEIP712TypedData",
        "fields": [
          {
            "name": "types",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateMirrorEIP712TypedDataTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EIP712TypedDataDomain",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CreateMirrorEIP712TypedDataValue",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateMirrorEIP712TypedDataTypes",
        "fields": [
          {
            "name": "MirrorWithSig",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EIP712TypedDataField",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateMirrorEIP712TypedDataValue",
        "fields": [
          {
            "name": "nonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Nonce",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deadline",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UnixTimestamp",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "profileIdPointed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "pubIdPointed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "PublicationId",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referenceModuleData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ReferenceModuleData",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referenceModule",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "referenceModuleInitData",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ReferenceModuleData",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateDataAvailabilityMirrorRequest",
        "inputFields": [
          {
            "name": "from",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "mirror",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateMirrorRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "publicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            }
          },
          {
            "name": "referenceModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ReferenceModuleParams",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ReferenceModuleParams",
        "inputFields": [
          {
            "name": "followerOnlyReferenceModule",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "unknownReferenceModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UnknownReferenceModuleParams",
              "ofType": null
            }
          },
          {
            "name": "degreesOfSeparationReferenceModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DegreesOfSeparationReferenceModuleParams",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UnknownReferenceModuleParams",
        "inputFields": [
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BlockchainData",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DegreesOfSeparationReferenceModuleParams",
        "inputFields": [
          {
            "name": "commentsRestricted",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "mirrorsRestricted",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "degreesOfSeparation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "HidePublicationRequest",
        "inputFields": [
          {
            "name": "publicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreatePublicPostRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "contentURI",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Url",
                "ofType": null
              }
            }
          },
          {
            "name": "collectModule",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "CollectModuleParams",
                "ofType": null
              }
            }
          },
          {
            "name": "referenceModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ReferenceModuleParams",
              "ofType": null
            }
          },
          {
            "name": "gated",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "GatedPublicationParamsInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CollectModuleParams",
        "inputFields": [
          {
            "name": "freeCollectModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FreeCollectModuleParams",
              "ofType": null
            }
          },
          {
            "name": "revertCollectModule",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "feeCollectModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FeeCollectModuleParams",
              "ofType": null
            }
          },
          {
            "name": "limitedFeeCollectModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "LimitedFeeCollectModuleParams",
              "ofType": null
            }
          },
          {
            "name": "limitedTimedFeeCollectModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "LimitedTimedFeeCollectModuleParams",
              "ofType": null
            }
          },
          {
            "name": "timedFeeCollectModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TimedFeeCollectModuleParams",
              "ofType": null
            }
          },
          {
            "name": "multirecipientFeeCollectModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "MultirecipientFeeCollectModuleParams",
              "ofType": null
            }
          },
          {
            "name": "aaveFeeCollectModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AaveFeeCollectModuleParams",
              "ofType": null
            }
          },
          {
            "name": "erc4626FeeCollectModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ERC4626FeeCollectModuleParams",
              "ofType": null
            }
          },
          {
            "name": "simpleCollectModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SimpleCollectModuleParams",
              "ofType": null
            }
          },
          {
            "name": "unknownCollectModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UnknownCollectModuleParams",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FreeCollectModuleParams",
        "inputFields": [
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FeeCollectModuleParams",
        "inputFields": [
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ModuleFeeAmountParams",
                "ofType": null
              }
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "referralFee",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            }
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "LimitedFeeCollectModuleParams",
        "inputFields": [
          {
            "name": "collectLimit",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ModuleFeeAmountParams",
                "ofType": null
              }
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "referralFee",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            }
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "LimitedTimedFeeCollectModuleParams",
        "inputFields": [
          {
            "name": "collectLimit",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ModuleFeeAmountParams",
                "ofType": null
              }
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "referralFee",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            }
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TimedFeeCollectModuleParams",
        "inputFields": [
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ModuleFeeAmountParams",
                "ofType": null
              }
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "referralFee",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            }
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "MultirecipientFeeCollectModuleParams",
        "inputFields": [
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ModuleFeeAmountParams",
                "ofType": null
              }
            }
          },
          {
            "name": "collectLimit",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "referralFee",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "defaultValue": "0"
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "endTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            }
          },
          {
            "name": "recipients",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "RecipientDataInput",
                    "ofType": null
                  }
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "RecipientDataInput",
        "inputFields": [
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "split",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AaveFeeCollectModuleParams",
        "inputFields": [
          {
            "name": "collectLimit",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ModuleFeeAmountParams",
                "ofType": null
              }
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "referralFee",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            }
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "endTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ERC4626FeeCollectModuleParams",
        "inputFields": [
          {
            "name": "collectLimit",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ModuleFeeAmountParams",
                "ofType": null
              }
            }
          },
          {
            "name": "vault",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "referralFee",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "defaultValue": "0"
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "endTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SimpleCollectModuleParams",
        "inputFields": [
          {
            "name": "fee",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ModuleFeeParams",
              "ofType": null
            }
          },
          {
            "name": "collectLimit",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "followerOnly",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "endTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ModuleFeeParams",
        "inputFields": [
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ModuleFeeAmountParams",
                "ofType": null
              }
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "referralFee",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UnknownCollectModuleParams",
        "inputFields": [
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BlockchainData",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "GatedPublicationParamsInput",
        "inputFields": [
          {
            "name": "nft",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NftOwnershipInput",
              "ofType": null
            }
          },
          {
            "name": "token",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Erc20OwnershipInput",
              "ofType": null
            }
          },
          {
            "name": "eoa",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "EoaOwnershipInput",
              "ofType": null
            }
          },
          {
            "name": "profile",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ProfileOwnershipInput",
              "ofType": null
            }
          },
          {
            "name": "follow",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FollowConditionInput",
              "ofType": null
            }
          },
          {
            "name": "collect",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CollectConditionInput",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AndConditionInput",
              "ofType": null
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrConditionInput",
              "ofType": null
            }
          },
          {
            "name": "encryptedSymmetricKey",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContentEncryptionKey",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NftOwnershipInput",
        "inputFields": [
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "chainID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ChainId",
                "ofType": null
              }
            }
          },
          {
            "name": "contractType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ContractType",
                "ofType": null
              }
            }
          },
          {
            "name": "tokenIds",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "TokenId",
                  "ofType": null
                }
              }
            },
            "defaultValue": "[]"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Erc20OwnershipInput",
        "inputFields": [
          {
            "name": "contractAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ContractAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "chainID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ChainId",
                "ofType": null
              }
            }
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "decimals",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            }
          },
          {
            "name": "condition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ScalarOperator",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "EoaOwnershipInput",
        "inputFields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthereumAddress",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ProfileOwnershipInput",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FollowConditionInput",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CollectConditionInput",
        "inputFields": [
          {
            "name": "publicationId",
            "type": {
              "kind": "SCALAR",
              "name": "InternalPublicationId",
              "ofType": null
            }
          },
          {
            "name": "thisPublication",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AndConditionInput",
        "inputFields": [
          {
            "name": "criteria",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccessConditionInput",
                    "ofType": null
                  }
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccessConditionInput",
        "inputFields": [
          {
            "name": "nft",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NftOwnershipInput",
              "ofType": null
            }
          },
          {
            "name": "token",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Erc20OwnershipInput",
              "ofType": null
            }
          },
          {
            "name": "eoa",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "EoaOwnershipInput",
              "ofType": null
            }
          },
          {
            "name": "profile",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ProfileOwnershipInput",
              "ofType": null
            }
          },
          {
            "name": "follow",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FollowConditionInput",
              "ofType": null
            }
          },
          {
            "name": "collect",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CollectConditionInput",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AndConditionInput",
              "ofType": null
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrConditionInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OrConditionInput",
        "inputFields": [
          {
            "name": "criteria",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccessConditionInput",
                    "ofType": null
                  }
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreatePublicCommentRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "publicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            }
          },
          {
            "name": "contentURI",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Url",
                "ofType": null
              }
            }
          },
          {
            "name": "collectModule",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "CollectModuleParams",
                "ofType": null
              }
            }
          },
          {
            "name": "referenceModule",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ReferenceModuleParams",
              "ofType": null
            }
          },
          {
            "name": "gated",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "GatedPublicationParamsInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PublicationProfileNotInterestedRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "publicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PublicationProfileBookmarkRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "publicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ReactionRequest",
        "inputFields": [
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ProfileId",
                "ofType": null
              }
            }
          },
          {
            "name": "reaction",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "ReactionTypes",
                "ofType": null
              }
            }
          },
          {
            "name": "publicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ReportPublicationRequest",
        "inputFields": [
          {
            "name": "publicationId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "InternalPublicationId",
                "ofType": null
              }
            }
          },
          {
            "name": "reason",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ReportingReasonInputParams",
                "ofType": null
              }
            }
          },
          {
            "name": "additionalComments",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ReportingReasonInputParams",
        "inputFields": [
          {
            "name": "sensitiveReason",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SensitiveReasonInputParams",
              "ofType": null
            }
          },
          {
            "name": "illegalReason",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IllegalReasonInputParams",
              "ofType": null
            }
          },
          {
            "name": "fraudReason",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FraudReasonInputParams",
              "ofType": null
            }
          },
          {
            "name": "spamReason",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SpamReasonInputParams",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SensitiveReasonInputParams",
        "inputFields": [
          {
            "name": "reason",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "PublicationReportingReason",
                "ofType": null
              }
            }
          },
          {
            "name": "subreason",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "PublicationReportingSensitiveSubreason",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "PublicationReportingReason",
        "enumValues": [
          {
            "name": "SENSITIVE"
          },
          {
            "name": "ILLEGAL"
          },
          {
            "name": "FRAUD"
          },
          {
            "name": "SPAM"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "PublicationReportingSensitiveSubreason",
        "enumValues": [
          {
            "name": "NSFW"
          },
          {
            "name": "OFFENSIVE"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "IllegalReasonInputParams",
        "inputFields": [
          {
            "name": "reason",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "PublicationReportingReason",
                "ofType": null
              }
            }
          },
          {
            "name": "subreason",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "PublicationReportingIllegalSubreason",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "PublicationReportingIllegalSubreason",
        "enumValues": [
          {
            "name": "ANIMAL_ABUSE"
          },
          {
            "name": "HUMAN_ABUSE"
          },
          {
            "name": "VIOLENCE"
          },
          {
            "name": "THREAT_INDIVIDUAL"
          },
          {
            "name": "DIRECT_THREAT"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FraudReasonInputParams",
        "inputFields": [
          {
            "name": "reason",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "PublicationReportingReason",
                "ofType": null
              }
            }
          },
          {
            "name": "subreason",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "PublicationReportingFraudSubreason",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "PublicationReportingFraudSubreason",
        "enumValues": [
          {
            "name": "SCAM"
          },
          {
            "name": "IMPERSONATION"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SpamReasonInputParams",
        "inputFields": [
          {
            "name": "reason",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "PublicationReportingReason",
                "ofType": null
              }
            }
          },
          {
            "name": "subreason",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "PublicationReportingSpamSubreason",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "PublicationReportingSpamSubreason",
        "enumValues": [
          {
            "name": "MISLEADING"
          },
          {
            "name": "MISUSE_HASHTAGS"
          },
          {
            "name": "UNRELATED"
          },
          {
            "name": "REPETITIVE"
          },
          {
            "name": "FAKE_ENGAGEMENT"
          },
          {
            "name": "MANIPULATION_ALGO"
          },
          {
            "name": "LOW_SIGNAL"
          },
          {
            "name": "SOMETHING_ELSE"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Subscription",
        "fields": [
          {
            "name": "newDataAvailabilityTransaction",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "DataAvailabilityTransactionUnion",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      }
    ],
    "directives": []
  }
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}