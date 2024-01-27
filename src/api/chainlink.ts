import type { Ethereum } from '$/data/networks/types'
import { formatUnits } from 'viem'
import type { QuoteCurrency, TickerSymbol } from '$/data/currencies'


type AssetPair = string

type PriceFeedContractInfo = {
	decimals: number,
	contractAddress: Ethereum.ContractAddress
}

// https://docs.chain.link/docs/reference-contracts
const CHAINLINK_CONTRACTS: Record<Ethereum.ChainID, Record<AssetPair, PriceFeedContractInfo>> = {
	1: {
		'1INCH/ETH': {
			decimals: 18,
			contractAddress: '0x72AFAECF99C9d9C8215fF44C77B94B99C28741e8'
		},
		'1INCH/USD': {
			decimals: 8,
			contractAddress: '0xc929ad75B72593967DE83E7F7Cda0493458261D9'
		},
		'AAPL/USD': {
			decimals: 8,
			contractAddress: '0x139C8512Cde1778e9b9a8e721ce1aEbd4dD43587'
		},
		'AAVE/ETH': {
			decimals: 18,
			contractAddress: '0x6Df09E975c830ECae5bd4eD9d90f3A95a4f88012'
		},
		'AAVE/USD': {
			decimals: 8,
			contractAddress: '0x547a514d5e3769680Ce22B2361c10Ea13619e8a9'
		},
		'ADA/USD': {
			decimals: 8,
			contractAddress: '0xAE48c91dF1fE419994FFDa27da09D5aC69c30f55'
		},
		'ADX/USD': {
			decimals: 8,
			contractAddress: '0x231e764B44b2C1b7Ca171fa8021A24ed520Cde10'
		},
		'AKRO/USD': {
			decimals: 8,
			contractAddress: '0xB23D105dF4958B4b81757e12f2151B5b5183520B'
		},
		'ALPHA/ETH': {
			decimals: 18,
			contractAddress: '0x89c7926c7c15fD5BFDB1edcFf7E7fC8283B578F6'
		},
		'AMP/USD': {
			decimals: 8,
			contractAddress: '0x8797ABc4641dE76342b8acE9C63e3301DC35e3d8'
		},
		'AMPL/ETH': {
			decimals: 18,
			contractAddress: '0x492575FDD11a0fCf2C6C719867890a7648d526eB'
		},
		'AMPL/USD': {
			decimals: 18,
			contractAddress: '0xe20CA8D7546932360e37E9D72c1a47334af57706'
		},
		'AMZN/USD': {
			decimals: 8,
			contractAddress: '0x8994115d287207144236c13Be5E2bDbf6357D9Fd'
		},
		'ANKR/USD': {
			decimals: 8,
			contractAddress: '0x7eed379bf00005CfeD29feD4009669dE9Bcc21ce'
		},
		'ANT/ETH': {
			decimals: 18,
			contractAddress: '0x8f83670260F8f7708143b836a2a6F11eF0aBac01'
		},
		'APY TVL': {
			decimals: 8,
			contractAddress: '0xDb299D394817D8e7bBe297E84AFfF7106CF92F5f'
		},
		'AUCTION/USD': {
			decimals: 8,
			contractAddress: '0xA6BCac72431A4178f07d016E1D912F56E6D989Ec'
		},
		'AUD/USD': {
			decimals: 8,
			contractAddress: '0x77F9710E7d0A19669A13c055F62cd80d313dF022'
		},
		'BADGER/ETH': {
			decimals: 18,
			contractAddress: '0x58921Ac140522867bf50b9E009599Da0CA4A2379'
		},
		'BAL/ETH': {
			decimals: 18,
			contractAddress: '0xC1438AA3823A6Ba0C159CfA8D98dF5A994bA120b'
		},
		'BAND/ETH': {
			decimals: 18,
			contractAddress: '0x0BDb051e10c9718d1C29efbad442E88D38958274'
		},
		'BAND/USD': {
			decimals: 8,
			contractAddress: '0x919C77ACc7373D000b329c1276C76586ed2Dd19F'
		},
		'BAT/ETH': {
			decimals: 18,
			contractAddress: '0x0d16d4528239e9ee52fa531af613AcdB23D88c94'
		},
		'BAT/USD': {
			decimals: 8,
			contractAddress: '0x9441D7556e7820B5ca42082cfa99487D56AcA958'
		},
		'BCH/USD': {
			decimals: 8,
			contractAddress: '0x9F0F69428F923D6c95B781F89E165C9b2df9789D'
		},
		'BNB/ETH': {
			decimals: 18,
			contractAddress: '0xc546d2d06144F9DD42815b8bA46Ee7B8FcAFa4a2'
		},
		'BNB/USD': {
			decimals: 8,
			contractAddress: '0x14e613AC84a31f709eadbdF89C6CC390fDc9540A'
		},
		'BNT/ETH': {
			decimals: 18,
			contractAddress: '0xCf61d1841B178fe82C8895fe60c2EDDa08314416'
		},
		'BNT/USD': {
			decimals: 8,
			contractAddress: '0x1E6cF0D433de4FE882A437ABC654F58E1e78548c'
		},
		'BOR/USD': {
			decimals: 8,
			contractAddress: '0xf8D0EaFd81104002234819ABe752bCa0d41b097F'
		},
		'BRL/USD': {
			decimals: 8,
			contractAddress: '0x971E8F1B779A5F1C36e1cd7ef44Ba1Cc2F5EeE0f'
		},
		'BTC/ARS': {
			decimals: 8,
			contractAddress: '0xA912dd6b62B1C978e205B86994E057B1b494D73a'
		},
		'BTC/ETH': {
			decimals: 18,
			contractAddress: '0xdeb288F737066589598e9214E782fa5A8eD689e8'
		},
		'BTC/USD': {
			decimals: 8,
			contractAddress: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c'
		},
		'BTC/height': {
			decimals: 0,
			contractAddress: '0x4D2574c790d836b8C886615d927e9BA585B10EbA'
		},
		'BTC Difficulty': {
			decimals: 0,
			contractAddress: '0xA792Ebd0E4465DB2657c7971519Cfa0f0275F428'
		},
		'BTM/USD': {
			decimals: 8,
			contractAddress: '0x9fCCF42D21AB278e205e7Bb310D8979F8f4B5751'
		},
		'BUSD/ETH': {
			decimals: 18,
			contractAddress: '0x614715d2Af89E6EC99A233818275142cE88d1Cfd'
		},
		'BUSD/USD': {
			decimals: 8,
			contractAddress: '0x833D8Eb16D306ed1FbB5D7A2E019e106B960965A'
		},
		'BZRX/ETH': {
			decimals: 18,
			contractAddress: '0x8f7C7181Ed1a2BA41cfC3f5d064eF91b67daef66'
		},
		'CAD/USD': {
			decimals: 8,
			contractAddress: '0xa34317DB73e77d453b1B8d04550c44D10e981C8e'
		},
		'CEL/ETH': {
			decimals: 18,
			contractAddress: '0x75FbD83b4bd51dEe765b2a01e8D3aa1B020F9d33'
		},
		'CHF/USD': {
			decimals: 8,
			contractAddress: '0x449d117117838fFA61263B61dA6301AA2a88B13A'
		},
		'CNY/USD': {
			decimals: 8,
			contractAddress: '0xeF8A4aF35cd47424672E3C590aBD37FBB7A7759a'
		},
		'COIN/USD': {
			decimals: 8,
			contractAddress: '0xb10a047f8db80d781D006F1401BEB7d70Eb4da1a'
		},
		'COMP/ETH': {
			decimals: 18,
			contractAddress: '0x1B39Ee86Ec5979ba5C322b826B3ECb8C79991699'
		},
		'COMP/USD': {
			decimals: 8,
			contractAddress: '0xdbd020CAeF83eFd542f4De03e3cF0C28A4428bd5'
		},
		'COVER/ETH': {
			decimals: 18,
			contractAddress: '0x7B6230EF79D5E97C11049ab362c0b685faCBA0C2'
		},
		'COVER/USD': {
			decimals: 8,
			contractAddress: '0x0ad50393F11FfAc4dd0fe5F1056448ecb75226Cf'
		},
		'CREAM/ETH': {
			decimals: 18,
			contractAddress: '0x82597CFE6af8baad7c0d441AA82cbC3b51759607'
		},
		'CRO/ETH': {
			decimals: 18,
			contractAddress: '0xcA696a9Eb93b81ADFE6435759A29aB4cf2991A96'
		},
		'CRO/USD': {
			decimals: 8,
			contractAddress: '0x00Cb80Cf097D9aA9A3779ad8EE7cF98437eaE050'
		},
		'CRV/ETH': {
			decimals: 18,
			contractAddress: '0x8a12Be339B0cD1829b91Adc01977caa5E9ac121e'
		},
		'CRV/USD': {
			decimals: 8,
			contractAddress: '0xCd627aA160A6fA45Eb793D19Ef54f5062F20f33f'
		},
		'CV/Index': {
			decimals: 18,
			contractAddress: '0x1B58B67B2b2Df71b4b0fb6691271E83A0fa36aC5'
		},
		'DAI/ETH': {
			decimals: 18,
			contractAddress: '0x773616E4d11A78F511299002da57A0a94577F1f4'
		},
		'DAI/USD': {
			decimals: 8,
			contractAddress: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9'
		},
		'DASH/USD': {
			decimals: 8,
			contractAddress: '0xFb0cADFEa136E9E343cfb55B863a6Df8348ab912'
		},
		'DIGG/BTC': {
			decimals: 8,
			contractAddress: '0x418a6C98CD5B8275955f08F0b8C1c6838c8b1685'
		},
		'DNT/ETH': {
			decimals: 18,
			contractAddress: '0x1F9eB026e549a5f47A6aa834689053117239334A'
		},
		'DOT/USD': {
			decimals: 8,
			contractAddress: '0x1C07AFb8E2B827c5A4739C6d59Ae3A5035f28734'
		},
		'DPI/ETH': {
			decimals: 18,
			contractAddress: '0x029849bbc0b1d93b85a8b6190e979fd38F5760E2'
		},
		'DPI/USD': {
			decimals: 8,
			contractAddress: '0xD2A593BF7594aCE1faD597adb697b5645d5edDB2'
		},
		'ENJ/ETH': {
			decimals: 18,
			contractAddress: '0x24D9aB51950F3d62E9144fdC2f3135DAA6Ce8D1B'
		},
		'EOS/USD': {
			decimals: 8,
			contractAddress: '0x10a43289895eAff840E8d45995BBa89f9115ECEe'
		},
		'ETC/USD': {
			decimals: 8,
			contractAddress: '0xaEA2808407B7319A31A383B6F8B60f04BCa23cE2'
		},
		'ETH/USD': {
			decimals: 8,
			contractAddress: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419'
		},
		'ETH/XDR': {
			decimals: 8,
			contractAddress: '0xb022E2970b3501d8d83eD07912330d178543C1eB'
		},
		'EUR/USD': {
			decimals: 8,
			contractAddress: '0xb49f677943BC038e9857d61E7d053CaA2C1734C1'
		},
		'EURS RESERVES': {
			decimals: 8,
			contractAddress: '0xbcD05A3E0c11f340cCcD9a4Efe05eEB2b33AB67A'
		},
		'FB/USD': {
			decimals: 8,
			contractAddress: '0xCe1051646393087e706288C1B57Fd26446657A7f'
		},
		'FIL/ETH': {
			decimals: 18,
			contractAddress: '0x0606Be69451B1C9861Ac6b3626b99093b713E801'
		},
		'FIL/USD': {
			decimals: 8,
			contractAddress: '0x1A31D42149e82Eb99777f903C08A2E41A00085d3'
		},
		'FNX/USD': {
			decimals: 8,
			contractAddress: '0x80070f7151BdDbbB1361937ad4839317af99AE6c'
		},
		'FRONT/USD': {
			decimals: 8,
			contractAddress: '0xbf86e7B2565eAc3bFD80634176F31bd186566b06'
		},
		'FTM/ETH': {
			decimals: 18,
			contractAddress: '0x2DE7E4a9488488e0058B95854CC2f7955B35dC9b'
		},
		'FTSE/GBP': {
			decimals: 8,
			contractAddress: '0xE23FA0e8dd05D6f66a6e8c98cab2d9AE82A7550c'
		},
		'FTT/ETH': {
			decimals: 18,
			contractAddress: '0xF0985f7E2CaBFf22CecC5a71282a89582c382EFE'
		},
		'FXS/USD': {
			decimals: 8,
			contractAddress: '0x6Ebc52C8C1089be9eB3945C4350B68B8E4C2233f'
		},
		'Fast Gas/Gwei': {
			decimals: 0,
			contractAddress: '0x169E633A2D1E6c10dD91238Ba11c4A708dfEF37C'
		},
		'GBP/USD': {
			decimals: 8,
			contractAddress: '0x5c0Ab2d9b5a7ed9f470386e82BB36A3613cDd4b5'
		},
		'GOOGL/USD': {
			decimals: 8,
			contractAddress: '0x36D39936BeA501755921beB5A382a88179070219'
		},
		'GRT/ETH': {
			decimals: 18,
			contractAddress: '0x17D054eCac33D91F7340645341eFB5DE9009F1C1'
		},
		'HBAR/USD': {
			decimals: 8,
			contractAddress: '0x38C5ae3ee324ee027D88c5117ee58d07c9b4699b'
		},
		'HEGIC/ETH': {
			decimals: 18,
			contractAddress: '0xAf5E8D9Cd9fC85725A83BF23C52f1C39A71588a6'
		},
		'HEGIC/USD': {
			decimals: 8,
			contractAddress: '0xBFC189aC214E6A4a35EBC281ad15669619b75534'
		},
		'HT/USD': {
			decimals: 8,
			contractAddress: '0xE1329B3f6513912CAf589659777b66011AEE5880'
		},
		'HUSD/ETH': {
			decimals: 18,
			contractAddress: '0x1B61BAD1495161bCb6C03DDB0E41622c0270bB1A'
		},
		'INJ/USD': {
			decimals: 8,
			contractAddress: '0xaE2EbE3c4D20cE13cE47cbb49b6d7ee631Cd816e'
		},
		'INR/USD': {
			decimals: 8,
			contractAddress: '0x605D5c2fBCeDb217D7987FC0951B5753069bC360'
		},
		'IOST/USD': {
			decimals: 8,
			contractAddress: '0xd0935838935349401c73a06FCde9d63f719e84E5'
		},
		'IWM/USD': {
			decimals: 8,
			contractAddress: '0xd6Cc0819228622CcbDb5852EDbc060367E91C7a1'
		},
		'JPY/USD': {
			decimals: 8,
			contractAddress: '0xBcE206caE7f0ec07b545EddE332A47C2F75bbeb3'
		},
		'KNC/ETH': {
			decimals: 18,
			contractAddress: '0x656c0544eF4C98A6a98491833A89204Abb045d6b'
		},
		'KNC/USD': {
			decimals: 8,
			contractAddress: '0xf8fF43E991A81e6eC886a3D281A2C6cC19aE70Fc'
		},
		'KP3R/ETH': {
			decimals: 18,
			contractAddress: '0xe7015CCb7E5F788B8c1010FC22343473EaaC3741'
		},
		'KRW/USD': {
			decimals: 8,
			contractAddress: '0x01435677FB11763550905594A16B645847C1d0F3'
		},
		'LDO/ETH': {
			decimals: 18,
			contractAddress: '0x4e844125952D32AcdF339BE976c98E22F6F318dB'
		},
		'LINK/ETH': {
			decimals: 18,
			contractAddress: '0xDC530D9457755926550b59e8ECcdaE7624181557'
		},
		'LINK/USD': {
			decimals: 8,
			contractAddress: '0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c'
		},
		'LON/ETH': {
			decimals: 18,
			contractAddress: '0x13A8F2cC27ccC2761ca1b21d2F3E762445f201CE'
		},
		'LRC/ETH': {
			decimals: 18,
			contractAddress: '0x160AC928A16C93eD4895C2De6f81ECcE9a7eB7b4'
		},
		'LRC/USD': {
			decimals: 8,
			contractAddress: '0xFd33ec6ABAa1Bdc3D9C6C85f1D6299e5a1a5511F'
		},
		'LTC/USD': {
			decimals: 8,
			contractAddress: '0x6AF09DF7563C363B5763b9102712EbeD3b9e859B'
		},
		'MANA/ETH': {
			decimals: 18,
			contractAddress: '0x82A44D92D6c329826dc557c5E1Be6ebeC5D5FeB9'
		},
		'MATIC/USD': {
			decimals: 8,
			contractAddress: '0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676'
		},
		'MKR/ETH': {
			decimals: 18,
			contractAddress: '0x24551a8Fb2A7211A25a17B1481f043A8a8adC7f2'
		},
		'MLN/ETH': {
			decimals: 18,
			contractAddress: '0xDaeA8386611A157B08829ED4997A8A62B557014C'
		},
		'MSFT/USD': {
			decimals: 8,
			contractAddress: '0x021Fb44bfeafA0999C7b07C4791cf4B859C3b431'
		},
		'MTA/ETH': {
			decimals: 18,
			contractAddress: '0x98334b85De2A8b998Ba844c5521e73D68AD69C00'
		},
		'MTA/USD': {
			decimals: 8,
			contractAddress: '0xc751E86208F0F8aF2d5CD0e29716cA7AD98B5eF5'
		},
		'N225/JPY': {
			decimals: 8,
			contractAddress: '0x5c4939a2ab3A2a9f93A518d81d4f8D0Bc6a68980'
		},
		'NFLX/USD': {
			decimals: 8,
			contractAddress: '0x67C2e69c5272B94AF3C90683a9947C39Dc605ddE'
		},
		'NGN/USD': {
			decimals: 8,
			contractAddress: '0x3e59bc23ea3f39e69b5e662B6fC5e7e6D22B6914'
		},
		'NMR/ETH': {
			decimals: 18,
			contractAddress: '0x9cB2A01A7E64992d32A34db7cEea4c919C391f6A'
		},
		'NU/ETH': {
			decimals: 18,
			contractAddress: '0xFd93C391f3a81565DaE1f6A66115C26f36A92d6D'
		},
		'NZD/USD': {
			decimals: 8,
			contractAddress: '0x3977CFc9e4f29C184D4675f4EB8e0013236e5f3e'
		},
		'OCEAN/ETH': {
			decimals: 18,
			contractAddress: '0x9b0FC4bb9981e5333689d69BdBF66351B9861E62'
		},
		'OGN/ETH': {
			decimals: 18,
			contractAddress: '0x2c881B6f3f6B5ff6C975813F87A4dad0b241C15b'
		},
		'OKB/USD': {
			decimals: 8,
			contractAddress: '0x22134617Ae0f6CA8D89451e5Ae091c94f7D743DC'
		},
		'OMG/ETH': {
			decimals: 18,
			contractAddress: '0x57C9aB3e56EE4a83752c181f241120a3DBba06a1'
		},
		'ONT/USD': {
			decimals: 8,
			contractAddress: '0xcDa3708C5c2907FCca52BB3f9d3e4c2028b89319'
		},
		'ORN/ETH': {
			decimals: 18,
			contractAddress: '0xbA9B2a360eb8aBdb677d6d7f27E12De11AA052ef'
		},
		'OXT/USD': {
			decimals: 8,
			contractAddress: '0xd75AAaE4AF0c398ca13e2667Be57AF2ccA8B5de6'
		},
		'Orchid': {
			decimals: 5,
			contractAddress: '0xa175FA75795c6Fb2aFA48B72d22054ee0DeDa4aC'
		},
		'PAX/ETH': {
			decimals: 18,
			contractAddress: '0x3a08ebBaB125224b7b6474384Ee39fBb247D2200'
		},
		'PAX/RESERVES': {
			decimals: 8,
			contractAddress: '0xf482Ed35406933F321f293aC0e4c6c8f59a22fA5'
		},
		'PAXG/ETH': {
			decimals: 18,
			contractAddress: '0x9B97304EA12EFed0FAd976FBeCAad46016bf269e'
		},
		'PAXG/RESERVES': {
			decimals: 8,
			contractAddress: '0x716BB8c60D409e54b8Fb5C4f6aBC50E794DA048a'
		},
		'PERP/ETH': {
			decimals: 18,
			contractAddress: '0x3b41D5571468904D4e53b6a8d93A6BaC43f02dC9'
		},
		'PHP/USD': {
			decimals: 8,
			contractAddress: '0x9481e7ad8BE6BbB22A8B9F7B9fB7588d1df65DF6'
		},
		'PUNDIX/USD': {
			decimals: 8,
			contractAddress: '0x552dDBEf6f5a1316aec3E30Db6afCD433548dbF3'
		},
		'QQQ/USD': {
			decimals: 8,
			contractAddress: '0x6b54e83f44047d2168a195ABA5e9b768762167b5'
		},
		'RAI/ETH': {
			decimals: 18,
			contractAddress: '0x4ad7B025127e89263242aB68F0f9c4E5C033B489'
		},
		'RAMP/USD': {
			decimals: 8,
			contractAddress: '0x4EA6Ec4C1691C62623122B213572b2be5A618C0d'
		},
		'RARI/ETH': {
			decimals: 18,
			contractAddress: '0x2a784368b1D492f458Bf919389F42c18315765F5'
		},
		'RCN/BTC': {
			decimals: 8,
			contractAddress: '0xEa0b3DCa635f4a4E77D9654C5c18836EE771566e'
		},
		'REN/ETH': {
			decimals: 18,
			contractAddress: '0x3147D7203354Dc06D9fd350c7a2437bcA92387a4'
		},
		'REN/USD': {
			decimals: 8,
			contractAddress: '0x0f59666EDE214281e956cb3b2D0d69415AfF4A01'
		},
		'REP/ETH': {
			decimals: 18,
			contractAddress: '0xD4CE430C3b67b3E2F7026D86E7128588629e2455'
		},
		'REP/USD': {
			decimals: 8,
			contractAddress: '0xF9FCC6E1186Acf6529B1c1949453f51B4B6eEE67'
		},
		'RGT/ETH': {
			decimals: 18,
			contractAddress: '0xc16935B445F4BDC172e408433c8f7101bbBbE368'
		},
		'RLC/ETH': {
			decimals: 18,
			contractAddress: '0x4cba1e1fdc738D0fe8DB3ee07728E2Bc4DA676c6'
		},
		'RUB/USD': {
			decimals: 8,
			contractAddress: '0x73A11E47325e3C9b6a48B8ed48Ee0ba89109FB75'
		},
		'RUNE/ETH': {
			decimals: 18,
			contractAddress: '0x875D60C44cfbC38BaA4Eb2dDB76A767dEB91b97e'
		},
		'RUNE/USD': {
			decimals: 8,
			contractAddress: '0x48731cF7e84dc94C5f84577882c14Be11a5B7456'
		},
		'SAND/USD': {
			decimals: 8,
			contractAddress: '0x35E3f7E558C04cE7eEE1629258EcbbA03B36Ec56'
		},
		'SFI/ETH': {
			decimals: 18,
			contractAddress: '0xeA286b2584F79Cd4D322Fe107d9683971c890596'
		},
		'SGD/USD': {
			decimals: 8,
			contractAddress: '0xe25277fF4bbF9081C75Ab0EB13B4A13a721f3E13'
		},
		'SNX/ETH': {
			decimals: 18,
			contractAddress: '0x79291A9d692Df95334B1a0B3B4AE6bC606782f8c'
		},
		'SNX/USD': {
			decimals: 8,
			contractAddress: '0xDC3EA94CD0AC27d9A86C180091e7f78C683d3699'
		},
		'SPY/USD': {
			decimals: 8,
			contractAddress: '0x065B8808087C2d7A3C104E276C80Fe6Fc1B47f1c'
		},
		'SRM/ETH': {
			decimals: 18,
			contractAddress: '0x050c048c9a0CD0e76f166E2539F87ef2acCEC58f'
		},
		'STAKE/ETH': {
			decimals: 18,
			contractAddress: '0xa1FFC11Eaa62d34C3B3272270AEcF9D879773B32'
		},
		'SUSD/ETH': {
			decimals: 18,
			contractAddress: '0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757'
		},
		'SUSHI/ETH': {
			decimals: 18,
			contractAddress: '0xe572CeF69f43c2E488b33924AF04BDacE19079cf'
		},
		'SXP/USD': {
			decimals: 8,
			contractAddress: '0xFb0CfD6c19e25DB4a08D8a204a387cEa48Cc138f'
		},
		'TOMO/USD': {
			decimals: 8,
			contractAddress: '0x3d44925a8E9F9DFd90390E58e92Ec16c996A331b'
		},
		'TRU/USD': {
			decimals: 8,
			contractAddress: '0x26929b85fE284EeAB939831002e1928183a10fb1'
		},
		'TRX/USD': {
			decimals: 8,
			contractAddress: '0xacD0D1A29759CC01E8D925371B72cb2b5610EA25'
		},
		'TRY/USD': {
			decimals: 8,
			contractAddress: '0xB09fC5fD3f11Cf9eb5E1C5Dba43114e3C9f477b5'
		},
		'TSLA/USD': {
			decimals: 8,
			contractAddress: '0x1ceDaaB50936881B3e449e47e40A2cDAF5576A4a'
		},
		'TUSD/ETH': {
			decimals: 18,
			contractAddress: '0x3886BA987236181D98F2401c507Fb8BeA7871dF2'
		},
		'TUSD Reserves': {
			decimals: 8,
			contractAddress: '0x478f4c42b877c697C4b19E396865D4D533EcB6ea'
		},
		'TUSD Supply': {
			decimals: 8,
			contractAddress: '0x807b029DD462D5d9B9DB45dff90D3414013B969e'
		},
		'Total Marketcap/USD': {
			decimals: 8,
			contractAddress: '0xEC8761a0A73c34329CA5B1D3Dc7eD07F30e836e2'
		},
		'UMA/ETH': {
			decimals: 18,
			contractAddress: '0xf817B69EA583CAFF291E287CaE00Ea329d22765C'
		},
		'UNI/ETH': {
			decimals: 18,
			contractAddress: '0xD6aA3D25116d8dA79Ea0246c4826EB951872e02e'
		},
		'UNI/USD': {
			decimals: 8,
			contractAddress: '0x553303d460EE0afB37EdFf9bE42922D8FF63220e'
		},
		'USDC/ETH': {
			decimals: 18,
			contractAddress: '0x986b5E1e1755e3C2440e960477f25201B0a8bbD4'
		},
		'USDC/USD': {
			decimals: 8,
			contractAddress: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6'
		},
		'USDK/USD': {
			decimals: 8,
			contractAddress: '0xfAC81Ea9Dd29D8E9b212acd6edBEb6dE38Cb43Af'
		},
		'USDT/ETH': {
			decimals: 18,
			contractAddress: '0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46'
		},
		'USDT/USD': {
			decimals: 8,
			contractAddress: '0x3E7d1eAB13ad0104d2750B8863b489D65364e32D'
		},
		'UST/ETH': {
			decimals: 18,
			contractAddress: '0xa20623070413d42a5C01Db2c8111640DD7A5A03a'
		},
		'WAVES/USD': {
			decimals: 8,
			contractAddress: '0x9a79fdCd0E326dF6Fa34EA13c05d3106610798E9'
		},
		'WING/USD': {
			decimals: 8,
			contractAddress: '0x134fE0a225Fb8e6683617C13cEB6B3319fB4fb82'
		},
		'WNXM/ETH': {
			decimals: 18,
			contractAddress: '0xe5Dc0A609Ab8bCF15d3f35cFaa1Ff40f521173Ea'
		},
		'WOM/ETH': {
			decimals: 18,
			contractAddress: '0xcEBD2026d3C99F2a7CE028acf372C154aB4638a9'
		},
		'WTI/USD': {
			decimals: 8,
			contractAddress: '0xf3584F4dd3b467e73C2339EfD008665a70A4185c'
		},
		'XAG/USD': {
			decimals: 8,
			contractAddress: '0x379589227b15F1a12195D3f2d90bBc9F31f95235'
		},
		'XAU/USD': {
			decimals: 8,
			contractAddress: '0x214eD9Da11D2fbe465a6fc601a91E62EbEc1a0D6'
		},
		'XHV/USD': {
			decimals: 8,
			contractAddress: '0xeccBeEd9691d8521385259AE596CF00D68429de0'
		},
		'XMR/USD': {
			decimals: 8,
			contractAddress: '0xFA66458Cce7Dd15D8650015c4fce4D278271618F'
		},
		'XRP/USD': {
			decimals: 8,
			contractAddress: '0xCed2660c6Dd1Ffd856A5A82C67f3482d88C50b12'
		},
		'XTZ/USD': {
			decimals: 8,
			contractAddress: '0x5239a625dEb44bF3EeAc2CD5366ba24b8e9DB63F'
		},
		'YFI/ETH': {
			decimals: 18,
			contractAddress: '0x7c5d4F8345e66f68099581Db340cd65B078C41f4'
		},
		'YFI/USD': {
			decimals: 8,
			contractAddress: '0xA027702dbb89fbd58938e4324ac03B58d812b0E1'
		},
		'YFII/ETH': {
			decimals: 18,
			contractAddress: '0xaaB2f6b45B28E962B3aCd1ee4fC88aEdDf557756'
		},
		'ZAR/USD': {
			decimals: 8,
			contractAddress: '0x438F81D95761d7036cd2617295827D9d01Cf593f'
		},
		'ZEC/USD': {
			decimals: 8,
			contractAddress: '0xd54B033D48d0475f19c5fccf7484E8A981848501'
		},
		'ZRX/ETH': {
			decimals: 18,
			contractAddress: '0x2Da4983a622a8498bb1a21FaE9D8F6C664939962'
		},
		'ZRX/USD': {
			decimals: 8,
			contractAddress: '0x2885d15b8Af22648b98B122b22FDF4D2a56c6023'
		},
		'sCEX/USD': {
			decimals: 8,
			contractAddress: '0x283D433435cFCAbf00263beEF6A362b7cc5ed9f2'
		},
		'sDEFI/USD': {
			decimals: 8,
			contractAddress: '0xa8E875F94138B0C5b51d1e1d5dE35bbDdd28EA87'
		},
		'sUSD/USD': {
			decimals: 8,
			contractAddress: '0xad35Bd71b9aFE6e4bDc266B345c198eaDEf9Ad94'
		},
	},
	42: {
		'AAVE/ETH': {
			decimals: 18,
			contractAddress: '0xd04647B7CB523bb9f26730E9B6dE1174db7591Ad'
		},
		'AMPL/ETH': {
			decimals: 18,
			contractAddress: '0x562C092bEb3a6DF77aDf0BB604F52c018E4f2814'
		},
		'AUD/USD': {
			decimals: 8,
			contractAddress: '0x5813A90f826e16dB392abd2aF7966313fc1fd5B8'
		},
		'BAT/ETH': {
			decimals: 18,
			contractAddress: '0x0e4fcEC26c9f85c3D714370c98f43C4E02Fc35Ae'
		},
		'BAT/USD': {
			decimals: 8,
			contractAddress: '0x8e67A0CFfbbF6A346ce87DFe06daE2dc782b3219'
		},
		'BNB/USD': {
			decimals: 8,
			contractAddress: '0x8993ED705cdf5e84D0a3B754b5Ee0e1783fcdF16'
		},
		'BTC/ETH': {
			decimals: 18,
			contractAddress: '0xF7904a295A029a3aBDFFB6F12755974a958C7C25'
		},
		'BTC/USD': {
			decimals: 8,
			contractAddress: '0x6135b13325bfC4B00278B4abC5e20bbce2D6580e'
		},
		'BUSD/ETH': {
			decimals: 18,
			contractAddress: '0xbF7A18ea5DE0501f7559144e702b29c55b055CcB'
		},
		'BZRX/ETH': {
			decimals: 18,
			contractAddress: '0x9aa9da35DC44F93D90436BfE256f465f720c3Ae5'
		},
		'CHF/USD': {
			decimals: 8,
			contractAddress: '0xed0616BeF04D374969f302a34AE4A63882490A8C'
		},
		'COMP/USD': {
			decimals: 8,
			contractAddress: '0xECF93D14d25E02bA2C13698eeDca9aA98348EFb6'
		},
		'CVI': {
			decimals: 18,
			contractAddress: '0x0BD102ef50a6a133B38Bf3Bd3d40cE36cc1aB5A8'
		},
		'DAI/ETH': {
			decimals: 18,
			contractAddress: '0x22B58f1EbEDfCA50feF632bD73368b2FdA96D541'
		},
		'DAI/USD': {
			decimals: 8,
			contractAddress: '0x777A68032a88E5A84678A77Af2CD65A7b3c0775a'
		},
		'ENJ/ETH': {
			decimals: 18,
			contractAddress: '0xfaDbe2ee798889F02d1d39eDaD98Eff4c7fe95D4'
		},
		'ETH/USD': {
			decimals: 8,
			contractAddress: '0x9326BFA02ADD2366b30bacB125260Af641031331'
		},
		'ETH/USDT RSI 4h': {
			decimals: 18,
			contractAddress: '0x10900f50d1bC46b4Ed796C50A4Cc63791CaF7501'
		},
		'EUR/USD': {
			decimals: 8,
			contractAddress: '0x0c15Ab9A0DB086e062194c273CC79f41597Bbf13'
		},
		'Ferrari F12 TDF/USD': {
			decimals: 8,
			contractAddress: '0x22a2D07993A1A18b3b86E56F960fa735b6D6cFD9'
		},
		'GBP/USD': {
			decimals: 8,
			contractAddress: '0x28b0061f44E6A9780224AA61BEc8C3Fcb0d37de9'
		},
		'JPY/USD': {
			decimals: 8,
			contractAddress: '0xD627B1eF3AC23F1d3e576FA6206126F3c1Bd0942'
		},
		'KNC/ETH': {
			decimals: 18,
			contractAddress: '0xb8E8130d244CFd13a75D6B9Aee029B1C33c808A7'
		},
		'KRW/USD': {
			decimals: 8,
			contractAddress: '0x9e465c5499023675051517E9Ee5f4C334D91e369'
		},
		'LINK/ETH': {
			decimals: 18,
			contractAddress: '0x3Af8C569ab77af5230596Acf0E8c2F9351d24C38'
		},
		'LINK/USD': {
			decimals: 8,
			contractAddress: '0x396c5E36DD0a0F5a5D33dae44368D4193f69a1F0'
		},
		'LTC/USD': {
			decimals: 8,
			contractAddress: '0xCeE03CF92C7fFC1Bad8EAA572d69a4b61b6D4640'
		},
		'MANA/ETH': {
			decimals: 18,
			contractAddress: '0x1b93D8E109cfeDcBb3Cc74eD761DE286d5771511'
		},
		'MKR/ETH': {
			decimals: 18,
			contractAddress: '0x0B156192e04bAD92B6C1C13cf8739d14D78D5701'
		},
		'ORN/USDT': {
			decimals: 8,
			contractAddress: '0x66413F734E69C2C41B4902024D0C5C3A86b8EcD2'
		},
		'Oil/USD': {
			decimals: 8,
			contractAddress: '0x48c9FF5bFD7D12e3C511022A6E54fB1c5b8DC3Ea'
		},
		'REN/ETH': {
			decimals: 18,
			contractAddress: '0xF1939BECE7708382b5fb5e559f630CB8B39a10ee'
		},
		'REP/ETH': {
			decimals: 18,
			contractAddress: '0x3A7e6117F2979EFf81855de32819FBba48a63e9e'
		},
		'REP/USD': {
			decimals: 8,
			contractAddress: '0x8f4e77806EFEC092A279AC6A49e129e560B4210E'
		},
		'SNX/ETH': {
			decimals: 18,
			contractAddress: '0xF9A76ae7a1075Fe7d646b06fF05Bd48b9FA5582e'
		},
		'SNX/USD': {
			decimals: 8,
			contractAddress: '0x31f93DA9823d737b7E44bdee0DF389Fe62Fd1AcD'
		},
		'SUSD/ETH': {
			decimals: 8,
			contractAddress: '0xb343e7a1aF578FA35632435243D814e7497622f7'
		},
		'TRX/USD': {
			decimals: 8,
			contractAddress: '0x9477f0E5bfABaf253eacEE3beE3ccF08b46cc79c'
		},
		'TSLA/USD': {
			decimals: 8,
			contractAddress: '0xb31357d152638fd1ae0853d24b9Ea81dF29E3EF2'
		},
		'TUSD/ETH': {
			decimals: 18,
			contractAddress: '0x7aeCF1c19661d12E962b69eBC8f6b2E63a55C660'
		},
		'UNI/ETH': {
			decimals: 18,
			contractAddress: '0x17756515f112429471F86f98D5052aCB6C47f6ee'
		},
		'UNI/USD': {
			decimals: 8,
			contractAddress: '0xDA5904BdBfB4EF12a3955aEcA103F51dc87c7C39'
		},
		'USDC/ETH': {
			decimals: 18,
			contractAddress: '0x64EaC61A2DFda2c3Fa04eED49AA33D021AeC8838'
		},
		'USDC/USD': {
			decimals: 8,
			contractAddress: '0x9211c6b3BF41A10F78539810Cf5c64e1BB78Ec60'
		},
		'USDT/ETH': {
			decimals: 18,
			contractAddress: '0x0bF499444525a23E7Bb61997539725cA2e928138'
		},
		'USDT/USD': {
			decimals: 8,
			contractAddress: '0x2ca5A90D34cA333661083F89D831f757A9A50148'
		},
		'VELO/USD': {
			decimals: 8,
			contractAddress: '0x6d393f929E213D2Ca67A7FA73108A42b884F5f74'
		},
		'XAG/USD': {
			decimals: 8,
			contractAddress: '0x4594051c018Ac096222b5077C3351d523F93a963'
		},
		'XAU/USD': {
			decimals: 8,
			contractAddress: '0xc8fb5684f2707C82f28595dEaC017Bfdf44EE9c5'
		},
		'XRP/USD': {
			decimals: 8,
			contractAddress: '0x3eA2b7e3ed9EA9120c3d6699240d1ff2184AC8b3'
		},
		'XTZ/USD': {
			decimals: 8,
			contractAddress: '0xC6F39246494F25BbCb0A8018796890037Cb5980C'
		},
		'YFI/ETH': {
			decimals: 18,
			contractAddress: '0xC5d1B1DEb2992738C0273408ac43e1e906086B6C'
		},
		'ZRX/ETH': {
			decimals: 18,
			contractAddress: '0xBc3f28Ccc21E9b5856E81E6372aFf57307E2E883'
		},
		'ZRX/USD': {
			decimals: 8,
			contractAddress: '0x24D6B177CF20166cd8F55CaaFe1c745B44F6c203'
		},
		'sCEX/USD': {
			decimals: 8,
			contractAddress: '0xA85646318D20C684f6251097d24A6e74Fe1ED5eB'
		},
		'sDEFI/USD': {
			decimals: 8,
			contractAddress: '0x70179FB2F3A0a5b7FfB36a235599De440B0922ea'
		},
	},
	4: {
		'AUD/USD': {
			decimals: 8,
			contractAddress: '0x21c095d2aDa464A294956eA058077F14F66535af'
		},
		'BAT/USD': {
			decimals: 8,
			contractAddress: '0x031dB56e01f82f20803059331DC6bEe9b17F7fC9'
		},
		'BNB/USD': {
			decimals: 8,
			contractAddress: '0xcf0f51ca2cDAecb464eeE4227f5295F2384F84ED'
		},
		'BTC/ETH': {
			decimals: 18,
			contractAddress: '0x2431452A0010a43878bF198e170F6319Af6d27F4'
		},
		'BTC/USD': {
			decimals: 8,
			contractAddress: '0xECe365B379E1dD183B20fc5f022230C044d51404'
		},
		'BTC IV 1d': {
			decimals: 8,
			contractAddress: '0x696b6Fb2b093df94C428Efa68d6e7849702D9419'
		},
		'BTC IV 1w': {
			decimals: 8,
			contractAddress: '0x1e15C98a7A4cE165777b3cc615BffEeBA947054c'
		},
		'BTC IV 2d': {
			decimals: 8,
			contractAddress: '0x4378815024B852c5D291F7bb8B0862a46ab8d637'
		},
		'BTC IV 2w': {
			decimals: 8,
			contractAddress: '0x2E5fE124e84333F3e04F30EfE057603dcB665945'
		},
		'BTC IV 3w': {
			decimals: 8,
			contractAddress: '0xB58F22d1cacC00507b4346F0C3469B637A0f42B7'
		},
		'BTC IV 4w': {
			decimals: 8,
			contractAddress: '0xeA68a3c16251fD28035e752aBBa4D7eE3015870e'
		},
		'CHF/USD': {
			decimals: 8,
			contractAddress: '0x5e601CF5EF284Bcd12decBDa189479413284E1d2'
		},
		'DAI/ETH': {
			decimals: 18,
			contractAddress: '0x74825DbC8BF76CC4e9494d0ecB210f676Efa001D'
		},
		'DAI/USD': {
			decimals: 8,
			contractAddress: '0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF'
		},
		'ETH/USD': {
			decimals: 8,
			contractAddress: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e'
		},
		'ETH IV 1d': {
			decimals: 8,
			contractAddress: '0x99d837840c374A08C0bF0EE3bc16b84F1a29A640'
		},
		'ETH IV 1w': {
			decimals: 8,
			contractAddress: '0xFbAc690D8e5c2f3a2D2929B1dD78E42AD53f464a'
		},
		'ETH IV 2d': {
			decimals: 8,
			contractAddress: '0xB03755573e8068ef172ba0BD826dc62Fa7Ed32f7'
		},
		'ETH IV 2w': {
			decimals: 8,
			contractAddress: '0x9125759a01d14AeFe7c2426EFD20130B8FEabeBa'
		},
		'ETH IV 3w': {
			decimals: 8,
			contractAddress: '0x0772C3bbF1469313C39ad59214582ecFA1fAB583'
		},
		'ETH IV 4w': {
			decimals: 8,
			contractAddress: '0x727B59d0989d6D1961138122BC9F94f534E82B32'
		},
		'EUR/USD': {
			decimals: 8,
			contractAddress: '0x78F9e60608bF48a1155b4B2A5e31F32318a1d85F'
		},
		'FNX/USD': {
			decimals: 8,
			contractAddress: '0xcf74110A02b1D391B27cE37364ABc3b279B1d9D1'
		},
		'GBP/USD': {
			decimals: 8,
			contractAddress: '0x7B17A813eEC55515Fb8F49F2ef51502bC54DD40F'
		},
		'JPY/USD': {
			decimals: 8,
			contractAddress: '0x3Ae2F46a2D84e3D5590ee6Ee5116B80caF77DeCA'
		},
		'LINK/USD': {
			decimals: 8,
			contractAddress: '0xd8bD0a1cB028a31AA859A21A3758685a95dE4623'
		},
		'LTC/USD': {
			decimals: 8,
			contractAddress: '0x4d38a35C2D87976F334c2d2379b535F1D461D9B4'
		},
		'MktCap/USD': {
			decimals: 8,
			contractAddress: '0x9Dcf949BCA2F4A8a62350E0065d18902eE87Dca3'
		},
		'Oil/USD': {
			decimals: 8,
			contractAddress: '0x6292aA9a6650aE14fbf974E5029f36F95a1848Fd'
		},
		'REP/USD': {
			decimals: 8,
			contractAddress: '0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa'
		},
		'SNX/USD': {
			decimals: 8,
			contractAddress: '0xE96C4407597CD507002dF88ff6E0008AB41266Ee'
		},
		'TRX/USD': {
			decimals: 8,
			contractAddress: '0xb29f616a0d54FF292e997922fFf46012a63E2FAe'
		},
		'USDC/ETH': {
			decimals: 18,
			contractAddress: '0xdCA36F27cbC4E38aE16C4E9f99D39b42337F6dcf'
		},
		'USDC/USD': {
			decimals: 8,
			contractAddress: '0xa24de01df22b63d23Ebc1882a5E3d4ec0d907bFB'
		},
		'XAG/USD': {
			decimals: 8,
			contractAddress: '0x9c1946428f4f159dB4889aA6B218833f467e1BfD'
		},
		'XAU/USD': {
			decimals: 8,
			contractAddress: '0x81570059A0cb83888f1459Ec66Aad1Ac16730243'
		},
		'XFT/USD': {
			decimals: 8,
			contractAddress: '0xab4a352ac35dFE83221220D967Db41ee61A0DeFa'
		},
		'XRP/USD': {
			decimals: 8,
			contractAddress: '0xc3E76f41CAbA4aB38F00c7255d4df663DA02A024'
		},
		'XTZ/USD': {
			decimals: 8,
			contractAddress: '0xf57FCa8B932c43dFe560d3274262b2597BCD2e5A'
		},
		'ZRX/USD': {
			decimals: 8,
			contractAddress: '0xF7Bbe4D7d13d600127B6Aa132f1dCea301e9c8Fc'
		},
		'sCEX/USD': {
			decimals: 8,
			contractAddress: '0x1a602D4928faF0A153A520f58B332f9CAFF320f7'
		},
		'sDEFI/USD': {
			decimals: 8,
			contractAddress: '0x0630521aC362bc7A19a4eE44b57cE72Ea34AD01c'
		},
	},
	56: {
		'AAPL/USD': {
			decimals: 8,
			contractAddress: '0xb7Ed5bE7977d61E83534230f3256C021e0fae0B6'
		},
		'ADA/BNB': {
			decimals: 18,
			contractAddress: '0x2d5Fc41d1365fFe13d03d91E82e04Ca878D69f4B'
		},
		'ADA/USD': {
			decimals: 8,
			contractAddress: '0xa767f745331D267c7751297D982b050c93985627'
		},
		'ALPHA/BNB': {
			decimals: 18,
			contractAddress: '0x7bC032A7C19B1BdCb981D892854d090cfB0f238E'
		},
		'AMZN/USD': {
			decimals: 8,
			contractAddress: '0x51d08ca89d3e8c12535BA8AEd33cDf2557ab5b2a'
		},
		'ATOM/USD': {
			decimals: 8,
			contractAddress: '0xb056B7C804297279A9a673289264c17E6Dc6055d'
		},
		'AUTO/USD': {
			decimals: 8,
			contractAddress: '0x88E71E6520E5aC75f5338F5F0c9DeD9d4f692cDA'
		},
		'BAND/BNB': {
			decimals: 18,
			contractAddress: '0x3334bF7ec892Ca03D1378B51769b7782EAF318C4'
		},
		'BCH/BNB': {
			decimals: 18,
			contractAddress: '0x2a548935a323Bb7329a5E3F1667B979f16Bc890b'
		},
		'BCH/USD': {
			decimals: 8,
			contractAddress: '0x43d80f616DAf0b0B42a928EeD32147dC59027D41'
		},
		'BNB/USD': {
			decimals: 8,
			contractAddress: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE'
		},
		'BTC/ARS': {
			decimals: 8,
			contractAddress: '0x26C31ac71010aF62E6B486D1132E266D6298857D'
		},
		'BTC/BNB': {
			decimals: 18,
			contractAddress: '0x116EeB23384451C78ed366D4f67D5AD44eE771A0'
		},
		'BTC/USD': {
			decimals: 8,
			contractAddress: '0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf'
		},
		'BUSD/BNB': {
			decimals: 18,
			contractAddress: '0x87Ea38c9F24264Ec1Fff41B04ec94a97Caf99941'
		},
		'BUSD/USD': {
			decimals: 8,
			contractAddress: '0xcBb98864Ef56E9042e7d2efef76141f15731B82f'
		},
		'BZRX/USD': {
			decimals: 8,
			contractAddress: '0xFc362828930519f236ad0c8f126B7996562a695A'
		},
		'CAKE/BNB': {
			decimals: 18,
			contractAddress: '0xcB23da9EA243f53194CBc2380A6d4d9bC046161f'
		},
		'CAKE/USD': {
			decimals: 8,
			contractAddress: '0xB6064eD41d4f67e353768aA239cA86f4F73665a1'
		},
		'CFX/USD': {
			decimals: 8,
			contractAddress: '0xe3cA2f3Bad1D8327820f648C759f17162b5383ae'
		},
		'COIN/USD': {
			decimals: 8,
			contractAddress: '0x2d1AB79D059e21aE519d88F978cAF39d74E31AEB'
		},
		'CREAM/BNB': {
			decimals: 18,
			contractAddress: '0x6f55DFAf098a813d87BB4e6392275b502360Bb9D'
		},
		'DAI/BNB': {
			decimals: 18,
			contractAddress: '0x8EC213E7191488C7873cEC6daC8e97cdbAdb7B35'
		},
		'DAI/USD': {
			decimals: 8,
			contractAddress: '0x132d3C0B1D2cEa0BC552588063bdBb210FDeecfA'
		},
		'DF/USD': {
			decimals: 8,
			contractAddress: '0x1b816F5E122eFa230300126F97C018716c4e47F5'
		},
		'DOGE/USD': {
			decimals: 8,
			contractAddress: '0x3AB0A0d137D4F946fBB19eecc6e92E64660231C8'
		},
		'DOT/BNB': {
			decimals: 18,
			contractAddress: '0xBA8683E9c3B1455bE6e18E7768e8cAD95Eb5eD49'
		},
		'DOT/USD': {
			decimals: 8,
			contractAddress: '0xC333eb0086309a16aa7c8308DfD32c8BBA0a2592'
		},
		'EOS/BNB': {
			decimals: 18,
			contractAddress: '0xed93F3764334788f2f6628b30e505fe1fc5d1D7b'
		},
		'EOS/USD': {
			decimals: 8,
			contractAddress: '0xd5508c8Ffdb8F15cE336e629fD4ca9AdB48f50F0'
		},
		'ETH/BNB': {
			decimals: 18,
			contractAddress: '0x63D407F32Aa72E63C7209ce1c2F5dA40b3AaE726'
		},
		'ETH/USD': {
			decimals: 8,
			contractAddress: '0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e'
		},
		'EUR/USD': {
			decimals: 8,
			contractAddress: '0x0bf79F617988C472DcA68ff41eFe1338955b9A80'
		},
		'FIL/USD': {
			decimals: 8,
			contractAddress: '0xE5dbFD9003bFf9dF5feB2f4F445Ca00fb121fb83'
		},
		'GOOGL/USD': {
			decimals: 8,
			contractAddress: '0xeDA73F8acb669274B15A977Cb0cdA57a84F18c2a'
		},
		'JPY/USD': {
			decimals: 8,
			contractAddress: '0x22Db8397a6E77E41471dE256a7803829fDC8bC57'
		},
		'LINA/USD': {
			decimals: 8,
			contractAddress: '0x38393201952f2764E04B290af9df427217D56B41'
		},
		'LINK/BNB': {
			decimals: 18,
			contractAddress: '0xB38722F6A608646a538E882Ee9972D15c86Fc597'
		},
		'LINK/USD': {
			decimals: 8,
			contractAddress: '0xca236E327F629f9Fc2c30A4E95775EbF0B89fac8'
		},
		'LTC/BNB': {
			decimals: 18,
			contractAddress: '0x4e5a43A79f53c0a8e83489648Ea7e429278f8b2D'
		},
		'LTC/USD': {
			decimals: 8,
			contractAddress: '0x74E72F37A8c415c8f1a98Ed42E78Ff997435791D'
		},
		'ONT/USD': {
			decimals: 8,
			contractAddress: '0x887f177CBED2cf555a64e7bF125E1825EB69dB82'
		},
		'PAXG/USD': {
			decimals: 8,
			contractAddress: '0x7F8caD4690A38aC28BDA3D132eF83DB1C17557Df'
		},
		'QQQ/USD': {
			decimals: 8,
			contractAddress: '0x9A41B56b2c24683E2f23BdE15c14BC7c4a58c3c4'
		},
		'RAMP/USD': {
			decimals: 8,
			contractAddress: '0xD1225da5FC21d17CaE526ee4b6464787c6A71b4C'
		},
		'SPY/USD': {
			decimals: 8,
			contractAddress: '0xb24D1DeE5F9a3f761D286B56d2bC44CE1D02DF7e'
		},
		'SXP/USD': {
			decimals: 8,
			contractAddress: '0xE188A9875af525d25334d75F3327863B2b8cd0F1'
		},
		'TRX/USD': {
			decimals: 8,
			contractAddress: '0xF4C5e535756D11994fCBB12Ba8adD0192D9b88be'
		},
		'TSLA/USD': {
			decimals: 8,
			contractAddress: '0xEEA2ae9c074E87596A85ABE698B2Afebc9B57893'
		},
		'TWT/BNB': {
			decimals: 18,
			contractAddress: '0x7E728dFA6bCa9023d9aBeE759fDF56BEAb8aC7aD'
		},
		'UNI/USD': {
			decimals: 8,
			contractAddress: '0xb57f259E7C24e56a1dA00F66b55A5640d9f9E7e4'
		},
		'USDC/BNB': {
			decimals: 18,
			contractAddress: '0x45f86CA2A8BC9EBD757225B19a1A0D7051bE46Db'
		},
		'USDC/USD': {
			decimals: 8,
			contractAddress: '0x51597f405303C4377E36123cBc172b13269EA163'
		},
		'USDT/BNB': {
			decimals: 18,
			contractAddress: '0xD5c40f5144848Bd4EF08a9605d860e727b991513'
		},
		'USDT/USD': {
			decimals: 8,
			contractAddress: '0xB97Ad0E74fa7d920791E90258A6E2085088b4320'
		},
		'VAI/USD': {
			decimals: 8,
			contractAddress: '0x058316f8Bb13aCD442ee7A216C7b60CFB4Ea1B53'
		},
		'WING/USD': {
			decimals: 8,
			contractAddress: '0xf7E7c0ffCB11dAC6eCA1434C67faB9aE000e10a7'
		},
		'WOO/USD': {
			decimals: 8,
			contractAddress: '0x02Bfe714e78E2Ad1bb1C2beE93eC8dc5423B66d4'
		},
		'WTI/USD': {
			decimals: 8,
			contractAddress: '0xb1BED6C1fC1adE2A975F54F24851c7F410e27718'
		},
		'XAG/USD': {
			decimals: 8,
			contractAddress: '0x817326922c909b16944817c207562B25C4dF16aD'
		},
		'XAU/USD': {
			decimals: 8,
			contractAddress: '0x86896fEB19D8A607c3b11f2aF50A0f239Bd71CD0'
		},
		'XRP/BNB': {
			decimals: 18,
			contractAddress: '0x798A65D349B2B5E6645695912880b54dfFd79074'
		},
		'XRP/USD': {
			decimals: 8,
			contractAddress: '0x93A67D414896A280bF8FFB3b389fE3686E014fda'
		},
		'XTZ/BNB': {
			decimals: 18,
			contractAddress: '0x8264d6983B219be65C4D62f1c82B3A2999944cF2'
		},
		'XTZ/USD': {
			decimals: 8,
			contractAddress: '0x9A18137ADCF7b05f033ad26968Ed5a9cf0Bf8E6b'
		},
		'XVS/USD': {
			decimals: 8,
			contractAddress: '0xBF63F430A79D4036A5900C19818aFf1fa710f206'
		},
		'YFI/BNB': {
			decimals: 18,
			contractAddress: '0xF841761481DF19831cCC851A54D8350aE6022583'
		},
		'YFI/USD': {
			decimals: 8,
			contractAddress: '0xD7eAa5Bf3013A96e3d515c055Dbd98DbdC8c620D'
		},
		'YFII/USD': {
			decimals: 8,
			contractAddress: '0xC94580FAaF145B2FD0ab5215031833c98D3B77E4'
		},
	},
	97: {
		'ADA/USD': {
			decimals: 8,
			contractAddress: '0x5e66a1775BbC249b5D51C13d29245522582E671C'
		},
		'BCH/USD': {
			decimals: 8,
			contractAddress: '0x887f177CBED2cf555a64e7bF125E1825EB69dB82'
		},
		'BNB/USD': {
			decimals: 8,
			contractAddress: '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526'
		},
		'BTC/ETH': {
			decimals: 18,
			contractAddress: '0x1a602D4928faF0A153A520f58B332f9CAFF320f7'
		},
		'BTC/USD': {
			decimals: 8,
			contractAddress: '0x5741306c21795FdCBb9b265Ea0255F499DFe515C'
		},
		'BTC 1d IV': {
			decimals: 8,
			contractAddress: '0x86Be1a485Cdce02157A525dFc1c09f355a167075'
		},
		'BUSD/ETH': {
			decimals: 18,
			contractAddress: '0x5ea7D6A33D3655F661C298ac8086708148883c34'
		},
		'BUSD/USD': {
			decimals: 8,
			contractAddress: '0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa'
		},
		'DAI/BNB': {
			decimals: 18,
			contractAddress: '0x0630521aC362bc7A19a4eE44b57cE72Ea34AD01c'
		},
		'DAI/USD': {
			decimals: 8,
			contractAddress: '0xE4eE17114774713d2De0eC0f035d4F7665fc025D'
		},
		'DOGE/USD': {
			decimals: 8,
			contractAddress: '0x963D5e7f285Cc84ed566C486c3c1bC911291be38'
		},
		'DOT/USD': {
			decimals: 8,
			contractAddress: '0xEA8731FD0685DB8AeAde9EcAE90C4fdf1d8164ed'
		},
		'ETH/USD': {
			decimals: 8,
			contractAddress: '0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7'
		},
		'FIL/USD': {
			decimals: 8,
			contractAddress: '0x17308A18d4a50377A4E1C37baaD424360025C74D'
		},
		'LINK/USD': {
			decimals: 8,
			contractAddress: '0x1B329402Cb1825C6F30A0d92aB9E2862BE47333f'
		},
		'LTC/USD': {
			decimals: 8,
			contractAddress: '0x9Dcf949BCA2F4A8a62350E0065d18902eE87Dca3'
		},
		'SXP/USD': {
			decimals: 8,
			contractAddress: '0x678AC35ACbcE272651874E782DB5343F9B8a7D66'
		},
		'USDC/USD': {
			decimals: 8,
			contractAddress: '0x90c069C4538adAc136E051052E14c1cD799C41B7'
		},
		'USDT/USD': {
			decimals: 8,
			contractAddress: '0xEca2605f0BCF2BA5966372C99837b1F182d3D620'
		},
		'VAI/USD': {
			decimals: 8,
			contractAddress: '0xdb398f7B5927b92ec52C0Ae5D3090DB147eAedA5'
		},
		'XRP/USD': {
			decimals: 8,
			contractAddress: '0x4046332373C24Aed1dC8bAd489A04E187833B28d'
		},
		'XVS/USD': {
			decimals: 8,
			contractAddress: '0xCfA786C17d6739CBC702693F23cA4417B5945491'
		},
	},
	137: {
		'AAVE/ETH': {
			decimals: 18,
			contractAddress: '0xbE23a3AA13038CfC28aFd0ECe4FdE379fE7fBfc4'
		},
		'AGI/USD': {
			decimals: 8,
			contractAddress: '0x29e5BfDe98498CaA5a8ddD73E94E47104C3A6c71'
		},
		'BTC/USD': {
			decimals: 8,
			contractAddress: '0xc907E116054Ad103354f2D350FD2514433D57F6f'
		},
		'DAI/ETH': {
			decimals: 18,
			contractAddress: '0xFC539A559e170f848323e19dfD66007520510085'
		},
		'DAI/USD': {
			decimals: 8,
			contractAddress: '0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D'
		},
		'DOT/USD': {
			decimals: 8,
			contractAddress: '0xacb51F1a83922632ca02B25a8164c10748001BdE'
		},
		'ETH/USD': {
			decimals: 8,
			contractAddress: '0xF9680D99D6C9589e2a93a78A04A279e509205945'
		},
		'LINK/ETH': {
			decimals: 18,
			contractAddress: '0xb77fa460604b9C6435A235D057F7D319AC83cb53'
		},
		'LINK/USD': {
			decimals: 8,
			contractAddress: '0xd9FFdb71EbE7496cC440152d43986Aae0AB76665'
		},
		'MATIC/ETH': {
			decimals: 18,
			contractAddress: '0x327e23A4855b6F663a28c5161541d69Af8973302'
		},
		'MATIC/USD': {
			decimals: 8,
			contractAddress: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0'
		},
		'SNX/USD': {
			decimals: 8,
			contractAddress: '0xbF90A5D9B6EE9019028dbFc2a9E50056d5252894'
		},
		'USDC/ETH': {
			decimals: 18,
			contractAddress: '0xefb7e6be8356cCc6827799B6A7348eE674A80EaE'
		},
		'USDC/USD': {
			decimals: 8,
			contractAddress: '0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7'
		},
		'USDT/ETH': {
			decimals: 18,
			contractAddress: '0xf9d5AAC6E5572AEFa6bd64108ff86a222F69B64d'
		},
		'USDT/USD': {
			decimals: 8,
			contractAddress: '0x0A6513e40db6EB1b165753AD52E80663aeA50545'
		},
		'WBTC/ETH': {
			decimals: 18,
			contractAddress: '0xA338e0492B2F944E9F8C0653D3AD1484f2657a37'
		},
		'WBTC/USD': {
			decimals: 8,
			contractAddress: '0xDE31F8bFBD8c84b5360CFACCa3539B938dd78ae6'
		},
	},
	80001: {
		'DAI/USD': {
			decimals: 8,
			contractAddress: '0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046'
		},
		'ETH/USD': {
			decimals: 8,
			contractAddress: '0x0715A7794a1dc8e42615F059dD6e406A6594651A'
		},
		'MATIC/USD': {
			decimals: 8,
			contractAddress: '0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada'
		},
		'USDC/USD': {
			decimals: 8,
			contractAddress: '0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0'
		},
		'USDT/USD': {
			decimals: 8,
			contractAddress: '0x92C09849638959196E976289418e5973CC96d645'
		},
	},
	100: {
		'1INCH/USD': {
			decimals: 8,
			contractAddress: '0xFDF9EB5fafc11Efa65f6FD144898da39a7920Ae8'
		},
		'AAVE/USD': {
			decimals: 8,
			contractAddress: '0x2b481Dc923Aa050E009113Dca8dcb0daB4B68cDF'
		},
		'ALPHA/USD': {
			decimals: 8,
			contractAddress: '0x7969b8018928F3d9faaE9AC71744ed2C1486536F'
		},
		'BAL/USD': {
			decimals: 8,
			contractAddress: '0x1b723C855F7D2c2785F99486973271355e782d77'
		},
		'BTC/USD': {
			decimals: 8,
			contractAddress: '0x6C1d7e76EF7304a40e8456ce883BC56d3dEA3F7d'
		},
		'COMP/USD': {
			decimals: 8,
			contractAddress: '0xBa95Bc8418Ebcdf8a690924E1d4aD5292139F2EA'
		},
		'CREAM/USD': {
			decimals: 8,
			contractAddress: '0x3b681e9BF56eFe4b2a14196826230A5843fFF758'
		},
		'CRV/USD': {
			decimals: 8,
			contractAddress: '0xC77B83ac3Dd2a761073bD0f281f7b880B2DDDe18'
		},
		'DAI/USD': {
			decimals: 8,
			contractAddress: '0x678df3415fc31947dA4324eC63212874be5a82f8'
		},
		'DOT/USD': {
			decimals: 8,
			contractAddress: '0x3c30c5c415B2410326297F0f65f5Cbb32f3aefCc'
		},
		'DPI/USD': {
			decimals: 8,
			contractAddress: '0x53B1b13E7a5C0DE9A2BeFa1085Ec364BB27e439f'
		},
		'ETH/USD': {
			decimals: 8,
			contractAddress: '0xa767f745331D267c7751297D982b050c93985627'
		},
		'GRT/USD': {
			decimals: 8,
			contractAddress: '0xeBbd67a84e33791F1bcFde74CDc22a71e332e2F1'
		},
		'LINK/USD': {
			decimals: 8,
			contractAddress: '0xed322A5ac55BAE091190dFf9066760b86751947B'
		},
		'MKR/USD': {
			decimals: 8,
			contractAddress: '0x51e4024255d0cBd1F4C79AEe6BDB6565Df2C5d1b'
		},
		'PERP/USD': {
			decimals: 8,
			contractAddress: '0x76e76F7E73F3BD42E3c2b4282B50b36E78130B4A'
		},
		'REN/USD': {
			decimals: 8,
			contractAddress: '0x27d4D36968a2BD1Cc3406D99cB1DF50561dBf2a4'
		},
		'RUNE/USD': {
			decimals: 8,
			contractAddress: '0x93e3510d9AF4cBac3Ff0EeD3bddb0f52cCE0Ef15'
		},
		'SNX/USD': {
			decimals: 8,
			contractAddress: '0x3b84d6e6976D5826500572600eB44f9f1753827b'
		},
		'SUSHI/USD': {
			decimals: 8,
			contractAddress: '0xC0a6Bf8d5D408B091D022C3C0653d4056D4B9c01'
		},
		'UNI/USD': {
			decimals: 8,
			contractAddress: '0xd98735d78266c62277Bb4dBf3e3bCdd3694782F4'
		},
		'USDC/USD': {
			decimals: 8,
			contractAddress: '0x26C31ac71010aF62E6B486D1132E266D6298857D'
		},
		'XAU/USD': {
			decimals: 8,
			contractAddress: '0x4a5AB0F60d12a4420d36D3eD9A1F77d8c47EB94c'
		},
		'YFI/USD': {
			decimals: 8,
			contractAddress: '0x14030d5a0C9e63D9606C6f2c8771Fc95b34b07e0'
		},
	},
	128: {
		'AAVE/USD': {
			decimals: 8,
			contractAddress: '0x8a054991B803F6a6958Ba9695Cc8D366C8a30a69'
		},
		'BAGS/USD': {
			decimals: 8,
			contractAddress: '0x9A1b55Ff9b577aFF279F3cB0175Ab3De87bA38e5'
		},
		'BCH/USD': {
			decimals: 8,
			contractAddress: '0x98b666722D9Def641D8D4836c7cA3c38317B6B98'
		},
		'BTC/USD': {
			decimals: 8,
			contractAddress: '0xD5c40f5144848Bd4EF08a9605d860e727b991513'
		},
		'COMP/USD': {
			decimals: 8,
			contractAddress: '0x13ae1F09038d273d5F094D95fFeA122Ef2190De4'
		},
		'DOT/USD': {
			decimals: 8,
			contractAddress: '0x0A7b23E981F16a429C8710C82f5fa5d01453A259'
		},
		'ETH/USD': {
			decimals: 8,
			contractAddress: '0x5Fa530068e0F5046479c588775c157930EF0Dff0'
		},
		'EUR/USD': {
			decimals: 8,
			contractAddress: '0x9bF18dd428F39453248B3Fa5723fabC4f0df0b6f'
		},
		'FIL/USD': {
			decimals: 8,
			contractAddress: '0x4d8869eCF1F8C78C0bd2439c4BcAE50AC8420bC4'
		},
		'FILDA/USD': {
			decimals: 8,
			contractAddress: '0xF921738dd80054Abe6c4cfCa318B9e0bE013c86D'
		},
		'HT/USD': {
			decimals: 8,
			contractAddress: '0x8EC213E7191488C7873cEC6daC8e97cdbAdb7B35'
		},
		'HUSD/USD': {
			decimals: 8,
			contractAddress: '0x45f86CA2A8BC9EBD757225B19a1A0D7051bE46Db'
		},
		'LTC/USD': {
			decimals: 8,
			contractAddress: '0x87Ea38c9F24264Ec1Fff41B04ec94a97Caf99941'
		},
		'MDX/USD': {
			decimals: 8,
			contractAddress: '0xaC4600b8F42317eAF056Cceb06cFf987c294840B'
		},
		'SNX/USD': {
			decimals: 8,
			contractAddress: '0x1797a410485FeD6B05d5b39A475ddB9C33898ee8'
		},
		'UNI/USD': {
			decimals: 8,
			contractAddress: '0x1E22E1eD4a96B4529D78cd4Bac55313809deF016'
		},
		'USDT/USD': {
			decimals: 8,
			contractAddress: '0xF0D3585D8dC9f1D1D1a7dd02b48C2630d9DD78eD'
		},
		'WTI/USD': {
			decimals: 8,
			contractAddress: '0xe9d01939688ab022B074Bc6A727f42400C43C4D1'
		},
		'XAG/USD': {
			decimals: 8,
			contractAddress: '0x116EeB23384451C78ed366D4f67D5AD44eE771A0'
		},
		'XAU/USD': {
			decimals: 8,
			contractAddress: '0x41e754c5D37b6D259f57d7fc9daEB118fa479b0b'
		},
		'YFII/USD': {
			decimals: 8,
			contractAddress: '0xf64EbB7635c8ed885d82fD87544eD2041dEEd8F8'
		},
	}
}

// https://docs.chain.link/docs/get-the-latest-price
const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]


export const getChainlinkPriceFeed = async (
	publicClient: Ethereum.PublicClient,
	network: Ethereum.Network,
	quoteAsset: TickerSymbol,
	baseAsset: QuoteCurrency,
) => {
	const assetPair: AssetPair = `${quoteAsset}/${baseAsset}`

	const contractInfo: PriceFeedContractInfo = CHAINLINK_CONTRACTS[network.chainId]?.[assetPair]

	if(!contractInfo)
		throw new Error(`Chainlink price feed for ${assetPair} isn't available on ${network.name} (chain ID ${network.chainId}).`)

	const [roundId, answer, startedAt, updatedAt, answeredInRound] = await publicClient.readContract({
		address: contractInfo.contractAddress,
		abi: aggregatorV3InterfaceABI,
		functionName: 'latestRoundData',
	}) as bigint[]

	return {
		contractAddress: contractInfo.contractAddress,
		price: formatUnits(answer, contractInfo.decimals),
		updatedAt: new Date(Number(updatedAt) * 1000)
	}
}
