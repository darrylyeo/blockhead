export default {
    name: "ENSDomainsContainingQuery",
    kind: "HoudiniQuery",
    hash: "b33b84a5c5cc0f06b897431a81e03cf153ca965a183d416ecc205da22b9e6865",

    raw: `query ENSDomainsContainingQuery($query: String!) {
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
      __typename
      id
    }
    owner {
      __typename
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
                    keyRaw: "name",
                    nullable: true
                },

                labelName: {
                    type: "String",
                    keyRaw: "labelName",
                    nullable: true
                },

                labelhash: {
                    type: "Bytes",
                    keyRaw: "labelhash",
                    nullable: true
                },

                parent: {
                    type: "Domain",
                    keyRaw: "parent",
                    nullable: true,

                    fields: {
                        id: {
                            type: "ID",
                            keyRaw: "id"
                        },

                        name: {
                            type: "String",
                            keyRaw: "name",
                            nullable: true
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
                            keyRaw: "name",
                            nullable: true
                        }
                    }
                },

                resolvedAddress: {
                    type: "Account",
                    keyRaw: "resolvedAddress",
                    nullable: true,

                    fields: {
                        __typename: {
                            type: "String",
                            keyRaw: "__typename"
                        },

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
                        __typename: {
                            type: "String",
                            keyRaw: "__typename"
                        },

                        id: {
                            type: "ID",
                            keyRaw: "id"
                        }
                    }
                },

                resolver: {
                    type: "Resolver",
                    keyRaw: "resolver",
                    nullable: true,

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
                            nullable: true,

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
                            nullable: true,

                            fields: {
                                id: {
                                    type: "ID",
                                    keyRaw: "id"
                                }
                            }
                        },

                        texts: {
                            type: "String",
                            keyRaw: "texts",
                            nullable: true
                        },

                        coinTypes: {
                            type: "BigInt",
                            keyRaw: "coinTypes",
                            nullable: true
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
                    keyRaw: "ttl",
                    nullable: true
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

    policy: "CacheOrNetwork",
    partial: false
};

"HoudiniHash=6992fbb1c9fa19dd40c20004526d01c54baaace0a9cff4e39c81fa54c89faecd";