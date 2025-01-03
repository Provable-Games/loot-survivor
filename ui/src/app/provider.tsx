"use client";
import { cartridgeConnector } from "@/app/lib/connectors";
import { Chain, mainnet, sepolia } from "@starknet-react/chains";
import {
  jsonRpcProvider,
  StarknetConfig,
  starkscan,
  useInjectedConnectors,
} from "@starknet-react/core";
import React from "react";
import { Network } from "./hooks/useUIStore";
import { networkConfig } from "./lib/networkConfig";

export function StarknetProvider({
  children,
  network,
}: {
  children: React.ReactNode;
  network: Network;
}) {
  function rpc(_chain: Chain) {
    return {
      nodeUrl: networkConfig[network!].rpcUrl!,
    };
  }

  const { connectors } = useInjectedConnectors({
    // Randomize the order of the connectors.
    order: "random",
  });

  return (
    <StarknetConfig
      autoConnect={
        network === "mainnet" || network === "sepolia" ? true : false
      }
      chains={[network === "mainnet" ? mainnet : sepolia]}
      connectors={[
        ...connectors,
        cartridgeConnector(
          networkConfig[network!].gameAddress,
          networkConfig[network!].lordsAddress,
          networkConfig[network!].ethAddress,
          networkConfig[network!].tournamentAddress,
          networkConfig[network!].rpcUrl
        ),
      ]}
      explorer={starkscan}
      provider={jsonRpcProvider({ rpc })}
    >
      {children}
    </StarknetConfig>
  );
}
