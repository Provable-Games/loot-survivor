import { Button } from "@/app/components/buttons/Button";
import {
  CoinIcon,
  DownArrowIcon,
  GiBruteIcon,
  PlusIcon,
  SkullIcon,
  SpikedWallIcon,
} from "@/app/components/icons/Icons";
import { TxActivity } from "@/app/components/navigation/TxActivity";
import PaymentDetails from "@/app/components/start/PaymentDetails";
import SeasonDetails from "@/app/components/start/SeasonDetails";
import {
  getBlobertlaimedFreeGames,
  getDeadAdventurersByXPPaginated,
} from "@/app/hooks/graphql/queries";
import useCustomQuery from "@/app/hooks/useCustomQuery";
import useLoadingStore from "@/app/hooks/useLoadingStore";
import useNetworkAccount from "@/app/hooks/useNetworkAccount";
import { soundSelector, useUiSounds } from "@/app/hooks/useUiSound";
import useUIStore from "@/app/hooks/useUIStore";
import { gameClient } from "@/app/lib/clients";
import { battle } from "@/app/lib/constants";
import { networkConfig } from "@/app/lib/networkConfig";
import { formatLords } from "@/app/lib/utils";
import { Adventurer, FormData } from "@/app/types";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Logo from "public/icons/logo.svg";
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
  startSeason: (...args: any[]) => any;
  handleBack: () => void;
  goldenTokens: number[];
  blobertsData: any;
  gameContract: Contract;
  getBalances: () => Promise<void>;
  costToPlay: bigint;
  lordsValue: bigint;
  tournamentPrizes: any;
}

export const Spawn = ({
  formData,
  spawn,
  startSeason,
  handleBack,
  goldenTokens,
  blobertsData,
  gameContract,
  getBalances,
  costToPlay,
  lordsValue,
  tournamentPrizes,
}: SpawnProps) => {
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const [usableGoldenToken, setUsableGoldenToken] = useState<string>("0");
  const [usableBlobertToken, setUsableBlobertToken] = useState<string>("0");
  const [isHoveringLords, setIsHoveringLords] = useState(false);
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
  const blobertTokenIds: number[] = blobertTokens?.map((token: any) =>
    Number(token.tokenId)
  );

  const client = useMemo(() => {
    if (!network) return null;
    return gameClient(networkConfig[network].lsGQLURL);
  }, [network]);

  const claimedFreeGameVariables = useMemo(() => {
    return {
      tokenIds: blobertTokenIds,
    };
  }, [blobertTokenIds]);

  const { data: claimedFreeGamesData } = useQuery(getBlobertlaimedFreeGames, {
    client,
    variables: claimedFreeGameVariables,
    skip: !client,
  });

  const getUsableBlobertToken = async (tokenIds: number[]) => {
    for (let tokenId of tokenIds) {
      const hasParticipatedInLaunch =
        claimedFreeGamesData?.claimedFreeGames?.some(
          (freeGame: any) => freeGame.tokenId === tokenId
        );

      if (hasParticipatedInLaunch) {
        const canPlay = await gameContract.call(
          "free_game_available",
          CallData.compile(["1", tokenId.toString()])
        );
        if (canPlay) {
          setUsableBlobertToken(tokenId.toString());
          break;
        }
      }
    }
  };

  const { play: spawnPlay } = useUiSounds(soundSelector.spawn);
  const { play: coinPlay } = useUiSounds(soundSelector.coin);

  const tournamentEnded = process.env.NEXT_PUBLIC_TOURNAMENT_ENDED === "true";
  const seasonActive = process.env.NEXT_PUBLIC_SEASON_ACTIVE === "true";

  useEffect(() => {
    const checkTokens = async () => {
      // Only check if we have new tokens to check
      if (goldenTokens?.length && usableGoldenToken === "0") {
        await getUsableGoldenToken(goldenTokens);
      }

      if (
        tournamentEnded &&
        blobertTokenIds?.length &&
        usableBlobertToken === "0"
      ) {
        await getUsableBlobertToken(blobertTokenIds);
      }
    };

    checkTokens();
  }, [goldenTokens, blobertTokenIds]);

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

  const enterSeason = async (goldenToken: boolean, blobertToken: boolean) => {
    spawnPlay();
    coinPlay();
    resetNotification();
    setPaymentInitiated(true);
    try {
      await startSeason(
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
      <div className="flex flex-col h-full sm:p-2">
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
            <Image
              className="mx-auto absolute object-cover sm:py-4 sm:px-8"
              src={"/scenes/intro/beast.png"}
              alt="adventurer facing beast"
              fill
            />
            <div className="absolute inset-0 bg-black opacity-60" />
            <div className="absolute inset-0 left-0 right-0 flex flex-col items-center text-center gap-4 z-10 sm:py-10 sm:px-20 mt-5 sm:mt-0">
              {!onKatana ? (
                <>
                  <div className="flex flex-col gap-5 items-center w-1/3">
                    <h1 className="m-0 text-4xl uppercase">Play</h1>
                    <div
                      className="border-8 border-terminal-green w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] cursor-pointer transition-transform duration-200 hover:scale-105 hover:rotate-3 hover:shadow-xl"
                      onMouseEnter={() => setIsHoveringLords(true)}
                      onMouseLeave={() => setIsHoveringLords(false)}
                      onClick={() => {
                        if (seasonActive) {
                          enterSeason(
                            usableGoldenToken !== "0",
                            usableBlobertToken !== "0"
                          );
                        } else {
                          handlePayment(
                            usableGoldenToken !== "0",
                            usableBlobertToken !== "0"
                          );
                        }
                      }}
                    >
                      <div className="flex flex-row h-full w-full">
                        <div className="w-1/4 border-[10px] border-terminal-green bg-terminal-black shadow-inner" />
                        <div
                          className={`flex flex-col sm:gap-2 justify-center w-3/4 p-2 uppercase ${
                            isHoveringLords
                              ? "text-terminal-black bg-terminal-green animate-pulseFast"
                              : "bg-terminal-black"
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
                              <Image src="/blobert.png" alt="blobert" fill />
                            </span>
                          ) : (
                            <span className="flex flex-row gap-1 items-center justify-center">
                              <Lords className="self-center w-10 h-10 sm:w-16 sm:h-16 fill-current" />
                              <p className="text-4xl sm:text-6xl no-text-shadow">
                                {formatLords(lordsGameCost)}
                              </p>
                            </span>
                          )}
                          <span className="relative h-32 w-full">
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
                  <div
                    className={`hidden sm:flex flex-row items-center w-full`}
                  >
                    <div className="w-1/3 flex flex-col gap-5 items-center border border-terminal-green p-5 top-[-50px]">
                      <div className="flex flex-col items-center w-full">
                        <Logo className="w-2/3" />
                        <h3 className="text-4xl uppercase">Instructions</h3>
                      </div>
                      <ol className="list-none text-left list-inside uppercase w-full space-y-2">
                        <li className="flex items-center gap-2">
                          1. Insert Tokens{" "}
                          <Lords className="fill-current w-5 h-5" />
                        </li>
                        <li className="flex items-center gap-2">
                          2. Defeat the Beast
                          <GiBruteIcon className="w-6 h-6" />
                        </li>
                        <li className="flex flex-row items-center gap-2">
                          3. Choose your stat upgrades
                          <DownArrowIcon className="h-5 transform rotate-180" />
                        </li>
                        <li className="flex flex-row items-center gap-2">
                          4. Purchase items with gold on the market{" "}
                          <CoinIcon className="text-terminal-yellow fill-current w-6 h-6" />
                        </li>
                        <li className="flex flex-row items-center gap-2">
                          5. Explore, discover and dodge obstacles
                          <SpikedWallIcon className="fill-current w-6 h-6" />
                        </li>
                        <li className="flex flex-row items-center gap-2">
                          6. Die
                          <SkullIcon className="fill-current w-6 h-6" />
                        </li>
                      </ol>
                    </div>
                    <div className="relative w-1/3 flex flex-col gap-2 items-center justify-center">
                      <DownArrowIcon className="w-6 sm:w-10 text-terminal-green/75" />
                      <div className="hidden sm:flex w-2/3">
                        <PaymentDetails adventurers={adventurers} />
                      </div>
                    </div>
                    {seasonActive && (
                      <div className="hidden relative sm:flex flex-row items-center justify-start w-1/3">
                        <PlusIcon className="absolute left-[-50px] w-10 text-terminal-green/75" />
                        <SeasonDetails
                          prizes={tournamentPrizes}
                          lordsValue={lordsValue}
                        />
                      </div>
                    )}
                  </div>
                  <div className="relative flex flex-row justify-center sm:hidden w-full h-full">
                    <div className="w-1/2">
                      <PaymentDetails adventurers={adventurers} />
                    </div>
                    {seasonActive && (
                      <PlusIcon className="absolute left-1/2 top-1/3 -translate-x-1/2 w-8 text-terminal-yellow" />
                    )}
                    {seasonActive && (
                      <div className="w-1/2">
                        <SeasonDetails
                          prizes={tournamentPrizes}
                          lordsValue={lordsValue}
                        />
                      </div>
                    )}
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
          <div className="absolute bottom-5 sm:bottom-10 sm:left-32 2xl:left-0 2xl:right-0 flex flex-row items-center 2xl:justify-center gap-4 z-10 pb-8">
            <Button size={"sm"} variant={"outline"} onClick={handleBack}>
              Back
            </Button>
            <Button
              size={"sm"}
              variant={"default"}
              onClick={() => {
                if (seasonActive) {
                  enterSeason(
                    usableGoldenToken !== "0",
                    usableBlobertToken !== "0"
                  );
                } else {
                  handlePayment(
                    usableGoldenToken !== "0",
                    usableBlobertToken !== "0"
                  );
                }
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
