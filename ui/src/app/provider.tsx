"use client";
import React from "react";
import {
  StarknetConfig,
  starkscan,
  jsonRpcProvider,
} from "@starknet-react/core";
import { sepolia } from "@starknet-react/chains";
import { Chain } from "@starknet-react/chains";
import { connectors } from "@/app/lib/connectors";

function rpc(_chain: Chain) {
  return {
    nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
  };
}

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  // const onMainnet = process.env.NEXT_PUBLIC_NETWORK === "mainnet";
  // const onSepolia = process.env.NEXT_PUBLIC_NETWORK === "sepolia";
  // const chains = onMainnet ? [mainnet] : onSepolia ? [sepolia] : [goerli];
  return (
    <StarknetConfig
      autoConnect
      chains={[sepolia]}
      connectors={connectors}
      explorer={starkscan}
      provider={jsonRpcProvider({ rpc })}
    >
      {children}
    </StarknetConfig>
  );
}
