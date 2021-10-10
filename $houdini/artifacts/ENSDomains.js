export default {
    name: "ENSDomains",
    kind: "HoudiniQuery",
    hash: "6e1a55e7c20c0af08d71d269bdc765e272c197152eb9f0e785767ee13df2230a",

    raw: `query ENSDomains($name: String!) {
  domains(where: {name: $name}) {
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
    labelhash
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
            keyRaw: "domains(where: {name: $name})",

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

                labelhash: {
                    type: "Bytes",
                    keyRaw: "labelhash"
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
            name: "String"
        },

        types: {}
    },

    policy: "NetworkOnly"
};