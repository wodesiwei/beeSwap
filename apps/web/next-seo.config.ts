import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | BeeSwap',
  defaultTitle: 'BeeSwap',
  description:
    'Cheaper and faster than Uniswap? Discover BeeSwap, the leading DEX on CORE Smart Chain (CORE) with the best farms in DeFi and a lottery for Bee.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@PancakeSwap',
    site: '@PancakeSwap',
  },
  openGraph: {
    title: 'BeeSwap - A next evolution DeFi exchange on CORE Smart Chain (CORE)',
    // description:
    //   'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust.',
        //  'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings(new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust.'
    // images: [{ url: 'https://assets.pancakeswap.finance/web/og/hero.jpg' }],
  },
}
