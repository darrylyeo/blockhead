# Data Layer

This directory contains the data fetching and normalization layer for the Blockhead Vision application.

## Structure

Each entity has its own subdirectory with implementations for different data sources:

### Implemented Data Fetchers

#### Actor (formerly Address)
- **1inch**: Fetches wallet balances and calculates total USD value with enhanced error handling and validation
- **Blockscout**: Uses GraphQL to get address data including smart contract details with comprehensive metadata
- **viem**: Retrieves balance, bytecode, transaction count, and ENS data (mainnet only) with chain-specific configuration

#### Token
- **1inch**: Fetches token data from `/v6.0/{chainId}/tokens` endpoint with intelligent type determination and risk assessment
- **Blockscout**: GraphQL queries with fallback, determines token standards from type field, supports ERC20/721/1155
- **viem**: Enhanced multicall for ERC20 contract calls with interface detection, bytecode verification, and comprehensive feature analysis

#### Block
- **Blockscout**: Supports queries by hash and number with consensus type detection and comprehensive block characteristics  
- **viem**: Handles various identifiers (hash, number, latest, pending) with enhanced blob data support, chain-specific consensus detection, and comprehensive block analysis

#### Balance
- **1inch**: Fetches all token balances for an address with USD values, enhanced validation, chain-specific native currency support, and comprehensive sorting
- **Blockscout**: Provides native balance from address query with chain-specific metadata
- **viem**: Enhanced ERC20 balance queries with proper error handling, input validation, and comprehensive balance metadata

#### Transaction
- **Blockscout**: Uses Transaction GraphQL fragment with enhanced type/status/category detection and comprehensive error handling
- **viem**: Enhanced transaction processing with comprehensive categorization, confirmation tracking, chain-specific gas configuration, and detailed execution analysis

#### Transfer
- **1inch**: Uses history API to fetch transfer events with enhanced parsing and categorization
- **Blockscout**: Uses TokenTransfer fragment with support for ERC20/721/1155 transfers and comprehensive metadata
- **viem**: Enhanced log parsing to extract transfer events with detailed analysis and categorization

#### Contract
- **Blockscout**: Fetches smart contract data including ABI, source code, and verification status with comprehensive risk assessment
- **viem**: Enhanced contract detection via bytecode analysis with basic risk assessment

#### Event
- **Blockscout**: Enhanced event data extraction from transaction logs with comprehensive categorization

### Key Improvements Made

#### Enhanced Error Handling
- **Input Validation**: All implementations now validate inputs (addresses, transaction hashes, chain IDs)
- **Chain Support**: Proper validation of supported chains with descriptive error messages
- **API-Specific Errors**: Enhanced error handling for each API with specific error codes and retry suggestions
- **Graceful Degradation**: Functions continue processing when non-critical operations fail

#### Chain-Specific Logic
- **Native Currency Support**: Proper handling of native currencies for each chain (ETH, MATIC, BNB, etc.)
- **Consensus Types**: Chain-specific consensus mechanism detection (PoS, PoA, Layer2 Sequencer)
- **Gas Configuration**: Chain-specific gas settings and block time configurations
- **Network Names**: Proper network naming and identification

#### Enhanced Data Processing
- **USD Value Calculations**: Proper decimal handling and BigInt conversion for USD values
- **Balance Formatting**: Human-readable balance formatting with appropriate decimal precision
- **Token Type Detection**: Intelligent token categorization based on name, symbol, and metadata
- **Standard Detection**: Enhanced token standard detection using ERC165 interface support
- **Risk Assessment**: Basic risk factor analysis for tokens and contracts

#### Performance Optimizations
- **Parallel Requests**: Use of Promise.all and Promise.allSettled for parallel API calls
- **Lazy Imports**: Dynamic imports for tree-shaking and avoiding circular dependencies
- **Optimized Queries**: Efficient API queries with minimal data fetching
- **Error Isolation**: Individual error handling to prevent cascade failures

#### Type Safety Improvements
- **Type Assertions**: Strategic use of type assertions to avoid deep type instantiation issues
- **Input Validation**: Runtime validation of data types and formats
- **Fallback Values**: Proper fallback values for optional fields
- **Array Handling**: Consistent use of arrays vs single values for entity relationships

### Common Patterns

All implementations follow these enhanced patterns:

1. **Comprehensive Validation**: Input validation for all parameters with descriptive error messages
2. **Enhanced Error Handling**: API-specific error handling with recovery strategies
3. **Chain-Specific Logic**: Configuration based on chain ID for native currencies, consensus, etc.
4. **Parallel Processing**: Use Promise.allSettled for better error isolation
5. **Graceful Degradation**: Continue processing when non-critical operations fail
6. **Type Safety**: Strategic type assertions to avoid complex type issues
7. **Metadata Enrichment**: Enhanced metadata with source attribution and timestamps
8. **Risk Assessment**: Basic risk factor analysis where applicable

### TypeScript Considerations

Some implementations use type assertions (`as any`) to resolve "Type instantiation is excessively deep" errors that occur with complex discriminated union types. This approach:
- Maintains runtime type safety through validation
- Avoids TypeScript compilation issues
- Preserves type information at the call site
- Enables complex entity structures without compilation overhead

### Not Implemented

The following entities don't have data implementations yet:
- Trace
- NFT
- ENS
- Network
- Validator
- App
- Storage

## Usage

```typescript
import { fetch, normalize } from './data/token/viem'

// Enhanced with validation and error handling
try {
	const data = await fetch(chainId, tokenAddress)
	const token = normalize(data, chainId, tokenAddress)
} catch (error) {
	// Specific error handling based on error type
	console.error('Token fetch failed:', error.message)
}
```

## API Clients

- **Blockscout**: GraphQL client from `$/api/blockscout/graphql/index`
- **1inch**: REST API client from `$/api/1inch/index` with chain ID-based endpoints
- **viem**: Enhanced Ethereum JSON-RPC client from `$/api/viem/index`

## Development Notes

- All functions use real API clients with comprehensive error handling
- Enhanced input validation prevents common runtime errors
- Chain-specific configuration ensures accurate data interpretation
- Type assertions used strategically to avoid TypeScript complexity
- Performance optimized with parallel requests and lazy loading
- Risk assessment integrated where data allows
- Comprehensive metadata preservation for debugging and analysis 