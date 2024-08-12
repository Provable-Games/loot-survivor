import React, { useState, useEffect } from "react";
import { Contract } from "starknet";
import { BattleDisplay } from "@/app/components/beast/BattleDisplay";
import { BeastDisplay } from "@/app/components/beast/BeastDisplay";
import useLoadingStore from "@/app/hooks/useLoadingStore";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import { useQueriesStore } from "@/app/hooks/useQueryStore";
import { processBeastName, getItemData, getBeastData } from "@/app/lib/utils";
import { Battle, NullBeast, ButtonData, Beast } from "@/app/types";
import { Button } from "@/app/components/buttons/Button";
import useUIStore from "@/app/hooks/useUIStore";
import ActionMenu from "@/app/components/menu/ActionMenu";
import { useController } from "@/app/context/ControllerContext";
import {
  getGoldReward,
  nextAttackResult,
  simulateBattle,
  simulateFlee,
} from "@/app/lib/utils/processFutures";
import {
  GiBattleGearIcon,
  HeartIcon,
  SkullCrossedBonesIcon,
  CompleteIcon,
} from "@/app/components/icons/Icons";
import { FleeDialog } from "@/app/components/FleeDialog";
import { BattleDialog } from "@/app/components/BattleDialog";
import { useUiSounds, soundSelector } from "@/app/hooks/useUiSound";

interface BeastScreenProps {
  attack: (
    tillDeath: boolean,
    beastData: Beast,
    blockHash?: string
  ) => Promise<void>;
  flee: (tillDeath: boolean, beastData: Beast) => Promise<void>;
  beastsContract: Contract;
}

/**
 * @container
 * @description Provides the beast screen for adventurer battles.
 */
export default function BeastScreen({
  attack,
  flee,
  beastsContract,
}: BeastScreenProps) {
  const adventurer = useAdventurerStore((state) => state.adventurer);
  const loading = useLoadingStore((state) => state.loading);
  const estimatingFee = useUIStore((state) => state.estimatingFee);
  const adventurerEntropy = useUIStore((state) => state.adventurerEntropy);
  const battleDialog = useUIStore((state) => state.battleDialog);
  const fleeDialog = useUIStore((state) => state.fleeDialog);
  const showBattleDialog = useUIStore((state) => state.showBattleDialog);
  const showFleeDialog = useUIStore((state) => state.showFleeDialog);
  const tillDeath = useUIStore((state) => state.tillDeath);
  const setTillDeath = useUIStore((state) => state.setTillDeath);
  const resetNotification = useLoadingStore((state) => state.resetNotification);
  const [showBattleLog, setShowBattleLog] = useState(false);
  const [showFutures, setShowFutures] = useState(false);
  const hasBeast = useAdventurerStore((state) => state.computed.hasBeast);
  const isAlive = useAdventurerStore((state) => state.computed.isAlive);
  const beastData = useQueriesStore(
    (state) => state.data.beastQuery?.beasts[0] || NullBeast
  );
  const formatBattles = useQueriesStore(
    (state) => state.data.battlesByBeastQuery?.battles || []
  );

  const { play: clickPlay } = useUiSounds(soundSelector.click);

  const handleAttack = async () => {
    resetNotification();
    await attack(tillDeath, beastData);
  };

  const handleFlee = async () => {
    resetNotification();
    await flee(tillDeath, beastData);
  };

  const { addControl } = useController();

  useEffect(() => {
    addControl("a", () => {
      console.log("Key a pressed");
      handleAttack();
      clickPlay();
    });
    addControl("s", () => {
      console.log("Key s pressed");
      handleAttack();
      clickPlay();
    });
    addControl("f", () => {
      console.log("Key f pressed");
      handleFlee();
      clickPlay();
    });
    addControl("g", () => {
      console.log("Key g pressed");
      handleFlee();
      clickPlay();
    });
  }, []);

  const attackButtonsData: ButtonData[] = [
    {
      id: 1,
      label: "ATTACK",
      action: async () => {
        handleAttack();
      },
      disabled:
        adventurer?.beastHealth == undefined ||
        adventurer?.beastHealth == 0 ||
        loading ||
        estimatingFee,
      loading: loading,
      className:
        "bg-terminal-green-50 hover:bg-terminal-green hover:text-black justify-center px-2 sm:px-0",
    },
    {
      id: 1,
      label: "FLEE",
      tip: adventurer?.dexterity === 0 ? "No DEX" : "",
      action: async () => {
        handleFlee();
      },
      disabled:
        adventurer?.beastHealth == undefined ||
        adventurer?.beastHealth == 0 ||
        loading ||
        adventurer?.level == 1 ||
        adventurer.dexterity === 0 ||
        estimatingFee,
      loading: loading,
      className:
        "bg-terminal-yellow-50 hover:bg-terminal-yellow hover:text-black justify-center px-2 sm:px-0",
    },
  ];

  const [attackDetails, setAttackDetails] = useState<any>();
  const [battleDetails, setBattleDetails] = useState<any>();
  const [fleeDetails, setFleeDetails] = useState<any>();
  const [goldReward, setGoldReward] = useState<number>(0);

  const { data } = useQueriesStore();

  useEffect(() => {
    if (
      !data.itemsByAdventurerQuery ||
      !beastData ||
      !adventurer?.beastHealth ||
      !isAlive ||
      !adventurerEntropy
    )
      return;

    let items: any = data.itemsByAdventurerQuery?.items
      .filter((item) => item.equipped)
      .map((item) => ({
        item: item.item,
        ...getItemData(item.item ?? ""),
        special2: item.special2,
        special3: item.special3,
        xp: Math.max(1, item.xp!),
      }));

    const beastDetails = {
      ...getBeastData(beastData?.beast ?? ""),
      special2: beastData?.special2,
      special3: beastData?.special3,
      level: beastData.level,
      seed: beastData.seed,
    };

    if (!goldReward) {
      setGoldReward(
        getGoldReward(
          items,
          beastDetails,
          adventurer.xp!,
          BigInt(adventurerEntropy)
        )
      );
    }

    setAttackDetails(
      nextAttackResult(
        items,
        beastDetails,
        adventurer,
        BigInt(adventurerEntropy)
      )
    );
    setFleeDetails(
      simulateFlee(items, beastDetails, adventurer, BigInt(adventurerEntropy))
    );
    setBattleDetails(
      simulateBattle(items, beastDetails, adventurer, BigInt(adventurerEntropy))
    );
  }, [
    data.itemsByAdventurerQuery,
    beastData,
    adventurerEntropy,
    adventurer?.beastHealth,
  ]);

  const beastName = processBeastName(
    beastData?.beast ?? "",
    beastData?.special2 ?? "",
    beastData?.special3 ?? ""
  );

  const BattleLog: React.FC = () => (
    <div className="flex flex-col p-2 items-center h-full">
      <Button
        className="w-1/2 sm:hidden"
        onClick={() => setShowBattleLog(false)}
      >
        Back
      </Button>
      <div className="flex flex-col items-center gap-5 h-full">
        <div className="text-xl uppercase">
          Battle log with {beastData?.beast}
        </div>
        <div className="flex flex-col gap-2 ext-sm overflow-y-auto default-scroll h-full text-center">
          {formatBattles.map((battle: Battle, index: number) => (
            <div className="border p-2 border-terminal-green" key={index}>
              <BattleDisplay battleData={battle} beastName={beastName} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (showBattleLog) {
    return <BattleLog />;
  }

  return (
    <div className="sm:w-2/3 flex flex-col sm:flex-row h-full">
      <div className="sm:w-1/2 order-1 sm:order-2 h-3/4 sm:h-full">
        {hasBeast ? (
          <BeastDisplay beastData={beastData} beastsContract={beastsContract} />
        ) : (
          <div className="flex flex-col items-center border-2 border-terminal-green">
            <p className="m-auto text-lg uppercase text-terminal-green">
              Beast not yet discovered.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 sm:gap-5 items-center sm:w-1/2 order-1 text-lg h-1/4 sm:h-full">
        {isAlive && (
          <>
            <>
              <div className="sm:hidden flex items-center justify-center w-full h-3/4">
                <div className="flex flex-col gap-2 items-center w-3/4 h-3/4 sm:h-full">
                  <ActionMenu
                    buttonsData={attackButtonsData}
                    size={"fill"}
                    title="Battle"
                  />
                  <div className="flex flex-row gap-2 items-center text-xs text-terminal-green">
                    <span
                      onClick={() => setTillDeath(!tillDeath)}
                      className="border border-terminal-green w-6 h-6 cursor-pointer"
                    >
                      {tillDeath && <CompleteIcon />}
                    </span>
                    <span className="uppercase">Till Death</span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex flex-col gap-5 items-center h-1/3 w-3/4">
                <div className="h-1/2 w-full">
                  <ActionMenu
                    buttonsData={attackButtonsData}
                    size={"fill"}
                    title="Battle"
                  />
                </div>
                <div className="flex flex-row gap-2 items-center text-xs text-terminal-green">
                  <span
                    onClick={() => setTillDeath(!tillDeath)}
                    className="border border-terminal-green w-10 h-10 cursor-pointer"
                  >
                    {tillDeath && <CompleteIcon />}
                  </span>
                  <span className="uppercase text-xl">Till Death</span>
                </div>
              </div>
            </>
          </>
        )}

        <div className="hidden sm:block h-2/3">
          {(hasBeast || formatBattles.length > 0) && <BattleLog />}
        </div>

        {!showFutures && (
          <span className="flex flex-row gap-5 sm:hidden">
            <Button
              className="uppercase"
              onClick={() => setShowBattleLog(true)}
            >
              Battle log with {beastData?.beast}
            </Button>

            <>
              {adventurer?.level! > 1 && (
                <Button
                  className="uppercase"
                  onClick={() => setShowFutures(!showFutures)}
                >
                  Show Futures
                </Button>
              )}
            </>
          </span>
        )}

        {isAlive && hasBeast && attackDetails && showFutures && (
          <div className="sm:hidden px-2">
            <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm h-full text-center uppercase">
              <div className="border p-2 sm:px-10 border-terminal-green flex flex-col justify-center items-center gap-0.5 text-xs sm:text-sm">
                <span className="hidden sm:block">Battle Result</span>

                {battleDetails.success && (
                  <span className="flex gap-1 items-center text-terminal-yellow">
                    Success!
                    <GiBattleGearIcon />
                  </span>
                )}

                {!battleDetails.success && (
                  <span className="flex gap-1 items-center text-red-500">
                    Failure!
                    <SkullCrossedBonesIcon />
                  </span>
                )}

                <span className="flex gap-1 items-center">
                  {battleDetails.healthLeft} Health left
                  <HeartIcon className="self-center w-4 h-4 fill-current" />
                </span>

                <Button
                  variant={"link"}
                  className="hidden sm:block sm:h-4 mt-1"
                  onClick={() => showBattleDialog(true)}
                >
                  <span
                    className="text-xs"
                    style={{ color: "rgba(255, 255, 255, 0.4)" }}
                  >
                    Details
                  </span>
                </Button>
              </div>

              <Button
                className="uppercase"
                onClick={() => setShowFutures(!showFutures)}
              >
                Close Futures
              </Button>

              <div className="border p-2 sm:px-10 border-terminal-green flex flex-col justify-center items-center gap-0.5 text-xs sm:text-sm">
                <span className="hidden sm:block">Flee Result</span>

                {fleeDetails.flee && (
                  <span className="flex gap-1 items-center text-terminal-yellow">
                    Success!
                    <GiBattleGearIcon />
                  </span>
                )}

                {!fleeDetails.flee && (
                  <span className="flex gap-1 items-center text-red-500">
                    Failure!
                    <SkullCrossedBonesIcon />
                  </span>
                )}

                <span className="flex gap-1 items-center">
                  {fleeDetails.healthLeft} Health left
                  <HeartIcon className="self-center w-4 h-4 fill-current" />
                </span>

                <Button
                  variant={"link"}
                  className="hidden sm:block sm:h-4 mt-1"
                  onClick={() => showFleeDialog(true)}
                >
                  <span
                    className="text-xs"
                    style={{ color: "rgba(255, 255, 255, 0.4)" }}
                  >
                    Details
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {isAlive && hasBeast && attackDetails && (
          <div className="hidden sm:flex px-2">
            <div className="flex gap-20 sm:gap-3 text-xs sm:text-sm h-full text-center uppercase">
              <div className="border p-2 sm:px-10 border-terminal-green flex flex-col justify-center items-center gap-0.5 text-xs sm:text-sm">
                <span className="hidden sm:block">Battle Result</span>

                {battleDetails.success && (
                  <span className="flex gap-1 items-center text-terminal-yellow">
                    Success!
                    <GiBattleGearIcon />
                  </span>
                )}

                {!battleDetails.success && (
                  <span className="flex gap-1 items-center text-red-500">
                    Failure!
                    <SkullCrossedBonesIcon />
                  </span>
                )}

                <span className="flex gap-1 items-center">
                  {battleDetails.healthLeft} Health left
                  <HeartIcon className="self-center w-4 h-4 fill-current" />
                </span>

                <Button
                  variant={"link"}
                  className="hidden sm:block sm:h-4 mt-1"
                  onClick={() => showBattleDialog(true)}
                >
                  <span
                    className="text-xs"
                    style={{ color: "rgba(255, 255, 255, 0.4)" }}
                  >
                    Details
                  </span>
                </Button>
              </div>

              <div className="border p-2 sm:px-10 border-terminal-green flex flex-col justify-center items-center gap-0.5 text-xs sm:text-sm">
                {adventurer?.dexterity !== 0 ? (
                  <>
                    <span className="hidden sm:block">Flee Result</span>

                    {fleeDetails.flee && (
                      <span className="flex gap-1 items-center text-terminal-yellow">
                        Success!
                        <GiBattleGearIcon />
                      </span>
                    )}

                    {!fleeDetails.flee && (
                      <span className="flex gap-1 items-center text-red-500">
                        Failure!
                        <SkullCrossedBonesIcon />
                      </span>
                    )}

                    <span className="flex gap-1 items-center">
                      {fleeDetails.healthLeft} Health left
                      <HeartIcon className="self-center w-4 h-4 fill-current" />
                    </span>

                    <Button
                      variant={"link"}
                      className="hidden sm:block sm:h-4 mt-1"
                      onClick={() => showFleeDialog(true)}
                    >
                      <span
                        className="text-xs"
                        style={{ color: "rgba(255, 255, 255, 0.4)" }}
                      >
                        Details
                      </span>
                    </Button>
                  </>
                ) : (
                  <div className="text-red-500">No DEX</div>
                )}
              </div>
            </div>
          </div>
        )}

        {battleDialog && battleDetails?.events && (
          <BattleDialog events={battleDetails.events} />
        )}
        {fleeDialog && fleeDetails?.events && (
          <FleeDialog events={fleeDetails.events} success={fleeDetails.flee} />
        )}
      </div>
    </div>
  );
}
