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
    "mutationType": null,
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "Account",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "standard",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "AccountStandard",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "TokenBlockchain",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenAddress",
            "type": {
              "kind": "SCALAR",
              "name": "Address",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "address",
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
            "name": "registry",
            "type": {
              "kind": "SCALAR",
              "name": "Address",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "implementation",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "salt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "createdAtBlockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "createdAtBlockTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "creationTransactionHash",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "deployer",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nft",
            "type": {
              "kind": "OBJECT",
              "name": "TokenNft",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "updatedAtBlockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "updatedAtBlockTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountFilter",
        "inputFields": [
          {
            "name": "standard",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountStandard_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "tokenAddress",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Address_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "registry",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Address_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "implementation",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Address_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "salt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Eq_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "createdAtBlockTimestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Time_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountOrderBy",
        "inputFields": [
          {
            "name": "createdAtBlockTimestamp",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "AccountStandard",
        "enumValues": [
          {
            "name": "ERC6551"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountStandard_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "ENUM",
              "name": "AccountStandard",
              "ofType": null
            }
          },
          {
            "name": "_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "AccountStandard",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountsInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountOrderBy",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountFilter",
              "ofType": null
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TokenBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
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
        "name": "AccountsNestedInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AccountOrderBy",
                "ofType": null
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountFilter",
              "ofType": null
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "TokenBlockchain",
              "ofType": null
            }
          },
          {
            "name": "showOptimisticAddress",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AccountsOutput",
        "fields": [
          {
            "name": "Account",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Account",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Address"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Address_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "SCALAR",
              "name": "Address",
              "ofType": null
            }
          },
          {
            "name": "_ne",
            "type": {
              "kind": "SCALAR",
              "name": "Address",
              "ofType": null
            }
          },
          {
            "name": "_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Address",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "_nin",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Address",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AnimationUrlVariants",
        "fields": [
          {
            "name": "original",
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
        "kind": "SCALAR",
        "name": "Any"
      },
      {
        "kind": "ENUM",
        "name": "Audience",
        "enumValues": [
          {
            "name": "farcaster"
          },
          {
            "name": "all"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AudioVariants",
        "fields": [
          {
            "name": "original",
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
        "name": "Blockchain",
        "enumValues": [
          {
            "name": "ethereum"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Boolean"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Boolean_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
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
        "name": "ConnectedAddress",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "SCALAR",
              "name": "Address",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "chainId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ContractMetadata",
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
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "image",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "externalLink",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "feeRecipient",
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
        "kind": "SCALAR",
        "name": "DateRange"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Date_Range_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Domain",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "parent",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "owner",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Address",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "ownerDetails",
            "type": {
              "kind": "OBJECT",
              "name": "Wallet",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "resolvedAddressDetails",
            "type": {
              "kind": "OBJECT",
              "name": "Wallet",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "resolvedAddress",
            "type": {
              "kind": "SCALAR",
              "name": "Address",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "resolverAddress",
            "type": {
              "kind": "SCALAR",
              "name": "Address",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "expiryTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "isPrimary",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "labelName",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "labelHash",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
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
            "name": "paymentToken",
            "type": {
              "kind": "OBJECT",
              "name": "Token",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "paymentTokenCostInNativeToken",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "paymentTokenCostInUSDC",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "registrationCost",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "registrationCostInNativeToken",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "registrationCostInUSDC",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "formattedRegistrationCost",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "formattedRegistrationCostInNativeToken",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "formattedRegistrationCostInUSDC",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "subDomains",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Domain",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "DomainsNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "subDomainCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "ttl",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "chainId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "Blockchain",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "dappName",
            "type": {
              "kind": "ENUM",
              "name": "DomainDappName",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "dappSlug",
            "type": {
              "kind": "ENUM",
              "name": "DomainDappSlug",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "createdAtBlockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "createdAtBlockTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lastUpdatedBlockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lastUpdatedBlockTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Address",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "tokenNft",
            "type": {
              "kind": "OBJECT",
              "name": "TokenNft",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "manager",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Address",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "managerDetails",
            "type": {
              "kind": "OBJECT",
              "name": "Wallet",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "avatar",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "texts",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DomainTexts",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "isNameWrapped",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "multiChainAddresses",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DomainMultiChainAddress",
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
        "kind": "ENUM",
        "name": "DomainDappName",
        "enumValues": [
          {
            "name": "ens"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DomainDappName_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "ENUM",
              "name": "DomainDappName",
              "ofType": null
            }
          },
          {
            "name": "_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "DomainDappName",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "DomainDappSlug",
        "enumValues": [
          {
            "name": "ens_v1"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DomainDappSlug_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "ENUM",
              "name": "DomainDappSlug",
              "ofType": null
            }
          },
          {
            "name": "_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "DomainDappSlug",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DomainFilter",
        "inputFields": [
          {
            "name": "owner",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Address_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "isPrimary",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Boolean_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "lastUpdatedBlockTimestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Time_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "DomainMultiChainAddress",
        "fields": [
          {
            "name": "symbol",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "address",
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
        "name": "DomainOrderBy",
        "inputFields": [
          {
            "name": "expiryTimestamp",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          },
          {
            "name": "createdAtBlockTimestamp",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          },
          {
            "name": "lastUpdatedBlockTimestamp",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "DomainTexts",
        "fields": [
          {
            "name": "key",
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
        "kind": "INPUT_OBJECT",
        "name": "DomainsInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "DomainOrderBy",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "DomainFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "Blockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
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
        "name": "DomainsNestedInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "DomainOrderBy",
                "ofType": null
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DomainFilter",
              "ofType": null
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "Blockchain",
              "ofType": null
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "DomainsOutput",
        "fields": [
          {
            "name": "Domain",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Domain",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "EveryBlockchain",
        "enumValues": [
          {
            "name": "ALL"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FarcasterCast",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "fid",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "rawText",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "parentFid",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hash",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "rootParentUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "parentHash",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "url",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "embeds",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Map",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "mentions",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Mentions",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "castedAtTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "frame",
            "type": {
              "kind": "OBJECT",
              "name": "FarcasterFrame",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "parentCast",
            "type": {
              "kind": "OBJECT",
              "name": "FarcasterCast",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "quotedCast",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "FarcasterCast",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "channel",
            "type": {
              "kind": "OBJECT",
              "name": "FarcasterChannel",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "castedBy",
            "type": {
              "kind": "OBJECT",
              "name": "Social",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "numberOfLikes",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "numberOfRecasts",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "numberOfReplies",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "socialCapitalValue",
            "type": {
              "kind": "OBJECT",
              "name": "SocialCapitalValue",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterCastFilter",
        "inputFields": [
          {
            "name": "frameUrl",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Eq_In_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "castedBy",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "hash",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Eq_In_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "url",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Eq_In_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "hasFrames",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Boolean_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "hasEmbeds",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Boolean_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "hasMentions",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Boolean_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "castedAtTimestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Time_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "rootParentUrl",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Eq_In_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterCastInput",
        "inputFields": [
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "FarcasterCastFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "EveryBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FarcasterCastOutput",
        "fields": [
          {
            "name": "Cast",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FarcasterCast",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "FarcasterChannel",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "dappName",
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
            "name": "dappSlug",
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
            "name": "channelId",
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
            "name": "url",
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
            "name": "imageUrl",
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
            "name": "leadIds",
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
            },
            "args": []
          },
          {
            "name": "leadProfiles",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Social",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SocialsNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "hostIds",
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
            },
            "args": []
          },
          {
            "name": "hostProfiles",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Social",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SocialsNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "createdAtTimestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Time",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "followerCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "participants",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FarcasterChannelParticipant",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "FarcasterChannelParticipantNestedInput",
                  "ofType": null
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "FarcasterChannelActionType",
        "enumValues": [
          {
            "name": "cast"
          },
          {
            "name": "reply"
          },
          {
            "name": "follow"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterChannelActionType_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "ENUM",
              "name": "FarcasterChannelActionType",
              "ofType": null
            }
          },
          {
            "name": "_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "FarcasterChannelActionType",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterChannelFilter",
        "inputFields": [
          {
            "name": "channelId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Regex_String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "leadId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "leadIdentity",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "hostId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "hostIdentity",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "createdAtTimestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Time_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterChannelNestedInput",
        "inputFields": [
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "EveryBlockchain",
              "ofType": null
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FarcasterChannelFilter",
              "ofType": null
            }
          },
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "FarcasterChannelOrderBy",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterChannelOrderBy",
        "inputFields": [
          {
            "name": "createdAtTimestamp",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          },
          {
            "name": "followerCount",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FarcasterChannelParticipant",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "dappName",
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
            "name": "dappSlug",
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
            "name": "channelId",
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
            "name": "channelName",
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
            "name": "participantId",
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
            "name": "participant",
            "type": {
              "kind": "OBJECT",
              "name": "Social",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SocialsNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "channel",
            "type": {
              "kind": "OBJECT",
              "name": "FarcasterChannel",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "FarcasterChannelNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "lastActionTimestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Time",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "lastRepliedTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lastCastedTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lastFollowedTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "channelActions",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "FarcasterChannelActionType",
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
        "kind": "INPUT_OBJECT",
        "name": "FarcasterChannelParticipantFilter",
        "inputFields": [
          {
            "name": "participant",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "channelId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "channelName",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Regex_String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "channelActions",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FarcasterChannelActionType_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "lastActionTimestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Time_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterChannelParticipantNestedInput",
        "inputFields": [
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "EveryBlockchain",
              "ofType": null
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FarcasterChannelParticipantFilter",
              "ofType": null
            }
          },
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "FarcasterChannelParticipantOrderBy",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterChannelParticipantOrderBy",
        "inputFields": [
          {
            "name": "lastActionTimestamp",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterChannelParticipantsInput",
        "inputFields": [
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "FarcasterChannelParticipantFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "FarcasterChannelParticipantOrderBy",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "EveryBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FarcasterChannelParticipantsOutput",
        "fields": [
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "FarcasterChannelParticipant",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FarcasterChannelParticipant",
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
        "kind": "INPUT_OBJECT",
        "name": "FarcasterChannelsInput",
        "inputFields": [
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FarcasterChannelFilter",
              "ofType": null
            }
          },
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "FarcasterChannelOrderBy",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "EveryBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FarcasterChannelsOutput",
        "fields": [
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "FarcasterChannel",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FarcasterChannel",
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
        "kind": "OBJECT",
        "name": "FarcasterFrame",
        "fields": [
          {
            "name": "frameHash",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "frameUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "postUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "inputText",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "imageAspectRatio",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "imageUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "state",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "buttons",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FrameButton",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "castedAtTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterFrameMessageInput",
        "inputFields": [
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "FarcasterFrameMessageInputFilter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterFrameMessageInputFilter",
        "inputFields": [
          {
            "name": "messageBytes",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FarcasterFrameMessageOutput",
        "fields": [
          {
            "name": "isValid",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "messageByte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "messageRaw",
            "type": {
              "kind": "SCALAR",
              "name": "Map",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "message",
            "type": {
              "kind": "OBJECT",
              "name": "FrameMessage",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "castedByFid",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "castedBy",
            "type": {
              "kind": "OBJECT",
              "name": "Social",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "interactedByFid",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "interactedBy",
            "type": {
              "kind": "OBJECT",
              "name": "Social",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterQuotedRecastsFilter",
        "inputFields": [
          {
            "name": "recastedBy",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "parentCastedBy",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "parentHash",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Eq_In_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "parentUrl",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Eq_In_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterQuotedRecastsInput",
        "inputFields": [
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "FarcasterQuotedRecastsFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "EveryBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FarcasterQuotedRecastsOutput",
        "fields": [
          {
            "name": "QuotedRecast",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FarcasterCast",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "FarcasterReaction",
        "fields": [
          {
            "name": "cast",
            "type": {
              "kind": "OBJECT",
              "name": "FarcasterCast",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "castHash",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "reactedBy",
            "type": {
              "kind": "OBJECT",
              "name": "Social",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "FarcasterReactionCriteria",
        "enumValues": [
          {
            "name": "liked"
          },
          {
            "name": "replied"
          },
          {
            "name": "recasted"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterReactionsFilter",
        "inputFields": [
          {
            "name": "criteria",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "FarcasterReactionCriteria",
                "ofType": null
              }
            }
          },
          {
            "name": "castHash",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Eq_In_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "castUrl",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Eq_In_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "frameUrl",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Eq_In_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "reactedBy",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "channelId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterReactionsInput",
        "inputFields": [
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "FarcasterReactionsFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "EveryBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FarcasterReactionsOutput",
        "fields": [
          {
            "name": "Criteria",
            "type": {
              "kind": "ENUM",
              "name": "FarcasterReactionCriteria",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "Reaction",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FarcasterReaction",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterRepliesFilter",
        "inputFields": [
          {
            "name": "repliedBy",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "parentCastedBy",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "parentHash",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Eq_In_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "parentUrl",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Eq_In_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FarcasterRepliesInput",
        "inputFields": [
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "FarcasterRepliesFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "EveryBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FarcasterRepliesOutput",
        "fields": [
          {
            "name": "Reply",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FarcasterCast",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
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
        "kind": "INPUT_OBJECT",
        "name": "Float_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "_ne",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Float",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "_nin",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Float",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FrameButton",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "index",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "label",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "action",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "target",
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
        "name": "FrameMessage",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "OBJECT",
              "name": "FrameMessageData",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hash",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hashScheme",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "signature",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "signatureScheme",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "signer",
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
        "name": "FrameMessageActionBody",
        "fields": [
          {
            "name": "url",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "urlDecoded",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "buttonIndex",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "castId",
            "type": {
              "kind": "OBJECT",
              "name": "FrameMessageCastId",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "inputText",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "inputTextDecoded",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "state",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stateDecoded",
            "type": {
              "kind": "SCALAR",
              "name": "Any",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "transactionId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "transactionHash",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "address",
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
        "name": "FrameMessageCastId",
        "fields": [
          {
            "name": "fid",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hash",
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
        "name": "FrameMessageData",
        "fields": [
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "fid",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "time",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "network",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "frameActionBody",
            "type": {
              "kind": "OBJECT",
              "name": "FrameMessageActionBody",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "ID"
      },
      {
        "kind": "SCALAR",
        "name": "Identity"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Identity_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "SCALAR",
              "name": "Identity",
              "ofType": null
            }
          },
          {
            "name": "_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Identity",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ImageSizes",
        "fields": [
          {
            "name": "extraSmall",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "small",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "medium",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "large",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "original",
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
        "kind": "SCALAR",
        "name": "Int"
      },
      {
        "kind": "SCALAR",
        "name": "IntString"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Int_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "_ne",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "_nin",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Int_String_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_ne",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_in",
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
            "name": "_nin",
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
        "name": "LogoSizes",
        "fields": [
          {
            "name": "small",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "medium",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "large",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "original",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "external",
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
        "kind": "SCALAR",
        "name": "Map"
      },
      {
        "kind": "OBJECT",
        "name": "Media",
        "fields": [
          {
            "name": "image",
            "type": {
              "kind": "OBJECT",
              "name": "ImageSizes",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "video",
            "type": {
              "kind": "OBJECT",
              "name": "VideoVariants",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "audio",
            "type": {
              "kind": "OBJECT",
              "name": "AudioVariants",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "json",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "animation_url",
            "type": {
              "kind": "OBJECT",
              "name": "AnimationUrlVariants",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Mentions",
        "fields": [
          {
            "name": "fid",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "position",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "profile",
            "type": {
              "kind": "OBJECT",
              "name": "Social",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "NativeBalance",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
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
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "NativeBalanceBlockchain",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "owner",
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
            "name": "formattedAmount",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lastUpdatedBlock",
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
            "name": "lastUpdatedTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "NativeBalanceBlockchain",
        "enumValues": [
          {
            "name": "degen"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NativeBalanceFilter",
        "inputFields": [
          {
            "name": "owner",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "formattedAmount",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Float_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "lastUpdatedTimestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Time_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NativeBalanceOrderBy",
        "inputFields": [
          {
            "name": "lastUpdatedTimestamp",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NativeBalancesInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "NativeBalanceOrderBy",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NativeBalanceFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "NativeBalanceBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NativeBalancesOutput",
        "fields": [
          {
            "name": "NativeBalance",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "NativeBalance",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "NftAttribute",
        "fields": [
          {
            "name": "trait_type",
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
          },
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
            "name": "maxValue",
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
        "name": "NftAttributeFilter",
        "inputFields": [
          {
            "name": "trait_type",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "value",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NftAttributesInput",
        "inputFields": [
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NftAttributeFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NftAttributesOutput",
        "fields": [
          {
            "name": "NftAttribute",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "NftAttribute",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "NftMetadata",
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
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "image",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
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
                  "name": "NftAttribute",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "imageData",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "backgroundColor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "youtubeUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "externalUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "animationUrl",
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
        "name": "NftMetadataFilter",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "attributes",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NftAttributeFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NftMetadataOrderBy",
        "inputFields": [
          {
            "name": "attributes",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NftMetadatasInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "NftMetadataOrderBy",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NftMetadataFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NftMetadatasOutput",
        "fields": [
          {
            "name": "NftMetadata",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "NftMetadata",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "OrderBy",
        "enumValues": [
          {
            "name": "ASC"
          },
          {
            "name": "DESC"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "OrderByAsIntString",
        "enumValues": [
          {
            "name": "ASC"
          },
          {
            "name": "DESC"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PageInfo",
        "fields": [
          {
            "name": "prevCursor",
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
            "name": "nextCursor",
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
            "name": "hasPrevPage",
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
            "name": "hasNextPage",
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
        "name": "Poap",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "chainId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "EveryBlockchain",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "dappName",
            "type": {
              "kind": "ENUM",
              "name": "PoapDappName",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "dappSlug",
            "type": {
              "kind": "ENUM",
              "name": "PoapDappSlug",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "dappVersion",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "eventId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "owner",
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
            "name": "createdAtBlockTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "createdAtBlockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenUri",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenAddress",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "transferCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "mintOrder",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "mintHash",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "poapEvent",
            "type": {
              "kind": "OBJECT",
              "name": "PoapEvent",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "attendee",
            "type": {
              "kind": "OBJECT",
              "name": "PoapAttendee",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PoapAttendee",
        "fields": [
          {
            "name": "totalPoapOwned",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "owner",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Wallet",
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
        "name": "PoapAttendeesOutput",
        "fields": [
          {
            "name": "PoapAttendee",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "PoapAttendee",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "PoapDappName",
        "enumValues": [
          {
            "name": "poap"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PoapDappName_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "ENUM",
              "name": "PoapDappName",
              "ofType": null
            }
          },
          {
            "name": "_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "PoapDappName",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "PoapDappSlug",
        "enumValues": [
          {
            "name": "poap_mainnet"
          },
          {
            "name": "poap_gnosis"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PoapDappSlug_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "ENUM",
              "name": "PoapDappSlug",
              "ofType": null
            }
          },
          {
            "name": "_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "PoapDappSlug",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PoapEvent",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "chainId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "EveryBlockchain",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "dappName",
            "type": {
              "kind": "ENUM",
              "name": "PoapDappName",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "dappSlug",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "PoapDappSlug",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "dappVersion",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "eventId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenMints",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "metadata",
            "type": {
              "kind": "SCALAR",
              "name": "Map",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "contentType",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "contentValue",
            "type": {
              "kind": "OBJECT",
              "name": "Media",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "eventName",
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
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "country",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "city",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "startDate",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "endDate",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "isVirtualEvent",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "eventURL",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "poaps",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Poap",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PoapsNestedInput",
                  "ofType": null
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PoapEventFilter",
        "inputFields": [
          {
            "name": "dappName",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PoapDappName_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "dappSlug",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PoapDappSlug_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "eventId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "tokenMints",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Int_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "eventName",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Regex_String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "country",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "city",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "startDate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "endDate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "isVirtualEvent",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Boolean_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PoapEventOrderBy",
        "inputFields": [
          {
            "name": "tokenMints",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          },
          {
            "name": "startDate",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          },
          {
            "name": "endDate",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PoapEventsInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "PoapEventOrderBy",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "PoapEventFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "EveryBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PoapEventsOutput",
        "fields": [
          {
            "name": "PoapEvent",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "PoapEvent",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PoapFilter",
        "inputFields": [
          {
            "name": "dappName",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PoapDappName_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "dappSlug",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PoapDappSlug_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "eventId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "owner",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "createdAtBlockNumber",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Int_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PoapOrderBy",
        "inputFields": [
          {
            "name": "createdAtBlockNumber",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PoapsInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "PoapOrderBy",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "PoapFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "EveryBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
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
        "name": "PoapsNestedInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "PoapOrderBy",
                "ofType": null
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "PoapFilter",
              "ofType": null
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "EveryBlockchain",
              "ofType": null
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PoapsOutput",
        "fields": [
          {
            "name": "Poap",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Poap",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PopularDapp",
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
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "website",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "chainId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "address",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "criteriaCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "criteria",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "userbase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timeFrom",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timeTo",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lastTransactionHash",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lastTransactionTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lastTransactionBlockNumber",
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
        "kind": "ENUM",
        "name": "PopularDappsCriteria",
        "enumValues": [
          {
            "name": "UNIQUE_USERS"
          },
          {
            "name": "TOTAL_TRANSACTIONS"
          },
          {
            "name": "GAS_SPENT"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PopularDappsInput",
        "inputFields": [
          {
            "name": "timeFrame",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TimeFrame",
                "ofType": null
              }
            }
          },
          {
            "name": "userbase",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "Audience",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TrendingBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "criteria",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "PopularDappsCriteria",
                "ofType": null
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TrendingFilter",
              "ofType": null
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PopularDappsOutput",
        "fields": [
          {
            "name": "PopularDapps",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "PopularDapp",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProjectDetails",
        "fields": [
          {
            "name": "collectionName",
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
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "externalUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "twitterUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "discordUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "imageUrl",
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
        "name": "Query",
        "fields": [
          {
            "name": "Tokens",
            "type": {
              "kind": "OBJECT",
              "name": "TokensOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TokensInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "TokenNfts",
            "type": {
              "kind": "OBJECT",
              "name": "TokenNftsOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TokenNftsInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "TokenBalances",
            "type": {
              "kind": "OBJECT",
              "name": "TokenBalancesOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TokenBalancesInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "TokenTransfers",
            "type": {
              "kind": "OBJECT",
              "name": "TokenTransfersOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TokenTransfersInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "Domains",
            "type": {
              "kind": "OBJECT",
              "name": "DomainsOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DomainsInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "Wallet",
            "type": {
              "kind": "OBJECT",
              "name": "Wallet",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "WalletInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "Socials",
            "type": {
              "kind": "OBJECT",
              "name": "SocialsOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SocialsInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "PoapEvents",
            "type": {
              "kind": "OBJECT",
              "name": "PoapEventsOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "PoapEventsInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "Poaps",
            "type": {
              "kind": "OBJECT",
              "name": "PoapsOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "PoapsInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "Accounts",
            "type": {
              "kind": "OBJECT",
              "name": "AccountsOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountsInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "XMTPs",
            "type": {
              "kind": "OBJECT",
              "name": "XMTPsOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "XMTPsInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "SocialFollowings",
            "type": {
              "kind": "OBJECT",
              "name": "SocialFollowingOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SocialFollowingInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "SocialFollowers",
            "type": {
              "kind": "OBJECT",
              "name": "SocialFollowerOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SocialFollowerInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "Snapshots",
            "type": {
              "kind": "OBJECT",
              "name": "SnapshotsOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SnapshotsInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "TrendingMints",
            "type": {
              "kind": "OBJECT",
              "name": "TrendingMintsOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TrendingMintsInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "TrendingTokens",
            "type": {
              "kind": "OBJECT",
              "name": "TrendingTokensOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TrendingTokensInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "FarcasterChannels",
            "type": {
              "kind": "OBJECT",
              "name": "FarcasterChannelsOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "FarcasterChannelsInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "FarcasterChannelParticipants",
            "type": {
              "kind": "OBJECT",
              "name": "FarcasterChannelParticipantsOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "FarcasterChannelParticipantsInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "FarcasterValidateFrameMessage",
            "type": {
              "kind": "OBJECT",
              "name": "FarcasterFrameMessageOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "FarcasterFrameMessageInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "TrendingSwaps",
            "type": {
              "kind": "OBJECT",
              "name": "TrendingSwapsOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TrendingSwapsInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "FarcasterCasts",
            "type": {
              "kind": "OBJECT",
              "name": "FarcasterCastOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "FarcasterCastInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "TrendingCasts",
            "type": {
              "kind": "OBJECT",
              "name": "TrendingCastsOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TrendingCastsInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "FarcasterReplies",
            "type": {
              "kind": "OBJECT",
              "name": "FarcasterRepliesOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "FarcasterRepliesInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "FarcasterQuotedRecasts",
            "type": {
              "kind": "OBJECT",
              "name": "FarcasterQuotedRecastsOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "FarcasterQuotedRecastsInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "FarcasterReactions",
            "type": {
              "kind": "OBJECT",
              "name": "FarcasterReactionsOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "FarcasterReactionsInput",
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
        "kind": "SCALAR",
        "name": "Range"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Range_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Regex_String_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_ne",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_regex",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_regex_in",
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
            "name": "_in",
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
            "name": "_nin",
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
        "kind": "INPUT_OBJECT",
        "name": "Simple_String_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_ne",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_in",
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
            "name": "_nin",
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
        "name": "Snapshot",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "owner",
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
            "name": "tokenAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Address",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "amount",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "formattedAmount",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenType",
            "type": {
              "kind": "ENUM",
              "name": "TokenType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "TokenBlockchain",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "startBlockTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "endBlockTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "startBlockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "endBlockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenNft",
            "type": {
              "kind": "OBJECT",
              "name": "TokenNft",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "OBJECT",
              "name": "Token",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "chainId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenId",
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
        "name": "SnapshotBlockchain",
        "enumValues": [
          {
            "name": "ethereum"
          },
          {
            "name": "base"
          },
          {
            "name": "zora"
          },
          {
            "name": "gold"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SnapshotFilter",
        "inputFields": [
          {
            "name": "owner",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "tokenAddress",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Address_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "tokenType",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TokenType_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "date",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Date_Range_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Time_Range_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Range_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SnapshotsInput",
        "inputFields": [
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SnapshotFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "SnapshotBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "SnapshotsOutput",
        "fields": [
          {
            "name": "Snapshot",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Snapshot",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Social",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "chainId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "Blockchain",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "dappName",
            "type": {
              "kind": "ENUM",
              "name": "SocialDappName",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "dappSlug",
            "type": {
              "kind": "ENUM",
              "name": "SocialDappSlug",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "dappVersion",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "userAddress",
            "type": {
              "kind": "SCALAR",
              "name": "Address",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "userAddressDetails",
            "type": {
              "kind": "OBJECT",
              "name": "Wallet",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "userAssociatedAddressDetails",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Wallet",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "connectedAddresses",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "ConnectedAddress",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "userCreatedAtBlockTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "userCreatedAtBlockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "userLastUpdatedAtBlockTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "userLastUpdatedAtBlockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "userHomeURL",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "userRecoveryAddress",
            "type": {
              "kind": "SCALAR",
              "name": "Address",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "userAssociatedAddresses",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Address",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "profileName",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "profileTokenId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "profileTokenIdHex",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "profileTokenAddress",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "profileCreatedAtBlockTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "profileCreatedAtBlockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "profileLastUpdatedAtBlockTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "profileLastUpdatedAtBlockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "profileTokenUri",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "isDefault",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "identity",
            "type": {
              "kind": "SCALAR",
              "name": "Identity",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "isFarcasterPowerUser",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followerTokenAddress",
            "type": {
              "kind": "SCALAR",
              "name": "Address",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followingCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followerCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followings",
            "type": {
              "kind": "OBJECT",
              "name": "SocialFollowingOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SocialFollowingNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "followers",
            "type": {
              "kind": "OBJECT",
              "name": "SocialFollowerOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SocialFollowerNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "profileBio",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "profileDisplayName",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "profileImage",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "profileUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "fnames",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "handleTokenAddress",
            "type": {
              "kind": "SCALAR",
              "name": "Address",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "handleTokenId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "metadataURI",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "profileMetadata",
            "type": {
              "kind": "SCALAR",
              "name": "Map",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "coverImageURI",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "twitterUserName",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "website",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "location",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "profileImageContentValue",
            "type": {
              "kind": "OBJECT",
              "name": "Media",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "coverImageContentValue",
            "type": {
              "kind": "OBJECT",
              "name": "Media",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "profileHandle",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "socialCapital",
            "type": {
              "kind": "OBJECT",
              "name": "SocialCapital",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SocialCapital",
        "fields": [
          {
            "name": "socialCapitalScoreRaw",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "socialCapitalScore",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "socialCapitalRank",
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
        "name": "SocialCapitalValue",
        "fields": [
          {
            "name": "hash",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "rawValue",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "formattedValue",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "SocialDappName",
        "enumValues": [
          {
            "name": "farcaster"
          },
          {
            "name": "lens"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SocialDappName_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "ENUM",
              "name": "SocialDappName",
              "ofType": null
            }
          },
          {
            "name": "_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "SocialDappName",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "SocialDappSlug",
        "enumValues": [
          {
            "name": "farcaster_optimism"
          },
          {
            "name": "farcaster_goerli"
          },
          {
            "name": "lens_polygon"
          },
          {
            "name": "farcaster_v2_optimism"
          },
          {
            "name": "farcaster_v3_optimism"
          },
          {
            "name": "lens_v2_polygon"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SocialDappSlug_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "ENUM",
              "name": "SocialDappSlug",
              "ofType": null
            }
          },
          {
            "name": "_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "SocialDappSlug",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SocialFilter",
        "inputFields": [
          {
            "name": "dappName",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SocialDappName_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "dappSlug",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SocialDappSlug_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "userId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "userAssociatedAddresses",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Address_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "profileName",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Regex_String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "profileCreatedAtBlockTimestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Time_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "isDefault",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Boolean_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "identity",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "followerCount",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Int_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "followingCount",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Int_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Time_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "socialCapitalScore",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Float_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "socialCapitalRank",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Int_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "SocialFollower",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "EveryBlockchain",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "dappName",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "dappSlug",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followingProfileId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followingAddress",
            "type": {
              "kind": "OBJECT",
              "name": "Wallet",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followerProfileId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followerAddress",
            "type": {
              "kind": "OBJECT",
              "name": "Wallet",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followerTokenId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followerSince",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SocialFollowerFilter",
        "inputFields": [
          {
            "name": "dappName",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SocialDappName_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "dappSlug",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SocialDappSlug_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "identity",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "followerSince",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Time_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Int_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "followerProfileId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "followingProfileId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SocialFollowerInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SocialFollowerOrderBy",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SocialFollowerFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "EveryBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
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
        "name": "SocialFollowerNestedInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SocialFollowerOrderBy",
                "ofType": null
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SocialFollowerFilter",
              "ofType": null
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "EveryBlockchain",
              "ofType": null
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SocialFollowerOrderBy",
        "inputFields": [
          {
            "name": "blockNumber",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          },
          {
            "name": "followerSince",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "SocialFollowerOutput",
        "fields": [
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "Follower",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "SocialFollower",
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
        "kind": "OBJECT",
        "name": "SocialFollowing",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "EveryBlockchain",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "dappName",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "dappSlug",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followingProfileId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followingAddress",
            "type": {
              "kind": "OBJECT",
              "name": "Wallet",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followerProfileId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followerAddress",
            "type": {
              "kind": "OBJECT",
              "name": "Wallet",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followerTokenId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "followingSince",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SocialFollowingFilter",
        "inputFields": [
          {
            "name": "dappName",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SocialDappName_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "dappSlug",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SocialDappSlug_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "identity",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "followingSince",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Time_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Int_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "followingProfileId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "followerProfileId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SocialFollowingInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SocialFollowingOrderBy",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SocialFollowingFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "EveryBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
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
        "name": "SocialFollowingNestedInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SocialFollowingOrderBy",
                "ofType": null
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SocialFollowingFilter",
              "ofType": null
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "EveryBlockchain",
              "ofType": null
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SocialFollowingOrderBy",
        "inputFields": [
          {
            "name": "blockNumber",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          },
          {
            "name": "followingSince",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "SocialFollowingOutput",
        "fields": [
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "Following",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "SocialFollowing",
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
        "kind": "INPUT_OBJECT",
        "name": "SocialOrderBy",
        "inputFields": [
          {
            "name": "profileCreatedAtBlockTimestamp",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          },
          {
            "name": "followerCount",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          },
          {
            "name": "followingCount",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          },
          {
            "name": "socialCapitalScore",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          },
          {
            "name": "socialCapitalRank",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SocialsInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SocialOrderBy",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SocialFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "Blockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
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
        "name": "SocialsNestedInput",
        "inputFields": [
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SocialFilter",
              "ofType": null
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "Blockchain",
              "ofType": null
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "SocialsOutput",
        "fields": [
          {
            "name": "Social",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Social",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "String"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "String_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_ne",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_in",
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
            "name": "_nin",
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
        "kind": "INPUT_OBJECT",
        "name": "String_Eq_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
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
        "name": "String_Eq_In_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_in",
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
        "kind": "SCALAR",
        "name": "Time"
      },
      {
        "kind": "ENUM",
        "name": "TimeFrame",
        "enumValues": [
          {
            "name": "one_hour"
          },
          {
            "name": "two_hours"
          },
          {
            "name": "eight_hours"
          },
          {
            "name": "one_day"
          },
          {
            "name": "two_days"
          },
          {
            "name": "seven_days"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "TimeRange"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Time_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            }
          },
          {
            "name": "_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            }
          },
          {
            "name": "_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            }
          },
          {
            "name": "_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            }
          },
          {
            "name": "_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            }
          },
          {
            "name": "_ne",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            }
          },
          {
            "name": "_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Time",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "_nin",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Time",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Time_Range_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Token",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Address",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "chainId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "TokenBlockchain",
              "ofType": null
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
            "name": "symbol",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "owner",
            "type": {
              "kind": "OBJECT",
              "name": "Wallet",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "ENUM",
              "name": "TokenType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "totalSupply",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "decimals",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "logo",
            "type": {
              "kind": "OBJECT",
              "name": "LogoSizes",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "contractMetaDataURI",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "contractMetaData",
            "type": {
              "kind": "OBJECT",
              "name": "ContractMetadata",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "rawContractMetaData",
            "type": {
              "kind": "SCALAR",
              "name": "Map",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "baseURI",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lastTransferTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lastTransferBlock",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lastTransferHash",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenTraits",
            "type": {
              "kind": "SCALAR",
              "name": "Map",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenBalances",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TokenBalance",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TokenBalancesNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "tokenNfts",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TokenNft",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TokenNftsNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "projectDetails",
            "type": {
              "kind": "OBJECT",
              "name": "ProjectDetails",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "isSpam",
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
        "name": "TokenBalance",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
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
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "TokenBlockchain",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Address",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "owner",
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
            "name": "formattedAmount",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lastUpdatedBlock",
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
            "name": "lastUpdatedTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenType",
            "type": {
              "kind": "ENUM",
              "name": "TokenType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "OBJECT",
              "name": "Token",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenNfts",
            "type": {
              "kind": "OBJECT",
              "name": "TokenNft",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenTransfers",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TokenTransfer",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TokenTransfersNestedInput",
                  "ofType": null
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TokenBalanceFilter",
        "inputFields": [
          {
            "name": "tokenAddress",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Address_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "owner",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "formattedAmount",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Float_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "lastUpdatedTimestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Time_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "tokenType",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TokenType_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TokenBalanceOrderBy",
        "inputFields": [
          {
            "name": "lastUpdatedTimestamp",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TokenBalancesInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "TokenBalanceOrderBy",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "TokenBalanceFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TokenBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
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
        "name": "TokenBalancesNestedInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "TokenBalanceOrderBy",
                "ofType": null
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TokenBalanceFilter",
              "ofType": null
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "TokenBlockchain",
              "ofType": null
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TokenBalancesOutput",
        "fields": [
          {
            "name": "TokenBalance",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TokenBalance",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "TokenBlockchain",
        "enumValues": [
          {
            "name": "ethereum"
          },
          {
            "name": "base"
          },
          {
            "name": "zora"
          },
          {
            "name": "gold"
          },
          {
            "name": "degen"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TokenFilter",
        "inputFields": [
          {
            "name": "address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Address_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "symbol",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "owner",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "type",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TokenType_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "isSpam",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Boolean_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TokenNft",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
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
                "name": "Address",
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
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "TokenBlockchain",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "chainId",
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
              "kind": "ENUM",
              "name": "TokenType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "totalSupply",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenURI",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "contentType",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "contentValue",
            "type": {
              "kind": "OBJECT",
              "name": "Media",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "metaData",
            "type": {
              "kind": "OBJECT",
              "name": "NftMetadata",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "rawMetaData",
            "type": {
              "kind": "SCALAR",
              "name": "Map",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lastTransferHash",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lastTransferBlock",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "lastTransferTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "OBJECT",
              "name": "Token",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenBalances",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TokenBalance",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TokenBalancesNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "tokenTransfers",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TokenTransfer",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TokenTransfersNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "erc6551Accounts",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Account",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountsNestedInput",
                  "ofType": null
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TokenNftFilter",
        "inputFields": [
          {
            "name": "address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Address_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "metaData",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NftMetadataFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TokenNftOrderBy",
        "inputFields": [
          {
            "name": "tokenId",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TokenNftsInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "TokenNftOrderBy",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "TokenNftFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TokenBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
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
        "name": "TokenNftsNestedInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "TokenNftOrderBy",
                "ofType": null
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TokenNftFilter",
              "ofType": null
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "TokenBlockchain",
              "ofType": null
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TokenNftsOutput",
        "fields": [
          {
            "name": "TokenNft",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TokenNft",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TokenTransfer",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "chainId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "TokenBlockchain",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "from",
            "type": {
              "kind": "OBJECT",
              "name": "Wallet",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "to",
            "type": {
              "kind": "OBJECT",
              "name": "Wallet",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "ENUM",
              "name": "TokenTransferType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenAddress",
            "type": {
              "kind": "SCALAR",
              "name": "Address",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "operator",
            "type": {
              "kind": "OBJECT",
              "name": "Wallet",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "amount",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "formattedAmount",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "amounts",
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
                  "name": "String",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "tokenType",
            "type": {
              "kind": "ENUM",
              "name": "TokenType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "transactionHash",
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
            "name": "blockTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tokenNft",
            "type": {
              "kind": "OBJECT",
              "name": "TokenNft",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "OBJECT",
              "name": "Token",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TokenTransferFilter",
        "inputFields": [
          {
            "name": "from",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "to",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "type",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TokenTransferType_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "tokenAddress",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Address_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "operator",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "formattedAmount",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Float_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "tokenId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "tokenType",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TokenType_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "transactionHash",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "blockTimestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Time_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TokenTransferOrderBy",
        "inputFields": [
          {
            "name": "blockTimestamp",
            "type": {
              "kind": "ENUM",
              "name": "OrderBy",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "TokenTransferType",
        "enumValues": [
          {
            "name": "MINT"
          },
          {
            "name": "BURN"
          },
          {
            "name": "TRANSFER"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TokenTransferType_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "ENUM",
              "name": "TokenTransferType",
              "ofType": null
            }
          },
          {
            "name": "_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "TokenTransferType",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TokenTransfersInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "TokenTransferOrderBy",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "TokenTransferFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TokenBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
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
        "name": "TokenTransfersNestedInput",
        "inputFields": [
          {
            "name": "order",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "TokenTransferOrderBy",
                "ofType": null
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TokenTransferFilter",
              "ofType": null
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "TokenBlockchain",
              "ofType": null
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TokenTransfersOutput",
        "fields": [
          {
            "name": "TokenTransfer",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TokenTransfer",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "TokenType",
        "enumValues": [
          {
            "name": "ERC1155"
          },
          {
            "name": "ERC721"
          },
          {
            "name": "ERC20"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TokenType_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "ENUM",
              "name": "TokenType",
              "ofType": null
            }
          },
          {
            "name": "_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "TokenType",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TokensInput",
        "inputFields": [
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "TokenFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TokenBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TokensOutput",
        "fields": [
          {
            "name": "Token",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Token",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "TrendingBlockchain",
        "enumValues": [
          {
            "name": "base"
          },
          {
            "name": "degen"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TrendingCast",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hash",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "fid",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "rootParentUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "criteriaCount",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "socialCapitalValueFormatted",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "socialCapitalValueRaw",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "cast",
            "type": {
              "kind": "OBJECT",
              "name": "FarcasterCast",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "criteria",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timeFrom",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timeTo",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "channel",
            "type": {
              "kind": "OBJECT",
              "name": "FarcasterChannel",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TrendingCastFilter",
        "inputFields": [
          {
            "name": "fid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TrendingCast_Int_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "rootParentUrl",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "String_Eq_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "TrendingCastTimeFrame",
        "enumValues": [
          {
            "name": "one_hour"
          },
          {
            "name": "two_hours"
          },
          {
            "name": "four_hours"
          },
          {
            "name": "eight_hours"
          },
          {
            "name": "twelve_hours"
          },
          {
            "name": "one_day"
          },
          {
            "name": "two_days"
          },
          {
            "name": "seven_days"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TrendingCast_Int_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "TrendingCastsCriteria",
        "enumValues": [
          {
            "name": "social_capital_value"
          },
          {
            "name": "likes"
          },
          {
            "name": "recasts"
          },
          {
            "name": "replies"
          },
          {
            "name": "likes_recasts_replies"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TrendingCastsInput",
        "inputFields": [
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TrendingCastFilter",
              "ofType": null
            }
          },
          {
            "name": "timeFrame",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TrendingCastTimeFrame",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "EveryBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "criteria",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TrendingCastsCriteria",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TrendingCastsOutput",
        "fields": [
          {
            "name": "TrendingCast",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TrendingCast",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TrendingFilter",
        "inputFields": [
          {
            "name": "address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Trending_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TrendingMint",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "chainId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "address",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "criteriaCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "OBJECT",
              "name": "Token",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "criteria",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "audience",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timeFrom",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timeTo",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "erc1155TokenID",
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
        "name": "TrendingMintsCriteria",
        "enumValues": [
          {
            "name": "unique_wallets"
          },
          {
            "name": "total_mints"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TrendingMintsInput",
        "inputFields": [
          {
            "name": "timeFrame",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TimeFrame",
                "ofType": null
              }
            }
          },
          {
            "name": "audience",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "Audience",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TrendingBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TrendingFilter",
              "ofType": null
            }
          },
          {
            "name": "criteria",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TrendingMintsCriteria",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TrendingMintsOutput",
        "fields": [
          {
            "name": "TrendingMint",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TrendingMint",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TrendingSwap",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "chainId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "address",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "OBJECT",
              "name": "Token",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "criteria",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timeFrom",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timeTo",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "buyTransactionCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sellTransactionCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "totalTransactionCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "buyVolume",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sellVolume",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "totalVolume",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "uniqueBuyWallets",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "uniqueSellWallets",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "totalUniqueWallets",
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
        "kind": "ENUM",
        "name": "TrendingSwapsBlockchain",
        "enumValues": [
          {
            "name": "base"
          },
          {
            "name": "ethereum"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "TrendingSwapsCriteria",
        "enumValues": [
          {
            "name": "buy_transaction_count"
          },
          {
            "name": "sell_transaction_count"
          },
          {
            "name": "total_transaction_count"
          },
          {
            "name": "buy_volume"
          },
          {
            "name": "sell_volume"
          },
          {
            "name": "total_volume"
          },
          {
            "name": "unique_buy_wallets"
          },
          {
            "name": "unique_sell_wallets"
          },
          {
            "name": "total_unique_wallets"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TrendingSwapsFilter",
        "inputFields": [
          {
            "name": "address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Trending_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TrendingSwapsInput",
        "inputFields": [
          {
            "name": "timeFrame",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TimeFrame",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TrendingSwapsBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TrendingSwapsFilter",
              "ofType": null
            }
          },
          {
            "name": "criteria",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TrendingSwapsCriteria",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TrendingSwapsOutput",
        "fields": [
          {
            "name": "TrendingSwap",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TrendingSwap",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TrendingToken",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "chainId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "address",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "criteriaCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "OBJECT",
              "name": "Token",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "criteria",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "audience",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timeFrom",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timeTo",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "uniqueHolders",
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
        "kind": "ENUM",
        "name": "TrendingTokensCriteria",
        "enumValues": [
          {
            "name": "unique_wallets"
          },
          {
            "name": "total_transfers"
          },
          {
            "name": "unique_holders"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TrendingTokensFilter",
        "inputFields": [
          {
            "name": "address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Trending_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TrendingTokensInput",
        "inputFields": [
          {
            "name": "swappable",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Boolean_Comparator_Exp",
              "ofType": null
            }
          },
          {
            "name": "transferType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TrendingTokensTransferType",
                "ofType": null
              }
            }
          },
          {
            "name": "timeFrame",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TimeFrame",
                "ofType": null
              }
            }
          },
          {
            "name": "audience",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "Audience",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TrendingBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TrendingTokensFilter",
              "ofType": null
            }
          },
          {
            "name": "criteria",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TrendingTokensCriteria",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TrendingTokensOutput",
        "fields": [
          {
            "name": "TrendingToken",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TrendingToken",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "TrendingTokensTransferType",
        "enumValues": [
          {
            "name": "all"
          },
          {
            "name": "self_initiated"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Trending_Comparator_Exp",
        "inputFields": [
          {
            "name": "_eq",
            "type": {
              "kind": "SCALAR",
              "name": "Address",
              "ofType": null
            }
          },
          {
            "name": "_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Address",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "VideoVariants",
        "fields": [
          {
            "name": "original",
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
        "name": "Wallet",
        "fields": [
          {
            "name": "identity",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Identity",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "TokenBlockchain",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "addresses",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Address",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "primaryDomain",
            "type": {
              "kind": "OBJECT",
              "name": "Domain",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "domains",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Domain",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "DomainsNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "socials",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Social",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SocialsNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "tokenTransfers",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TokenTransfer",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TokenTransfersNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "tokenBalances",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TokenBalance",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TokenBalancesNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "poaps",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Poap",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PoapsNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "xmtp",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "XMTP",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "XMTPsNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "accounts",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Account",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountsNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "socialFollowings",
            "type": {
              "kind": "OBJECT",
              "name": "SocialFollowingOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SocialFollowingNestedInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "socialFollowers",
            "type": {
              "kind": "OBJECT",
              "name": "SocialFollowerOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SocialFollowerNestedInput",
                  "ofType": null
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "WalletInput",
        "inputFields": [
          {
            "name": "identity",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Identity",
                "ofType": null
              }
            }
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "TokenBlockchain",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "XMTP",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "EveryBlockchain",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "owner",
            "type": {
              "kind": "OBJECT",
              "name": "Wallet",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "isXMTPEnabled",
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
        "kind": "INPUT_OBJECT",
        "name": "XMTPFilter",
        "inputFields": [
          {
            "name": "owner",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Identity_Comparator_Exp",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "XMTPsInput",
        "inputFields": [
          {
            "name": "blockchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "EveryBlockchain",
                "ofType": null
              }
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "XMTPFilter",
                "ofType": null
              }
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "cursor",
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
        "name": "XMTPsNestedInput",
        "inputFields": [
          {
            "name": "blockchain",
            "type": {
              "kind": "ENUM",
              "name": "EveryBlockchain",
              "ofType": null
            }
          },
          {
            "name": "filter",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "XMTPFilter",
              "ofType": null
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "XMTPsOutput",
        "fields": [
          {
            "name": "XMTP",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "XMTP",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "OBJECT",
              "name": "PageInfo",
              "ofType": null
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