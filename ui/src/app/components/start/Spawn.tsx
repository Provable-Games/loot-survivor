import NftCard from "@/app/components/adventurer/NftCard";
import SpriteAnimation from "@/app/components/animations/SpriteAnimation";
import { Button } from "@/app/components/buttons/Button";
import { DownArrowIcon, ProfileIcon } from "@/app/components/icons/Icons";
import { TxActivity } from "@/app/components/navigation/TxActivity";
import useLoadingStore from "@/app/hooks/useLoadingStore";
import useNetworkAccount from "@/app/hooks/useNetworkAccount";
import { soundSelector, useUiSounds } from "@/app/hooks/useUiSound";
import useUIStore from "@/app/hooks/useUIStore";
import { getArcadeConnectors, getWalletConnectors } from "@/app/lib/connectors";
import { battle } from "@/app/lib/constants";
import { networkConfig } from "@/app/lib/networkConfig";
import { displayAddress } from "@/app/lib/utils";
import { FormData, GameToken } from "@/app/types";
import { useConnect } from "@starknet-react/core";
import Image from "next/image";
import Eth from "public/icons/eth-3.svg";
import Lords from "public/icons/lords.svg";
import { useEffect, useState } from "react";
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
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const [usableToken, setUsableToken] = useState<string>("0");
  const [isHoveringLords, setIsHoveringLords] = useState(false);
  const [isHoveringGolden, setIsHoveringGolden] = useState(false);
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

  const checkEnoughLords = lordsBalance! >= BigInt(25000000000000000000);

  const tokens = goldenTokenData?.getERC721Tokens;
  const goldenTokens: number[] = tokens?.map(
    (token: GameToken) => token.token_id
  );

  const goldenTokenExists = goldenTokens?.length > 0;
  // const goldenTokenExists = true;

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

  const { play: spawnPlay } = useUiSounds(soundSelector.spawn);
  const { play: coinPlay } = useUiSounds(soundSelector.coin);

  useEffect(() => {
    getUsableGoldenToken(goldenTokens ?? []);
  }, []);

  const handlePayment = async (goldenToken: boolean) => {
    spawnPlay();
    coinPlay();
    resetNotification();
    setPaymentInitiated(true);
    try {
      await spawn(
        formData,
        goldenToken ? usableToken : "0",
        networkConfig[network!].revenueAddresses,
        lordsGameCost
      );
      await getBalances();
    } catch (error) {
      console.error(error);
      setPaymentInitiated(false);
    }
  };

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
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-black" />
            <div className="absolute inset-0 left-0 right-0 flex flex-col items-center text-center gap-4 z-10 p-20">
              <span className="hidden sm:block">
                <TxActivity />
              </span>
              {!onKatana ? (
                <>
                  <div className="flex flex-row w-full h-full">
                    <div className="flex flex-col items-center justify-center gap-10 w-1/4 no-text-shadow">
                      <div className="flex flex-col border border-terminal-green b-5 bg-terminal-black text-terminal-green/75 uppercase w-full">
                        <h1 className="m-0 p-2 text-2xl">Breakdown</h1>
                        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
                          <div className="flex flex-row gap-2 items-center">
                            <p className="text-2xl">Base Fee</p>
                            <p className="text-terminal-green/50">Paid Now</p>
                          </div>
                          <div className="flex flex-row gap-2 items-center">
                            <Button
                              size={"xxs"}
                              className="bg-terminal-green/75"
                            >
                              Update Price
                            </Button>
                            <span className="flex flex-row gap-1 items-center">
                              <Lords className="self-center sm:w-4 sm:h-4  h-3 w-3 fill-current" />
                              <p>59</p>
                            </span>
                            <p>($3.10)</p>
                          </div>
                        </div>
                        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
                          <div className="flex flex-row gap-2 items-center">
                            <p className="text-2xl">Randomness</p>
                            <p className="text-terminal-green/50">Paid Now</p>
                          </div>
                          <div className="flex flex-row gap-2 items-center">
                            <Eth className="self-center sm:w-5 sm:h-5  h-3 w-3 fill-current" />
                            <p>$0.50</p>
                          </div>
                        </div>
                        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
                          <div className="flex flex-row gap-2 items-center">
                            <p className="text-2xl">Gas</p>
                            <p className="text-terminal-green/50">Paid Later</p>
                          </div>
                          <div className="flex flex-row gap-2 items-center">
                            <Eth className="self-center sm:w-5 sm:h-5  h-3 w-3 fill-current" />
                            <p>$0.10</p>
                          </div>
                        </div>
                        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green bg-terminal-green/75 text-terminal-black">
                          <p className="text-2xl">Total</p>
                          <p className="text-2xl">$3.60</p>
                        </div>
                      </div>
                      <div className="flex flex-col border border-terminal-green b-5 bg-terminal-black text-terminal-green/75 uppercase w-full">
                        <h1 className="m-0 p-2 text-2xl">Base Fee Payouts</h1>
                        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
                          <div className="flex flex-row gap-2 items-center">
                            <p className="text-2xl">1st</p>
                            <p className="text-2xl whitespace-nowrap text-left text-ellipsis overflow-hidden w-32">
                              Await
                            </p>
                            <p className="text-terminal-green/50">
                              {displayAddress("0x0")}
                            </p>
                          </div>
                          <div className="flex flex-row gap-2 items-center">
                            <p className="text-2xl">+</p>
                            <span className="flex flex-row gap-1 items-center">
                              <Lords className="self-center sm:w-4 sm:h-4  h-3 w-3 fill-current" />
                              <p>15.93</p>
                            </span>
                            <p>($0.85)</p>
                          </div>
                        </div>
                        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
                          <div className="flex flex-row gap-2 items-center">
                            <p className="text-2xl">2nd</p>
                            <p className="text-2xl whitespace-nowrap text-left text-ellipsis overflow-hidden w-32">
                              Goldemar
                            </p>
                            <p className="text-terminal-green/50">
                              {displayAddress("0x0")}
                            </p>
                          </div>
                          <div className="flex flex-row gap-2 items-center">
                            <p className="text-2xl">+</p>
                            <span className="flex flex-row gap-1 items-center">
                              <Lords className="self-center sm:w-4 sm:h-4  h-3 w-3 fill-current" />
                              <p>15.93</p>
                            </span>
                            <p>($0.85)</p>
                          </div>
                        </div>
                        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
                          <div className="flex flex-row gap-2 items-center">
                            <p className="text-2xl">3rd</p>
                            <p className="text-2xl whitespace-nowrap text-left text-ellipsis overflow-hidden w-32">
                              Influence Crewmate #10322
                            </p>
                            <p className="text-terminal-green/50">
                              {displayAddress("0x0")}
                            </p>
                          </div>
                          <div className="flex flex-row gap-2 items-center">
                            <p className="text-2xl">+</p>
                            <span className="flex flex-row gap-1 items-center">
                              <Lords className="self-center sm:w-4 sm:h-4  h-3 w-3 fill-current" />
                              <p>15.93</p>
                            </span>
                            <p>($0.85)</p>
                          </div>
                        </div>
                        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
                          <div className="flex flex-row gap-2 items-center">
                            <p className="text-2xl w-40 whitespace-nowrap text-left text-ellipsis overflow-hidden">
                              Client Provider
                            </p>
                            <p className="text-terminal-green/50">
                              {displayAddress("0x0")}
                            </p>
                          </div>
                          <div className="flex flex-row gap-2 items-center">
                            <p className="text-2xl">+</p>
                            <span className="flex flex-row gap-1 items-center">
                              <Lords className="self-center sm:w-4 sm:h-4  h-3 w-3 fill-current" />
                              <p>15.93</p>
                            </span>
                            <p>($0.85)</p>
                          </div>
                        </div>
                        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
                          <div className="flex flex-row gap-2 items-center">
                            <p className="text-2xl w-40 whitespace-nowrap text-left text-ellipsis overflow-hidden">
                              Creator
                            </p>
                            <p className="text-terminal-green/50">
                              {displayAddress("0x0")}
                            </p>
                          </div>
                          <div className="flex flex-row gap-2 items-center">
                            <p className="text-2xl">+</p>
                            <span className="flex flex-row gap-1 items-center">
                              <Lords className="self-center sm:w-4 sm:h-4  h-3 w-3 fill-current" />
                              <p>15.93</p>
                            </span>
                            <p>($0.85)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-1/2">
                      <div className="w-full h-full bg-black">
                        <div className="flex flex-row h-full">
                          <div className="flex flex-col items-center justify-center w-1/3 h-full">
                            <SpriteAnimation
                              frameWidth={200}
                              frameHeight={200}
                              columns={8}
                              rows={1}
                              frameRate={5}
                              className="coin-sprite"
                            />
                            <DownArrowIcon className="self-center rotate-90 w-32" />
                            <p className="uppercase text-4xl">IN</p>
                          </div>
                          <div className="flex flex-col gap-5 items-center justify-center w-1/3 h-full">
                            <h1 className="m-0 text-6xl uppercase">
                              Start Here
                            </h1>

                            <div
                              className="border-8 border-terminal-green w-full h-1/3 cursor-pointer"
                              onMouseEnter={() => setIsHoveringLords(true)}
                              onMouseLeave={() => setIsHoveringLords(false)}
                              onClick={() => handlePayment(false)}
                            >
                              <div className="flex flex-row h-full">
                                <div className="w-1/4 border-r-8 border-terminal-green bg-terminal-yellow/25" />
                                <div
                                  className={`flex flex-col gap-2 justify-center w-3/4 p-2 uppercase ${
                                    isHoveringLords
                                      ? "text-terminal-black bg-terminal-green animate-pulseFast"
                                      : "bg-terminal-green/20"
                                  }`}
                                >
                                  <span className="flex flex-row gap-1 items-center justify-center">
                                    <Lords className="self-center sm:w-16 sm:h-16  h-3 w-3 fill-current" />
                                    <p className="text-6xl no-text-shadow">
                                      59
                                    </p>
                                  </span>
                                  <span className="relative h-24 w-full">
                                    <Image
                                      src={
                                        isHoveringLords
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
                            <div
                              className="border-8 border-terminal-green w-full h-1/3 cursor-pointer"
                              onMouseEnter={() => setIsHoveringGolden(true)}
                              onMouseLeave={() => setIsHoveringGolden(false)}
                              onClick={() => {
                                if (goldenTokenExists) {
                                  handlePayment(true);
                                }
                              }}
                            >
                              <div className="flex flex-row h-full">
                                <div className="w-1/4 border-r-8 border-terminal-green bg-terminal-yellow/25" />
                                <div
                                  className={`relative flex flex-col gap-2 items-center justify-center w-3/4 p-2 uppercase ${
                                    isHoveringGolden && goldenTokenExists
                                      ? "text-terminal-black bg-terminal-green animate-pulseFast"
                                      : "bg-terminal-green/20"
                                  }`}
                                >
                                  {!goldenTokenExists && (
                                    <>
                                      <span className="absolute inset-0 w-full h-full bg-black/75 z-10" />
                                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                                        <a
                                          href={
                                            networkConfig[network!]
                                              .goldenTokenMintUrl
                                          }
                                          target="_blank"
                                        >
                                          <Button variant={"token"}>Buy</Button>
                                        </a>
                                      </span>
                                    </>
                                  )}
                                  <span className="relative h-24 w-3/4">
                                    <Image
                                      src={"/golden-token.png"}
                                      alt="golden-token"
                                      fill
                                    />
                                  </span>
                                  <span className="relative h-24 w-full">
                                    <Image
                                      src={
                                        isHoveringGolden && goldenTokenExists
                                          ? "/insert-golden-token-hover.png"
                                          : "/insert-golden-token.png"
                                      }
                                      alt="insert-lords"
                                      fill
                                    />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center w-1/3 h-full">
                            <span className="relative w-32 h-32 mt-14">
                              <ProfileIcon className="text-terminal-green" />
                            </span>
                            <span className="flex flex-col">
                              <DownArrowIcon className="self-center rotate-[-90deg] w-32" />
                              <p className="uppercase text-4xl">OUT</p>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-1/4">
                      <div className="relative flex flex-col bg-terminal-black border-4 border-terminal-green w-full">
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
                  {/* <div className="flex flex-col gap-2">
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
              )} */}
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
          <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 z-10 pb-8">
            <Button size={"sm"} variant={"default"} onClick={handleBack}>
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
