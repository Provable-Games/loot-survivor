import { Button } from "@/app/components/buttons/Button";
import { CartridgeIcon } from "@/app/components/icons/Icons";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import useNetworkAccount from "@/app/hooks/useNetworkAccount";
import { useQueriesStore } from "@/app/hooks/useQueryStore";
import useUIStore from "@/app/hooks/useUIStore";
import { checkCartridgeConnector } from "@/app/lib/connectors";
import { copyToClipboard, displayAddress, padAddress } from "@/app/lib/utils";
import { NullAdventurer } from "@/app/types";
import CartridgeConnector from "@cartridge/connector";
import { useConnect, useDisconnect } from "@starknet-react/core";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { AccountInterface } from "starknet";

interface ProfileDialogprops {
  withdraw: (
    adminAccountAddress: string,
    account: AccountInterface,
    ethBalance: bigint,
    lordsBalance: bigint
  ) => Promise<void>;
  ethBalance: bigint;
  lordsBalance: bigint;
  ethContractAddress: string;
  lordsContractAddress: string;
}

export const ProfileDialog = ({
  withdraw,
  ethBalance,
  lordsBalance,
  ethContractAddress,
  lordsContractAddress,
}: ProfileDialogprops) => {
  const { setShowProfile, setNetwork } = useUIStore();
  const { disconnect } = useDisconnect();
  const { setAdventurer } = useAdventurerStore();
  const resetData = useQueriesStore((state) => state.resetData);
  const { account, address } = useNetworkAccount();
  const [copied, setCopied] = useState(false);
  const [copiedDelegate, setCopiedDelegate] = useState(false);
  const username = useUIStore((state) => state.username);
  const controllerDelegate = useUIStore((state) => state.controllerDelegate);
  const handleOffboarded = useUIStore((state) => state.handleOffboarded);
  const { connector } = useConnect();

  const handleCopy = () => {
    copyToClipboard(padAddress(address!));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyDelegate = () => {
    copyToClipboard(controllerDelegate);
    setCopiedDelegate(true);
    setTimeout(() => setCopiedDelegate(false), 2000);
  };

  return (
    <div className="fixed w-full h-full sm:w-3/4 sm:h-3/4 top-0 sm:top-1/8 bg-terminal-black border border-terminal-green flex flex-col items-center p-10 z-30">
      <button
        className="absolute top-2 right-2 cursor-pointer text-terminal-green"
        onClick={() => {
          setShowProfile(false);
        }}
      >
        <MdClose size={50} />
      </button>
      <div className="flex flex-col items-center h-full gap-5">
        <div className="flex flex-col items-center">
          {checkCartridgeConnector(connector) && (
            <CartridgeIcon className="w-10 h-10 fill-current" />
          )}
          <div className="flex flex-row gap-2">
            <h1 className="text-terminal-green text-4xl uppercase m-0">
              {checkCartridgeConnector(connector)
                ? username
                : displayAddress(address!)}
            </h1>
            <div className="relative">
              {copied && (
                <span className="absolute top-[-20px] uppercase">Copied!</span>
              )}
              <Button onClick={handleCopy}>Copy</Button>
            </div>
          </div>
          {checkCartridgeConnector(connector) && (
            <h3 className="text-terminal-green text-2xl uppercase m-0">
              {displayAddress(address!)}
            </h3>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-2">
          {checkCartridgeConnector(connector) && (
            <div className="flex flex-col items-center border border-terminal-green p-2 sm:p-5 text-center sm:gap-10 z-1 h-[200px] sm:h-[400px] sm:w-1/3">
              <h2 className="text-terminal-green text-2xl sm:text-4xl uppercase m-0">
                Withdraw
              </h2>
              <p className="sm:text-lg">
                Withdraw to the Cartridge Controller delegate account.
              </p>
              <div className="flex flex-col sm:gap-5">
                <div className="flex flex-row items-center gap-2">
                  <p className="text-2xl uppercase">
                    {displayAddress(controllerDelegate)}
                  </p>
                  <div className="relative">
                    {copiedDelegate && (
                      <span className="absolute top-[-20px] uppercase">
                        Copied!
                      </span>
                    )}
                    <Button size={"xs"} onClick={handleCopyDelegate}>
                      Copy
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={() =>
                    (connector as unknown as CartridgeConnector).openMenu()
                  }
                >
                  Change Settings
                </Button>
              </div>
              <Button
                size={"lg"}
                onClick={() =>
                  withdraw(
                    controllerDelegate,
                    account!,
                    ethBalance,
                    lordsBalance
                  )
                }
                disabled={
                  controllerDelegate === "0x0" || controllerDelegate === ""
                }
              >
                Withdraw
              </Button>
            </div>
          )}
          {checkCartridgeConnector(connector) && (
            <div className="flex flex-col items-center border border-terminal-green p-5 text-center sm:gap-5 z-1 sm:h-[400px] sm:w-1/3">
              <h2 className="text-terminal-green text-2xl sm:text-4xl uppercase m-0">
                Topup
              </h2>
              <p className="hidden sm:block sm:text-lg">
                Low on tokens? Transfer $LORDS and $ETH to the address at the
                top!
              </p>
            </div>
          )}
          <div className="flex flex-col items-center sm:border sm:border-terminal-green p-5 text-center sm:gap-10 z-1 sm:h-[400px] sm:w-1/3">
            <h2 className="hidden sm:block text-terminal-green text-2xl sm:text-4xl uppercase m-0">
              Logout
            </h2>
            <p className="hidden sm:block sm:text-lg">
              Logout to go back to the login page and select a different wallet
              or switch to testnet.
            </p>
            <Button
              size={"lg"}
              onClick={() => {
                disconnect();
                resetData();
                setAdventurer(NullAdventurer);
                setNetwork(undefined);
                handleOffboarded();
                setShowProfile(false);
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
