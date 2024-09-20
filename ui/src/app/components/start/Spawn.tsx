import { Button } from "@/app/components/buttons/Button";
import { WalletTutorial } from "@/app/components/intro/WalletTutorial";
import { TxActivity } from "@/app/components/navigation/TxActivity";
import useLoadingStore from "@/app/hooks/useLoadingStore";
import useNetworkAccount from "@/app/hooks/useNetworkAccount";
import useUIStore from "@/app/hooks/useUIStore";
import { getArcadeConnectors, getWalletConnectors } from "@/app/lib/connectors";
import { battle } from "@/app/lib/constants";
import { networkConfig } from "@/app/lib/networkConfig";
import { formatLords, indexAddress } from "@/app/lib/utils";
import { FormData, GameToken } from "@/app/types";
import { useConnect } from "@starknet-react/core";
import Image from "next/image";
import Lords from "public/icons/lords.svg";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";
import { CallData, Contract } from "starknet";

export interface SpawnProps {
  formData: FormData;
  spawn: (
    formData: FormData,
    goldenTokenId: string,
    revenueAddresses: string[],
    costToPlay?: number
  ) => Promise<void>;
  handleBack: () => void;
  lordsBalance?: bigint;
  goldenTokenData: any;
  gameContract: Contract;
  getBalances: () => Promise<void>;
  mintLords: (lordsAmount: number) => Promise<void>;
  costToPlay: bigint;
}

export const Spawn = ({
  formData,
  spawn,
  handleBack,
  lordsBalance,
  goldenTokenData,
  gameContract,
  getBalances,
  mintLords,
  costToPlay,
}: SpawnProps) => {
  const [showWalletTutorial, setShowWalletTutorial] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const [usableToken, setUsableToken] = useState<string>("0");
  const isWrongNetwork = useUIStore((state) => state.isWrongNetwork);
  const loading = useLoadingStore((state) => state.loading);
  const estimatingFee = useUIStore((state) => state.estimatingFee);
  const onMainnet = useUIStore((state) => state.onMainnet);
  const network = useUIStore((state) => state.network);
  const onKatana = useUIStore((state) => state.onKatana);
  const resetNotification = useLoadingStore((state) => state.resetNotification);

  useEffect(() => {
    if (formData.name && formData.startingWeapon) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  }, [formData]);

  const { account } = useNetworkAccount();
  const { connectors, connect } = useConnect();

  const walletConnectors = getWalletConnectors(connectors);
  const arcadeConnectors = getArcadeConnectors(connectors);

  const handleButtonClick = () => {
    setShowWalletTutorial(true);
  };

  const lordsGameCost = Number(costToPlay);

  const handleSubmitLords = async () => {
    resetNotification();
    await spawn(
      formData,
      "0",
      networkConfig[network!].revenueAddresses,
      lordsGameCost
    );
    if (!onKatana) {
      await getBalances();
    }
  };

  const handleSubmitGoldenToken = async () => {
    resetNotification();
    await spawn(
      formData,
      usableToken,
      networkConfig[network!].revenueAddresses,
      lordsGameCost
    );
    await getBalances();
  };

  const checkEnoughLords = lordsBalance! >= BigInt(25000000000000000000);

  const tokens = goldenTokenData?.getERC721Tokens;
  const goldenTokens: number[] = tokens?.map(
    (token: GameToken) => token.token_id
  );

  const goldenTokenExists = goldenTokens?.length > 0;

  const getUsableGoldenToken = async (tokenIds: number[]) => {
    // Loop through contract calls to see if the token is usable, if none then return 0
    for (let tokenId of tokenIds) {
      const canPlay = await gameContract.call(
        "free_game_available",
        CallData.compile(["0", tokenId.toString()])
      );
      if (canPlay) {
        setUsableToken(tokenId.toString());
        break;
      }
    }
  };

  useEffect(() => {
    getUsableGoldenToken(goldenTokens ?? []);
  }, []);

  return (
    <div className="flex flex-col w-full h-full justify-center">
      {showWalletTutorial && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-4/5 z-20 bg-terminal-black overflow-y-auto flex flex-col items-center gap-4">
          <Button
            onClick={() => setShowWalletTutorial(false)}
            className="text-red-500 hover:text-red-700"
            variant={"ghost"}
          >
            <MdClose size={20} />
          </Button>
          <WalletTutorial />
        </div>
      )}
      <span className="sm:hidden absolute top-0 h-20 w-full">
        <TxActivity />
      </span>
      <div className="flex flex-col h-full p-2">
        <Image
          className="mx-auto absolute object-cover sm:py-4 sm:px-8"
          src={"/scenes/intro/beast.png"}
          alt="adventurer facing beast"
          fill
        />

        <div className="absolute top-1/3 left-0 right-0 flex flex-col items-center text-center gap-4 z-10">
          <TypeAnimation
            sequence={[battle]}
            wrapper="span"
            cursor={true}
            speed={40}
            style={{ fontSize: "2em" }}
          />
          <span className="hidden sm:block">
            <TxActivity />
          </span>
          {!account ? (
            <>
              <div className="flex flex-col gap-5 items-center justify-center">
                <div className="flex flex-col gap-2">
                  {walletConnectors.map((connector, index) => (
                    <Button
                      onClick={() => connect({ connector })}
                      disabled={!formFilled}
                      key={index}
                      className="w-full"
                    >
                      {connector.id === "braavos" || connector.id === "argentX"
                        ? `Connect ${connector.id}`
                        : connector.id === "argentWebWallet"
                        ? "Login With Email"
                        : "Login with Cartridge Controller"}
                    </Button>
                  ))}
                  <Button onClick={handleButtonClick}>
                    I don&apos;t have a wallet
                  </Button>
                </div>
                <p className="text-xl">Arcade Accounts</p>
                <div className="flex flex-col items-center justify-center sm:flex-row gap-2 overflow-auto h-[300px] sm:h-full w-full sm:w-[400px]">
                  {arcadeConnectors.map((connector, index) => (
                    <Button
                      onClick={() => connect({ connector })}
                      disabled={!formFilled}
                      key={index}
                      className="w-1/3"
                    >
                      Connect {connector.id}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          ) : !onKatana ? (
            <>
              <div className="flex flex-col gap-2">
                <Button
                  size={"xl"}
                  disabled={
                    !formFilled ||
                    !account ||
                    isWrongNetwork ||
                    loading ||
                    estimatingFee ||
                    !checkEnoughLords
                  }
                  onClick={() => handleSubmitLords()}
                  className="relative"
                >
                  <div className="flex flex-row items-center gap-5 w-full h-full">
                    <p className="whitespace-nowrap w-3/4 mr-5">
                      {checkEnoughLords
                        ? formFilled
                          ? "Play With Lords Tokens"
                          : "Fill details"
                        : "Not enough Lords"}
                    </p>
                    <span className="absolute flex flex-row right-5">
                      {formatLords(lordsGameCost)}
                      <Lords className="self-center sm:w-5 sm:h-5  h-3 w-3 fill-current" />
                    </span>
                  </div>
                </Button>

                <div className="flex flex-row items-center gap-2 w-full">
                  <Button
                    onClick={() => handleSubmitGoldenToken()}
                    size={"xl"}
                    disabled={
                      !formFilled ||
                      !account ||
                      isWrongNetwork ||
                      loading ||
                      estimatingFee ||
                      !goldenTokenExists ||
                      usableToken === "0"
                    }
                    className="relative w-full"
                  >
                    <div className="flex flex-row items-center gap-1 w-full h-full">
                      <p className="whitespace-nowrap w-3/4">
                        {goldenTokenExists
                          ? usableToken !== "0"
                            ? formFilled
                              ? "Play With Golden Token"
                              : "Fill details"
                            : "No Usable Tokens"
                          : "No Golden Tokens"}
                      </p>
                      <div className="absolute right-3 w-6 h-6 sm:w-8 sm:h-8">
                        <Image
                          src={"/golden-token.png"}
                          alt="Golden Token"
                          fill={true}
                        />
                      </div>
                    </div>
                  </Button>
                  {onMainnet && (
                    <a
                      href={networkConfig[network!].goldenTokenMintUrl}
                      target="_blank"
                    >
                      <Button type="button" className="text-black">
                        Buy
                      </Button>
                    </a>
                  )}
                </div>
              </div>
              {!checkEnoughLords && (
                <Button
                  onClick={async () => {
                    if (onMainnet) {
                      const avnuLords = `https://app.avnu.fi/en?tokenFrom=${indexAddress(
                        networkConfig[network!].ethAddress ?? ""
                      )}&tokenTo=${indexAddress(
                        networkConfig[network!].lordsAddress ?? ""
                      )}&amount=0.001`;
                      window.open(avnuLords, "_blank");
                    } else {
                      await mintLords(lordsGameCost);
                    }
                  }}
                >
                  Buy Lords
                </Button>
              )}
            </>
          ) : (
            <Button
              size={"xl"}
              disabled={
                !formFilled ||
                !account ||
                isWrongNetwork ||
                loading ||
                estimatingFee
              }
              onClick={() => handleSubmitLords()}
              className="relative"
            >
              <div className="flex flex-row items-center gap-1 w-full h-full">
                {formFilled ? "Play as Guest" : "Fill details"}
              </div>
            </Button>
          )}
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 z-10 pb-8">
          <Button size={"sm"} variant={"default"} onClick={handleBack}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
