"use client";

import ControllerConnector from "@cartridge/connector/controller";
import { Chain, mainnet, sepolia } from "@starknet-react/chains";
import {
  Connector,
  StarknetConfig,
  jsonRpcProvider,
  starkscan,
  useInjectedConnectors,
} from "@starknet-react/core";
import React from "react";
import { constants } from "starknet";
import { Network } from "./hooks/useUIStore";
import { networkConfig } from "./lib/networkConfig";

const controllerConnector = new ControllerConnector({
  chains: [{ rpcUrl: networkConfig["mainnet"].rpcUrl }],
  defaultChainId: constants.StarknetChainId.SN_MAIN,
  preset: "loot-survivor",
  colorMode: "dark",
  slot: "ls-tournament-tokens",
  tokens: {
    erc20: [networkConfig["mainnet"].lordsAddress],
  },
}) as never as Connector;

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
      connectors={[...connectors, controllerConnector]}
      explorer={starkscan}
      provider={jsonRpcProvider({ rpc })}
    >
      {children}
    </StarknetConfig>
  );
}
