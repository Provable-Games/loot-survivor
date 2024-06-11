import { useRef, useState, useEffect } from "react";
import { Contract } from "starknet";
import { useDisconnect, useConnect } from "@starknet-react/core";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import { useQueriesStore } from "@/app/hooks/useQueryStore";
import useUIStore from "@/app/hooks/useUIStore";
import { useUiSounds } from "@/app/hooks/useUiSound";
import { soundSelector } from "@/app/hooks/useUiSound";
import Logo from "public/icons/logo.svg";
import Eth from "public/icons/eth.svg";
import Lords from "public/icons/lords.svg";
import { Button } from "@/app/components/buttons/Button";
import { formatNumber, displayAddress, indexAddress } from "@/app/lib/utils";
import {
  ArcadeIcon,
  SoundOffIcon,
  SoundOnIcon,
  CartIcon,
  SettingsIcon,
  GithubIcon,
} from "@/app/components/icons/Icons";
import TransactionCart from "@/app/components/navigation/TransactionCart";
import TransactionHistory from "@/app/components/navigation/TransactionHistory";
import { NullAdventurer } from "@/app/types";
import useTransactionCartStore from "@/app/hooks/useTransactionCartStore";
import { getApibaraStatus } from "@/app/api/api";
import ApibaraStatus from "@/app/components/navigation/ApibaraStatus";
import TokenLoader from "@/app/components/animations/TokenLoader";
import { checkArcadeConnector } from "@/app/lib/connectors";
import { SkullIcon } from "@/app/components/icons/Icons";
import { networkConfig } from "@/app/lib/networkConfig";
import useNetworkAccount from "@/app/hooks/useNetworkAccount";

export interface HeaderProps {
  multicall: (
    loadingMessage: string[],
    notification: string[]
  ) => Promise<void>;
  mintLords: (lordsAmount: number) => Promise<void>;
  ethBalance: bigint;
  lordsBalance: bigint;
  gameContract: Contract;
  costToPlay: bigint;
}

export default function Header({
  multicall,
  mintLords,
  ethBalance,
  lordsBalance,
  gameContract,
  costToPlay,
}: HeaderProps) {
  const [mintingLords, setMintingLords] = useState(false);
  const { account } = useNetworkAccount();
  const { connector } = useConnect();
  const { disconnect } = useDisconnect();
  const [apibaraStatus, setApibaraStatus] = useState();
  const adventurer = useAdventurerStore((state) => state.adventurer);
  const setAdventurer = useAdventurerStore((state) => state.setAdventurer);
  const resetData = useQueriesStore((state) => state.resetData);

  const setDisconnected = useUIStore((state) => state.setDisconnected);
  const isMuted = useUIStore((state) => state.isMuted);
  const setIsMuted = useUIStore((state) => state.setIsMuted);
  const displayCart = useUIStore((state) => state.displayCart);
  const setDisplayCart = useUIStore((state) => state.setDisplayCart);
  const displayHistory = useUIStore((state) => state.displayHistory);
  const setDisplayHistory = useUIStore((state) => state.setDisplayHistory);
  const setScreen = useUIStore((state) => state.setScreen);
  const network = useUIStore((state) => state.network);
  const onMainnet = useUIStore((state) => state.onMainnet);
  const onKatana = useUIStore((state) => state.onKatana);

  const calls = useTransactionCartStore((state) => state.calls);
  const txInCart = calls.length > 0;

  const { play: clickPlay } = useUiSounds(soundSelector.click);

  const displayCartButtonRef = useRef<HTMLButtonElement>(null);
  const displayHistoryButtonRef = useRef<HTMLButtonElement>(null);

  const [showLordsBuy, setShowLordsBuy] = useState(false);

  const lordsGameCost = Number(costToPlay);

  const handleApibaraStatus = async () => {
    const data = await getApibaraStatus();
    setApibaraStatus(data.status.indicator);
  };

  const checkArcade = checkArcadeConnector(connector);

  useEffect(() => {
    handleApibaraStatus();
  }, []);

  const appUrl = networkConfig[network!].appUrl;

  return (
    <div className="flex flex-row justify-between px-1 h-10 ">
      <div className="flex flex-row items-center gap-2 sm:gap-5">
        <Logo className="fill-current w-24 md:w-32 xl:w-40 2xl:w-64" />
      </div>
      <div className="flex flex-row items-center self-end sm:gap-1 self-center">
        <ApibaraStatus status={apibaraStatus} />
        <Button
          size={"xs"}
          variant={"outline"}
          className="hidden sm:block self-center xl:px-5"
          onClick={() => window.open(appUrl, "_blank")}
        >
          {onMainnet ? "Play on Testnet" : "Play on Mainnet"}
        </Button>
        {!onKatana && (
          <>
            <Button
              size={"xs"}
              variant={"outline"}
              className="self-center xl:px-5"
            >
              <span className="flex flex-row items-center justify-between w-full">
                <Eth className="self-center sm:w-5 sm:h-5  h-3 w-3 fill-current mr-1" />
                <p>
                  {formatNumber(parseInt(ethBalance.toString()) / 10 ** 18)}
                </p>
              </span>
            </Button>
            <Button
              size={"xs"}
              variant={"outline"}
              className="self-center xl:px-5 hover:bg-terminal-green"
              onClick={async () => {
                if (onMainnet) {
                  const avnuLords = `https://app.avnu.fi/en?tokenFrom=${indexAddress(
                    networkConfig[network!].ethAddress ?? ""
                  )}&tokenTo=${indexAddress(
                    networkConfig[network!].lordsAddress ?? ""
                  )}&amount=0.001`;
                  window.open(avnuLords, "_blank");
                } else {
                  setMintingLords(true);
                  await mintLords(lordsGameCost * 25);
                  setMintingLords(false);
                }
              }}
              onMouseEnter={() => setShowLordsBuy(true)}
              onMouseLeave={() => setShowLordsBuy(false)}
            >
              <span className="flex flex-row items-center justify-between w-full">
                {!showLordsBuy ? (
                  <>
                    <Lords className="self-center sm:w-5 sm:h-5  h-3 w-3 fill-current mr-1" />
                    <p>
                      {formatNumber(
                        parseInt(lordsBalance.toString()) / 10 ** 18
                      )}
                    </p>
                  </>
                ) : (
                  <p className="text-black">
                    {onMainnet ? "Buy Lords" : "Mint Lords"}
                  </p>
                )}
              </span>
            </Button>
          </>
        )}
        <Button
          size={"xs"}
          variant={"outline"}
          onClick={() => {
            setIsMuted(!isMuted);
            clickPlay();
          }}
          className="hidden sm:block xl:px-5"
        >
          {isMuted ? (
            <SoundOffIcon className="sm:w-5 sm:h-5 h-3 w-3 justify-center fill-current" />
          ) : (
            <SoundOnIcon className="sm:w-5 sm:h-5 h-3 w-3 justify-center fill-current" />
          )}
        </Button>
        {account && (
          <>
            <span className="sm:hidden w-5 h-5 mx-2">
              <Button
                variant={txInCart ? "default" : "outline"}
                size={"fill"}
                ref={displayCartButtonRef}
                onClick={() => {
                  setDisplayCart(!displayCart);
                  clickPlay();
                }}
                className={`xl:px-5 ${txInCart ? "animate-pulse" : ""}`}
              >
                <CartIcon className="w-5 h-5 fill-current" />
              </Button>
            </span>
            <Button
              variant={txInCart ? "default" : "outline"}
              size={"xs"}
              ref={displayCartButtonRef}
              onClick={() => {
                setDisplayCart(!displayCart);
                clickPlay();
              }}
              className={`hidden sm:block xl:px-5 ${
                txInCart ? "animate-pulse" : ""
              }`}
            >
              <CartIcon className="w-5 h-5 fill-current" />
            </Button>
          </>
        )}
        {displayCart && (
          <TransactionCart
            buttonRef={displayCartButtonRef}
            multicall={multicall}
            gameContract={gameContract}
          />
        )}
        <span className="sm:hidden flex flex-row gap-2 items-center">
          <div className="relative">
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => {
                disconnect();
                resetData();
                setAdventurer(NullAdventurer);
                setDisconnected(true);
              }}
              className="xl:px-5 p-0"
            >
              {account ? displayAddress(account.address) : "Connect"}
            </Button>
          </div>
          <Button
            size={"fill"}
            variant={"outline"}
            onClick={() => {
              setScreen("settings");
              clickPlay();
            }}
            className="xl:px-5"
          >
            <SettingsIcon className="fill-current h-5 w-5" />
          </Button>
        </span>
        <div className="hidden sm:block sm:flex sm:flex-row sm:items-center sm:gap-1">
          {account && (
            <>
              <Button
                variant={"outline"}
                size={"xs"}
                ref={displayHistoryButtonRef}
                onClick={() => {
                  setDisplayHistory(!displayHistory);
                }}
                className="xl:px-5"
              >
                {displayHistory ? "Hide Ledger" : "Show Ledger"}
              </Button>
            </>
          )}
          <div className="relative">
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => {
                disconnect();
                resetData();
                setAdventurer(NullAdventurer);
                setDisconnected(true);
              }}
              className="xl:px-5"
            >
              {account ? displayAddress(account.address) : "Connect"}
            </Button>
            {checkArcade && (
              <div className="absolute top-0 right-0">
                <ArcadeIcon className="fill-current w-4" />
              </div>
            )}
          </div>

          <Button
            variant={"outline"}
            size={"sm"}
            href="https://github.com/BibliothecaDAO/loot-survivor"
            className="xl:px-5"
          >
            <GithubIcon className="w-6 fill-current" />
          </Button>
        </div>
        {account && displayHistory && (
          <TransactionHistory buttonRef={displayHistoryButtonRef} />
        )}
        {mintingLords && <TokenLoader isToppingUpLords={mintingLords} />}
      </div>
    </div>
  );
}
