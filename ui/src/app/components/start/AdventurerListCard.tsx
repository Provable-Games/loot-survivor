import { useEffect, useState } from "react";
import { Button } from "@/app/components/buttons/Button";
import { Adventurer } from "@/app/types";
import Info from "@/app/components/adventurer/Info";
import {
  AccountInterface,
  Contract,
  validateAndParseAddress,
  constants,
} from "starknet";
import useTransactionCartStore from "@/app/hooks/useTransactionCartStore";
import { useAccount, useProvider } from "@starknet-react/core";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import { padAddress } from "@/app/lib/utils";
import { StarknetIdNavigator } from "starknetid.js";
import { CartridgeIcon, StarknetIdIcon } from "../icons/Icons";

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
  const { provider } = useProvider();
  const starknetIdNavigator = new StarknetIdNavigator(
    provider,
    constants.StarknetChainId.SN_MAIN
  );
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [transferAddress, setTransferAddress] = useState("");
  const [validAddress, setValidAddress] = useState<string | false>(false);
  const [subdomain, setSubdomain] = useState(".ctrl");
  const [resolvedAddresses, setResolvedAddresses] = useState<{
    ctrl: string | null;
    starknetId: string | null;
  }>({
    ctrl: null,
    starknetId: null,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<
    "send" | "addToCart" | null
  >(null);

  const setAdventurer = useAdventurerStore((state) => state.setAdventurer);

  useEffect(() => {
    const validateAddress = async () => {
      let ctrlAddress = null;
      let starknetIdAddress = null;

      // Try to resolve Starknet ID with .ctrl
      try {
        const ctrlId = transferAddress + ".ctrl.stark";
        ctrlAddress = await starknetIdNavigator.getAddressFromStarkName(ctrlId);
      } catch (e) {
        console.log("Failed to resolve .ctrl address:", e);
      }

      // Try to resolve Starknet ID without subdomain
      try {
        const starknetId = transferAddress + ".stark";
        starknetIdAddress = await starknetIdNavigator.getAddressFromStarkName(
          starknetId
        );
      } catch (e) {
        console.log("Failed to resolve .stark address:", e);
      }

      setResolvedAddresses({
        ctrl: ctrlAddress,
        starknetId: starknetIdAddress,
      });

      // Set validAddress based on the current subdomain
      if (
        subdomain === ".ctrl" &&
        ctrlAddress &&
        !transferAddress.startsWith("0x")
      ) {
        setValidAddress(ctrlAddress);
      } else if (
        subdomain === "" &&
        starknetIdAddress &&
        !transferAddress.startsWith("0x")
      ) {
        setValidAddress(starknetIdAddress);
      } else {
        // If not a Starknet ID, validate as a regular address
        try {
          const paddedAddress = padAddress(transferAddress.toLowerCase());
          if (paddedAddress.length === 66 && transferAddress.startsWith("0x")) {
            const parsedAddress = validateAndParseAddress(paddedAddress);
            setValidAddress(parsedAddress);
          } else {
            setValidAddress(false);
          }
        } catch (e) {
          console.log("Failed to validate address:", e);
          setValidAddress(false);
        }
      }
    };

    validateAddress();
  }, [transferAddress, subdomain]);

  const addToCalls = useTransactionCartStore((state) => state.addToCalls);

  const handleAddTransferTx = (recipient: string) => {
    const transferTx = {
      contractAddress: gameContract?.address ?? "",
      entrypoint: "transfer_from",
      calldata: [address!, recipient, adventurer?.id?.toString() ?? "", "0"],
    };
    addToCalls(transferTx);
  };

  const handleConfirmAction = () => {
    if (confirmationAction === "send") {
      transferAdventurer(
        account!,
        adventurer?.id!,
        address!,
        validAddress as string
      );
    } else if (confirmationAction === "addToCart") {
      handleAddTransferTx(validAddress as string);
    }
    setShowConfirmation(false);
    setIsTransferOpen(false);
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
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="w-1/4"></div>
                  <span className="uppercase text-2xl text-center flex-grow">
                    Enter Address
                  </span>
                  <span className="flex flex-row w-1/4 justify-end gap-2">
                    <Button
                      onClick={() => setSubdomain(".ctrl")}
                      variant={
                        subdomain === ".ctrl" || resolvedAddresses.ctrl
                          ? "default"
                          : "ghost"
                      }
                      className={
                        subdomain !== ".ctrl" && resolvedAddresses.ctrl
                          ? "animate-pulse"
                          : ""
                      }
                    >
                      <CartridgeIcon className="w-6 h-6" />
                    </Button>
                    <Button
                      onClick={() => setSubdomain("")}
                      variant={
                        subdomain === "" || resolvedAddresses.starknetId
                          ? "default"
                          : "ghost"
                      }
                      className={
                        subdomain !== "" && resolvedAddresses.starknetId
                          ? "animate-pulse"
                          : ""
                      }
                    >
                      <StarknetIdIcon className="w-6 h-6" />
                    </Button>
                  </span>
                </div>
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
                      onClick={() => {
                        setConfirmationAction("send");
                        setShowConfirmation(true);
                      }}
                      disabled={!validAddress}
                    >
                      Send
                    </Button>
                    <Button
                      size={"lg"}
                      variant={"ghost"}
                      onClick={() => {
                        setConfirmationAction("addToCart");
                        setShowConfirmation(true);
                      }}
                      disabled={!validAddress}
                    >
                      Add to Cart
                    </Button>
                  </div>
                  {showConfirmation && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-terminal-black border border-terminal-green p-4 rounded-lg max-w-md w-full">
                        <div className="mb-4">
                          <h1 className="text-xl font-bold">Confirm Action</h1>
                        </div>
                        <p className="mb-2">
                          Are you sure you want to{" "}
                          {confirmationAction === "send"
                            ? "send"
                            : "add to cart"}{" "}
                          this adventurer?
                        </p>
                        <p className="mb-4">
                          Recipient address: {validAddress}
                        </p>
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => setShowConfirmation(false)}
                            variant="secondary"
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleConfirmAction}>Confirm</Button>
                        </div>
                      </div>
                    </div>
                  )}
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
