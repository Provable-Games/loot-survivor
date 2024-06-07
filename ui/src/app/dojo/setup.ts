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

  // if (burnerManager.list().length === 0) {
  //   try {
  //     await burnerManager.create();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  await burnerManager.init();

  console.log(
    {
      config: {
        masterAddress: "0x0",
        masterPrivateKey: "0x0",
      },
      burnerManager,
      dojoProvider,
    },
    burnerManager.isInitialized
  );

  return {
    config: {
      masterAddress: "0x0",
      masterPrivateKey: "0x0",
    },
    burnerManager,
    dojoProvider,
  };
}
