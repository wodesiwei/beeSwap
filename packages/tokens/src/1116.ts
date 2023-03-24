import { ChainId, ERC20Token, WBNB, WETH9 } from '@pancakeswap/sdk'
import { BUSD_TESTNET, CAKE_TESTNET } from './common'

export const coreTokens = {
  wcore: WETH9[ChainId.CORE],
  usdc: new ERC20Token(ChainId.CORE, '0xCA8eB2dec4Fe3a5abbFDc017dE48E461A936623D', 6, 'USDC', 'Core Bridge USD Coin'),
  weth: new ERC20Token(
    ChainId.CORE,
    '0xeAB3aC417c4d6dF6b143346a46fEe1B847B50296',
    18,
    'WETH',
    'Core Bridge Wrapped Ether',
  ),
  usdt: new ERC20Token(ChainId.CORE, '0x900101d06A7426441Ae63e9AB3B9b0F63Be145F1', 6, 'USDT', 'Core Bridge Tether USD'),
}
