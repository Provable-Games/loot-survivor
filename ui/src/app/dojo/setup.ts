import { BurnerManager } from "@dojoengine/create-burner";
import { Account, RpcProvider } from "starknet";
import { networkConfig } from "@/app/lib//networkConfig";
import { Network } from "@/app/hooks/useUIStore";

interface SetupProps {
  rpcUrl: string;
  network: Network;
  setCreateBurner: (createBurner: boolean) => void;
}

export async function setup({ rpcUrl, network, setCreateBurner }: SetupProps) {
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
    feeTokenAddress:
      "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  });

  await burnerManager.init();

  if (
    burnerManager.list().length === 0 &&
    (network === "localKatana" || network === "katana")
  ) {
    try {
      setCreateBurner(true);
      await burnerManager.create();
      setCreateBurner(false);
    } catch (e) {
      console.error(e);
    }
  }

  return {
    config: {
      masterAddress: networkConfig[network!].masterAccount,
      masterPrivateKey: networkConfig[network!].masterPrivateKey,
    },
    burnerManager,
    dojoProvider,
  };
}
