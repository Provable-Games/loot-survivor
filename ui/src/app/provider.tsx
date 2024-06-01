"use client";
import React from "react";
import {
  Connector,
  StarknetConfig,
  alchemyProvider,
  blastProvider,
  starkscan,
  jsonRpcProvider,
} from "@starknet-react/core";
import { goerli, mainnet, sepolia } from "@starknet-react/chains";
import { Chain } from "@starknet-react/chains";
import CartridgeConnector from "@cartridge/connector";

function rpc(_chain: Chain) {
  return {
    nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
  };
}

const cartridgeConnectors = [
  new CartridgeConnector(
    [
      {
        target: process.env.NEXT_PUBLIC_GAME_ADDRESS!,
        method: "new_game",
      },
      {
        target: process.env.NEXT_PUBLIC_GAME_ADDRESS!,
        method: "explore",
      },
      {
        target: process.env.NEXT_PUBLIC_GAME_ADDRESS!,
        method: "attack",
      },
      {
        target: process.env.NEXT_PUBLIC_GAME_ADDRESS!,
        method: "flee",
      },
      {
        target: process.env.NEXT_PUBLIC_GAME_ADDRESS!,
        method: "equip",
      },
      {
        target: process.env.NEXT_PUBLIC_GAME_ADDRESS!,
        method: "drop",
      },
      {
        target: process.env.NEXT_PUBLIC_GAME_ADDRESS!,
        method: "upgrade",
      },
      {
        target: process.env.NEXT_PUBLIC_LORDS_ADDRESS!,
        method: "approve",
      },
    ],
    {
      theme: {
        colors: {
          primary: "#0ad3ff",
          secondary: "#78ffd6",
        },
      },
    }
  ) as never as Connector,
];

export function StarknetProvider({
  connectors,
  children,
}: {
  connectors: Connector[];
  children: React.ReactNode;
}) {
  const apiKey = process.env.NEXT_PUBLIC_RPC_API_KEY!;
  const onMainnet = process.env.NEXT_PUBLIC_NETWORK === "mainnet";
  const onSepolia = process.env.NEXT_PUBLIC_NETWORK === "sepolia";
  const provider = onMainnet
    ? alchemyProvider({ apiKey })
    : blastProvider({ apiKey });
  const chains = onMainnet ? [mainnet] : onSepolia ? [sepolia] : [goerli];
  return (
    <StarknetConfig
      autoConnect
      chains={[sepolia]}
      connectors={cartridgeConnectors}
      explorer={starkscan}
      provider={jsonRpcProvider({ rpc })}
    >
      {children}
    </StarknetConfig>
  );
}
