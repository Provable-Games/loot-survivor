import { BurnerManager } from "@dojoengine/create-burner";
import { Account, RpcProvider } from "starknet";

interface SetupProps {
  rpcUrl: string;
}

export async function setup({ rpcUrl }: SetupProps) {
  const dojoProvider = new RpcProvider({
    nodeUrl: rpcUrl,
  });
  const burnerManager = new BurnerManager({
    masterAccount: new Account(dojoProvider, "0x0", "0x0"),
    accountClassHash: "0x0",
    rpcProvider: dojoProvider,
    feeTokenAddress: "0x0",
  });

  await burnerManager.init();

  return {
    config: {
      masterAddress: "0x0",
      masterPrivateKey: "0x0",
    },
    burnerManager,
    dojoProvider,
  };
}
