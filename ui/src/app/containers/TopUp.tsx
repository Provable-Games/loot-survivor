import { useState } from "react";
import { Contract } from "starknet";
import { MdClose } from "react-icons/md";
import {
  displayAddress,
  copyToClipboard,
  formatNumber,
  padAddress,
} from "@/app/lib/utils";
import Eth from "public/icons/eth.svg";
import Lords from "public/icons/lords.svg";
import { Button } from "@/app/components/buttons/Button";
import useUIStore from "@/app/hooks/useUIStore";
import { checkCartridgeConnector } from "@/app/lib/connectors";
import { CartridgeIcon } from "@/app/components/icons/Icons";
import { useConnect } from "@starknet-react/core";
import useNetworkAccount from "@/app/hooks/useNetworkAccount";

interface TopUpProps {
  ethBalance: bigint;
  lordsBalance: bigint;
  costToPlay: bigint;
  mintLords: () => Promise<void>;
  gameContract: Contract;
  lordsContract: Contract;
  ethContract: Contract;
  showTopUpDialog: (value: boolean) => void;
}

const TopUp = ({
  ethBalance,
  lordsBalance,
  costToPlay,
  mintLords,
  gameContract,
  lordsContract,
  ethContract,
  showTopUpDialog,
}: TopUpProps) => {
  const { address } = useNetworkAccount();
  const { connector } = useConnect();
  const topUpAccount = useUIStore((state) => state.topUpAccount);
  const username = useUIStore((state) => state.username);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(padAddress(address!));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="flex flex-col items-center p-10 z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-black border border-terminal-green">
        <button
          className="absolute top-2 right-2 cursor-pointer text-terminal-green"
          onClick={() => {
            showTopUpDialog(false);
          }}
        >
          <MdClose size={50} />
        </button>
        <h1 className="m-0 uppercase text-6xl text-center h-1/4">
          Top Up Required
        </h1>
        <div className="flex flex-col gap-5">
          {topUpAccount === "eth" && (
            <p className="text-2xl text-center">
              You need to top up ETH to continue playing.
            </p>
          )}
          {topUpAccount === "lords" && (
            <p className="text-2xl text-center">
              You need to top up Lords to start a game.
            </p>
          )}
          <div className="flex flex-col items-center gap-2">
            {checkCartridgeConnector(connector) && (
              <CartridgeIcon className="w-10 h-10 fill-current" />
            )}
            <div className="flex flex-row gap-2 justify-center">
              <h1 className="text-terminal-green text-4xl uppercase m-0">
                {checkCartridgeConnector(connector)
                  ? username
                  : displayAddress(address!)}
              </h1>
              <div className="relative">
                {copied && (
                  <span className="absolute top-[-20px] uppercase">
                    Copied!
                  </span>
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
          <div className="flex flex-col gap-2 items-center">
            <span className="flex flex-row items-center gap-2 relative">
              <Lords className="self-center sm:w-8 sm:h-8  h-3 w-3 fill-current mr-1" />
              <p className="uppercase">
                Current Balance:{" "}
                {formatNumber(parseInt(lordsBalance.toString()) / 10 ** 18)}
              </p>
            </span>
          </div>
          <span className="flex flex-col relative">
            <div className="flex flex-col gap-2 items-center">
              <span className="flex flex-row items-center gap-2 relative">
                <Eth className="self-center sm:w-8 sm:h-8  h-3 w-3 fill-current mr-1" />
                <p>
                  Current Balance:{" "}
                  {formatNumber(parseInt(ethBalance.toString()) / 10 ** 18)}
                </p>
              </span>
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default TopUp;
