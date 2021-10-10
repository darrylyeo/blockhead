export default {
    name: "ENSDomainsContaining",
    kind: "HoudiniQuery",
    hash: "e36c8ec1b4015916e66a21b6f46257e7a30f780422cac23aef95dc6517de0d13",

    raw: `query ENSDomainsContaining($query: String!) {
  domains(where: {name_contains: $query, name_not: $query}) {
    __typename
    id
    name
    labelName
    labelhash
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
      domain {
        id
      }
      address
      addr {
        id
      }
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

                labelName: {
                    type: "String",
                    keyRaw: "labelName"
                },

                labelhash: {
                    type: "Bytes",
                    keyRaw: "labelhash"
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

                        domain: {
                            type: "Domain",
                            keyRaw: "domain",

                            fields: {
                                id: {
                                    type: "ID",
                                    keyRaw: "id"
                                }
                            }
                        },

                        address: {
                            type: "Bytes",
                            keyRaw: "address"
                        },

                        addr: {
                            type: "Account",
                            keyRaw: "addr",

                            fields: {
                                id: {
                                    type: "ID",
                                    keyRaw: "id"
                                }
                            }
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