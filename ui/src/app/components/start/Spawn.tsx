import NftCard from "@/app/components/adventurer/NftCard";
import SpriteAnimation from "@/app/components/animations/SpriteAnimation";
import { Button } from "@/app/components/buttons/Button";
import { DownArrowIcon, ProfileIcon } from "@/app/components/icons/Icons";
import { TxActivity } from "@/app/components/navigation/TxActivity";
import PaymentDetails from "@/app/components/start/PaymentDetails";
import { getDeadAdventurersByXPPaginated } from "@/app/hooks/graphql/queries";
import useCustomQuery from "@/app/hooks/useCustomQuery";
import useLoadingStore from "@/app/hooks/useLoadingStore";
import useNetworkAccount from "@/app/hooks/useNetworkAccount";
import { soundSelector, useUiSounds } from "@/app/hooks/useUiSound";
import useUIStore from "@/app/hooks/useUIStore";
import { battle } from "@/app/lib/constants";
import { networkConfig } from "@/app/lib/networkConfig";
import { formatLords } from "@/app/lib/utils";
import { Adventurer, FormData, GameToken } from "@/app/types";
import Image from "next/image";
import Lords from "public/icons/lords.svg";
import { useEffect, useMemo, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { CallData, Contract } from "starknet";

export interface SpawnProps {
  formData: FormData;
  spawn: (
    formData: FormData,
    goldenTokenId: string,
    blobertTokenId: string,
    revenueAddresses: string[],
    costToPlay?: number
  ) => Promise<void>;
  handleBack: () => void;
  lordsBalance?: bigint;
  goldenTokenData: any;
  blobertsData: any;
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
  blobertsData,
  gameContract,
  getBalances,
  mintLords,
  costToPlay,
}: SpawnProps) => {
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const [usableGoldenToken, setUsableGoldenToken] = useState<string>("0");
  const [usableBlobertToken, setUsableBlobertToken] = useState<string>("0");
  const [isHoveringLords, setIsHoveringLords] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const isWrongNetwork = useUIStore((state) => state.isWrongNetwork);
  const loading = useLoadingStore((state) => state.loading);
  const estimatingFee = useUIStore((state) => state.estimatingFee);
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
  const lordsGameCost = Number(costToPlay);

  const handleSubmitLords = async () => {
    resetNotification();
    await spawn(
      formData,
      "0",
      "0",
      networkConfig[network!].revenueAddresses,
      lordsGameCost
    );
    if (!onKatana) {
      await getBalances();
    }
  };

  const goldenTokens = goldenTokenData?.getERC721Tokens;
  const goldenTokenIds: number[] = goldenTokens?.map(
    (token: GameToken) => token.token_id
  );

  const getUsableGoldenToken = async (tokenIds: number[]) => {
    // Loop through contract calls to see if the token is usable, if none then return 0
    for (let tokenId of tokenIds) {
      const canPlay = await gameContract.call(
        "free_game_available",
        CallData.compile(["0", tokenId.toString()])
      );
      if (canPlay) {
        setUsableGoldenToken(tokenId.toString());
        break;
      }
    }
  };

  const blobertTokens = blobertsData?.tokens;
  const blobertTokenIds: number[] = blobertTokens?.map(
    (token: any) => token.tokenId
  );

  const getUsableBlobertToken = async (tokenIds: number[]) => {
    // Loop through contract calls to see if the token is usable, if none then return 0
    for (let tokenId of tokenIds) {
      const canPlay = await gameContract.call(
        "free_game_available",
        CallData.compile(["1", tokenId.toString()])
      );
      if (canPlay) {
        setUsableBlobertToken(tokenId.toString());
        break;
      }
    }
  };

  const { play: spawnPlay } = useUiSounds(soundSelector.spawn);
  const { play: coinPlay } = useUiSounds(soundSelector.coin);

  const tournamentEnded = process.env.NEXT_PUBLIC_TOURNAMENT_ENDED === "true";

  useEffect(() => {
    getUsableGoldenToken(goldenTokenIds ?? []);
    if (tournamentEnded) {
      getUsableBlobertToken(blobertTokenIds ?? []);
    }
  }, []);

  const handlePayment = async (goldenToken: boolean, blobertToken: boolean) => {
    spawnPlay();
    coinPlay();
    resetNotification();
    setPaymentInitiated(true);
    try {
      await spawn(
        formData,
        goldenToken ? usableGoldenToken : "0",
        blobertToken && tournamentEnded ? usableBlobertToken : "0",
        networkConfig[network!].revenueAddresses,
        lordsGameCost
      );
      await getBalances();
      setPaymentInitiated(false);
    } catch (error) {
      console.error(error);
      setPaymentInitiated(false);
    }
  };

  const aliveAdventurersVariables = useMemo(() => {
    return {
      skip: 0,
    };
  }, []);

  const adventurersByXPdata = useCustomQuery(
    network,
    "adventurersByXPQuery",
    getDeadAdventurersByXPPaginated,
    aliveAdventurersVariables
  );

  const adventurers: Adventurer[] = adventurersByXPdata?.adventurers ?? [];

  return (
    <div className="flex flex-col w-full h-full justify-center">
      <span className="sm:hidden absolute top-0 h-20 w-full">
        <TxActivity />
      </span>
      <div className="flex flex-col h-full p-2">
        {paymentInitiated ? (
          <>
            <Image
              className="mx-auto absolute object-cover sm:py-4 sm:px-8"
              src={"/scenes/intro/beast.png"}
              alt="adventurer facing beast"
              fill
            />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <TypeAnimation
                sequence={[battle]}
                wrapper="span"
                cursor={true}
                speed={40}
                style={{ fontSize: "2em" }}
              />
            </span>
            <span className="absolute top-1/4 left-1/2 transform -translate-x-1/2 hidden sm:block">
              <TxActivity />
            </span>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-black" />
            <div className="absolute inset-0 left-0 right-0 flex flex-col items-center text-center gap-4 z-10 p-5 sm:p-20">
              {!onKatana ? (
                <>
                  <div className="flex flex-row w-full h-full">
                    {!showPaymentDetails && (
                      <div className="flex flex-col gap-5 items-center justify-start sm:justify-center w-full sm:w-1/4 h-full pt-20 sm:p-0">
                        <h1 className="m-0 text-6xl uppercase">
                          Click To Play
                        </h1>

                        <div
                          className="border-8 border-terminal-green w-3/4 h-1/2 cursor-pointer shadow-xl"
                          onMouseEnter={() => setIsHoveringLords(true)}
                          onMouseLeave={() => setIsHoveringLords(false)}
                          onClick={() => {
                            handlePayment(
                              usableGoldenToken !== "0",
                              usableBlobertToken !== "0"
                            );
                          }}
                        >
                          <div className="flex flex-row h-full">
                            <div className="w-1/4 border-[15px] border-terminal-green bg-terminal-black" />
                            <div
                              className={`flex flex-col sm:gap-2 justify-center w-3/4 p-2 uppercase ${
                                isHoveringLords
                                  ? "text-terminal-black bg-terminal-green animate-pulseFast"
                                  : "bg-terminal-green/20"
                              }`}
                            >
                              {usableGoldenToken !== "0" ? (
                                <span className="relative h-40 w-full">
                                  <Image
                                    src="/golden-token.png"
                                    alt="golden-token"
                                    fill
                                  />
                                </span>
                              ) : usableBlobertToken !== "0" ? (
                                <span className="relative h-48 w-full">
                                  <Image
                                    src="/blobert.png"
                                    alt="blobert"
                                    fill
                                  />
                                </span>
                              ) : (
                                <span className="flex flex-row gap-1 items-center justify-center">
                                  <Lords className="self-center w-24 h-24 fill-current" />
                                  <p className="text-6xl no-text-shadow">
                                    {formatLords(lordsGameCost)}
                                  </p>
                                </span>
                              )}
                              <span className="relative h-40 w-full">
                                <Image
                                  src={
                                    usableGoldenToken !== "0"
                                      ? isHoveringLords
                                        ? "/insert-golden-token-hover.png"
                                        : "/insert-golden-token.png"
                                      : usableBlobertToken !== "0"
                                      ? isHoveringLords
                                        ? "/insert-blobert-hover.png"
                                        : "/insert-blobert.png"
                                      : isHoveringLords
                                      ? "/insert-lords-hover.png"
                                      : "/insert-lords.png"
                                  }
                                  alt="insert-lords"
                                  fill
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div
                      className={`${
                        showPaymentDetails ? "flex" : "hidden sm:flex"
                      } items-center justify-center w-full sm:w-1/2`}
                    >
                      <div className="w-full h-full bg-black">
                        <div className="flex flex-row h-full w-full">
                          <div className="hidden sm:flex flex-col items-center justify-center w-1/4 h-full">
                            <SpriteAnimation
                              frameWidth={150}
                              frameHeight={150}
                              columns={8}
                              rows={1}
                              frameRate={5}
                              className="coin-sprite"
                            />
                            <DownArrowIcon className="self-center rotate-[-90deg] w-20" />
                            <p className="uppercase text-4xl">Pay</p>
                          </div>
                          <div className="w-full flex justify-center sm:w-1/2">
                            <PaymentDetails
                              adventurers={adventurers}
                              showPaymentDetails={showPaymentDetails}
                            />
                          </div>
                          <div className="hidden sm:flex flex-col items-center justify-center w-1/4 h-full">
                            <span className="relative w-24 h-24 mt-10">
                              <ProfileIcon className="text-terminal-green" />
                            </span>
                            <span className="flex flex-col">
                              <DownArrowIcon className="self-center rotate-[-90deg] w-20" />
                              <p className="uppercase text-4xl">Mint</p>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center justify-start w-1/4">
                      <div className="relative flex flex-col bg-terminal-black border-4 border-terminal-green w-3/4 animate-pulse">
                        <div className={`flex flex-row`}>
                          {["str", "dex", "int", "vit", "wis", "cha"].map(
                            (stat) => (
                              <span
                                key={stat}
                                className={`w-full flex flex-col text-center`}
                              >
                                <p>{stat.toUpperCase()}</p>
                                <p>?</p>
                              </span>
                            )
                          )}
                        </div>
                        <NftCard
                          name={formData.name}
                          weapon={formData.startingWeapon}
                        />
                        <Button
                          className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1/2 h-20"
                          variant={"token"}
                          onClick={() => {
                            window.open(
                              networkConfig[network!].adventurerViewer,
                              "_blank"
                            );
                          }}
                        >
                          View Collection
                        </Button>
                      </div>
                    </div>
                  </div>
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
          </>
        )}
        {!paymentInitiated && (
          <div className="absolute sm:hidden bottom-16 left-0 right-0 flex flex-col items-center gap-4 z-10 pb-8">
            <Button
              size={"sm"}
              variant={"default"}
              onClick={() => setShowPaymentDetails(!showPaymentDetails)}
            >
              {showPaymentDetails ? "Hide Payment Details" : "Payment Details"}
            </Button>
          </div>
        )}
        {!paymentInitiated && (
          <div className="absolute bottom-5 sm:bottom-10 left-0 right-0 flex flex-row items-center justify-center gap-4 z-10 pb-8">
            <Button size={"sm"} variant={"outline"} onClick={handleBack}>
              Back
            </Button>
            <Button
              className="hidden sm:block"
              size={"sm"}
              variant={"default"}
              onClick={() => {
                handlePayment(true, true);
              }}
            >
              Pay to Play
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
