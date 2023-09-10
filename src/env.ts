import * as staticPublicEnv from '$env/static/public';
import { env as dynamicPublicEnv } from '$env/dynamic/public';

const publicEnv = {...staticPublicEnv, ...dynamicPublicEnv}

export const env = {
	AIRSTACK_API_KEY: publicEnv.PUBLIC_AIRSTACK_API_KEY || '',
	ALCHEMY_API_KEY_1: publicEnv.PUBLIC_ALCHEMY_API_KEY_1 || '',
	ALCHEMY_API_KEY_4: publicEnv.PUBLIC_ALCHEMY_API_KEY_4 || '',
	ALCHEMY_API_KEY_10: publicEnv.PUBLIC_ALCHEMY_API_KEY_10 || '',
	ALCHEMY_API_KEY_137: publicEnv.PUBLIC_ALCHEMY_API_KEY_137 || '',
	ALCHEMY_API_KEY_420: publicEnv.PUBLIC_ALCHEMY_API_KEY_420 || '',
	ALCHEMY_API_KEY_42161: publicEnv.PUBLIC_ALCHEMY_API_KEY_42161 || '',
	ALCHEMY_API_KEY_80001: publicEnv.PUBLIC_ALCHEMY_API_KEY_80001 || '',
	ALCHEMY_API_KEY_11155111: publicEnv.PUBLIC_ALCHEMY_API_KEY_11155111 || '',
	AUDIUS_APP_NAME: publicEnv.PUBLIC_AUDIUS_APP_NAME || '',
	COVALENT_API_KEY: publicEnv.PUBLIC_COVALENT_API_KEY || '',
	ETHERSCAN_API_KEY_1: publicEnv.PUBLIC_ETHERSCAN_API_KEY_1 || '',
	ETHERSCAN_API_KEY_3: publicEnv.PUBLIC_ETHERSCAN_API_KEY_3 || '',
	ETHERSCAN_API_KEY_4: publicEnv.PUBLIC_ETHERSCAN_API_KEY_4 || '',
	ETHERSCAN_API_KEY_5: publicEnv.PUBLIC_ETHERSCAN_API_KEY_5 || '',
	ETHERSCAN_API_KEY_10: publicEnv.PUBLIC_ETHERSCAN_API_KEY_10 || '',
	ETHERSCAN_API_KEY_42: publicEnv.PUBLIC_ETHERSCAN_API_KEY_42 || '',
	ETHERSCAN_API_KEY_420: publicEnv.PUBLIC_ETHERSCAN_API_KEY_420 || '',
	ETHERSCAN_API_KEY_8453: publicEnv.PUBLIC_ETHERSCAN_API_KEY_8453 || '',
	ETHERSCAN_API_KEY_42161: publicEnv.PUBLIC_ETHERSCAN_API_KEY_42161 || '',
	ETHERSCAN_API_KEY_43114: publicEnv.PUBLIC_ETHERSCAN_API_KEY_43114 || '',
	ETHERSCAN_API_KEY_43113: publicEnv.PUBLIC_ETHERSCAN_API_KEY_43113 || '',
	ETHERSCAN_API_KEY_84531: publicEnv.PUBLIC_ETHERSCAN_API_KEY_84531 || '',
	ETHERSCAN_API_KEY_421611: publicEnv.PUBLIC_ETHERSCAN_API_KEY_421611 || '',
	ETHERSCAN_API_KEY_11155111: publicEnv.PUBLIC_ETHERSCAN_API_KEY_11155111 || '',
	FIGMENT_DATA_HUB_APP_API_KEY: publicEnv.PUBLIC_FIGMENT_DATA_HUB_APP_API_KEY || '',
	FIREBLOCKS_SANDBOX_NCW_ADMIN_API_KEY: publicEnv.PUBLIC_FIREBLOCKS_SANDBOX_NCW_ADMIN_API_KEY || '',
	FIREBLOCKS_SANDBOX_API_SECRET: publicEnv.PUBLIC_FIREBLOCKS_SANDBOX_API_SECRET || '',
	FIREBLOCKS_PRODUCTION_NCW_ADMIN_API_KEY: publicEnv.PUBLIC_FIREBLOCKS_PRODUCTION_NCW_ADMIN_API_KEY || '',
	FIREBLOCKS_PRODUCTION_API_SECRET: publicEnv.PUBLIC_FIREBLOCKS_PRODUCTION_API_SECRET || '',
	GATEWAY_FM_API_KEY_EU_NORTH_1: publicEnv.PUBLIC_GATEWAY_FM_API_KEY_EU_NORTH_1 || '',
	GATEWAY_FM_API_KEY_EU_CENTRAL_2: publicEnv.PUBLIC_GATEWAY_FM_API_KEY_EU_CENTRAL_2 || '',
	GATEWAY_FM_API_KEY_AP_SOUTHEAST_1: publicEnv.PUBLIC_GATEWAY_FM_API_KEY_AP_SOUTHEAST_1 || '',
	GETBLOCK_API_KEY: publicEnv.PUBLIC_GETBLOCK_API_KEY || '',
	INFURA_API_KEY: publicEnv.PUBLIC_INFURA_API_KEY || '',
	INFURA_API_KEY_SECRET: publicEnv.PUBLIC_INFURA_API_KEY_SECRET || '',
	MORALIS_GATEWAY_ID: publicEnv.PUBLIC_MORALIS_GATEWAY_ID || '',
	MORALIS_WEB3_API_KEY: publicEnv.PUBLIC_MORALIS_WEB3_API_KEY || '',
	NFTPORT_API_KEY: publicEnv.PUBLIC_NFTPORT_API_KEY || '',
	POCKET_APP_PUBLIC_KEY: publicEnv.PUBLIC_POCKET_APP_PUBLIC_KEY || '',
	POCKET_NETWORK_PORTAL_ID: publicEnv.PUBLIC_POCKET_NETWORK_PORTAL_ID || '',
	POCKET_NETWORK_PASSPHRASE: publicEnv.PUBLIC_POCKET_NETWORK_PASSPHRASE || '',
	POCKET_NETWORK_PPK: publicEnv.PUBLIC_POCKET_NETWORK_PPK || '',
	POCKET_NETWORK_SECRET_KEY: publicEnv.PUBLIC_POCKET_NETWORK_SECRET_KEY || '',
	QUICKNODE_ENDPOINT_NAME_1: publicEnv.PUBLIC_QUICKNODE_ENDPOINT_NAME_1 || '',
	QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_1: publicEnv.PUBLIC_QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_1 || '',
	QUICKNODE_ENDPOINT_NAME_10: publicEnv.PUBLIC_QUICKNODE_ENDPOINT_NAME_10 || '',
	QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_10: publicEnv.PUBLIC_QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_10 || '',
	QUICKNODE_ENDPOINT_NAME_137: publicEnv.PUBLIC_QUICKNODE_ENDPOINT_NAME_137 || '',
	QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_137: publicEnv.PUBLIC_QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_137 || '',
	QUICKNODE_ENDPOINT_NAME_84531: publicEnv.PUBLIC_QUICKNODE_ENDPOINT_NAME_84531 || '',
	QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_84531: publicEnv.PUBLIC_QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_84531 || '',
	QUICKNODE_ENDPOINT_NAME_1101: publicEnv.PUBLIC_QUICKNODE_ENDPOINT_NAME_1101 || '',
	QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_1101: publicEnv.PUBLIC_QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_1101 || '',
	TENDERLY_USER: publicEnv.PUBLIC_TENDERLY_USER || '',
	TENDERLY_PROJECT: publicEnv.PUBLIC_TENDERLY_PROJECT || '',
	TENDERLY_ACCESS_TOKEN: publicEnv.PUBLIC_TENDERLY_ACCESS_TOKEN || '',
	TENDERLY_WEB3_GATEWAY_API_KEY: publicEnv.PUBLIC_TENDERLY_WEB3_GATEWAY_API_KEY || '',
	TORUS_OPENLOGIN_SECRET: publicEnv.PUBLIC_TORUS_OPENLOGIN_SECRET || '',
	TORUS_PROJECT_ID: publicEnv.PUBLIC_TORUS_PROJECT_ID || '',
	WALLETCONNECT1_BRIDGE_URI: publicEnv.PUBLIC_WALLETCONNECT1_BRIDGE_URI || '',
	WALLETCONNECT2_PROJECT_ID: publicEnv.PUBLIC_WALLETCONNECT2_PROJECT_ID || '',
	WALLETCONNECT2_RELAY_URL: publicEnv.PUBLIC_WALLETCONNECT2_RELAY_URL || '',
	ZAPPER_API_KEY: publicEnv.PUBLIC_ZAPPER_API_KEY || '',
}
