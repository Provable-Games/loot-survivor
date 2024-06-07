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
import { networkConfig } from "./lib/networkConfig";
import useUIStore from "./hooks/useUIStore";
import Home from "@/app/page";

function rpc(_chain: Chain) {
  const network = useUIStore((state) => state.network);
  return {
    nodeUrl: networkConfig[network!].rpcUrl,
  };
}

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  // const onMainnet = useUIStore((state) => state.onMainnet);
  // const onSepolia = useUIStore((state) => state.onSepolia);
  // const onKatana = useUIStore((state) => state.onKatana);
  // const chains = onMainnet ? [mainnet] : onSepolia ? [sepolia] : [goerli];
  const network = useUIStore((state) => state.network);
  console.log(network);
  return (
    <StarknetConfig
      autoConnect
      chains={[sepolia]}
      connectors={connectors(
        networkConfig[network!].gameAddress,
        networkConfig[network!].lordsAddress
      )}
      explorer={starkscan}
      provider={jsonRpcProvider({ rpc })}
    >
      {children}
    </StarknetConfig>
  );
}
