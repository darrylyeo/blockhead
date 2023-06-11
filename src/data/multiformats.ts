import { bases } from 'multiformats/basics'

export const basesByPrefix = Object.fromEntries(Object.values(bases).map(base => [base.prefix, base]))

export const basesByName = Object.fromEntries(Object.values(bases).map(base => [base.name, base]))

export const multicodecs = [
	{
		"name": "identity",
		"tag": "multihash",
		"status": "permanent",
		"description": "raw binary",
		"code": 0
	},
	{
		"name": "cidv1",
		"tag": "cid",
		"status": "permanent",
		"description": "CIDv1",
		"code": 1
	},
	{
		"name": "cidv2",
		"tag": "cid",
		"status": "draft",
		"description": "CIDv2",
		"code": 2
	},
	{
		"name": "cidv3",
		"tag": "cid",
		"status": "draft",
		"description": "CIDv3",
		"code": 3
	},
	{
		"name": "ip4",
		"tag": "multiaddr",
		"status": "permanent",
		"description": "",
		"code": 4
	},
	{
		"name": "tcp",
		"tag": "multiaddr",
		"status": "permanent",
		"description": "",
		"code": 6
	},
	{
		"name": "sha1",
		"tag": "multihash",
		"status": "permanent",
		"description": "",
		"code": 17
	},
	{
		"name": "sha2-256",
		"tag": "multihash",
		"status": "permanent",
		"description": "",
		"code": 18
	},
	{
		"name": "sha2-512",
		"tag": "multihash",
		"status": "permanent",
		"description": "",
		"code": 19
	},
	{
		"name": "sha3-512",
		"tag": "multihash",
		"status": "permanent",
		"description": "",
		"code": 20
	},
	{
		"name": "sha3-384",
		"tag": "multihash",
		"status": "permanent",
		"description": "",
		"code": 21
	},
	{
		"name": "sha3-256",
		"tag": "multihash",
		"status": "permanent",
		"description": "",
		"code": 22
	},
	{
		"name": "sha3-224",
		"tag": "multihash",
		"status": "permanent",
		"description": "",
		"code": 23
	},
	{
		"name": "shake-128",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 24
	},
	{
		"name": "shake-256",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 25
	},
	{
		"name": "keccak-224",
		"tag": "multihash",
		"status": "draft",
		"description": "keccak has variable output length. The number specifies the core length",
		"code": 26
	},
	{
		"name": "keccak-256",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 27
	},
	{
		"name": "keccak-384",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 28
	},
	{
		"name": "keccak-512",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 29
	},
	{
		"name": "blake3",
		"tag": "multihash",
		"status": "draft",
		"description": "BLAKE3 has a default 32 byte output length. The maximum length is (2^64)-1 bytes.",
		"code": 30
	},
	{
		"name": "sha2-384",
		"tag": "multihash",
		"status": "permanent",
		"description": "aka SHA-384; as specified by FIPS 180-4.",
		"code": 32
	},
	{
		"name": "dccp",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 33
	},
	{
		"name": "murmur3-x64-64",
		"tag": "multihash",
		"status": "permanent",
		"description": "The first 64-bits of a murmur3-x64-128 - used for UnixFS directory sharding.",
		"code": 34
	},
	{
		"name": "murmur3-32",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 35
	},
	{
		"name": "ip6",
		"tag": "multiaddr",
		"status": "permanent",
		"description": "",
		"code": 41
	},
	{
		"name": "ip6zone",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 42
	},
	{
		"name": "path",
		"tag": "namespace",
		"status": "permanent",
		"description": "Namespace for string paths. Corresponds to `/` in ASCII.",
		"code": 47
	},
	{
		"name": "multicodec",
		"tag": "multiformat",
		"status": "draft",
		"description": "",
		"code": 48
	},
	{
		"name": "multihash",
		"tag": "multiformat",
		"status": "draft",
		"description": "",
		"code": 49
	},
	{
		"name": "multiaddr",
		"tag": "multiformat",
		"status": "draft",
		"description": "",
		"code": 50
	},
	{
		"name": "multibase",
		"tag": "multiformat",
		"status": "draft",
		"description": "",
		"code": 51
	},
	{
		"name": "dns",
		"tag": "multiaddr",
		"status": "permanent",
		"description": "",
		"code": 53
	},
	{
		"name": "dns4",
		"tag": "multiaddr",
		"status": "permanent",
		"description": "",
		"code": 54
	},
	{
		"name": "dns6",
		"tag": "multiaddr",
		"status": "permanent",
		"description": "",
		"code": 55
	},
	{
		"name": "dnsaddr",
		"tag": "multiaddr",
		"status": "permanent",
		"description": "",
		"code": 56
	},
	{
		"name": "protobuf",
		"tag": "serialization",
		"status": "draft",
		"description": "Protocol Buffers",
		"code": 80
	},
	{
		"name": "cbor",
		"tag": "ipld",
		"status": "permanent",
		"description": "CBOR",
		"code": 81
	},
	{
		"name": "raw",
		"tag": "ipld",
		"status": "permanent",
		"description": "raw binary",
		"code": 85
	},
	{
		"name": "dbl-sha2-256",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 86
	},
	{
		"name": "rlp",
		"tag": "serialization",
		"status": "draft",
		"description": "recursive length prefix",
		"code": 96
	},
	{
		"name": "bencode",
		"tag": "serialization",
		"status": "draft",
		"description": "bencode",
		"code": 99
	},
	{
		"name": "dag-pb",
		"tag": "ipld",
		"status": "permanent",
		"description": "MerkleDAG protobuf",
		"code": 112
	},
	{
		"name": "dag-cbor",
		"tag": "ipld",
		"status": "permanent",
		"description": "MerkleDAG cbor",
		"code": 113
	},
	{
		"name": "libp2p-key",
		"tag": "ipld",
		"status": "permanent",
		"description": "Libp2p Public Key",
		"code": 114
	},
	{
		"name": "git-raw",
		"tag": "ipld",
		"status": "permanent",
		"description": "Raw Git object",
		"code": 120
	},
	{
		"name": "torrent-info",
		"tag": "ipld",
		"status": "draft",
		"description": "Torrent file info field (bencoded)",
		"code": 123
	},
	{
		"name": "torrent-file",
		"tag": "ipld",
		"status": "draft",
		"description": "Torrent file (bencoded)",
		"code": 124
	},
	{
		"name": "leofcoin-block",
		"tag": "ipld",
		"status": "draft",
		"description": "Leofcoin Block",
		"code": 129
	},
	{
		"name": "leofcoin-tx",
		"tag": "ipld",
		"status": "draft",
		"description": "Leofcoin Transaction",
		"code": 130
	},
	{
		"name": "leofcoin-pr",
		"tag": "ipld",
		"status": "draft",
		"description": "Leofcoin Peer Reputation",
		"code": 131
	},
	{
		"name": "sctp",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 132
	},
	{
		"name": "dag-jose",
		"tag": "ipld",
		"status": "draft",
		"description": "MerkleDAG JOSE",
		"code": 133
	},
	{
		"name": "dag-cose",
		"tag": "ipld",
		"status": "draft",
		"description": "MerkleDAG COSE",
		"code": 134
	},
	{
		"name": "eth-block",
		"tag": "ipld",
		"status": "permanent",
		"description": "Ethereum Header (RLP)",
		"code": 144
	},
	{
		"name": "eth-block-list",
		"tag": "ipld",
		"status": "permanent",
		"description": "Ethereum Header List (RLP)",
		"code": 145
	},
	{
		"name": "eth-tx-trie",
		"tag": "ipld",
		"status": "permanent",
		"description": "Ethereum Transaction Trie (Eth-Trie)",
		"code": 146
	},
	{
		"name": "eth-tx",
		"tag": "ipld",
		"status": "permanent",
		"description": "Ethereum Transaction (MarshalBinary)",
		"code": 147
	},
	{
		"name": "eth-tx-receipt-trie",
		"tag": "ipld",
		"status": "permanent",
		"description": "Ethereum Transaction Receipt Trie (Eth-Trie)",
		"code": 148
	},
	{
		"name": "eth-tx-receipt",
		"tag": "ipld",
		"status": "permanent",
		"description": "Ethereum Transaction Receipt (MarshalBinary)",
		"code": 149
	},
	{
		"name": "eth-state-trie",
		"tag": "ipld",
		"status": "permanent",
		"description": "Ethereum State Trie (Eth-Secure-Trie)",
		"code": 150
	},
	{
		"name": "eth-account-snapshot",
		"tag": "ipld",
		"status": "permanent",
		"description": "Ethereum Account Snapshot (RLP)",
		"code": 151
	},
	{
		"name": "eth-storage-trie",
		"tag": "ipld",
		"status": "permanent",
		"description": "Ethereum Contract Storage Trie (Eth-Secure-Trie)",
		"code": 152
	},
	{
		"name": "eth-receipt-log-trie",
		"tag": "ipld",
		"status": "draft",
		"description": "Ethereum Transaction Receipt Log Trie (Eth-Trie)",
		"code": 153
	},
	{
		"name": "eth-reciept-log",
		"tag": "ipld",
		"status": "draft",
		"description": "Ethereum Transaction Receipt Log (RLP)",
		"code": 154
	},
	{
		"name": "aes-128",
		"tag": "key",
		"status": "draft",
		"description": "128-bit AES symmetric key",
		"code": 160
	},
	{
		"name": "aes-192",
		"tag": "key",
		"status": "draft",
		"description": "192-bit AES symmetric key",
		"code": 161
	},
	{
		"name": "aes-256",
		"tag": "key",
		"status": "draft",
		"description": "256-bit AES symmetric key",
		"code": 162
	},
	{
		"name": "chacha-128",
		"tag": "key",
		"status": "draft",
		"description": "128-bit ChaCha symmetric key",
		"code": 163
	},
	{
		"name": "chacha-256",
		"tag": "key",
		"status": "draft",
		"description": "256-bit ChaCha symmetric key",
		"code": 164
	},
	{
		"name": "bitcoin-block",
		"tag": "ipld",
		"status": "permanent",
		"description": "Bitcoin Block",
		"code": 176
	},
	{
		"name": "bitcoin-tx",
		"tag": "ipld",
		"status": "permanent",
		"description": "Bitcoin Tx",
		"code": 177
	},
	{
		"name": "bitcoin-witness-commitment",
		"tag": "ipld",
		"status": "permanent",
		"description": "Bitcoin Witness Commitment",
		"code": 178
	},
	{
		"name": "zcash-block",
		"tag": "ipld",
		"status": "permanent",
		"description": "Zcash Block",
		"code": 192
	},
	{
		"name": "zcash-tx",
		"tag": "ipld",
		"status": "permanent",
		"description": "Zcash Tx",
		"code": 193
	},
	{
		"name": "caip-50",
		"tag": "multiformat",
		"status": "draft",
		"description": "CAIP-50 multi-chain account id",
		"code": 202
	},
	{
		"name": "streamid",
		"tag": "namespace",
		"status": "draft",
		"description": "Ceramic Stream Id",
		"code": 206
	},
	{
		"name": "stellar-block",
		"tag": "ipld",
		"status": "draft",
		"description": "Stellar Block",
		"code": 208
	},
	{
		"name": "stellar-tx",
		"tag": "ipld",
		"status": "draft",
		"description": "Stellar Tx",
		"code": 209
	},
	{
		"name": "md4",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 212
	},
	{
		"name": "md5",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 213
	},
	{
		"name": "decred-block",
		"tag": "ipld",
		"status": "draft",
		"description": "Decred Block",
		"code": 224
	},
	{
		"name": "decred-tx",
		"tag": "ipld",
		"status": "draft",
		"description": "Decred Tx",
		"code": 225
	},
	{
		"name": "ipld-ns",
		"tag": "namespace",
		"status": "draft",
		"description": "IPLD path",
		"code": 226
	},
	{
		"name": "ipfs-ns",
		"tag": "namespace",
		"status": "draft",
		"description": "IPFS path",
		"code": 227
	},
	{
		"name": "swarm-ns",
		"tag": "namespace",
		"status": "draft",
		"description": "Swarm path",
		"code": 228
	},
	{
		"name": "ipns-ns",
		"tag": "namespace",
		"status": "draft",
		"description": "IPNS path",
		"code": 229
	},
	{
		"name": "zeronet",
		"tag": "namespace",
		"status": "draft",
		"description": "ZeroNet site address",
		"code": 230
	},
	{
		"name": "secp256k1-pub",
		"tag": "key",
		"status": "draft",
		"description": "Secp256k1 public key (compressed)",
		"code": 231
	},
	{
		"name": "dnslink",
		"tag": "namespace",
		"status": "permanent",
		"description": "DNSLink path",
		"code": 232
	},
	{
		"name": "bls12_381-g1-pub",
		"tag": "key",
		"status": "draft",
		"description": "BLS12-381 public key in the G1 field",
		"code": 234
	},
	{
		"name": "bls12_381-g2-pub",
		"tag": "key",
		"status": "draft",
		"description": "BLS12-381 public key in the G2 field",
		"code": 235
	},
	{
		"name": "x25519-pub",
		"tag": "key",
		"status": "draft",
		"description": "Curve25519 public key",
		"code": 236
	},
	{
		"name": "ed25519-pub",
		"tag": "key",
		"status": "draft",
		"description": "Ed25519 public key",
		"code": 237
	},
	{
		"name": "bls12_381-g1g2-pub",
		"tag": "key",
		"status": "draft",
		"description": "BLS12-381 concatenated public keys in both the G1 and G2 fields",
		"code": 238
	},
	{
		"name": "dash-block",
		"tag": "ipld",
		"status": "draft",
		"description": "Dash Block",
		"code": 240
	},
	{
		"name": "dash-tx",
		"tag": "ipld",
		"status": "draft",
		"description": "Dash Tx",
		"code": 241
	},
	{
		"name": "swarm-manifest",
		"tag": "ipld",
		"status": "draft",
		"description": "Swarm Manifest",
		"code": 250
	},
	{
		"name": "swarm-feed",
		"tag": "ipld",
		"status": "draft",
		"description": "Swarm Feed",
		"code": 251
	},
	{
		"name": "udp",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 273
	},
	{
		"name": "p2p-webrtc-star",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 275
	},
	{
		"name": "p2p-webrtc-direct",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 276
	},
	{
		"name": "p2p-stardust",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 277
	},
	{
		"name": "webrtc",
		"tag": "multiaddr",
		"status": "draft",
		"description": "WebRTC",
		"code": 280
	},
	{
		"name": "p2p-circuit",
		"tag": "multiaddr",
		"status": "permanent",
		"description": "",
		"code": 290
	},
	{
		"name": "dag-json",
		"tag": "ipld",
		"status": "permanent",
		"description": "MerkleDAG json",
		"code": 297
	},
	{
		"name": "udt",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 301
	},
	{
		"name": "utp",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 302
	},
	{
		"name": "unix",
		"tag": "multiaddr",
		"status": "permanent",
		"description": "",
		"code": 400
	},
	{
		"name": "thread",
		"tag": "multiaddr",
		"status": "draft",
		"description": "Textile Thread",
		"code": 406
	},
	{
		"name": "ipfs",
		"tag": "multiaddr",
		"status": "draft",
		"description": "libp2p (deprecated)",
		"code": 421
	},
	{
		"name": "https",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 443
	},
	{
		"name": "onion",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 444
	},
	{
		"name": "onion3",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 445
	},
	{
		"name": "garlic64",
		"tag": "multiaddr",
		"status": "draft",
		"description": "I2P base64 (raw public key)",
		"code": 446
	},
	{
		"name": "garlic32",
		"tag": "multiaddr",
		"status": "draft",
		"description": "I2P base32 (hashed public key or encoded public key/checksum+optional secret)",
		"code": 447
	},
	{
		"name": "tls",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 448
	},
	{
		"name": "noise",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 454
	},
	{
		"name": "quic",
		"tag": "multiaddr",
		"status": "permanent",
		"description": "",
		"code": 460
	},
	{
		"name": "webtransport",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 465
	},
	{
		"name": "certhash",
		"tag": "multiaddr",
		"status": "draft",
		"description": "TLS certificate's fingerprint as a multihash",
		"code": 466
	},
	{
		"name": "ws",
		"tag": "multiaddr",
		"status": "permanent",
		"description": "",
		"code": 477
	},
	{
		"name": "wss",
		"tag": "multiaddr",
		"status": "permanent",
		"description": "",
		"code": 478
	},
	{
		"name": "p2p-websocket-star",
		"tag": "multiaddr",
		"status": "permanent",
		"description": "",
		"code": 479
	},
	{
		"name": "http",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 480
	},
	{
		"name": "swhid-1-snp",
		"tag": "ipld",
		"status": "draft",
		"description": "SoftWare Heritage persistent IDentifier version 1 snapshot",
		"code": 496
	},
	{
		"name": "json",
		"tag": "ipld",
		"status": "permanent",
		"description": "JSON (UTF-8-encoded)",
		"code": 512
	},
	{
		"name": "messagepack",
		"tag": "serialization",
		"status": "draft",
		"description": "MessagePack",
		"code": 513
	},
	{
		"name": "car",
		"tag": "serialization",
		"status": "draft",
		"description": "Content Addressable aRchive (CAR)",
		"code": 514
	},
	{
		"name": "libp2p-peer-record",
		"tag": "libp2p",
		"status": "permanent",
		"description": "libp2p peer record type",
		"code": 769
	},
	{
		"name": "libp2p-relay-rsvp",
		"tag": "libp2p",
		"status": "permanent",
		"description": "libp2p relay reservation voucher",
		"code": 770
	},
	{
		"name": "car-index-sorted",
		"tag": "serialization",
		"status": "draft",
		"description": "CARv2 IndexSorted index format",
		"code": 1024
	},
	{
		"name": "car-multihash-index-sorted",
		"tag": "serialization",
		"status": "draft",
		"description": "CARv2 MultihashIndexSorted index format",
		"code": 1025
	},
	{
		"name": "transport-bitswap",
		"tag": "transport",
		"status": "draft",
		"description": "Bitswap datatransfer",
		"code": 2304
	},
	{
		"name": "transport-graphsync-filecoinv1",
		"tag": "transport",
		"status": "draft",
		"description": "Filecoin graphsync datatransfer",
		"code": 2320
	},
	{
		"name": "sha2-256-trunc254-padded",
		"tag": "multihash",
		"status": "permanent",
		"description": "SHA2-256 with the two most significant bits from the last byte zeroed (as via a mask with 0b00111111) - used for proving trees as in Filecoin",
		"code": 4114
	},
	{
		"name": "sha2-224",
		"tag": "multihash",
		"status": "permanent",
		"description": "aka SHA-224; as specified by FIPS 180-4.",
		"code": 4115
	},
	{
		"name": "sha2-512-224",
		"tag": "multihash",
		"status": "permanent",
		"description": "aka SHA-512/224; as specified by FIPS 180-4.",
		"code": 4116
	},
	{
		"name": "sha2-512-256",
		"tag": "multihash",
		"status": "permanent",
		"description": "aka SHA-512/256; as specified by FIPS 180-4.",
		"code": 4117
	},
	{
		"name": "murmur3-x64-128",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 4130
	},
	{
		"name": "ripemd-128",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 4178
	},
	{
		"name": "ripemd-160",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 4179
	},
	{
		"name": "ripemd-256",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 4180
	},
	{
		"name": "ripemd-320",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 4181
	},
	{
		"name": "x11",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 4352
	},
	{
		"name": "p256-pub",
		"tag": "key",
		"status": "draft",
		"description": "P-256 public Key (compressed)",
		"code": 4608
	},
	{
		"name": "p384-pub",
		"tag": "key",
		"status": "draft",
		"description": "P-384 public Key (compressed)",
		"code": 4609
	},
	{
		"name": "p521-pub",
		"tag": "key",
		"status": "draft",
		"description": "P-521 public Key (compressed)",
		"code": 4610
	},
	{
		"name": "ed448-pub",
		"tag": "key",
		"status": "draft",
		"description": "Ed448 public Key",
		"code": 4611
	},
	{
		"name": "x448-pub",
		"tag": "key",
		"status": "draft",
		"description": "X448 public Key",
		"code": 4612
	},
	{
		"name": "rsa-pub",
		"tag": "key",
		"status": "draft",
		"description": "RSA public key. DER-encoded ASN.1 type RSAPublicKey according to IETF RFC 8017 (PKCS #1)",
		"code": 4613
	},
	{
		"name": "sm2-pub",
		"tag": "key",
		"status": "draft",
		"description": "SM2 public key (compressed)",
		"code": 4614
	},
	{
		"name": "ed25519-priv",
		"tag": "key",
		"status": "draft",
		"description": "Ed25519 private key",
		"code": 4864
	},
	{
		"name": "secp256k1-priv",
		"tag": "key",
		"status": "draft",
		"description": "Secp256k1 private key",
		"code": 4865
	},
	{
		"name": "x25519-priv",
		"tag": "key",
		"status": "draft",
		"description": "Curve25519 private key",
		"code": 4866
	},
	{
		"name": "kangarootwelve",
		"tag": "multihash",
		"status": "draft",
		"description": "KangarooTwelve is an extendable-output hash function based on Keccak-p",
		"code": 7425
	},
	{
		"name": "sm3-256",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 21325
	},
	{
		"name": "blake2b-8",
		"tag": "multihash",
		"status": "draft",
		"description": "Blake2b consists of 64 output lengths that give different hashes",
		"code": 45569
	},
	{
		"name": "blake2b-16",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45570
	},
	{
		"name": "blake2b-24",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45571
	},
	{
		"name": "blake2b-32",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45572
	},
	{
		"name": "blake2b-40",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45573
	},
	{
		"name": "blake2b-48",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45574
	},
	{
		"name": "blake2b-56",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45575
	},
	{
		"name": "blake2b-64",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45576
	},
	{
		"name": "blake2b-72",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45577
	},
	{
		"name": "blake2b-80",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45578
	},
	{
		"name": "blake2b-88",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45579
	},
	{
		"name": "blake2b-96",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45580
	},
	{
		"name": "blake2b-104",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45581
	},
	{
		"name": "blake2b-112",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45582
	},
	{
		"name": "blake2b-120",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45583
	},
	{
		"name": "blake2b-128",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45584
	},
	{
		"name": "blake2b-136",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45585
	},
	{
		"name": "blake2b-144",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45586
	},
	{
		"name": "blake2b-152",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45587
	},
	{
		"name": "blake2b-160",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45588
	},
	{
		"name": "blake2b-168",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45589
	},
	{
		"name": "blake2b-176",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45590
	},
	{
		"name": "blake2b-184",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45591
	},
	{
		"name": "blake2b-192",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45592
	},
	{
		"name": "blake2b-200",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45593
	},
	{
		"name": "blake2b-208",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45594
	},
	{
		"name": "blake2b-216",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45595
	},
	{
		"name": "blake2b-224",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45596
	},
	{
		"name": "blake2b-232",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45597
	},
	{
		"name": "blake2b-240",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45598
	},
	{
		"name": "blake2b-248",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45599
	},
	{
		"name": "blake2b-256",
		"tag": "multihash",
		"status": "permanent",
		"description": "",
		"code": 45600
	},
	{
		"name": "blake2b-264",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45601
	},
	{
		"name": "blake2b-272",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45602
	},
	{
		"name": "blake2b-280",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45603
	},
	{
		"name": "blake2b-288",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45604
	},
	{
		"name": "blake2b-296",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45605
	},
	{
		"name": "blake2b-304",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45606
	},
	{
		"name": "blake2b-312",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45607
	},
	{
		"name": "blake2b-320",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45608
	},
	{
		"name": "blake2b-328",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45609
	},
	{
		"name": "blake2b-336",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45610
	},
	{
		"name": "blake2b-344",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45611
	},
	{
		"name": "blake2b-352",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45612
	},
	{
		"name": "blake2b-360",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45613
	},
	{
		"name": "blake2b-368",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45614
	},
	{
		"name": "blake2b-376",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45615
	},
	{
		"name": "blake2b-384",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45616
	},
	{
		"name": "blake2b-392",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45617
	},
	{
		"name": "blake2b-400",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45618
	},
	{
		"name": "blake2b-408",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45619
	},
	{
		"name": "blake2b-416",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45620
	},
	{
		"name": "blake2b-424",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45621
	},
	{
		"name": "blake2b-432",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45622
	},
	{
		"name": "blake2b-440",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45623
	},
	{
		"name": "blake2b-448",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45624
	},
	{
		"name": "blake2b-456",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45625
	},
	{
		"name": "blake2b-464",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45626
	},
	{
		"name": "blake2b-472",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45627
	},
	{
		"name": "blake2b-480",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45628
	},
	{
		"name": "blake2b-488",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45629
	},
	{
		"name": "blake2b-496",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45630
	},
	{
		"name": "blake2b-504",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45631
	},
	{
		"name": "blake2b-512",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45632
	},
	{
		"name": "blake2s-8",
		"tag": "multihash",
		"status": "draft",
		"description": "Blake2s consists of 32 output lengths that give different hashes",
		"code": 45633
	},
	{
		"name": "blake2s-16",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45634
	},
	{
		"name": "blake2s-24",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45635
	},
	{
		"name": "blake2s-32",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45636
	},
	{
		"name": "blake2s-40",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45637
	},
	{
		"name": "blake2s-48",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45638
	},
	{
		"name": "blake2s-56",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45639
	},
	{
		"name": "blake2s-64",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45640
	},
	{
		"name": "blake2s-72",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45641
	},
	{
		"name": "blake2s-80",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45642
	},
	{
		"name": "blake2s-88",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45643
	},
	{
		"name": "blake2s-96",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45644
	},
	{
		"name": "blake2s-104",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45645
	},
	{
		"name": "blake2s-112",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45646
	},
	{
		"name": "blake2s-120",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45647
	},
	{
		"name": "blake2s-128",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45648
	},
	{
		"name": "blake2s-136",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45649
	},
	{
		"name": "blake2s-144",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45650
	},
	{
		"name": "blake2s-152",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45651
	},
	{
		"name": "blake2s-160",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45652
	},
	{
		"name": "blake2s-168",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45653
	},
	{
		"name": "blake2s-176",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45654
	},
	{
		"name": "blake2s-184",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45655
	},
	{
		"name": "blake2s-192",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45656
	},
	{
		"name": "blake2s-200",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45657
	},
	{
		"name": "blake2s-208",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45658
	},
	{
		"name": "blake2s-216",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45659
	},
	{
		"name": "blake2s-224",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45660
	},
	{
		"name": "blake2s-232",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45661
	},
	{
		"name": "blake2s-240",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45662
	},
	{
		"name": "blake2s-248",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45663
	},
	{
		"name": "blake2s-256",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45664
	},
	{
		"name": "skein256-8",
		"tag": "multihash",
		"status": "draft",
		"description": "Skein256 consists of 32 output lengths that give different hashes",
		"code": 45825
	},
	{
		"name": "skein256-16",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45826
	},
	{
		"name": "skein256-24",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45827
	},
	{
		"name": "skein256-32",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45828
	},
	{
		"name": "skein256-40",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45829
	},
	{
		"name": "skein256-48",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45830
	},
	{
		"name": "skein256-56",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45831
	},
	{
		"name": "skein256-64",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45832
	},
	{
		"name": "skein256-72",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45833
	},
	{
		"name": "skein256-80",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45834
	},
	{
		"name": "skein256-88",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45835
	},
	{
		"name": "skein256-96",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45836
	},
	{
		"name": "skein256-104",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45837
	},
	{
		"name": "skein256-112",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45838
	},
	{
		"name": "skein256-120",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45839
	},
	{
		"name": "skein256-128",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45840
	},
	{
		"name": "skein256-136",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45841
	},
	{
		"name": "skein256-144",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45842
	},
	{
		"name": "skein256-152",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45843
	},
	{
		"name": "skein256-160",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45844
	},
	{
		"name": "skein256-168",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45845
	},
	{
		"name": "skein256-176",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45846
	},
	{
		"name": "skein256-184",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45847
	},
	{
		"name": "skein256-192",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45848
	},
	{
		"name": "skein256-200",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45849
	},
	{
		"name": "skein256-208",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45850
	},
	{
		"name": "skein256-216",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45851
	},
	{
		"name": "skein256-224",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45852
	},
	{
		"name": "skein256-232",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45853
	},
	{
		"name": "skein256-240",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45854
	},
	{
		"name": "skein256-248",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45855
	},
	{
		"name": "skein256-256",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45856
	},
	{
		"name": "skein512-8",
		"tag": "multihash",
		"status": "draft",
		"description": "Skein512 consists of 64 output lengths that give different hashes",
		"code": 45857
	},
	{
		"name": "skein512-16",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45858
	},
	{
		"name": "skein512-24",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45859
	},
	{
		"name": "skein512-32",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45860
	},
	{
		"name": "skein512-40",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45861
	},
	{
		"name": "skein512-48",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45862
	},
	{
		"name": "skein512-56",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45863
	},
	{
		"name": "skein512-64",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45864
	},
	{
		"name": "skein512-72",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45865
	},
	{
		"name": "skein512-80",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45866
	},
	{
		"name": "skein512-88",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45867
	},
	{
		"name": "skein512-96",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45868
	},
	{
		"name": "skein512-104",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45869
	},
	{
		"name": "skein512-112",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45870
	},
	{
		"name": "skein512-120",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45871
	},
	{
		"name": "skein512-128",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45872
	},
	{
		"name": "skein512-136",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45873
	},
	{
		"name": "skein512-144",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45874
	},
	{
		"name": "skein512-152",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45875
	},
	{
		"name": "skein512-160",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45876
	},
	{
		"name": "skein512-168",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45877
	},
	{
		"name": "skein512-176",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45878
	},
	{
		"name": "skein512-184",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45879
	},
	{
		"name": "skein512-192",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45880
	},
	{
		"name": "skein512-200",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45881
	},
	{
		"name": "skein512-208",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45882
	},
	{
		"name": "skein512-216",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45883
	},
	{
		"name": "skein512-224",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45884
	},
	{
		"name": "skein512-232",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45885
	},
	{
		"name": "skein512-240",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45886
	},
	{
		"name": "skein512-248",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45887
	},
	{
		"name": "skein512-256",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45888
	},
	{
		"name": "skein512-264",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45889
	},
	{
		"name": "skein512-272",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45890
	},
	{
		"name": "skein512-280",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45891
	},
	{
		"name": "skein512-288",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45892
	},
	{
		"name": "skein512-296",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45893
	},
	{
		"name": "skein512-304",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45894
	},
	{
		"name": "skein512-312",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45895
	},
	{
		"name": "skein512-320",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45896
	},
	{
		"name": "skein512-328",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45897
	},
	{
		"name": "skein512-336",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45898
	},
	{
		"name": "skein512-344",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45899
	},
	{
		"name": "skein512-352",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45900
	},
	{
		"name": "skein512-360",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45901
	},
	{
		"name": "skein512-368",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45902
	},
	{
		"name": "skein512-376",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45903
	},
	{
		"name": "skein512-384",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45904
	},
	{
		"name": "skein512-392",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45905
	},
	{
		"name": "skein512-400",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45906
	},
	{
		"name": "skein512-408",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45907
	},
	{
		"name": "skein512-416",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45908
	},
	{
		"name": "skein512-424",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45909
	},
	{
		"name": "skein512-432",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45910
	},
	{
		"name": "skein512-440",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45911
	},
	{
		"name": "skein512-448",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45912
	},
	{
		"name": "skein512-456",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45913
	},
	{
		"name": "skein512-464",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45914
	},
	{
		"name": "skein512-472",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45915
	},
	{
		"name": "skein512-480",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45916
	},
	{
		"name": "skein512-488",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45917
	},
	{
		"name": "skein512-496",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45918
	},
	{
		"name": "skein512-504",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45919
	},
	{
		"name": "skein512-512",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45920
	},
	{
		"name": "skein1024-8",
		"tag": "multihash",
		"status": "draft",
		"description": "Skein1024 consists of 128 output lengths that give different hashes",
		"code": 45921
	},
	{
		"name": "skein1024-16",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45922
	},
	{
		"name": "skein1024-24",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45923
	},
	{
		"name": "skein1024-32",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45924
	},
	{
		"name": "skein1024-40",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45925
	},
	{
		"name": "skein1024-48",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45926
	},
	{
		"name": "skein1024-56",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45927
	},
	{
		"name": "skein1024-64",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45928
	},
	{
		"name": "skein1024-72",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45929
	},
	{
		"name": "skein1024-80",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45930
	},
	{
		"name": "skein1024-88",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45931
	},
	{
		"name": "skein1024-96",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45932
	},
	{
		"name": "skein1024-104",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45933
	},
	{
		"name": "skein1024-112",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45934
	},
	{
		"name": "skein1024-120",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45935
	},
	{
		"name": "skein1024-128",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45936
	},
	{
		"name": "skein1024-136",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45937
	},
	{
		"name": "skein1024-144",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45938
	},
	{
		"name": "skein1024-152",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45939
	},
	{
		"name": "skein1024-160",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45940
	},
	{
		"name": "skein1024-168",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45941
	},
	{
		"name": "skein1024-176",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45942
	},
	{
		"name": "skein1024-184",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45943
	},
	{
		"name": "skein1024-192",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45944
	},
	{
		"name": "skein1024-200",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45945
	},
	{
		"name": "skein1024-208",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45946
	},
	{
		"name": "skein1024-216",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45947
	},
	{
		"name": "skein1024-224",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45948
	},
	{
		"name": "skein1024-232",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45949
	},
	{
		"name": "skein1024-240",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45950
	},
	{
		"name": "skein1024-248",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45951
	},
	{
		"name": "skein1024-256",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45952
	},
	{
		"name": "skein1024-264",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45953
	},
	{
		"name": "skein1024-272",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45954
	},
	{
		"name": "skein1024-280",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45955
	},
	{
		"name": "skein1024-288",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45956
	},
	{
		"name": "skein1024-296",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45957
	},
	{
		"name": "skein1024-304",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45958
	},
	{
		"name": "skein1024-312",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45959
	},
	{
		"name": "skein1024-320",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45960
	},
	{
		"name": "skein1024-328",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45961
	},
	{
		"name": "skein1024-336",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45962
	},
	{
		"name": "skein1024-344",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45963
	},
	{
		"name": "skein1024-352",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45964
	},
	{
		"name": "skein1024-360",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45965
	},
	{
		"name": "skein1024-368",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45966
	},
	{
		"name": "skein1024-376",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45967
	},
	{
		"name": "skein1024-384",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45968
	},
	{
		"name": "skein1024-392",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45969
	},
	{
		"name": "skein1024-400",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45970
	},
	{
		"name": "skein1024-408",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45971
	},
	{
		"name": "skein1024-416",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45972
	},
	{
		"name": "skein1024-424",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45973
	},
	{
		"name": "skein1024-432",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45974
	},
	{
		"name": "skein1024-440",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45975
	},
	{
		"name": "skein1024-448",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45976
	},
	{
		"name": "skein1024-456",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45977
	},
	{
		"name": "skein1024-464",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45978
	},
	{
		"name": "skein1024-472",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45979
	},
	{
		"name": "skein1024-480",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45980
	},
	{
		"name": "skein1024-488",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45981
	},
	{
		"name": "skein1024-496",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45982
	},
	{
		"name": "skein1024-504",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45983
	},
	{
		"name": "skein1024-512",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45984
	},
	{
		"name": "skein1024-520",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45985
	},
	{
		"name": "skein1024-528",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45986
	},
	{
		"name": "skein1024-536",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45987
	},
	{
		"name": "skein1024-544",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45988
	},
	{
		"name": "skein1024-552",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45989
	},
	{
		"name": "skein1024-560",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45990
	},
	{
		"name": "skein1024-568",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45991
	},
	{
		"name": "skein1024-576",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45992
	},
	{
		"name": "skein1024-584",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45993
	},
	{
		"name": "skein1024-592",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45994
	},
	{
		"name": "skein1024-600",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45995
	},
	{
		"name": "skein1024-608",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45996
	},
	{
		"name": "skein1024-616",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45997
	},
	{
		"name": "skein1024-624",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45998
	},
	{
		"name": "skein1024-632",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 45999
	},
	{
		"name": "skein1024-640",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46000
	},
	{
		"name": "skein1024-648",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46001
	},
	{
		"name": "skein1024-656",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46002
	},
	{
		"name": "skein1024-664",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46003
	},
	{
		"name": "skein1024-672",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46004
	},
	{
		"name": "skein1024-680",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46005
	},
	{
		"name": "skein1024-688",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46006
	},
	{
		"name": "skein1024-696",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46007
	},
	{
		"name": "skein1024-704",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46008
	},
	{
		"name": "skein1024-712",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46009
	},
	{
		"name": "skein1024-720",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46010
	},
	{
		"name": "skein1024-728",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46011
	},
	{
		"name": "skein1024-736",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46012
	},
	{
		"name": "skein1024-744",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46013
	},
	{
		"name": "skein1024-752",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46014
	},
	{
		"name": "skein1024-760",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46015
	},
	{
		"name": "skein1024-768",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46016
	},
	{
		"name": "skein1024-776",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46017
	},
	{
		"name": "skein1024-784",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46018
	},
	{
		"name": "skein1024-792",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46019
	},
	{
		"name": "skein1024-800",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46020
	},
	{
		"name": "skein1024-808",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46021
	},
	{
		"name": "skein1024-816",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46022
	},
	{
		"name": "skein1024-824",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46023
	},
	{
		"name": "skein1024-832",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46024
	},
	{
		"name": "skein1024-840",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46025
	},
	{
		"name": "skein1024-848",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46026
	},
	{
		"name": "skein1024-856",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46027
	},
	{
		"name": "skein1024-864",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46028
	},
	{
		"name": "skein1024-872",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46029
	},
	{
		"name": "skein1024-880",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46030
	},
	{
		"name": "skein1024-888",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46031
	},
	{
		"name": "skein1024-896",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46032
	},
	{
		"name": "skein1024-904",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46033
	},
	{
		"name": "skein1024-912",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46034
	},
	{
		"name": "skein1024-920",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46035
	},
	{
		"name": "skein1024-928",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46036
	},
	{
		"name": "skein1024-936",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46037
	},
	{
		"name": "skein1024-944",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46038
	},
	{
		"name": "skein1024-952",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46039
	},
	{
		"name": "skein1024-960",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46040
	},
	{
		"name": "skein1024-968",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46041
	},
	{
		"name": "skein1024-976",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46042
	},
	{
		"name": "skein1024-984",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46043
	},
	{
		"name": "skein1024-992",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46044
	},
	{
		"name": "skein1024-1000",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46045
	},
	{
		"name": "skein1024-1008",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46046
	},
	{
		"name": "skein1024-1016",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46047
	},
	{
		"name": "skein1024-1024",
		"tag": "multihash",
		"status": "draft",
		"description": "",
		"code": 46048
	},
	{
		"name": "poseidon-bls12_381-a2-fc1",
		"tag": "multihash",
		"status": "permanent",
		"description": "Poseidon using BLS12-381 and arity of 2 with Filecoin parameters",
		"code": 46081
	},
	{
		"name": "poseidon-bls12_381-a2-fc1-sc",
		"tag": "multihash",
		"status": "draft",
		"description": "Poseidon using BLS12-381 and arity of 2 with Filecoin parameters - high-security variant",
		"code": 46082
	},
	{
		"name": "ssz",
		"tag": "serialization",
		"status": "draft",
		"description": "SimpleSerialize (SSZ) serialization",
		"code": 46337
	},
	{
		"name": "ssz-sha2-256-bmt",
		"tag": "multihash",
		"status": "draft",
		"description": "SSZ Merkle tree root using SHA2-256 as the hashing function and SSZ serialization for the block binary",
		"code": 46338
	},
	{
		"name": "iscc",
		"tag": "softhash",
		"status": "draft",
		"description": "ISCC (International Standard Content Code) - similarity preserving hash",
		"code": 52225
	},
	{
		"name": "zeroxcert-imprint-256",
		"tag": "zeroxcert",
		"status": "draft",
		"description": "0xcert Asset Imprint (root hash)",
		"code": 52753
	},
	{
		"name": "fil-commitment-unsealed",
		"tag": "filecoin",
		"status": "permanent",
		"description": "Filecoin piece or sector data commitment merkle node/root (CommP & CommD)",
		"code": 61697
	},
	{
		"name": "fil-commitment-sealed",
		"tag": "filecoin",
		"status": "permanent",
		"description": "Filecoin sector data commitment merkle node/root - sealed and replicated (CommR)",
		"code": 61698
	},
	{
		"name": "plaintextv2",
		"tag": "multiaddr",
		"status": "draft",
		"description": "",
		"code": 7367777
	},
	{
		"name": "holochain-adr-v0",
		"tag": "holochain",
		"status": "draft",
		"description": "Holochain v0 address		+ 8 R-S (63 x Base-32)",
		"code": 8417572
	},
	{
		"name": "holochain-adr-v1",
		"tag": "holochain",
		"status": "draft",
		"description": "Holochain v1 address		+ 8 R-S (63 x Base-32)",
		"code": 8483108
	},
	{
		"name": "holochain-key-v0",
		"tag": "holochain",
		"status": "draft",
		"description": "Holochain v0 public key + 8 R-S (63 x Base-32)",
		"code": 9728292
	},
	{
		"name": "holochain-key-v1",
		"tag": "holochain",
		"status": "draft",
		"description": "Holochain v1 public key + 8 R-S (63 x Base-32)",
		"code": 9793828
	},
	{
		"name": "holochain-sig-v0",
		"tag": "holochain",
		"status": "draft",
		"description": "Holochain v0 signature	+ 8 R-S (63 x Base-32)",
		"code": 10645796
	},
	{
		"name": "holochain-sig-v1",
		"tag": "holochain",
		"status": "draft",
		"description": "Holochain v1 signature	+ 8 R-S (63 x Base-32)",
		"code": 10711332
	},
	{
		"name": "skynet-ns",
		"tag": "namespace",
		"status": "draft",
		"description": "Skynet Namespace",
		"code": 11639056
	},
	{
		"name": "arweave-ns",
		"tag": "namespace",
		"status": "draft",
		"description": "Arweave Namespace",
		"code": 11704592
	},
	{
		"name": "subspace-ns",
		"tag": "namespace",
		"status": "draft",
		"description": "Subspace Network Namespace",
		"code": 11770128
	},
	{
		"name": "kumandra-ns",
		"tag": "namespace",
		"status": "draft",
		"description": "Kumandra Network Namespace",
		"code": 11835664
	}
]

export const multicodecsByCode = Object.fromEntries(multicodecs.map(multicodec => [multicodec.code, multicodec]))
