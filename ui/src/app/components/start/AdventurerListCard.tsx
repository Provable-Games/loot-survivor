import { useState } from "react";
import { Button } from "@/app/components/buttons/Button";
import { Adventurer } from "@/app/types";
import Info from "@/app/components/adventurer/Info";
import { Contract, validateChecksumAddress } from "starknet";
import useTransactionCartStore from "@/app/hooks/useTransactionCartStore";
import { useAccount } from "@starknet-react/core";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";

export interface AdventurerListCardProps {
  adventurer: Adventurer;
  gameContract: Contract;
  handleSwitchAdventurer: (adventurerId: number) => Promise<void>;
}

export const AdventurerListCard = ({
  adventurer,
  gameContract,
  handleSwitchAdventurer,
}: AdventurerListCardProps) => {
  const { address } = useAccount();
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [transferAddress, setTransferAddress] = useState("");

  const setAdventurer = useAdventurerStore((state) => state.setAdventurer);

  const validAddress =
    validateChecksumAddress(transferAddress) && transferAddress;

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
            variant={"token"}
            onClick={() => {
              setAdventurer(adventurer);
              handleSwitchAdventurer(adventurer.id!);
            }}
            className="w-1/2"
          >
            Select
          </Button>
          <Button
            size={"lg"}
            variant={isTransferOpen ? "default" : "token"}
            onClick={() => setIsTransferOpen(!isTransferOpen)}
            className="w-1/2"
          >
            Transfer
          </Button>
          {isTransferOpen && (
            <div className="absolute bottom-20 bg-terminal-black border border-terminal-green flex flex-col gap-2 items-center justify-center w-3/4 p-2">
              <span className="uppercase text-2xl">Enter Address</span>
              <div className="flex flex-col w-full items-center justify-center gap-10">
                <input
                  type="text"
                  value={transferAddress}
                  onChange={(e) => {
                    let value = e.target.value.toLowerCase();
                    if (!value.startsWith("0x")) {
                      value = "0x" + value.replace(/[^0-9a-f]/g, "");
                    } else {
                      value = "0x" + value.slice(2).replace(/[^0-9a-f]/g, "");
                    }
                    setTransferAddress(value);
                  }}
                  className="p-1 h-12 text-2xl w-3/4 bg-terminal-black border border-terminal-green animate-pulse transform uppercase"
                />
                {transferAddress && !validAddress && (
                  <p className="absolute bottom-15 text-terminal-yellow">
                    INVALID ADDRESS!
                  </p>
                )}
                <Button
                  size={"lg"}
                  onClick={() => handleAddTransferTx(transferAddress)}
                >
                  Send
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      <Info adventurer={adventurer} gameContract={gameContract} />
    </>
  );
};
