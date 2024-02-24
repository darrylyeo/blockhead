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
    "subscriptionType": {
      "name": "Subscription"
    },
    "types": [
      {
        "kind": "OBJECT",
        "name": "AbiChanged",
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
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Resolver",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contentType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ResolverEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AbiChanged_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_in",
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
            "name": "resolver_not_in",
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
            "name": "resolver_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Resolver_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "contentType",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "contentType_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "contentType_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "contentType_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "contentType_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "contentType_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "contentType_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "contentType_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AbiChanged_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AbiChanged_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "AbiChanged_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "resolver"
          },
          {
            "name": "resolver__id"
          },
          {
            "name": "resolver__address"
          },
          {
            "name": "resolver__contentHash"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "contentType"
          }
        ]
      },
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
            "name": "domains",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Domain",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Domain_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Domain_filter",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "wrappedDomains",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "WrappedDomain",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "WrappedDomain_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "WrappedDomain_filter",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "registrations",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Registration",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Registration_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Registration_filter",
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
        "name": "Account_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "domains_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "wrappedDomains_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "WrappedDomain_filter",
              "ofType": null
            }
          },
          {
            "name": "registrations_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Registration_filter",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Account_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Account_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "Account_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "domains"
          },
          {
            "name": "wrappedDomains"
          },
          {
            "name": "registrations"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AddrChanged",
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
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Resolver",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "addr",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Account",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ResolverEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AddrChanged_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_in",
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
            "name": "resolver_not_in",
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
            "name": "resolver_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Resolver_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "addr",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_in",
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
            "name": "addr_not_in",
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
            "name": "addr_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Account_filter",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AddrChanged_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AddrChanged_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "AddrChanged_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "resolver"
          },
          {
            "name": "resolver__id"
          },
          {
            "name": "resolver__address"
          },
          {
            "name": "resolver__contentHash"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "addr"
          },
          {
            "name": "addr__id"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "Aggregation_interval",
        "enumValues": [
          {
            "name": "hour"
          },
          {
            "name": "day"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AuthorisationChanged",
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
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Resolver",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
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
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "target",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "isAuthorized",
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
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ResolverEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AuthorisationChanged_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_in",
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
            "name": "resolver_not_in",
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
            "name": "resolver_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Resolver_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "owner_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "owner_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "target",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "target_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "target_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "target_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "target_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "target_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "target_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "target_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "target_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "target_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "isAuthorized",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "isAuthorized_not",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "isAuthorized_in",
            "type": {
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
          {
            "name": "isAuthorized_not_in",
            "type": {
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
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AuthorisationChanged_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AuthorisationChanged_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "AuthorisationChanged_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "resolver"
          },
          {
            "name": "resolver__id"
          },
          {
            "name": "resolver__address"
          },
          {
            "name": "resolver__contentHash"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "owner"
          },
          {
            "name": "target"
          },
          {
            "name": "isAuthorized"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "BigDecimal"
      },
      {
        "kind": "SCALAR",
        "name": "BigInt"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BlockChangedFilter",
        "inputFields": [
          {
            "name": "number_gte",
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
        "name": "Block_height",
        "inputFields": [
          {
            "name": "hash",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "number",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "number_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Boolean"
      },
      {
        "kind": "SCALAR",
        "name": "Bytes"
      },
      {
        "kind": "OBJECT",
        "name": "ContenthashChanged",
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
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Resolver",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "hash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ResolverEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ContenthashChanged_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_in",
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
            "name": "resolver_not_in",
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
            "name": "resolver_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Resolver_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "hash",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "hash_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "hash_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "hash_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "hash_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "hash_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "hash_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "hash_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "hash_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "hash_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ContenthashChanged_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ContenthashChanged_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "ContenthashChanged_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "resolver"
          },
          {
            "name": "resolver__id"
          },
          {
            "name": "resolver__address"
          },
          {
            "name": "resolver__contentHash"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "hash"
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
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String",
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
            "name": "labelhash",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "parent",
            "type": {
              "kind": "OBJECT",
              "name": "Domain",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "subdomains",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Domain",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Domain_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Domain_filter",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "subdomainCount",
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
            "name": "resolvedAddress",
            "type": {
              "kind": "OBJECT",
              "name": "Account",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "resolver",
            "type": {
              "kind": "OBJECT",
              "name": "Resolver",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "ttl",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "isMigrated",
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
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
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
                "name": "Account",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "registrant",
            "type": {
              "kind": "OBJECT",
              "name": "Account",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "wrappedOwner",
            "type": {
              "kind": "OBJECT",
              "name": "Account",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "expiryDate",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "registration",
            "type": {
              "kind": "OBJECT",
              "name": "Registration",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "wrappedDomain",
            "type": {
              "kind": "OBJECT",
              "name": "WrappedDomain",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "events",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INTERFACE",
                    "name": "DomainEvent",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "DomainEvent_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "DomainEvent_filter",
                  "ofType": null
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INTERFACE",
        "name": "DomainEvent",
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
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Domain",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": null,
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "Transfer"
          },
          {
            "kind": "OBJECT",
            "name": "NewOwner"
          },
          {
            "kind": "OBJECT",
            "name": "NewResolver"
          },
          {
            "kind": "OBJECT",
            "name": "NewTTL"
          },
          {
            "kind": "OBJECT",
            "name": "WrappedTransfer"
          },
          {
            "kind": "OBJECT",
            "name": "NameWrapped"
          },
          {
            "kind": "OBJECT",
            "name": "NameUnwrapped"
          },
          {
            "kind": "OBJECT",
            "name": "FusesSet"
          },
          {
            "kind": "OBJECT",
            "name": "ExpiryExtended"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DomainEvent_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "domain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_in",
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
            "name": "domain_not_in",
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
            "name": "domain_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "DomainEvent_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "DomainEvent_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "DomainEvent_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "domain"
          },
          {
            "name": "domain__id"
          },
          {
            "name": "domain__name"
          },
          {
            "name": "domain__labelName"
          },
          {
            "name": "domain__labelhash"
          },
          {
            "name": "domain__subdomainCount"
          },
          {
            "name": "domain__ttl"
          },
          {
            "name": "domain__isMigrated"
          },
          {
            "name": "domain__createdAt"
          },
          {
            "name": "domain__expiryDate"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Domain_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_in",
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
            "name": "name_not_in",
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
            "name": "name_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_in",
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
            "name": "labelName_not_in",
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
            "name": "labelName_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelhash",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "labelhash_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "labelhash_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "labelhash_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "labelhash_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "labelhash_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "labelhash_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "labelhash_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "labelhash_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "labelhash_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "parent",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_in",
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
            "name": "parent_not_in",
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
            "name": "parent_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parent_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "subdomains_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "subdomainCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "subdomainCount_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "subdomainCount_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "subdomainCount_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "subdomainCount_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "subdomainCount_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "subdomainCount_in",
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
            "name": "subdomainCount_not_in",
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
            "name": "resolvedAddress",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_in",
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
            "name": "resolvedAddress_not_in",
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
            "name": "resolvedAddress_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolvedAddress_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Account_filter",
              "ofType": null
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_in",
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
            "name": "resolver_not_in",
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
            "name": "resolver_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Resolver_filter",
              "ofType": null
            }
          },
          {
            "name": "ttl",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "ttl_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "ttl_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "ttl_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "ttl_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "ttl_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "ttl_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "ttl_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "isMigrated",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "isMigrated_not",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "isMigrated_in",
            "type": {
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
          {
            "name": "isMigrated_not_in",
            "type": {
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
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "createdAt_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "createdAt_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "createdAt_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "createdAt_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "createdAt_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "createdAt_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "createdAt_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "owner",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_in",
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
            "name": "owner_not_in",
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
            "name": "owner_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Account_filter",
              "ofType": null
            }
          },
          {
            "name": "registrant",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_in",
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
            "name": "registrant_not_in",
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
            "name": "registrant_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Account_filter",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_in",
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
            "name": "wrappedOwner_not_in",
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
            "name": "wrappedOwner_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "wrappedOwner_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Account_filter",
              "ofType": null
            }
          },
          {
            "name": "expiryDate",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "expiryDate_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "registration_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Registration_filter",
              "ofType": null
            }
          },
          {
            "name": "wrappedDomain_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "WrappedDomain_filter",
              "ofType": null
            }
          },
          {
            "name": "events_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DomainEvent_filter",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Domain_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Domain_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "Domain_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "name"
          },
          {
            "name": "labelName"
          },
          {
            "name": "labelhash"
          },
          {
            "name": "parent"
          },
          {
            "name": "parent__id"
          },
          {
            "name": "parent__name"
          },
          {
            "name": "parent__labelName"
          },
          {
            "name": "parent__labelhash"
          },
          {
            "name": "parent__subdomainCount"
          },
          {
            "name": "parent__ttl"
          },
          {
            "name": "parent__isMigrated"
          },
          {
            "name": "parent__createdAt"
          },
          {
            "name": "parent__expiryDate"
          },
          {
            "name": "subdomains"
          },
          {
            "name": "subdomainCount"
          },
          {
            "name": "resolvedAddress"
          },
          {
            "name": "resolvedAddress__id"
          },
          {
            "name": "resolver"
          },
          {
            "name": "resolver__id"
          },
          {
            "name": "resolver__address"
          },
          {
            "name": "resolver__contentHash"
          },
          {
            "name": "ttl"
          },
          {
            "name": "isMigrated"
          },
          {
            "name": "createdAt"
          },
          {
            "name": "owner"
          },
          {
            "name": "owner__id"
          },
          {
            "name": "registrant"
          },
          {
            "name": "registrant__id"
          },
          {
            "name": "wrappedOwner"
          },
          {
            "name": "wrappedOwner__id"
          },
          {
            "name": "expiryDate"
          },
          {
            "name": "registration"
          },
          {
            "name": "registration__id"
          },
          {
            "name": "registration__registrationDate"
          },
          {
            "name": "registration__expiryDate"
          },
          {
            "name": "registration__cost"
          },
          {
            "name": "registration__labelName"
          },
          {
            "name": "wrappedDomain"
          },
          {
            "name": "wrappedDomain__id"
          },
          {
            "name": "wrappedDomain__expiryDate"
          },
          {
            "name": "wrappedDomain__fuses"
          },
          {
            "name": "wrappedDomain__name"
          },
          {
            "name": "events"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ExpiryExtended",
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
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Domain",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiryDate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "DomainEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ExpiryExtended_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "domain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_in",
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
            "name": "domain_not_in",
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
            "name": "domain_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "expiryDate",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "expiryDate_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ExpiryExtended_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ExpiryExtended_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "ExpiryExtended_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "domain"
          },
          {
            "name": "domain__id"
          },
          {
            "name": "domain__name"
          },
          {
            "name": "domain__labelName"
          },
          {
            "name": "domain__labelhash"
          },
          {
            "name": "domain__subdomainCount"
          },
          {
            "name": "domain__ttl"
          },
          {
            "name": "domain__isMigrated"
          },
          {
            "name": "domain__createdAt"
          },
          {
            "name": "domain__expiryDate"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "expiryDate"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Float"
      },
      {
        "kind": "OBJECT",
        "name": "FusesSet",
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
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Domain",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "fuses",
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
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "DomainEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FusesSet_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "domain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_in",
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
            "name": "domain_not_in",
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
            "name": "domain_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "fuses",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_in",
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
            "name": "fuses_not_in",
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
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "FusesSet_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "FusesSet_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "FusesSet_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "domain"
          },
          {
            "name": "domain__id"
          },
          {
            "name": "domain__name"
          },
          {
            "name": "domain__labelName"
          },
          {
            "name": "domain__labelhash"
          },
          {
            "name": "domain__subdomainCount"
          },
          {
            "name": "domain__ttl"
          },
          {
            "name": "domain__isMigrated"
          },
          {
            "name": "domain__createdAt"
          },
          {
            "name": "domain__expiryDate"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "fuses"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "ID"
      },
      {
        "kind": "SCALAR",
        "name": "Int"
      },
      {
        "kind": "SCALAR",
        "name": "Int8"
      },
      {
        "kind": "OBJECT",
        "name": "InterfaceChanged",
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
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Resolver",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "interfaceID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "implementer",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ResolverEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "InterfaceChanged_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_in",
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
            "name": "resolver_not_in",
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
            "name": "resolver_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Resolver_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "interfaceID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "interfaceID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "interfaceID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "interfaceID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "interfaceID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "interfaceID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "interfaceID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "interfaceID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "interfaceID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "interfaceID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "implementer",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "implementer_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "implementer_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "implementer_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "implementer_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "implementer_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "implementer_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "implementer_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "implementer_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "implementer_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "InterfaceChanged_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "InterfaceChanged_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "InterfaceChanged_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "resolver"
          },
          {
            "name": "resolver__id"
          },
          {
            "name": "resolver__address"
          },
          {
            "name": "resolver__contentHash"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "interfaceID"
          },
          {
            "name": "implementer"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MulticoinAddrChanged",
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
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Resolver",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "coinType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "addr",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ResolverEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "MulticoinAddrChanged_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_in",
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
            "name": "resolver_not_in",
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
            "name": "resolver_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Resolver_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "coinType",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "coinType_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "coinType_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "coinType_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "coinType_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "coinType_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "coinType_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "coinType_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "addr",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "addr_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "addr_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "addr_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "addr_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "addr_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "addr_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "addr_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "addr_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "addr_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "MulticoinAddrChanged_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "MulticoinAddrChanged_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "MulticoinAddrChanged_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "resolver"
          },
          {
            "name": "resolver__id"
          },
          {
            "name": "resolver__address"
          },
          {
            "name": "resolver__contentHash"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "coinType"
          },
          {
            "name": "addr"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NameChanged",
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
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Resolver",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
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
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ResolverEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NameChanged_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_in",
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
            "name": "resolver_not_in",
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
            "name": "resolver_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Resolver_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_in",
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
            "name": "name_not_in",
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
            "name": "name_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NameChanged_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NameChanged_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "NameChanged_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "resolver"
          },
          {
            "name": "resolver__id"
          },
          {
            "name": "resolver__address"
          },
          {
            "name": "resolver__contentHash"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "name"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NameRegistered",
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
            "name": "registration",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Registration",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "registrant",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Account",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiryDate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "RegistrationEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NameRegistered_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "registration",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_in",
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
            "name": "registration_not_in",
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
            "name": "registration_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Registration_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "registrant",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_in",
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
            "name": "registrant_not_in",
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
            "name": "registrant_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Account_filter",
              "ofType": null
            }
          },
          {
            "name": "expiryDate",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "expiryDate_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NameRegistered_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NameRegistered_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "NameRegistered_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "registration"
          },
          {
            "name": "registration__id"
          },
          {
            "name": "registration__registrationDate"
          },
          {
            "name": "registration__expiryDate"
          },
          {
            "name": "registration__cost"
          },
          {
            "name": "registration__labelName"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "registrant"
          },
          {
            "name": "registrant__id"
          },
          {
            "name": "expiryDate"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NameRenewed",
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
            "name": "registration",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Registration",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiryDate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "RegistrationEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NameRenewed_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "registration",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_in",
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
            "name": "registration_not_in",
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
            "name": "registration_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Registration_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "expiryDate",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "expiryDate_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NameRenewed_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NameRenewed_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "NameRenewed_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "registration"
          },
          {
            "name": "registration__id"
          },
          {
            "name": "registration__registrationDate"
          },
          {
            "name": "registration__expiryDate"
          },
          {
            "name": "registration__cost"
          },
          {
            "name": "registration__labelName"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "expiryDate"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NameTransferred",
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
            "name": "registration",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Registration",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "newOwner",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Account",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "RegistrationEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NameTransferred_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "registration",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_in",
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
            "name": "registration_not_in",
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
            "name": "registration_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Registration_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "newOwner",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_in",
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
            "name": "newOwner_not_in",
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
            "name": "newOwner_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "newOwner_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Account_filter",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NameTransferred_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NameTransferred_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "NameTransferred_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "registration"
          },
          {
            "name": "registration__id"
          },
          {
            "name": "registration__registrationDate"
          },
          {
            "name": "registration__expiryDate"
          },
          {
            "name": "registration__cost"
          },
          {
            "name": "registration__labelName"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "newOwner"
          },
          {
            "name": "newOwner__id"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NameUnwrapped",
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
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Domain",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
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
                "name": "Account",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "DomainEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NameUnwrapped_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "domain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_in",
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
            "name": "domain_not_in",
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
            "name": "domain_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_in",
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
            "name": "owner_not_in",
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
            "name": "owner_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Account_filter",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NameUnwrapped_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NameUnwrapped_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "NameUnwrapped_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "domain"
          },
          {
            "name": "domain__id"
          },
          {
            "name": "domain__name"
          },
          {
            "name": "domain__labelName"
          },
          {
            "name": "domain__labelhash"
          },
          {
            "name": "domain__subdomainCount"
          },
          {
            "name": "domain__ttl"
          },
          {
            "name": "domain__isMigrated"
          },
          {
            "name": "domain__createdAt"
          },
          {
            "name": "domain__expiryDate"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "owner"
          },
          {
            "name": "owner__id"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NameWrapped",
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
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Domain",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
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
            "name": "fuses",
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
            "name": "owner",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Account",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiryDate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "DomainEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NameWrapped_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "domain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_in",
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
            "name": "domain_not_in",
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
            "name": "domain_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_in",
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
            "name": "name_not_in",
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
            "name": "name_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fuses",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_in",
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
            "name": "fuses_not_in",
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
            "name": "owner",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_in",
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
            "name": "owner_not_in",
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
            "name": "owner_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Account_filter",
              "ofType": null
            }
          },
          {
            "name": "expiryDate",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "expiryDate_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NameWrapped_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NameWrapped_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "NameWrapped_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "domain"
          },
          {
            "name": "domain__id"
          },
          {
            "name": "domain__name"
          },
          {
            "name": "domain__labelName"
          },
          {
            "name": "domain__labelhash"
          },
          {
            "name": "domain__subdomainCount"
          },
          {
            "name": "domain__ttl"
          },
          {
            "name": "domain__isMigrated"
          },
          {
            "name": "domain__createdAt"
          },
          {
            "name": "domain__expiryDate"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "name"
          },
          {
            "name": "fuses"
          },
          {
            "name": "owner"
          },
          {
            "name": "owner__id"
          },
          {
            "name": "expiryDate"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NewOwner",
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
            "name": "parentDomain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Domain",
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
                "name": "Domain",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
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
                "name": "Account",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "DomainEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NewOwner_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "parentDomain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_in",
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
            "name": "parentDomain_not_in",
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
            "name": "parentDomain_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "parentDomain_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "domain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_in",
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
            "name": "domain_not_in",
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
            "name": "domain_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_in",
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
            "name": "owner_not_in",
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
            "name": "owner_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Account_filter",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NewOwner_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NewOwner_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "NewOwner_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "parentDomain"
          },
          {
            "name": "parentDomain__id"
          },
          {
            "name": "parentDomain__name"
          },
          {
            "name": "parentDomain__labelName"
          },
          {
            "name": "parentDomain__labelhash"
          },
          {
            "name": "parentDomain__subdomainCount"
          },
          {
            "name": "parentDomain__ttl"
          },
          {
            "name": "parentDomain__isMigrated"
          },
          {
            "name": "parentDomain__createdAt"
          },
          {
            "name": "parentDomain__expiryDate"
          },
          {
            "name": "domain"
          },
          {
            "name": "domain__id"
          },
          {
            "name": "domain__name"
          },
          {
            "name": "domain__labelName"
          },
          {
            "name": "domain__labelhash"
          },
          {
            "name": "domain__subdomainCount"
          },
          {
            "name": "domain__ttl"
          },
          {
            "name": "domain__isMigrated"
          },
          {
            "name": "domain__createdAt"
          },
          {
            "name": "domain__expiryDate"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "owner"
          },
          {
            "name": "owner__id"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NewResolver",
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
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Domain",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Resolver",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "DomainEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NewResolver_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "domain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_in",
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
            "name": "domain_not_in",
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
            "name": "domain_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_in",
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
            "name": "resolver_not_in",
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
            "name": "resolver_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Resolver_filter",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NewResolver_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NewResolver_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "NewResolver_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "domain"
          },
          {
            "name": "domain__id"
          },
          {
            "name": "domain__name"
          },
          {
            "name": "domain__labelName"
          },
          {
            "name": "domain__labelhash"
          },
          {
            "name": "domain__subdomainCount"
          },
          {
            "name": "domain__ttl"
          },
          {
            "name": "domain__isMigrated"
          },
          {
            "name": "domain__createdAt"
          },
          {
            "name": "domain__expiryDate"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "resolver"
          },
          {
            "name": "resolver__id"
          },
          {
            "name": "resolver__address"
          },
          {
            "name": "resolver__contentHash"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NewTTL",
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
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Domain",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "ttl",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "DomainEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NewTTL_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "domain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_in",
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
            "name": "domain_not_in",
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
            "name": "domain_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "ttl",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "ttl_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "ttl_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "ttl_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "ttl_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "ttl_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "ttl_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "ttl_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NewTTL_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "NewTTL_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "NewTTL_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "domain"
          },
          {
            "name": "domain__id"
          },
          {
            "name": "domain__name"
          },
          {
            "name": "domain__labelName"
          },
          {
            "name": "domain__labelhash"
          },
          {
            "name": "domain__subdomainCount"
          },
          {
            "name": "domain__ttl"
          },
          {
            "name": "domain__isMigrated"
          },
          {
            "name": "domain__createdAt"
          },
          {
            "name": "domain__expiryDate"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "ttl"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "OrderDirection",
        "enumValues": [
          {
            "name": "asc"
          },
          {
            "name": "desc"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PubkeyChanged",
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
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Resolver",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "x",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "y",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ResolverEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PubkeyChanged_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_in",
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
            "name": "resolver_not_in",
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
            "name": "resolver_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Resolver_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "x",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "x_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "x_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "x_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "x_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "x_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "x_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "x_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "x_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "x_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "y",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "y_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "y_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "y_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "y_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "y_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "y_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "y_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "y_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "y_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "PubkeyChanged_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "PubkeyChanged_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "PubkeyChanged_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "resolver"
          },
          {
            "name": "resolver__id"
          },
          {
            "name": "resolver__address"
          },
          {
            "name": "resolver__contentHash"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "x"
          },
          {
            "name": "y"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "domain",
            "type": {
              "kind": "OBJECT",
              "name": "Domain",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "domains",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Domain",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Domain_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Domain_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "transfer",
            "type": {
              "kind": "OBJECT",
              "name": "Transfer",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "transfers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Transfer",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Transfer_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Transfer_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "newOwner",
            "type": {
              "kind": "OBJECT",
              "name": "NewOwner",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "newOwners",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NewOwner",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NewOwner_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NewOwner_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "newResolver",
            "type": {
              "kind": "OBJECT",
              "name": "NewResolver",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "newResolvers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NewResolver",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NewResolver_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NewResolver_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "newTTL",
            "type": {
              "kind": "OBJECT",
              "name": "NewTTL",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "newTTLs",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NewTTL",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NewTTL_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NewTTL_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "wrappedTransfer",
            "type": {
              "kind": "OBJECT",
              "name": "WrappedTransfer",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "wrappedTransfers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "WrappedTransfer",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "WrappedTransfer_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "WrappedTransfer_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameWrapped",
            "type": {
              "kind": "OBJECT",
              "name": "NameWrapped",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameWrappeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NameWrapped",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NameWrapped_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NameWrapped_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameUnwrapped",
            "type": {
              "kind": "OBJECT",
              "name": "NameUnwrapped",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameUnwrappeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NameUnwrapped",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NameUnwrapped_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NameUnwrapped_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "fusesSet",
            "type": {
              "kind": "OBJECT",
              "name": "FusesSet",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "fusesSets",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "FusesSet",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "FusesSet_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "FusesSet_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "expiryExtended",
            "type": {
              "kind": "OBJECT",
              "name": "ExpiryExtended",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "expiryExtendeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ExpiryExtended",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "ExpiryExtended_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ExpiryExtended_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "registration",
            "type": {
              "kind": "OBJECT",
              "name": "Registration",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "registrations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Registration",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Registration_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Registration_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameRegistered",
            "type": {
              "kind": "OBJECT",
              "name": "NameRegistered",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameRegistereds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NameRegistered",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NameRegistered_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NameRegistered_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameRenewed",
            "type": {
              "kind": "OBJECT",
              "name": "NameRenewed",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameReneweds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NameRenewed",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NameRenewed_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NameRenewed_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameTransferred",
            "type": {
              "kind": "OBJECT",
              "name": "NameTransferred",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameTransferreds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NameTransferred",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NameTransferred_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NameTransferred_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "wrappedDomain",
            "type": {
              "kind": "OBJECT",
              "name": "WrappedDomain",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "wrappedDomains",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "WrappedDomain",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "WrappedDomain_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "WrappedDomain_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "account",
            "type": {
              "kind": "OBJECT",
              "name": "Account",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "accounts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Account",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Account_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Account_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "resolver",
            "type": {
              "kind": "OBJECT",
              "name": "Resolver",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "resolvers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Resolver",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Resolver_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Resolver_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "addrChanged",
            "type": {
              "kind": "OBJECT",
              "name": "AddrChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "addrChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AddrChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "AddrChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AddrChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "multicoinAddrChanged",
            "type": {
              "kind": "OBJECT",
              "name": "MulticoinAddrChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "multicoinAddrChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MulticoinAddrChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "MulticoinAddrChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "MulticoinAddrChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameChanged",
            "type": {
              "kind": "OBJECT",
              "name": "NameChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NameChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NameChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NameChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "abiChanged",
            "type": {
              "kind": "OBJECT",
              "name": "AbiChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "abiChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AbiChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "AbiChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AbiChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "pubkeyChanged",
            "type": {
              "kind": "OBJECT",
              "name": "PubkeyChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "pubkeyChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "PubkeyChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "PubkeyChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PubkeyChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "textChanged",
            "type": {
              "kind": "OBJECT",
              "name": "TextChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "textChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "TextChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "TextChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TextChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "contenthashChanged",
            "type": {
              "kind": "OBJECT",
              "name": "ContenthashChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "contenthashChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ContenthashChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "ContenthashChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ContenthashChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "interfaceChanged",
            "type": {
              "kind": "OBJECT",
              "name": "InterfaceChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "interfaceChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "InterfaceChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "InterfaceChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "InterfaceChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "authorisationChanged",
            "type": {
              "kind": "OBJECT",
              "name": "AuthorisationChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "authorisationChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AuthorisationChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "AuthorisationChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AuthorisationChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "versionChanged",
            "type": {
              "kind": "OBJECT",
              "name": "VersionChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "versionChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "VersionChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "VersionChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "domainEvent",
            "type": {
              "kind": "INTERFACE",
              "name": "DomainEvent",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "domainEvents",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INTERFACE",
                    "name": "DomainEvent",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "DomainEvent_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "DomainEvent_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "registrationEvent",
            "type": {
              "kind": "INTERFACE",
              "name": "RegistrationEvent",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "registrationEvents",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INTERFACE",
                    "name": "RegistrationEvent",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "RegistrationEvent_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "RegistrationEvent_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "resolverEvent",
            "type": {
              "kind": "INTERFACE",
              "name": "ResolverEvent",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "resolverEvents",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INTERFACE",
                    "name": "ResolverEvent",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "ResolverEvent_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ResolverEvent_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "_meta",
            "type": {
              "kind": "OBJECT",
              "name": "_Meta_",
              "ofType": null
            },
            "args": [
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
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
        "name": "Registration",
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
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Domain",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "registrationDate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiryDate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "cost",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "registrant",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Account",
                "ofType": null
              }
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
            "name": "events",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INTERFACE",
                    "name": "RegistrationEvent",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "RegistrationEvent_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "RegistrationEvent_filter",
                  "ofType": null
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INTERFACE",
        "name": "RegistrationEvent",
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
            "name": "registration",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Registration",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": null,
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "NameRegistered"
          },
          {
            "kind": "OBJECT",
            "name": "NameRenewed"
          },
          {
            "kind": "OBJECT",
            "name": "NameTransferred"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "RegistrationEvent_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "registration",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_in",
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
            "name": "registration_not_in",
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
            "name": "registration_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registration_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Registration_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "RegistrationEvent_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "RegistrationEvent_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "RegistrationEvent_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "registration"
          },
          {
            "name": "registration__id"
          },
          {
            "name": "registration__registrationDate"
          },
          {
            "name": "registration__expiryDate"
          },
          {
            "name": "registration__cost"
          },
          {
            "name": "registration__labelName"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Registration_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "domain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_in",
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
            "name": "domain_not_in",
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
            "name": "domain_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "registrationDate",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "registrationDate_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "registrationDate_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "registrationDate_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "registrationDate_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "registrationDate_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "registrationDate_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "registrationDate_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "expiryDate",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "expiryDate_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "cost",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "cost_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "cost_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "cost_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "cost_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "cost_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "cost_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "cost_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "registrant",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_in",
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
            "name": "registrant_not_in",
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
            "name": "registrant_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "registrant_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Account_filter",
              "ofType": null
            }
          },
          {
            "name": "labelName",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_in",
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
            "name": "labelName_not_in",
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
            "name": "labelName_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "labelName_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "events_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "RegistrationEvent_filter",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Registration_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Registration_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "Registration_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "domain"
          },
          {
            "name": "domain__id"
          },
          {
            "name": "domain__name"
          },
          {
            "name": "domain__labelName"
          },
          {
            "name": "domain__labelhash"
          },
          {
            "name": "domain__subdomainCount"
          },
          {
            "name": "domain__ttl"
          },
          {
            "name": "domain__isMigrated"
          },
          {
            "name": "domain__createdAt"
          },
          {
            "name": "domain__expiryDate"
          },
          {
            "name": "registrationDate"
          },
          {
            "name": "expiryDate"
          },
          {
            "name": "cost"
          },
          {
            "name": "registrant"
          },
          {
            "name": "registrant__id"
          },
          {
            "name": "labelName"
          },
          {
            "name": "events"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Resolver",
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
            "name": "domain",
            "type": {
              "kind": "OBJECT",
              "name": "Domain",
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
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "addr",
            "type": {
              "kind": "OBJECT",
              "name": "Account",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "contentHash",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
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
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "coinTypes",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "events",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INTERFACE",
                    "name": "ResolverEvent",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "ResolverEvent_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ResolverEvent_filter",
                  "ofType": null
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INTERFACE",
        "name": "ResolverEvent",
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
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Resolver",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": null,
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "AddrChanged"
          },
          {
            "kind": "OBJECT",
            "name": "MulticoinAddrChanged"
          },
          {
            "kind": "OBJECT",
            "name": "NameChanged"
          },
          {
            "kind": "OBJECT",
            "name": "AbiChanged"
          },
          {
            "kind": "OBJECT",
            "name": "PubkeyChanged"
          },
          {
            "kind": "OBJECT",
            "name": "TextChanged"
          },
          {
            "kind": "OBJECT",
            "name": "ContenthashChanged"
          },
          {
            "kind": "OBJECT",
            "name": "InterfaceChanged"
          },
          {
            "kind": "OBJECT",
            "name": "AuthorisationChanged"
          },
          {
            "kind": "OBJECT",
            "name": "VersionChanged"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ResolverEvent_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_in",
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
            "name": "resolver_not_in",
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
            "name": "resolver_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Resolver_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ResolverEvent_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ResolverEvent_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "ResolverEvent_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "resolver"
          },
          {
            "name": "resolver__id"
          },
          {
            "name": "resolver__address"
          },
          {
            "name": "resolver__contentHash"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Resolver_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "domain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_in",
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
            "name": "domain_not_in",
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
            "name": "domain_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "address",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "address_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "address_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "address_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "address_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "address_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "address_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "address_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "address_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "address_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "addr",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_in",
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
            "name": "addr_not_in",
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
            "name": "addr_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "addr_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Account_filter",
              "ofType": null
            }
          },
          {
            "name": "contentHash",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "contentHash_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "contentHash_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "contentHash_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "contentHash_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "contentHash_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "contentHash_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "contentHash_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "contentHash_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "contentHash_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "texts",
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
            "name": "texts_not",
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
            "name": "texts_contains",
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
            "name": "texts_contains_nocase",
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
            "name": "texts_not_contains",
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
            "name": "texts_not_contains_nocase",
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
            "name": "coinTypes",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "coinTypes_not",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "coinTypes_contains",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "coinTypes_contains_nocase",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "coinTypes_not_contains",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "coinTypes_not_contains_nocase",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "events_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ResolverEvent_filter",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Resolver_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Resolver_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "Resolver_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "domain"
          },
          {
            "name": "domain__id"
          },
          {
            "name": "domain__name"
          },
          {
            "name": "domain__labelName"
          },
          {
            "name": "domain__labelhash"
          },
          {
            "name": "domain__subdomainCount"
          },
          {
            "name": "domain__ttl"
          },
          {
            "name": "domain__isMigrated"
          },
          {
            "name": "domain__createdAt"
          },
          {
            "name": "domain__expiryDate"
          },
          {
            "name": "address"
          },
          {
            "name": "addr"
          },
          {
            "name": "addr__id"
          },
          {
            "name": "contentHash"
          },
          {
            "name": "texts"
          },
          {
            "name": "coinTypes"
          },
          {
            "name": "events"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "String"
      },
      {
        "kind": "OBJECT",
        "name": "Subscription",
        "fields": [
          {
            "name": "domain",
            "type": {
              "kind": "OBJECT",
              "name": "Domain",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "domains",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Domain",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Domain_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Domain_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "transfer",
            "type": {
              "kind": "OBJECT",
              "name": "Transfer",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "transfers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Transfer",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Transfer_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Transfer_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "newOwner",
            "type": {
              "kind": "OBJECT",
              "name": "NewOwner",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "newOwners",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NewOwner",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NewOwner_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NewOwner_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "newResolver",
            "type": {
              "kind": "OBJECT",
              "name": "NewResolver",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "newResolvers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NewResolver",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NewResolver_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NewResolver_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "newTTL",
            "type": {
              "kind": "OBJECT",
              "name": "NewTTL",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "newTTLs",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NewTTL",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NewTTL_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NewTTL_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "wrappedTransfer",
            "type": {
              "kind": "OBJECT",
              "name": "WrappedTransfer",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "wrappedTransfers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "WrappedTransfer",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "WrappedTransfer_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "WrappedTransfer_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameWrapped",
            "type": {
              "kind": "OBJECT",
              "name": "NameWrapped",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameWrappeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NameWrapped",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NameWrapped_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NameWrapped_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameUnwrapped",
            "type": {
              "kind": "OBJECT",
              "name": "NameUnwrapped",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameUnwrappeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NameUnwrapped",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NameUnwrapped_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NameUnwrapped_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "fusesSet",
            "type": {
              "kind": "OBJECT",
              "name": "FusesSet",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "fusesSets",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "FusesSet",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "FusesSet_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "FusesSet_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "expiryExtended",
            "type": {
              "kind": "OBJECT",
              "name": "ExpiryExtended",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "expiryExtendeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ExpiryExtended",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "ExpiryExtended_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ExpiryExtended_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "registration",
            "type": {
              "kind": "OBJECT",
              "name": "Registration",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "registrations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Registration",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Registration_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Registration_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameRegistered",
            "type": {
              "kind": "OBJECT",
              "name": "NameRegistered",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameRegistereds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NameRegistered",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NameRegistered_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NameRegistered_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameRenewed",
            "type": {
              "kind": "OBJECT",
              "name": "NameRenewed",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameReneweds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NameRenewed",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NameRenewed_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NameRenewed_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameTransferred",
            "type": {
              "kind": "OBJECT",
              "name": "NameTransferred",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameTransferreds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NameTransferred",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NameTransferred_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NameTransferred_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "wrappedDomain",
            "type": {
              "kind": "OBJECT",
              "name": "WrappedDomain",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "wrappedDomains",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "WrappedDomain",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "WrappedDomain_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "WrappedDomain_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "account",
            "type": {
              "kind": "OBJECT",
              "name": "Account",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "accounts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Account",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Account_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Account_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "resolver",
            "type": {
              "kind": "OBJECT",
              "name": "Resolver",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "resolvers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Resolver",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Resolver_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Resolver_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "addrChanged",
            "type": {
              "kind": "OBJECT",
              "name": "AddrChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "addrChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AddrChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "AddrChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AddrChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "multicoinAddrChanged",
            "type": {
              "kind": "OBJECT",
              "name": "MulticoinAddrChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "multicoinAddrChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MulticoinAddrChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "MulticoinAddrChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "MulticoinAddrChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameChanged",
            "type": {
              "kind": "OBJECT",
              "name": "NameChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "nameChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NameChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "NameChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "NameChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "abiChanged",
            "type": {
              "kind": "OBJECT",
              "name": "AbiChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "abiChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AbiChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "AbiChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AbiChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "pubkeyChanged",
            "type": {
              "kind": "OBJECT",
              "name": "PubkeyChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "pubkeyChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "PubkeyChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "PubkeyChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PubkeyChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "textChanged",
            "type": {
              "kind": "OBJECT",
              "name": "TextChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "textChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "TextChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "TextChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TextChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "contenthashChanged",
            "type": {
              "kind": "OBJECT",
              "name": "ContenthashChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "contenthashChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ContenthashChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "ContenthashChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ContenthashChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "interfaceChanged",
            "type": {
              "kind": "OBJECT",
              "name": "InterfaceChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "interfaceChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "InterfaceChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "InterfaceChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "InterfaceChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "authorisationChanged",
            "type": {
              "kind": "OBJECT",
              "name": "AuthorisationChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "authorisationChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AuthorisationChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "AuthorisationChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AuthorisationChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "versionChanged",
            "type": {
              "kind": "OBJECT",
              "name": "VersionChanged",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "versionChangeds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "VersionChanged",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "VersionChanged_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionChanged_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "domainEvent",
            "type": {
              "kind": "INTERFACE",
              "name": "DomainEvent",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "domainEvents",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INTERFACE",
                    "name": "DomainEvent",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "DomainEvent_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "DomainEvent_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "registrationEvent",
            "type": {
              "kind": "INTERFACE",
              "name": "RegistrationEvent",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "registrationEvents",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INTERFACE",
                    "name": "RegistrationEvent",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "RegistrationEvent_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "RegistrationEvent_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "resolverEvent",
            "type": {
              "kind": "INTERFACE",
              "name": "ResolverEvent",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "resolverEvents",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INTERFACE",
                    "name": "ResolverEvent",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "ResolverEvent_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ResolverEvent_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "_meta",
            "type": {
              "kind": "OBJECT",
              "name": "_Meta_",
              "ofType": null
            },
            "args": [
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
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
        "name": "TextChanged",
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
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Resolver",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
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
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ResolverEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TextChanged_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_in",
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
            "name": "resolver_not_in",
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
            "name": "resolver_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Resolver_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "key",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_in",
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
            "name": "key_not_in",
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
            "name": "key_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "key_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_in",
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
            "name": "value_not_in",
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
            "name": "value_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "value_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "TextChanged_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "TextChanged_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "TextChanged_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "resolver"
          },
          {
            "name": "resolver__id"
          },
          {
            "name": "resolver__address"
          },
          {
            "name": "resolver__contentHash"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "key"
          },
          {
            "name": "value"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Transfer",
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
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Domain",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
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
                "name": "Account",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "DomainEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Transfer_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "domain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_in",
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
            "name": "domain_not_in",
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
            "name": "domain_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_in",
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
            "name": "owner_not_in",
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
            "name": "owner_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Account_filter",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Transfer_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Transfer_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "Transfer_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "domain"
          },
          {
            "name": "domain__id"
          },
          {
            "name": "domain__name"
          },
          {
            "name": "domain__labelName"
          },
          {
            "name": "domain__labelhash"
          },
          {
            "name": "domain__subdomainCount"
          },
          {
            "name": "domain__ttl"
          },
          {
            "name": "domain__isMigrated"
          },
          {
            "name": "domain__createdAt"
          },
          {
            "name": "domain__expiryDate"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "owner"
          },
          {
            "name": "owner__id"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "VersionChanged",
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
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Resolver",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
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
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ResolverEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "VersionChanged_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_in",
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
            "name": "resolver_not_in",
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
            "name": "resolver_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "resolver_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Resolver_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "version",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "version_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "version_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "version_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "version_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "version_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "version_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "version_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "VersionChanged_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "VersionChanged_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "VersionChanged_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "resolver"
          },
          {
            "name": "resolver__id"
          },
          {
            "name": "resolver__address"
          },
          {
            "name": "resolver__contentHash"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "version"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "WrappedDomain",
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
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Domain",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expiryDate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "fuses",
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
            "name": "owner",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Account",
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
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "WrappedDomain_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "domain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_in",
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
            "name": "domain_not_in",
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
            "name": "domain_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "expiryDate",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "expiryDate_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "expiryDate_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "fuses",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "fuses_in",
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
            "name": "fuses_not_in",
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
            "name": "owner",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_in",
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
            "name": "owner_not_in",
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
            "name": "owner_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Account_filter",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_in",
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
            "name": "name_not_in",
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
            "name": "name_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "WrappedDomain_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "WrappedDomain_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "WrappedDomain_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "domain"
          },
          {
            "name": "domain__id"
          },
          {
            "name": "domain__name"
          },
          {
            "name": "domain__labelName"
          },
          {
            "name": "domain__labelhash"
          },
          {
            "name": "domain__subdomainCount"
          },
          {
            "name": "domain__ttl"
          },
          {
            "name": "domain__isMigrated"
          },
          {
            "name": "domain__createdAt"
          },
          {
            "name": "domain__expiryDate"
          },
          {
            "name": "expiryDate"
          },
          {
            "name": "fuses"
          },
          {
            "name": "owner"
          },
          {
            "name": "owner__id"
          },
          {
            "name": "name"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "WrappedTransfer",
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
            "name": "domain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Domain",
                "ofType": null
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
            "name": "transactionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
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
                "name": "Account",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "DomainEvent"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "WrappedTransfer_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            }
          },
          {
            "name": "id_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "domain",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_in",
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
            "name": "domain_not_in",
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
            "name": "domain_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "domain_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Domain_filter",
              "ofType": null
            }
          },
          {
            "name": "blockNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_not",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "blockNumber_in",
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
            "name": "blockNumber_not_in",
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
            "name": "transactionID",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "transactionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "transactionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_in",
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
            "name": "owner_not_in",
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
            "name": "owner_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "owner_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Account_filter",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "WrappedTransfer_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "WrappedTransfer_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "WrappedTransfer_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "domain"
          },
          {
            "name": "domain__id"
          },
          {
            "name": "domain__name"
          },
          {
            "name": "domain__labelName"
          },
          {
            "name": "domain__labelhash"
          },
          {
            "name": "domain__subdomainCount"
          },
          {
            "name": "domain__ttl"
          },
          {
            "name": "domain__isMigrated"
          },
          {
            "name": "domain__createdAt"
          },
          {
            "name": "domain__expiryDate"
          },
          {
            "name": "blockNumber"
          },
          {
            "name": "transactionID"
          },
          {
            "name": "owner"
          },
          {
            "name": "owner__id"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "_Block_",
        "fields": [
          {
            "name": "hash",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "number",
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
            "name": "timestamp",
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
        "name": "_Meta_",
        "fields": [
          {
            "name": "block",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "_Block_",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deployment",
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
            "name": "hasIndexingErrors",
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
        "name": "_SubgraphErrorPolicy_",
        "enumValues": [
          {
            "name": "allow"
          },
          {
            "name": "deny"
          }
        ]
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