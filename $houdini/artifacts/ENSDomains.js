export default {
    name: "ENSDomains",
    kind: "HoudiniQuery",
    hash: "2093d09642b3601f73bfc0080af7df4896421f751538af00940b9985d48d569d",

    raw: `query ENSDomains($name: String!) {
  domains(where: {name: $name}) {
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
  registrations(where: {domain: $name}) {
    __typename
    registrationDate
    expiryDate
    labelName
    id
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
        },

        registrations: {
            type: "Registration",
            keyRaw: "registrations(where: {domain: $name})",

            fields: {
                __typename: {
                    type: "String",
                    keyRaw: "__typename"
                },

                registrationDate: {
                    type: "BigInt",
                    keyRaw: "registrationDate"
                },

                expiryDate: {
                    type: "BigInt",
                    keyRaw: "expiryDate"
                },

                labelName: {
                    type: "String",
                    keyRaw: "labelName"
                },

                id: {
                    type: "ID",
                    keyRaw: "id"
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