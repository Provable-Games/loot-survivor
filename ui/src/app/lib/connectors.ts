import ControllerConnector from "@cartridge/connector/controller";
import { Connector } from "@starknet-react/core";
import { constants } from "starknet";

export const checkArcadeConnector = (connector?: Connector) => {
  return typeof connector?.id === "string" && connector?.id.includes("0x");
};

export const getArcadeConnectors = (connectors: Connector[]) => {
  return connectors.filter(
    (connector) =>
      typeof connector.id === "string" && connector.id.includes("0x")
  );
};

export const getWalletConnectors = (connectors: Connector[]) =>
  connectors.filter((connector) => connector.id !== "controller");

export const checkCartridgeConnector = (connector?: Connector) => {
  return connector?.id === "controller";
};

export const providerInterfaceCamel = (provider: string) => {
  // check provider, braavos interface is camel, argent is snake
  if (provider === "braavos") {
    return "1";
  } else {
    return "0";
  }
};

// export function argentWebWalletUrl() {
//   switch (process.env.NEXT_PUBLIC_NETWORK) {
//     case "goerli":
//       return "https://web.hydrogen.argent47.net";
//     case "mainnet":
//       return "https://web.argent.xyz/";
//     default:
//       return "https://web.hydrogen.argent47.net";
//   }
// }

// export function argentWebWalletUrl() {
//   return "https://web.hydrogen.argent47.net";
// }

// export const argentWebWalletConnector = new WebWalletConnector({
//   url: argentWebWalletUrl(),
// });

export const controllerConnector = (
  gameAddress: string,
  tournamentAddress: string,
  rpcUrl: string
) =>
  new ControllerConnector({
    policies: {
      contracts: {
        [gameAddress]: {
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
        [tournamentAddress]: {
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
    chains: [{ rpcUrl: rpcUrl }],
    defaultChainId: constants.StarknetChainId.SN_MAIN,
    theme: "loot-survivor",
    colorMode: "dark",
  }) as never as Connector;
