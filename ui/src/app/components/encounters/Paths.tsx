import { Button } from "@/app/components/buttons/Button";
import {
  BladeIcon,
  BludgeonIcon,
  CoinIcon,
  DownArrowIcon,
  HeartVitalityIcon,
  MagicIcon,
} from "@/app/components/icons/Icons";
import LootIcon from "@/app/components/icons/LootIcon";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import { useQueriesStore } from "@/app/hooks/useQueryStore";
import useUIStore from "@/app/hooks/useUIStore";
import { GameData } from "@/app/lib/data/GameData";
import { calculateLevel, getItemData, getPotionPrice } from "@/app/lib/utils";
import { Step } from "@/app/lib/utils/processFutures";
import { Item } from "@/app/types";
import React, { useMemo, useState } from "react";
import {
  getItems,
  getPaths,
  getPurchaseItemsObjects,
  getUpdatedAdventurer,
} from "./utils";

const Paths = () => {
  const adventurer = useAdventurerStore((state) => state.adventurer);
  const adventurerEntropy = useUIStore((state) => state.adventurerEntropy);
  const hasBeast = useAdventurerStore((state) => state.computed.hasBeast);

  const upgrades = useUIStore((state) => state.upgrades);
  const potionAmount = useUIStore((state) => state.potionAmount);
  const purchaseItems = useUIStore((state) => state.purchaseItems);

  const [selectedBeastEncounter, setSelectedBeastEncounter] =
    useState<Step | null>(null);

  const { data } = useQueriesStore();

  let gameData = new GameData();

  let armoritems: Item[] =
    data.itemsByAdventurerQuery?.items
      .map((item) => ({ ...item, ...getItemData(item.item ?? "") }))
      .filter((item) => {
        return !["Weapon", "Ring", "Neck"].includes(item.slot!);
      }) || [];

  let weaponItems: Item[] =
    data.itemsByAdventurerQuery?.items
      .map((item) => ({ ...item, ...getItemData(item.item ?? "") }))
      .filter((item) => {
        return item.slot! === "Weapon";
      }) || [];

  const purchaseItemsObjects = useMemo(
    () => getPurchaseItemsObjects(purchaseItems, gameData),
    [purchaseItems]
  );

  const updatedAdventurer = useMemo(
    () =>
      getUpdatedAdventurer(
        adventurer,
        upgrades,
        potionAmount,
        purchaseItemsObjects
      ),
    [
      adventurer,
      upgrades.Charisma,
      upgrades.Intelligence,
      upgrades.Wisdom,
      upgrades.Strength,
      upgrades.Dexterity,
      upgrades.Vitality,
      potionAmount,
      purchaseItemsObjects,
    ]
  );

  const items = useMemo(
    () => getItems(purchaseItems, data, gameData),
    [data.itemsByAdventurerQuery?.items, purchaseItemsObjects]
  );

  const outcomesWithPath = useMemo(
    () =>
      getPaths(
        updatedAdventurer,
        adventurerEntropy,
        items,
        gameData,
        data,
        hasBeast
      ),
    [updatedAdventurer, updatedAdventurer?.xp, adventurerEntropy, items]
  );

  const startingLevel = adventurer?.level;

  return (
    <>
      {updatedAdventurer?.entropy &&
        (selectedBeastEncounter === null ? (
          outcomesWithPath.map((steps: Step[], index: number) => (
            <div key={index} className="mt-2">
              <div className="uppercase ml-2">
                Path {steps.map((step) => step.previousDecision).join(" -> ")}
              </div>
              <table className="border-separate border-spacing-0 w-full sm:text-sm xl:text-sm 2xl:text-sm block overflow-x-scroll sm:overflow-y-scroll default-scroll p-2">
                <thead
                  className="border border-terminal-green sticky top-0 bg-terminal-black uppercase"
                  style={{ zIndex: 8 }}
                >
                  <tr className="border border-terminal-green">
                    <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                      XP
                    </th>
                    <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                      Type
                    </th>
                    <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                      Encounter
                    </th>
                    <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                      HP
                    </th>
                    <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                      Type
                    </th>
                    <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                      Location
                    </th>
                    <th className="relative py-2 px-1 border-b border-terminal-green">
                      Avoid
                    </th>
                    <th className="relative py-2 px-1 border-b border-terminal-green">
                      Tip
                    </th>
                    <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                      Crit
                    </th>
                    <th className="py-2 px-1 border-b border-terminal-green">
                      Next (Lvl)
                    </th>
                    <th className="py-2 px-1 border-b border-terminal-green">
                      Ambush
                    </th>
                    <th className="py-2 px-1 border-b border-terminal-green">
                      Gold after
                    </th>
                    <th className="py-2 px-1 border-b border-terminal-green">
                      Health after
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {adventurerEntropy ? (
                    React.Children.toArray(
                      steps.map(({ encounter, adventurer }, index) => {
                        if (!encounter && adventurer.health! <= 0) {
                          return (
                            <tr>
                              <td className="uppercase text-red-500">
                                <span className="flex flex-row">Death</span>
                              </td>
                            </tr>
                          );
                        }
                        const nextAdventurerState =
                          steps[index + 1]?.adventurer || adventurer;
                        if (!encounter) {
                          let levelUps =
                            calculateLevel(adventurer.xp || 4) -
                            (startingLevel || 1);

                          return (
                            <tr>
                              <td aria-colspan={12}>
                                <span className="flex flex-row gap-1 justify-center">
                                  {"Level Up!"}
                                  <span className="text-terminal-yellow flex">
                                    {Array.from({ length: levelUps }).map(
                                      (_, index) => (
                                        <DownArrowIcon
                                          key={index}
                                          className="h-4 transform rotate-180"
                                        />
                                      )
                                    )}
                                  </span>
                                </span>
                              </td>
                            </tr>
                          );
                        }
                        let [special2, special3] = encounter.specialName?.split(
                          " "
                        ) || ["no", "no"];
                        let nameMatch =
                          encounter.encounter === "Beast" &&
                          encounter.level! >= 19
                            ? armoritems.find(
                                (item) =>
                                  item.special2 === special2 ||
                                  item.special3 === special3
                              )
                            : false;
                        let weaponMatch =
                          encounter.encounter === "Beast" &&
                          encounter.level! >= 19
                            ? weaponItems.find(
                                (item) =>
                                  item.special2 === special2 ||
                                  item.special3 === special3
                              )
                            : false;

                        return (
                          <tr
                            className={
                              encounter.encounter === "Beast"
                                ? "cursor-pointer hover:bg-terminal-green-50 hover:text-terminal-black"
                                : ""
                            }
                            onClick={() => {
                              if (encounter.encounter === "Beast") {
                                setSelectedBeastEncounter(steps[index]);
                              }
                            }}
                          >
                            <td className="py-2 border-b border-terminal-green">
                              <span className="flex">{encounter.xp}</span>
                            </td>
                            <td
                              className={`py-2 border-b border-terminal-green tooltip flex flex-row gap-1 ${
                                nameMatch
                                  ? "text-red-500"
                                  : weaponMatch
                                  ? "text-green-500"
                                  : "text-terminal-yellow"
                              }`}
                            >
                              <span className="uppercase">
                                {encounter.encounter}
                              </span>
                              {encounter.encounter === "Beast" &&
                                (encounter?.level || 1) >= 19 && (
                                  <span className="tooltiptext bottom">
                                    {encounter.specialName}
                                  </span>
                                )}
                            </td>
                            <td className="py-2 border-b border-terminal-green">
                              <span className="flex justify-center">
                                {encounter.encounter !== "Discovery" && (
                                  <div className="relative flex flex-row gap-1 items-center justify-center w-full">
                                    <span className="text-xs">PWR</span>
                                    <span>{encounter.power}</span>
                                    <span className="absolute bottom-[-10px] text-terminal-yellow text-xs">
                                      T{encounter.tier} L{encounter.level}
                                    </span>
                                  </div>
                                )}
                                {encounter.type === "Health" && (
                                  <div className="flex items-center">
                                    {" "}
                                    <HeartVitalityIcon className="h-3 pl-0.5" />
                                    {encounter.tier}{" "}
                                  </div>
                                )}
                                {encounter.type === "Gold" && (
                                  <div className="flex items-center">
                                    {" "}
                                    <CoinIcon className="pl-0.5 mt-0.5 self-center h-4 fill-current text-terminal-yellow" />
                                    {encounter.tier}{" "}
                                  </div>
                                )}
                                {encounter.type === "Loot" && (
                                  <div className="flex items-center">
                                    {" "}
                                    {
                                      gameData.ITEMS[encounter.tier as number]
                                    }{" "}
                                    <LootIcon
                                      type={
                                        gameData.ITEM_SLOTS[
                                          gameData.ITEMS[
                                            encounter.tier as number
                                          ].replace(/\s+/g, "")
                                        ]
                                      }
                                      size={"w-4"}
                                      className="pl-0.5 mt-0.5 self-center h-4 fill-current text-terminal-yellow"
                                    />
                                  </div>
                                )}
                              </span>
                            </td>
                            <td className="py-2 border-b border-terminal-green">
                              <span className="flex justify-center">
                                {encounter.health}
                              </span>
                            </td>
                            <td className="py-2 border-b border-terminal-green">
                              <span className="relative flex justify-center gap-1 items-center uppercase">
                                {encounter.encounter === "Beast" ? (
                                  (encounter.type === "Blade" && "Hunter") ||
                                  (encounter.type === "Bludgeon" && "Brute") ||
                                  (encounter.type === "Magic" && "Magical")
                                ) : (
                                  <>
                                    {encounter.type === "Blade" && (
                                      <BladeIcon className="h-4" />
                                    )}
                                    {encounter.type === "Bludgeon" && (
                                      <BludgeonIcon className="h-4" />
                                    )}
                                    {encounter.type === "Magic" && (
                                      <MagicIcon className="h-4" />
                                    )}
                                  </>
                                )}
                              </span>
                            </td>
                            <td className="py-2 border-b border-terminal-green">
                              <span className="flex justify-center">
                                {encounter.location}
                              </span>
                            </td>
                            <td className="py-2 border-b border-terminal-green">
                              <span className="flex justify-center uppercase">
                                {encounter.dodgeRoll &&
                                (encounter.encounter === "Beast"
                                  ? adventurer?.wisdom!
                                  : adventurer?.intelligence!) >=
                                  encounter.dodgeRoll
                                  ? "Yes"
                                  : "No"}
                              </span>
                            </td>
                            <td className="py-2 border-b border-terminal-green">
                              <span className="flex gap-1 justify-center uppercase text-terminal-yellow">
                                {encounter.dodgeRoll && (
                                  <>
                                    <span>
                                      {encounter.encounter === "Beast"
                                        ? "WIS"
                                        : "INT"}
                                    </span>
                                    <span>{encounter.dodgeRoll}</span>
                                  </>
                                )}
                              </span>
                            </td>
                            <td
                              className={`py-2 border-b border-terminal-green ${
                                encounter.isCritical!
                                  ? "text-red-500"
                                  : encounter.isCritical!
                                  ? "text-terminal-yellow"
                                  : ""
                              }`}
                            >
                              {encounter.isCritical! && (
                                <span className="flex justify-center">
                                  {encounter.isCritical!
                                    ? `${encounter.isCritical}%`
                                    : "No"}
                                </span>
                              )}
                            </td>
                            <td className="py-2 border-b border-terminal-green">
                              <span className="flex justify-center text-terminal-yellow">
                                {nextAdventurerState.xp} (
                                {calculateLevel(Number(nextAdventurerState.xp))}
                                )
                              </span>
                            </td>
                            <td className="py-2 border-b border-terminal-green">
                              {encounter.encounter === "Obstacle" &&
                                encounter.dodgeRoll! >
                                  adventurer?.intelligence! && (
                                  <span className="flex justify-center">
                                    -{encounter.damage}hp
                                  </span>
                                )}

                              {encounter.encounter === "Beast" &&
                                encounter.dodgeRoll! > adventurer?.wisdom! && (
                                  <span className="flex justify-center">
                                    -{encounter.damage}hp
                                  </span>
                                )}
                            </td>
                            <td className="py-2 border-b border-terminal-green">
                              <span className="flex justify-center uppercase">
                                {
                                  <span className="flex flex-row items-center text-terminal-yellow">
                                    <CoinIcon className="h-4 fill-current text-terminal-yellow" />
                                    {nextAdventurerState.gold! -
                                      potionAmount *
                                        getPotionPrice(
                                          adventurer.level!,
                                          adventurer.charisma!
                                        )}
                                  </span>
                                }
                              </span>
                            </td>
                            <td className="py-2 border-b border-terminal-green">
                              <span className="flex justify-center">
                                {nextAdventurerState?.health}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )
                  ) : (
                    <tr className="flex items-center h-10 absolute">
                      <td aria-colspan={12}>
                        <span className="p-4">Waiting for new entropy...</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-2 mt-5">
            <div className="flex flex-row items-center gap-5 uppercase">
              <Button
                className="w-1/6"
                size="xs"
                onClick={() => setSelectedBeastEncounter(null)}
              >
                Close
              </Button>
            </div>
            <div className="flex flex-row overflow-hidden">
              <div className="flex flex-col">
                <p className="uppercase ml-2">Fight Details</p>
                <table className="border-separate border-spacing-0 w-full sm:text-sm xl:text-sm 2xl:text-sm block p-2">
                  <thead
                    className="border border-terminal-green sticky top-0 bg-terminal-black uppercase"
                    style={{ zIndex: 8 }}
                  >
                    <tr className="border border-terminal-green">
                      <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                        Type
                      </th>
                      <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                        Location
                      </th>
                      <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                        Strength
                      </th>
                      <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                        Critical
                      </th>
                      <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                        Damage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBeastEncounter?.battleDetails?.map(
                      (event, index) => (
                        <tr key={index}>
                          <td className="py-2 border-b border-terminal-green">
                            <span
                              className={`uppercase ${
                                event.type === "beast_attack" &&
                                "text-terminal-yellow"
                              }`}
                            >
                              {event.type === "adventurer_attack"
                                ? "Attack"
                                : "Counterattack"}
                            </span>
                          </td>
                          <td className="py-2 border-b border-terminal-green">
                            <span className="flex justify-center uppercase">
                              {event.location}
                            </span>
                          </td>
                          <td className="py-2 border-b border-terminal-green">
                            <span className="flex justify-center uppercase">
                              {event.beastDamageType}
                            </span>
                          </td>
                          <td className="py-2 border-b border-terminal-green">
                            <span className="flex justify-center uppercase">
                              {event.isCriticalHit ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="py-2 border-b border-terminal-green">
                            <span className="flex justify-center uppercase">
                              {event.totalDamage}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col">
                <p className="uppercase ml-2">Flee Attacks</p>
                <table className="border-separate border-spacing-0 w-full sm:text-sm xl:text-sm 2xl:text-sm block overflow-x-scroll sm:overflow-y-scroll default-scroll p-2">
                  <thead
                    className="border border-terminal-green sticky top-0 bg-terminal-black uppercase"
                    style={{ zIndex: 8 }}
                  >
                    <tr className="border border-terminal-green">
                      <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                        Type
                      </th>
                      <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                        Location
                      </th>
                      <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                        Strength
                      </th>
                      <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                        Critical
                      </th>
                      <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                        Damage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBeastEncounter?.fleeDetails?.map(
                      (event, index) => (
                        <tr key={index}>
                          <td className="py-2 border-b border-terminal-green">
                            <span
                              className={`uppercase ${
                                event.type === "beast_attack" &&
                                "text-terminal-yellow"
                              }`}
                            >
                              {event.type === "beast_attack"
                                ? "Counterattack"
                                : "Attack"}
                            </span>
                          </td>
                          <td className="py-2 border-b border-terminal-green">
                            <span className="flex justify-center uppercase">
                              {event.location}
                            </span>
                          </td>
                          <td className="py-2 border-b border-terminal-green">
                            <span className="flex justify-center uppercase">
                              {event.beastDamageType}
                            </span>
                          </td>
                          <td className="py-2 border-b border-terminal-green">
                            <span className="flex justify-center uppercase">
                              {event.isCriticalHit ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="py-2 border-b border-terminal-green">
                            <span className="flex justify-center uppercase">
                              {event.totalDamage}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Paths;
