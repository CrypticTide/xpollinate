import React, { useCallback, useEffect, useState } from 'react';

export const NETWORKS = [
  {
    assetId: '0x0000000000000000000000000000000000000000',
    chainName: 'xDai Chain',
    chainId: 100,
    assets: {
      DAI: '0x0000000000000000000000000000000000000000',
      USDC: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
      USDT: '0x4ECaBa5870353805a9F068101A40E0f32ed605C6',
    },
  },
  {
    assetId: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    chainName: 'Matic Mainnet',
    chainId: 137,
    assets: {
      DAI: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    },
  },
  {
    assetId: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
    chainName: 'Binance Smart Chain Mainnet',
    chainId: 56,
    assets: {
      DAI: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
      USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      USDT: '0x55d398326f99059fF775485246999027B3197955',
    },
  },
  // {
  //   assetId: '0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047',
  //   chainName: 'Huobi ECO Chain Mainnet',
  //   chainId: 128,
  //   assetName: 'HUSD',
  // },
];


export const ChainContext = React.createContext({
  receiverChain: NETWORKS[1],
  setReceiverChain: () => {},
});
