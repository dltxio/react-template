import * as React from "react";
import ReactDOM from "react-dom/client";
import { providers } from "ethers";

// Imports
import { Connector, Provider, chain, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";
import "./App.css";

import { App } from "./App";

// Get environment variables
const alchemy = import.meta.env.VITE_ALCHEMY_ID as string;
const etherscan = import.meta.env.VITE_ETHERSCAN_API_KEY as string;
const infuraId = import.meta.env.VITE_INFURA_ID as string;

// Pick chains
const chains = defaultChains;
const defaultChain = chain.rinkeby; // Change to mainnet for production

// Set up connectors
type ConnectorsConfig = { chainId?: number };
const connectors = ({ chainId }: ConnectorsConfig) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    defaultChain.rpcUrls[0];
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true
      }
    }),
    new WalletLinkConnector({
      options: {
        appName: "DLTx",
        jsonRpcUrl: `${rpcUrl}/${infuraId}`
      }
    })
  ];
};

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector };
const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId);

// Set up providers
const provider = ({ chainId }: ProviderConfig) =>
  providers.getDefaultProvider(
    isChainSupported(chainId) ? chainId : defaultChain.id,
    {
      alchemy,
      etherscan,
      infuraId
    }
  );
const webSocketProvider = ({ chainId }: ConnectorsConfig) =>
  isChainSupported(chainId)
    ? new providers.InfuraWebSocketProvider(chainId, infuraId)
    : undefined;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider
      autoConnect
      connectors={connectors}
      provider={provider}
      webSocketProvider={webSocketProvider}
    >
      <App />
    </Provider>
  </React.StrictMode>
);
