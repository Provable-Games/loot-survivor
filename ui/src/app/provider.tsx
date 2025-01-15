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
  policies: {
    contracts: {
      ["0x12"]: {
        methods: [
          {
            name: "New Game",
            entrypoint: "new_game",
            description: "Starts a new Loot Survivor game.",
          },
          {
            name: "Explore",
            entrypoint: "explore",
            description: "Explore the dungeon.",
          },
          {
            name: "Attack",
            entrypoint: "attack",
            description: "Attack the beast.",
          },
          {
            name: "Flee",
            entrypoint: "flee",
            description: "Flee the beast.",
          },
          {
            name: "Equip",
            entrypoint: "equip",
            description: "Equip a LOOT item.",
          },
          {
            name: "Drop",
            entrypoint: "drop",
            description: "Drop a LOOT item.",
          },
          {
            name: "Upgrade",
            entrypoint: "upgrade",
            description: "Upgrade Adventurer.",
          },
          {
            name: "Transfer",
            entrypoint: "transfer_from",
            description: "Transfer an Adventurer.",
          },
        ],
      },
      ["0x23"]: {
        methods: [
          {
            name: "Enter Tournament",
            entrypoint: "enter_tournament",
            description: "Enter a tournament.",
          },
          {
            name: "Start Tournament",
            entrypoint: "start_tournament",
            description: "Start a tournament.",
          },
        ],
      },
    },
  },
  chains: [{ rpcUrl: "https://api.cartridge.gg/x/starknet/mainnet" }],
  defaultChainId: constants.StarknetChainId.SN_MAIN,
  theme: "loot-survivor",
  colorMode: "dark",
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

  const controllerConnector = new ControllerConnector({
    policies: {
      contracts: {
        [networkConfig[network!].gameAddress]: {
          methods: [
            {
              name: "New Game",
              entrypoint: "new_game",
              description: "Starts a new Loot Survivor game.",
            },
            {
              name: "Explore",
              entrypoint: "explore",
              description: "Explore the dungeon.",
            },
            {
              name: "Attack",
              entrypoint: "attack",
              description: "Attack the beast.",
            },
            {
              name: "Flee",
              entrypoint: "flee",
              description: "Flee the beast.",
            },
            {
              name: "Equip",
              entrypoint: "equip",
              description: "Equip a LOOT item.",
            },
            {
              name: "Drop",
              entrypoint: "drop",
              description: "Drop a LOOT item.",
            },
            {
              name: "Upgrade",
              entrypoint: "upgrade",
              description: "Upgrade Adventurer.",
            },
            {
              name: "Transfer",
              entrypoint: "transfer_from",
              description: "Transfer an Adventurer.",
            },
          ],
        },
        [networkConfig[network!].tournamentAddress]: {
          methods: [
            {
              name: "Enter Tournament",
              entrypoint: "enter_tournament",
              description: "Enter a tournament.",
            },
            {
              name: "Start Tournament",
              entrypoint: "start_tournament",
              description: "Start a tournament.",
            },
          ],
        },
      },
    },
    chains: [{ rpcUrl: networkConfig[network!].rpcUrl }],
    defaultChainId: constants.StarknetChainId.SN_MAIN,
    theme: "loot-survivor",
    colorMode: "dark",
    tokens: {
      erc20: [networkConfig[network!].lordsAddress],
    },
  }) as never as Connector;

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
