export default {
    name: "ENSDomainQuery",
    kind: "HoudiniQuery",
    hash: "b8c7908487e825090efb790670ac3d358a8cf89263e126939bbe0faa47afa69f",

    raw: `query ENSDomainQuery($name: String!) {
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
}
`,

    rootType: "Query",

    selection: {
        fields: {
            domains: {
                type: "Domain",
                keyRaw: "domains(where: {name: $name})",

                selection: {
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

                            selection: {
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
                            }
                        },

                        subdomains: {
                            type: "Domain",
                            keyRaw: "subdomains",

                            selection: {
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
                            }
                        },

                        resolvedAddress: {
                            type: "Account",
                            keyRaw: "resolvedAddress",
                            nullable: true,

                            selection: {
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
                            }
                        },

                        owner: {
                            type: "Account",
                            keyRaw: "owner",

                            selection: {
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
                            }
                        },

                        resolver: {
                            type: "Resolver",
                            keyRaw: "resolver",
                            nullable: true,

                            selection: {
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

                                        selection: {
                                            fields: {
                                                id: {
                                                    type: "ID",
                                                    keyRaw: "id"
                                                }
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

                                        selection: {
                                            fields: {
                                                id: {
                                                    type: "ID",
                                                    keyRaw: "id"
                                                }
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

                                        selection: {
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
                                            }
                                        },

                                        abstract: true
                                    }
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

                            selection: {
                                abstractFields: {
                                    fields: {
                                        Transfer: {
                                            owner: {
                                                type: "Account",
                                                keyRaw: "owner",

                                                selection: {
                                                    fields: {
                                                        id: {
                                                            type: "ID",
                                                            keyRaw: "id"
                                                        }
                                                    }
                                                }
                                            },

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
                                            }
                                        },

                                        NewOwner: {
                                            owner: {
                                                type: "Account",
                                                keyRaw: "owner",

                                                selection: {
                                                    fields: {
                                                        id: {
                                                            type: "ID",
                                                            keyRaw: "id"
                                                        }
                                                    }
                                                }
                                            },

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
                                            }
                                        },

                                        NewResolver: {
                                            resolver: {
                                                type: "Resolver",
                                                keyRaw: "resolver",

                                                selection: {
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
                                                }
                                            },

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
                                            }
                                        },

                                        NewTTL: {
                                            ttl: {
                                                type: "BigInt",
                                                keyRaw: "ttl"
                                            },

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
                                            }
                                        }
                                    },

                                    typeMap: {}
                                },

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
                                    }
                                }
                            },

                            abstract: true
                        }
                    }
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

    policy: "CacheOrNetwork",
    partial: false
};

"HoudiniHash=ec2c1d4b422b59d9d935d3fec42e5f85324a27d664053ffc5990cc1b70bfe472";