import React, { useCallback, useEffect, useState } from "react";
import { Link, graphql } from "gatsby"
import { Account} from 'eth-components/ant';

import {
  useBalance,
  useContractLoader,
  useContractReader,
  useEventListener,
  useExchangePrice,
  useGasPrice,
  useOnBlock,
  useUserProviderAndSigner,
} from 'eth-hooks';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { INFURA_ID, NETWORK, NETWORKS } from "../constants";
  
const { ethers } = require("ethers");

const targetNetwork = NETWORKS.ropsten; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl;
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;

const localProvider = new ethers.providers.StaticJsonRpcProvider(localProviderUrlFromEnv);

function App(){

    const mainnetProvider = new ethers.providers.StaticJsonRpcProvider("https://rpc.scaffoldeth.io:48544");
    const [injectedProvider, setInjectedProvider] = useState();
    const [address, setAddress] = useState();
    const userProviderAndSigner = useUserProviderAndSigner(injectedProvider, localProvider);
    const userSigner = userProviderAndSigner.signer;
    const price = useExchangePrice(targetNetwork, mainnetProvider);
    const gasPrice = useGasPrice(targetNetwork, "fast");

    const web3Modal = new Web3Modal({
        // network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider, // required
            options: {
              infuraId: INFURA_ID,
            },
          },
        },
      });

    // const logoutOfWeb3Modal = async () => {
    //     await web3Modal.clearCachedProvider();
    //     setTimeout(() => {
    //         window.location.reload();
    //     }, 1);
    // };

    // const loadWeb3Modal = useCallback(async () => {
    //     const provider = await web3Modal.connect();
    //     setInjectedProvider(new ethers.providers.Web3Provider(provider));
    
    //     provider.on("chainChanged", chainId => {
    //     console.log(`chain changed to ${chainId}! updating providers`);
    //     setInjectedProvider(new ethers.providers.Web3Provider(provider));
    //     });
    
    //     provider.on("accountsChanged", () => {
    //     console.log(`account changed!`);
    //     setInjectedProvider(new ethers.providers.Web3Provider(provider));
    //     });
    
    //     // Subscribe to session disconnection
    //     provider.on("disconnect", (code, reason) => {
    //     console.log(code, reason);
    //     logoutOfWeb3Modal();
    //     });
    // }, [setInjectedProvider]);

    return (    
        <div style={{ position: "fixed", textAlign: "right", right: 0, top: 0, padding: 10 }}>
        {/* <Account
        address={address}
        // localProvider={localProvider}
        userSigner={userSigner}
        mainnetProvider={mainnetProvider}
        price={price}
        web3Modal={web3Modal}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
        // blockExplorer={blockExplorer}
        /> */}
    </div>);

};

export default App;
  