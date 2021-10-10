export default {
    name: "ENSDomainsContaining",
    kind: "HoudiniQuery",
    hash: "4650d3892e1f4ea0e155d35deb87159b9b23f113f791564116c653b4e4ece76a",

    raw: `query ENSDomainsContaining($query: String!) {
  domains(where: {name_contains: $query, name_not: $query}) {
    __typename
    id
    name
    parent {
      id
      name
    }
    subdomains {
      id
      name
    }
    resolvedAddress {
      id
    }
    owner {
      id
    }
    resolver {
      __typename
      id
      address
      texts
      coinTypes
      events {
        id
        blockNumber
        transactionID
        __typename
      }
    }
    ttl
    isMigrated
    events {
      __typename
      id
      blockNumber
      transactionID
      ... on Transfer {
        owner {
          id
        }
      }
      ... on NewOwner {
        owner {
          id
        }
      }
      ... on NewResolver {
        resolver {
          id
          address
        }
      }
      ... on NewTTL {
        ttl
      }
      __typename
    }
  }
}
`,

    rootType: "Query",

    selection: {
        domains: {
            type: "Domain",
            keyRaw: "domains(where: {name_contains: $query, name_not: $query})",

            fields: {
                __typename: {
                    type: "String",
                    keyRaw: "__typename"
                },

                id: {
                    type: "ID",
                    keyRaw: "id"
                },

                name: {
                    type: "String",
                    keyRaw: "name"
                },

                parent: {
                    type: "Domain",
                    keyRaw: "parent",

                    fields: {
                        id: {
                            type: "ID",
                            keyRaw: "id"
                        },

                        name: {
                            type: "String",
                            keyRaw: "name"
                        }
                    }
                },

                subdomains: {
                    type: "Domain",
                    keyRaw: "subdomains",

                    fields: {
                        id: {
                            type: "ID",
                            keyRaw: "id"
                        },

                        name: {
                            type: "String",
                            keyRaw: "name"
                        }
                    }
                },

                resolvedAddress: {
                    type: "Account",
                    keyRaw: "resolvedAddress",

                    fields: {
                        id: {
                            type: "ID",
                            keyRaw: "id"
                        }
                    }
                },

                owner: {
                    type: "Account",
                    keyRaw: "owner",

                    fields: {
                        id: {
                            type: "ID",
                            keyRaw: "id"
                        }
                    }
                },

                resolver: {
                    type: "Resolver",
                    keyRaw: "resolver",

                    fields: {
                        __typename: {
                            type: "String",
                            keyRaw: "__typename"
                        },

                        id: {
                            type: "ID",
                            keyRaw: "id"
                        },

                        address: {
                            type: "Bytes",
                            keyRaw: "address"
                        },

                        texts: {
                            type: "String",
                            keyRaw: "texts"
                        },

                        coinTypes: {
                            type: "Int",
                            keyRaw: "coinTypes"
                        },

                        events: {
                            type: "ResolverEvent",
                            keyRaw: "events",

                            fields: {
                                id: {
                                    type: "ID",
                                    keyRaw: "id"
                                },

                                blockNumber: {
                                    type: "Int",
                                    keyRaw: "blockNumber"
                                },

                                transactionID: {
                                    type: "Bytes",
                                    keyRaw: "transactionID"
                                },

                                __typename: {
                                    type: "String",
                                    keyRaw: "__typename"
                                }
                            },

                            abstract: true
                        }
                    }
                },

                ttl: {
                    type: "BigInt",
                    keyRaw: "ttl"
                },

                isMigrated: {
                    type: "Boolean",
                    keyRaw: "isMigrated"
                },

                events: {
                    type: "DomainEvent",
                    keyRaw: "events",

                    fields: {
                        __typename: {
                            type: "String",
                            keyRaw: "__typename"
                        },

                        id: {
                            type: "ID",
                            keyRaw: "id"
                        },

                        blockNumber: {
                            type: "Int",
                            keyRaw: "blockNumber"
                        },

                        transactionID: {
                            type: "Bytes",
                            keyRaw: "transactionID"
                        },

                        owner: {
                            type: "Account",
                            keyRaw: "owner",

                            fields: {
                                id: {
                                    type: "ID",
                                    keyRaw: "id"
                                }
                            }
                        },

                        resolver: {
                            type: "Resolver",
                            keyRaw: "resolver",

                            fields: {
                                id: {
                                    type: "ID",
                                    keyRaw: "id"
                                },

                                address: {
                                    type: "Bytes",
                                    keyRaw: "address"
                                }
                            }
                        },

                        ttl: {
                            type: "BigInt",
                            keyRaw: "ttl"
                        }
                    },

                    abstract: true
                }
            }
        }
    },

    input: {
        fields: {
            query: "String"
        },

        types: {}
    },

    policy: "NetworkOnly"
};