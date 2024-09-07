import {
  BladeIcon,
  BludgeonIcon,
  ClothIcon,
  CoinIcon,
  DownArrowIcon,
  HeartVitalityIcon,
  HideIcon,
  InfoIcon,
  MagicIcon,
  MetalIcon,
} from "@/app/components/icons/Icons";
import LootIcon from "@/app/components/icons/LootIcon";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import { useQueriesStore } from "@/app/hooks/useQueryStore";
import useUIStore from "@/app/hooks/useUIStore";
import { vitalityIncrease } from "@/app/lib/constants";
import { GameData } from "@/app/lib/data/GameData";
import { calculateLevel, getItemData, getItemPrice } from "@/app/lib/utils";
import {
  getDecisionTree,
  getOutcomesWithPath,
  listAllEncounters,
  Step,
} from "@/app/lib/utils/processFutures";
import React, { useMemo, useState } from "react";

const EncounterTable = () => {
  const adventurer = useAdventurerStore((state) => state.adventurer);
  const adventurerEntropy = useUIStore((state) => state.adventurerEntropy);
  const hasBeast = useAdventurerStore((state) => state.computed.hasBeast);

  const formattedAdventurerEntropy = BigInt(adventurerEntropy);
  const purchaseItems = useUIStore((state) => state.purchaseItems);
  const potionAmount = useUIStore((state) => state.potionAmount);
  const upgrades = useUIStore((state) => state.upgrades);

  const [hoveredBeast, setHoveredBeast] = useState<number | null>(null);

  const { data } = useQueriesStore();

  let gameData = new GameData();

  const purchaseItemsObjects = purchaseItems
    .filter((item) => item.equip)
    .map((item) => {
      const itemName = gameData.ITEMS[Number(item.item)];
      return getItemData(itemName);
    });

  let armoritems =
    data.itemsByAdventurerQuery?.items
      .map((item) => ({ ...item, ...getItemData(item.item ?? "") }))
      .filter((item) => {
        return !["Weapon", "Ring", "Neck"].includes(item.slot!);
      }) || [];

  let weaponItems =
    data.itemsByAdventurerQuery?.items
      .map((item) => ({ ...item, ...getItemData(item.item ?? "") }))
      .filter((item) => {
        return item.slot! === "Weapon";
      }) || [];

  const items = useMemo(() => {
    let equippedItems =
      data.itemsByAdventurerQuery?.items
        .filter((item) => item.equipped)
        .map((item) => ({
          item: item.item,
          ...getItemData(item.item ?? ""),
          special2: item.special2,
          special3: item.special3,
          xp: Math.max(1, item.xp!),
        })) || [];

    let updatedItems = equippedItems.map((item: any) => {
      const purchaseItem = purchaseItemsObjects.find(
        (purchaseItem) => purchaseItem.slot === item.slot
      );
      if (purchaseItem) {
        return {
          ...purchaseItem,
          special2: undefined,
          special3: undefined,
          xp: 1, // Default XP for new items
        };
      }
      return item;
    });

    // Add any new items from purchaseItemsObjects that weren't replacements
    purchaseItemsObjects.forEach((purchaseItem) => {
      if (!updatedItems.some((item: any) => item.slot === purchaseItem.slot)) {
        updatedItems.push({
          ...purchaseItem,
          special2: undefined,
          special3: undefined,
          xp: 1, // Default XP for new items
        });
      }
    });

    return updatedItems;
  }, [data.itemsByAdventurerQuery?.items, purchaseItemsObjects]);

  const updatedAdventurer = useMemo(() => {
    if (!adventurer) return null;

    let newAdventurer = { ...adventurer };

    if (upgrades.Strength > 0) {
      newAdventurer.strength! += upgrades.Strength;
    }
    if (upgrades.Dexterity > 0) {
      newAdventurer.dexterity! += upgrades.Dexterity;
    }
    if (upgrades.Vitality > 0) {
      newAdventurer.vitality =
        Number(newAdventurer.vitality) + upgrades.Vitality;
      newAdventurer.health =
        newAdventurer.health! + upgrades.Vitality! * vitalityIncrease;
    }
    if (upgrades.Intelligence > 0) {
      newAdventurer.intelligence! += upgrades.Intelligence;
    }
    if (upgrades.Wisdom > 0) {
      newAdventurer.wisdom! += upgrades.Wisdom;
    }
    if (upgrades.Charisma > 0) {
      newAdventurer.charisma! += upgrades.Charisma;
    }

    // Apply purchased potions
    if (potionAmount > 0) {
      newAdventurer.health = Math.min(
        newAdventurer.health! + potionAmount * 10,
        100 + newAdventurer.vitality! * vitalityIncrease
      );
    }

    const totalCost = purchaseItemsObjects.reduce((acc, item) => {
      return acc + getItemPrice(item.tier, newAdventurer?.charisma!);
    }, 0);

    newAdventurer.gold = adventurer?.gold! - totalCost;

    return newAdventurer;
  }, [
    adventurer,
    potionAmount,
    upgrades.Charisma,
    upgrades.Intelligence,
    upgrades.Strength,
    upgrades.Wisdom,
    upgrades.Vitality,
    upgrades.Dexterity,
    purchaseItemsObjects,
  ]);

  const encounters = useMemo(
    () =>
      listAllEncounters(
        updatedAdventurer?.xp!,
        formattedAdventurerEntropy,
        hasBeast,
        updatedAdventurer?.level!
      ),
    [updatedAdventurer?.xp, formattedAdventurerEntropy]
  );

  const outcomesWithPath = useMemo(() => {
    if (!updatedAdventurer || !items) return [];
    const decisionTree = getDecisionTree(
      updatedAdventurer!,
      items,
      formattedAdventurerEntropy,
      hasBeast,
      updatedAdventurer?.level!
    );
    return getOutcomesWithPath(decisionTree).sort(
      (a, b) =>
        b[b.length - 1].adventurer.health! - a[a.length - 1].adventurer.health!
    );
  }, [updatedAdventurer?.xp, formattedAdventurerEntropy, items]);

  const startingLevel = adventurer?.level;

  return (
    <div className="fixed z-50">
      <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between w-full bg-terminal-black max-h-[300px] overflow-y-auto border border-terminal-green text-xs sm:text-base">
        <div className="h-full w-full">
          <div className="mt-2">
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
                  <th className="relative py-2 px-1 border-b border-terminal-green">
                    Gold
                  </th>
                  <th className="py-2 px-1 sm:pr-3 border-b border-terminal-green">
                    Crit
                  </th>
                  <th className="relative py-2 px-1 border-b border-terminal-green">
                    Next
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 text-xs text-terminal-yellow">
                      +LVL
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {React.Children.toArray(
                  encounters.map((encounter: any, index: number) => {
                    let [special2, special3] = encounter.specialName?.split(
                      " "
                    ) || ["no", "no"];
                    let nameMatch =
                      encounter.encounter === "Beast" && encounter.level >= 19
                        ? armoritems.find(
                            (item) =>
                              item.special2 === special2 ||
                              item.special3 === special3
                          )
                        : false;
                    let weaponMatch =
                      encounter.encounter === "Beast" && encounter.level >= 19
                        ? weaponItems.find(
                            (item) =>
                              item.special2 === special2 ||
                              item.special3 === special3
                          )
                        : false;

                    let levelUps =
                      calculateLevel(encounter.nextXp) - adventurer?.level!;

                    return (
                      <tr>
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
                            encounter.level >= 19 && (
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
                                {gameData.ITEMS[encounter.tier]}{" "}
                                <LootIcon
                                  type={
                                    gameData.ITEM_SLOTS[
                                      gameData.ITEMS[encounter.tier].replace(
                                        /\s+/g,
                                        ""
                                      )
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
                            {encounter.encounter === "Beast" && (
                              <span
                                className="absolute top-[-8px] right-[-5px] w-3 h-3 cursor-pointer"
                                onMouseEnter={() => setHoveredBeast(index)}
                                onMouseLeave={() => setHoveredBeast(null)}
                              >
                                <InfoIcon />
                                {hoveredBeast === index && (
                                  <span className="absolute flex flex-row items-center gap-1 p-2 border border-terminal-green bg-terminal-black">
                                    {encounter.type === "Blade" && (
                                      <BladeIcon className="h-4" />
                                    )}
                                    {encounter.type === "Bludgeon" && (
                                      <BludgeonIcon className="h-4" />
                                    )}
                                    {encounter.type === "Magic" && (
                                      <MagicIcon className="h-4" />
                                    )}

                                      {encounter.encounter === "Beast" && (
                                        <>
                                          <span>/</span>
                                          {encounter.type === "Blade" && (
                                            <HideIcon className="h-4" />
                                          )}
                                          {encounter.type === "Bludgeon" && (
                                            <MetalIcon className="h-4" />
                                          )}
                                          {encounter.type === "Magic" && (
                                            <ClothIcon className="h-4" />
                                          )}
                                        </>
                                      )}
                                    </span>
                                  )}
                                </span>
                              )}
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
                            <span className="flex justify-center uppercase">
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
                          <td className="py-2 border-b border-terminal-green">
                            <span className="flex justify-center uppercase">
                              {encounter.encounter === "Beast" && (
                                <span className="flex flex-row items-center text-terminal-yellow">
                                  <CoinIcon className="h-4 fill-current text-terminal-yellow" />
                                  {encounter.gold}
                                </span>
                              )}
                            </span>
                          </td>
                          <td
                            className={`py-2 border-b border-terminal-green uppercase ${
                              encounter.isCritical ? "text-red-500" : ""
                            }`}
                          >
                            {encounter.isCritical && (
                              <span className="flex justify-center">
                                {encounter.isCritical ? "Yes" : "No"}
                              </span>
                            )}
                          </td>
                          <td className="py-2 border-b border-terminal-green">
                            <span className="flex flex-row gap-1 justify-center">
                              {encounter.nextXp}{" "}
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
                    })
                  )}
                </tbody>
              </table>
            </div>
            {updatedAdventurer?.entropy &&
              outcomesWithPath.map((steps: Step[], index: number) => (
                <div key={index} className="mt-2">
                  <div>
                    Path{" "}
                    {steps.map((step) => step.previousDecision).join(" -> ")}
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
                                  <td>Death</td>
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
                            let [special2, special3] =
                              encounter.specialName?.split(" ") || ["no", "no"];
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
                            <tr className="">
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
                                  {encounter.encounter === "Beast" && (
                                    <span
                                      className="absolute top-[-8px] right-[-5px] w-3 h-3 cursor-pointer"
                                      onMouseEnter={() =>
                                        setHoveredBeast(index)
                                      }
                                      onMouseLeave={() => setHoveredBeast(null)}
                                    >
                                      <InfoIcon />
                                      {hoveredBeast === index && (
                                        <span className="absolute flex flex-row items-center gap-1 p-2 border border-terminal-green bg-terminal-black">
                                          {encounter.type === "Blade" && (
                                            <BladeIcon className="h-4" />
                                          )}
                                          {encounter.type === "Bludgeon" && (
                                            <BludgeonIcon className="h-4" />
                                          )}
                                          {encounter.type === "Magic" && (
                                            <MagicIcon className="h-4" />
                                          )}

                                          {encounter.encounter === "Beast" && (
                                            <>
                                              <span>/</span>
                                              {encounter.type === "Blade" && (
                                                <HideIcon className="h-4" />
                                              )}
                                              {encounter.type ===
                                                "Bludgeon" && (
                                                <MetalIcon className="h-4" />
                                              )}
                                              {encounter.type === "Magic" && (
                                                <ClothIcon className="h-4" />
                                              )}
                                            </>
                                          )}
                                        </span>
                                      )}
                                    </span>
                                  )}
                                  {encounter.encounter === "Beast" ? (
                                    (encounter.type === "Blade" && "Hunter") ||
                                    (encounter.type === "Bludgeon" &&
                                      "Brute") ||
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
                                  {calculateLevel(
                                    Number(nextAdventurerState.xp)
                                  )}
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
                                    encounter.dodgeRoll! >
                                      adventurer?.wisdom! && (
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
                                        {nextAdventurerState.gold}
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
                            <span className="p-4">
                              Waiting for new entropy...
                            </span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ))}
          </div>
        </div>
      </div>
  );
};

export default EncounterTable;
