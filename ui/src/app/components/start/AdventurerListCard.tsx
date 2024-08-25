import { useState } from "react";
import { Button } from "@/app/components/buttons/Button";
import { Adventurer } from "@/app/types";
import Info from "@/app/components/adventurer/Info";
import { Contract, validateAndParseAddress } from "starknet";
import useTransactionCartStore from "@/app/hooks/useTransactionCartStore";
import { useAccount } from "@starknet-react/core";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import { padAddress } from "@/app/lib/utils";
import { AccountInterface } from "starknet";

export interface AdventurerListCardProps {
  adventurer: Adventurer;
  gameContract: Contract;
  handleSwitchAdventurer: (adventurerId: number) => Promise<void>;
  transferAdventurer: (
    account: AccountInterface,
    adventurerId: number,
    from: string,
    recipient: string
  ) => Promise<void>;
}

export const AdventurerListCard = ({
  adventurer,
  gameContract,
  handleSwitchAdventurer,
  transferAdventurer,
}: AdventurerListCardProps) => {
  const { account, address } = useAccount();
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [transferAddress, setTransferAddress] = useState("");

  const setAdventurer = useAdventurerStore((state) => state.setAdventurer);

  const validAddress = (() => {
    const paddedAddress = padAddress(transferAddress.toLowerCase());
    if (paddedAddress.length !== 66 || !transferAddress.startsWith("0x")) {
      return false;
    }
    try {
      return validateAndParseAddress(paddedAddress);
    } catch {
      return false;
    }
  })();

  const addToCalls = useTransactionCartStore((state) => state.addToCalls);

  const handleAddTransferTx = (recipient: string) => {
    const transferTx = {
      contractAddress: gameContract?.address ?? "",
      entrypoint: "transfer_from",
      calldata: [address!, recipient, adventurer?.id?.toString() ?? "", "0"],
    };
    addToCalls(transferTx);
  };

  return (
    <>
      {adventurer && (
        <div className="absolute bottom-0 flex flex-row bg-terminal-black items-center justify-center w-full z-[2]">
          <Button
            size={"lg"}
            variant={"default"}
            onClick={() => {
              setAdventurer(adventurer);
              handleSwitchAdventurer(adventurer.id!);
            }}
            className="w-1/2"
          >
            Play
          </Button>
          <Button
            size={"lg"}
            variant={"token"}
            onClick={() => setIsTransferOpen(!isTransferOpen)}
            className={`w-1/2 ${isTransferOpen && "animate-pulse"}`}
          >
            Transfer
          </Button>
          {isTransferOpen && (
            <>
              <div className="absolute bottom-20 bg-terminal-black border border-terminal-green flex flex-col gap-2 items-center justify-center w-3/4 p-2">
                <span className="uppercase text-2xl">Enter Address</span>
                <div className="flex flex-col w-full items-center justify-center gap-10">
                  <input
                    type="text"
                    value={transferAddress}
                    onChange={(e) => {
                      let value = e.target.value;
                      setTransferAddress(value);
                    }}
                    className="p-1 h-12 text-2xl w-3/4 bg-terminal-black border border-terminal-green animate-pulse transform uppercase"
                  />
                  {transferAddress && !validAddress && (
                    <p className="absolute bottom-15 text-terminal-yellow">
                      INVALID ADDRESS!
                    </p>
                  )}
                  <div className="flex flex-row gap-2 items-center">
                    <Button
                      size={"lg"}
                      onClick={() =>
                        transferAdventurer(
                          account!,
                          adventurer?.id!,
                          address!,
                          transferAddress
                        )
                      }
                      disabled={!validAddress}
                    >
                      Send
                    </Button>
                    <Button
                      size={"lg"}
                      variant={"ghost"}
                      onClick={() => handleAddTransferTx(transferAddress)}
                      disabled={!validAddress}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {isTransferOpen && (
        <div className="absolute inset-0 bg-terminal-black/75 z-[1]" />
      )}
      <Info adventurer={adventurer} gameContract={gameContract} />
    </>
  );
};
