import { Connector } from "@starknet-react/core";

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
