import { Connector } from "@starknet-react/core";
import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";
import CartridgeConnector from "@cartridge/connector";
import CartridgeConnector from "@cartridge/connector";

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
  connectors.filter(
    (connector) =>
      typeof connector.id !== "string" || !connector.id.includes("0x")
  );

export const providerInterfaceCamel = (provider: string) => {
  // check provider, braavos interface is camel, argent is snake
  if (provider === "braavos") {
    return "1";
  } else {
    return "0";
  }
};

export function argentWebWalletUrl() {
  switch (process.env.NEXT_PUBLIC_NETWORK) {
    case "goerli":
      return "https://web.hydrogen.argent47.net";
    case "mainnet":
      return "https://web.argent.xyz/";
    default:
      return "https://web.hydrogen.argent47.net";
  }
}

export const argentWebWalletConnector = new WebWalletConnector({
  url: argentWebWalletUrl(),
});

const cartridgeConnector = new CartridgeConnector([
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
]) as never as Connector;

export const connectors = [
  new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
  new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
  cartridgeConnector,
];
