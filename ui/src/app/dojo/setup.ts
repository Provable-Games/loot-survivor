import { BurnerManager } from "@dojoengine/create-burner";
import { Account, RpcProvider } from "starknet";
import { networkConfig } from "@/app/lib//networkConfig";
import { Network } from "@/app/hooks/useUIStore";

interface SetupProps {
  rpcUrl: string;
  network: Network;
}

export async function setup({ rpcUrl, network }: SetupProps) {
  const dojoProvider = new RpcProvider({
    nodeUrl: rpcUrl,
  });
  const burnerManager = new BurnerManager({
    masterAccount: new Account(
      dojoProvider,
      networkConfig[network!].masterAccount,
      networkConfig[network!].masterPrivateKey
    ),
    accountClassHash: networkConfig[network!].accountClassHash,
    rpcProvider: dojoProvider,
    feeTokenAddress: "0x0",
  });

  console.log(networkConfig[network!].masterAccount);
  console.log(networkConfig[network!].masterPrivateKey);
  console.log(dojoProvider);
  console.log(burnerManager);

  await burnerManager.init();

  if (burnerManager.list().length === 0 && network === "localKatana") {
    try {
      await burnerManager.create();
    } catch (e) {
      console.error(e);
    }
  }

  console.log("after");

  return {
    config: {
      masterAddress:
        "0x5c84d31976a25d632deee7a1ed9bdbdc6795cb288103d7d601841030c976ee",
      masterPrivateKey:
        "0x22ab3e9b8c4fdf2c187609cb52550424675bb8fc7ee8c06b0fc170e56889ec0",
    },
    burnerManager,
    dojoProvider,
  };
}
