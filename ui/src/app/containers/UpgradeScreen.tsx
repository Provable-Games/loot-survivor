import { useEffect, useState } from "react";
import { Contract } from "starknet";
import {
  getItemData,
  getValueFromKey,
  getItemPrice,
  getPotionPrice,
} from "@/app/lib/utils";
import { GameData } from "@/app/lib/data/GameData";
import useLoadingStore from "@/app/hooks/useLoadingStore";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import useTransactionCartStore from "@/app/hooks/useTransactionCartStore";
import Info from "@/app/components/adventurer/Info";
import { Button } from "@/app/components/buttons/Button";
import {
  ArrowTargetIcon,
  CatIcon,
  CoinCharismaIcon,
  HeartVitalityIcon,
  LightbulbIcon,
  ScrollIcon,
} from "@/app/components/icons/Icons";
import PurchaseHealth from "@/app/components/upgrade/PurchaseHealth";
import MarketplaceScreen from "@/app/containers/MarketplaceScreen";
import { UpgradeNav } from "@/app/components/upgrade/UpgradeNav";
import useUIStore from "@/app/hooks/useUIStore";
import {
  UpgradeStats,
  ZeroUpgrade,
  UpgradeSummary,
  ItemPurchase,
  Attribute,
} from "@/app/types";
import Summary from "@/app/components/upgrade/Summary";
import {
  calculateVitBoostRemoved,
  calculateChaBoostRemoved,
} from "@/app/lib/utils";
import { useQueriesStore } from "@/app/hooks/useQueryStore";
import { useController } from "@/app/context/ControllerContext";
import { useUiSounds, soundSelector } from "@/app/hooks/useUiSound";
import { vitalityIncrease } from "@/app/lib/constants";
import StatCard from "@/app/components/upgrade/StatCard";

interface UpgradeScreenProps {
  upgrade: (
    upgrades: UpgradeStats,
    purchaseItems: ItemPurchase[],
    potionAmount: number,
    upgradeTx?: any
  ) => Promise<void>;
  gameContract: Contract;
}

/**
 * @container
 * @description Provides the upgrade screen for the adventurer.
 */
export default function UpgradeScreen({
  upgrade,
  gameContract,
}: UpgradeScreenProps) {
  const adventurer = useAdventurerStore((state) => state.adventurer);
  const updateAdventurerStats = useAdventurerStore(
    (state) => state.updateAdventurerStats
  );
  const loading = useLoadingStore((state) => state.loading);
  const estimatingFee = useUIStore((state) => state.estimatingFee);
  const resetNotification = useLoadingStore((state) => state.resetNotification);
  const addToCalls = useTransactionCartStore((state) => state.addToCalls);
  const removeEntrypointFromCalls = useTransactionCartStore(
    (state) => state.removeEntrypointFromCalls
  );
  const hasStatUpgrades = useAdventurerStore(
    (state) => state.computed.hasStatUpgrades
  );
  const upgradeScreen = useUIStore((state) => state.upgradeScreen);
  const setUpgradeScreen = useUIStore((state) => state.setUpgradeScreen);
  const potionAmount = useUIStore((state) => state.potionAmount);
  const setPotionAmount = useUIStore((state) => state.setPotionAmount);
  const upgrades = useUIStore((state) => state.upgrades);
  const setUpgrades = useUIStore((state) => state.setUpgrades);
  const purchaseItems = useUIStore((state) => state.purchaseItems);
  const setPurchaseItems = useUIStore((state) => state.setPurchaseItems);
  const equipItems = useUIStore((state) => state.equipItems);
  const dropItems = useUIStore((state) => state.dropItems);
  const entropyReady = useUIStore((state) => state.entropyReady);
  const onKatana = useUIStore((state) => state.onKatana);
  const chaBoostRemoved = useUIStore((state) => state.chaBoostRemoved);
  const vitBoostRemoved = useUIStore((state) => state.vitBoostRemoved);
  const setVitBoostRemoved = useUIStore((state) => state.setVitBoostRemoved);
  const setChaBoostRemoved = useUIStore((state) => state.setChaBoostRemoved);
  const pendingMessage = useLoadingStore((state) => state.pendingMessage);
  const [summary, setSummary] = useState<UpgradeSummary>({
    Stats: { ...ZeroUpgrade },
    Items: [],
    Potions: 0,
  });
  const g20Unlock = useUIStore((state) => state.g20Unlock);
  const setG20Unlock = useUIStore((state) => state.setG20Unlock);
  const adventurerEntropy = useUIStore((state) => state.adventurerEntropy);
  const adventurerLeveledUp = useUIStore((state) => state.adventurerLeveledUp);

  const { play: clickPlay } = useUiSounds(soundSelector.click);

  const setData = useQueriesStore((state) => state.setData);

  useEffect(() => {
    const fetchMarketItems = async () => {
      if (
        entropyReady ||
        onKatana ||
        (g20Unlock && !adventurerLeveledUp && adventurerEntropy !== BigInt(0))
      ) {
        const marketItems = (await gameContract!.call("get_market", [
          adventurer?.id!,
        ])) as string[];
        const itemData = [];
        for (let item of marketItems) {
          itemData.unshift({
            item: gameData.ITEMS[parseInt(item)],
            adventurerId: adventurer?.id,
            owner: false,
            equipped: false,
            ownerAddress: adventurer?.owner,
            xp: 0,
            special1: null,
            special2: null,
            special3: null,
            isAvailable: false,
            purchasedTime: null,
            timestamp: new Date(),
          });
        }
        setData("latestMarketItemsQuery", {
          items: itemData,
        });
      }
    };

    const fetchAdventurerStats = async () => {
      if ((entropyReady || onKatana || g20Unlock) && adventurer?.level == 2) {
        const updatedAdventurer = (await gameContract!.call("get_adventurer", [
          adventurer?.id!,
        ])) as any;
        updateAdventurerStats({
          health: parseInt(updatedAdventurer.health),
          strength: parseInt(updatedAdventurer.stats.strength),
          dexterity: parseInt(updatedAdventurer.stats.dexterity),
          vitality: parseInt(updatedAdventurer.stats.vitality),
          intelligence: parseInt(updatedAdventurer.stats.intelligence),
          wisdom: parseInt(updatedAdventurer.stats.wisdom),
          charisma: parseInt(updatedAdventurer.stats.charisma),
          luck: parseInt(updatedAdventurer.stats.luck),
        });
      }
    };

    fetchMarketItems();
    fetchAdventurerStats();
  }, [entropyReady, g20Unlock]);

  const gameData = new GameData();

  const checkTransacting =
    typeof pendingMessage === "string" &&
    (pendingMessage as string).startsWith("Upgrading");

  const attributes: Attribute[] = [
    {
      key: 1,
      name: "Strength",
      icon: <ArrowTargetIcon />,
      description: "Strength increases attack damage by 10%",
      buttonText: "Upgrade Strength",
      abbrev: "STR",
      stat: adventurer?.strength!,
      upgrades: upgrades["Strength"] ?? 0,
    },
    {
      key: 2,
      name: "Dexterity",
      icon: <CatIcon />,
      description: "Dexterity increases chance of fleeing Beasts",
      buttonText: "Upgrade Dexterity",
      abbrev: "DEX",
      stat: adventurer?.dexterity!,
      upgrades: upgrades["Dexterity"] ?? 0,
    },
    {
      key: 3,
      name: "Vitality",
      icon: <HeartVitalityIcon />,
      description: `Vitality increases max health and gives +${vitalityIncrease}hp per point`,
      buttonText: "Upgrade Vitality",
      abbrev: "VIT",
      stat: adventurer?.vitality!,
      upgrades: upgrades["Vitality"] ?? 0,
    },
    {
      key: 4,
      name: "Intelligence",
      icon: <LightbulbIcon />,
      description: "Intelligence increases chance of avoiding Obstacles",
      buttonText: "Upgrade Intelligence",
      abbrev: "INT",
      stat: adventurer?.intelligence!,
      upgrades: upgrades["Intelligence"] ?? 0,
    },
    {
      key: 5,
      name: "Wisdom",
      icon: <ScrollIcon />,
      description: "Wisdom increases chance of avoiding a Beast ambush",
      buttonText: "Upgrade Wisdom",
      abbrev: "WIS",
      stat: adventurer?.wisdom!,
      upgrades: upgrades["Wisdom"] ?? 0,
    },
    {
      key: 6,
      name: "Charisma",
      icon: <CoinCharismaIcon />,
      description: "Charisma provides discounts on the marketplace and potions",
      buttonText: "Upgrade Charisma",
      abbrev: "CHA",
      stat: adventurer?.charisma!,
      upgrades: upgrades["Charisma"] ?? 0,
    },
  ];

  const selectedCharisma = upgrades["Charisma"] ?? 0;
  const selectedVitality = upgrades["Vitality"] ?? 0;

  const [totalVitality, setTotalVitality] = useState(0);
  const [totalCharisma, setTotalCharisma] = useState(0);

  const adventurerItems = useQueriesStore(
    (state) => state.data.itemsByAdventurerQuery?.items || []
  );

  useEffect(() => {
    const chaBoostRemoved = calculateChaBoostRemoved(
      purchaseItems,
      adventurer!,
      adventurerItems,
      equipItems,
      dropItems
    );
    setChaBoostRemoved(chaBoostRemoved);

    const vitBoostRemoved = calculateVitBoostRemoved(
      purchaseItems,
      adventurer!,
      adventurerItems,
      equipItems,
      dropItems
    );
    setVitBoostRemoved(vitBoostRemoved);
  }, [purchaseItems, adventurer, adventurerItems, equipItems, dropItems]);

  useEffect(() => {
    setTotalVitality((adventurer?.vitality ?? 0) + selectedVitality);
    setTotalCharisma(
      (adventurer?.charisma ?? 0) + selectedCharisma - chaBoostRemoved
    );
  }, [adventurer, selectedVitality, selectedCharisma, chaBoostRemoved]);

  const purchaseGoldAmount =
    potionAmount * getPotionPrice(adventurer?.level ?? 0, totalCharisma);

  const itemsGoldSum = purchaseItems.reduce((accumulator, current) => {
    const { tier } = getItemData(
      getValueFromKey(gameData.ITEMS, parseInt(current.item)) ?? ""
    );
    const itemPrice = getItemPrice(tier, totalCharisma);
    return accumulator + (isNaN(itemPrice) ? 0 : itemPrice);
  }, 0);

  const upgradeTotalCost = purchaseGoldAmount + itemsGoldSum;

  const handleAddUpgradeTx = (
    currentUpgrades?: UpgradeStats,
    potions?: number,
    items?: ItemPurchase[]
  ) => {
    removeEntrypointFromCalls("upgrade");
    const upgradeTx = {
      contractAddress: gameContract?.address ?? "",
      entrypoint: "upgrade",
      calldata: [
        adventurer?.id?.toString() ?? "",
        potions !== undefined ? potions.toString() : potionAmount.toString(),
        currentUpgrades
          ? currentUpgrades["Strength"].toString()
          : upgrades["Strength"].toString(),
        currentUpgrades
          ? currentUpgrades["Dexterity"].toString()
          : upgrades["Dexterity"].toString(),
        currentUpgrades
          ? currentUpgrades["Vitality"].toString()
          : upgrades["Vitality"].toString(),
        currentUpgrades
          ? currentUpgrades["Intelligence"].toString()
          : upgrades["Intelligence"].toString(),
        currentUpgrades
          ? currentUpgrades["Wisdom"].toString()
          : upgrades["Wisdom"].toString(),
        currentUpgrades
          ? currentUpgrades["Charisma"].toString()
          : upgrades["Charisma"].toString(),
        "0",
        items ? items.length.toString() : purchaseItems.length.toString(),
        ...(items
          ? items.flatMap(Object.values)
          : purchaseItems.flatMap(Object.values)),
      ],
    };
    addToCalls(upgradeTx);
    return upgradeTx;
  };

  const maxHealth = Math.min(100 + totalVitality * vitalityIncrease, 1023);
  const newMaxHealth =
    100 + (totalVitality - vitBoostRemoved) * vitalityIncrease;
  const currentHealth =
    adventurer?.health! + selectedVitality * vitalityIncrease;
  const healthPlusPots = Math.min(
    currentHealth! + potionAmount * 10,
    maxHealth
  );
  const healthOverflow = healthPlusPots > newMaxHealth;

  const handleSubmitUpgradeTx = async () => {
    renderSummary();
    resetNotification();
    // Handle for vitBoostRemoval
    let upgradeTx: any;
    if (healthOverflow) {
      const newUpgradeTx = handleAddUpgradeTx(
        undefined,
        Math.max(potionAmount - vitBoostRemoved, 0),
        undefined
      );
      upgradeTx = newUpgradeTx;
    }
    try {
      await upgrade(
        upgrades,
        purchaseItems,
        Math.max(potionAmount - vitBoostRemoved, 0),
        upgradeTx
      );
      setPotionAmount(0);
      setPurchaseItems([]);
      setUpgrades({ ...ZeroUpgrade });
      setG20Unlock(false);
    } catch (e) {
      console.log(e);
    }
  };

  const { addControl } = useController();

  useEffect(() => {
    addControl("u", () => {
      console.log("Key u pressed");
      handleSubmitUpgradeTx();
      setUpgradeScreen(1);
      clickPlay();
    });
  }, [upgrades, purchaseItems, potionAmount]);

  const upgradesTotal = Object.values(upgrades)
    .filter((value) => value !== 0)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const nextDisabled = upgradesTotal !== adventurer?.statUpgrades;

  useEffect(() => {
    if (upgrades.length === 0) {
      setUpgradeScreen(1);
    }
  }, [upgrades]);

  const renderSummary = () => {
    setSummary({
      Stats: upgrades,
      Items: purchaseItems,
      Potions: potionAmount,
    });
  };

  const totalStatUpgrades = (adventurer?.statUpgrades ?? 0) - upgradesTotal;

  const bankrupt = upgradeTotalCost > (adventurer?.gold ?? 0);

  useEffect(() => {
    if (healthOverflow) {
      setPotionAmount(Math.max(potionAmount - vitBoostRemoved, 0));
    }
  }, [vitBoostRemoved]);

  return (
    <>
      {hasStatUpgrades ? (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 h-full">
          <div className="w-1/3 hidden sm:flex h-full">
            <Info
              adventurer={adventurer}
              upgradeCost={upgradeTotalCost}
              gameContract={gameContract}
            />
          </div>
          {!checkTransacting ? (
            <div className="relative flex flex-col w-full sm:w-2/3 h-full">
              <div className="w-full flex flex-row items-center justify-between px-2 h-1/8">
                <div className="flex flex-row items-center gap-5">
                  <div className="uppercase sm:text-2xl animate-pulse">
                    Level up!
                  </div>

                  <span className="uppercase sm:text-2xl">{`${totalStatUpgrades} SP Available`}</span>
                </div>

                <Button
                  className="hidden sm:block w-1/2 sm:w-2/3"
                  onClick={() => {
                    handleSubmitUpgradeTx();
                    setUpgradeScreen(1);
                  }}
                  disabled={
                    nextDisabled || loading || estimatingFee || bankrupt
                  }
                >
                  {loading ? (
                    <span>Upgrading...</span>
                  ) : (
                    <span>
                      {bankrupt
                        ? "Bankrupt"
                        : nextDisabled
                        ? "Please Select Stats"
                        : "Next Level"}
                    </span>
                  )}
                </Button>
                <div className="sm:hidden flex flex-row gap-2 w-1/2 sm:w-2/3">
                  <Button
                    onClick={() => {
                      setUpgradeScreen(1);
                    }}
                    className={upgradeScreen == 1 ? "hidden" : ""}
                  >
                    Back
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => {
                      if (upgradeScreen === 2) {
                        handleSubmitUpgradeTx();
                        setUpgradeScreen(1);
                      } else {
                        setUpgradeScreen(2);
                      }
                    }}
                    disabled={
                      (upgradeScreen == 2 && nextDisabled) ||
                      loading ||
                      estimatingFee ||
                      bankrupt
                    }
                  >
                    {loading ? (
                      <span>Upgrading...</span>
                    ) : (
                      <span>
                        {bankrupt
                          ? "Bankrupt"
                          : upgradeScreen == 2
                          ? nextDisabled
                            ? "Please Select Stats"
                            : "Next Level"
                          : "Next"}
                      </span>
                    )}
                  </Button>
                </div>
              </div>
              <UpgradeNav activeSection={upgradeScreen} />

              <div className="flex flex-col gap-2 items-center h-7/8">
                {upgradeScreen === 1 && (
                  <>
                    <div className="grid grid-cols-2 sm:flex sm:flex-row items-center p-2 h-3/4 sm:h-[80px] w-full">
                      {attributes.map((attribute) => (
                        <span className="sm:w-1/6" key={attribute.key}>
                          <StatCard
                            min={0}
                            amount={upgrades[attribute.name]}
                            setAmount={(value) => {
                              upgrades[attribute.name] = value;
                              setUpgrades(upgrades);
                            }}
                            attribute={attribute}
                            upgradeHandler={handleAddUpgradeTx}
                          />
                        </span>
                      ))}
                    </div>
                    <PurchaseHealth
                      upgradeTotalCost={upgradeTotalCost}
                      potionAmount={potionAmount}
                      setPotionAmount={setPotionAmount}
                      totalCharisma={totalCharisma}
                      upgradeHandler={handleAddUpgradeTx}
                      totalVitality={totalVitality}
                      vitBoostRemoved={vitBoostRemoved}
                    />
                    <div className="hidden sm:flex items-center w-full h-3/4">
                      <MarketplaceScreen
                        upgradeTotalCost={upgradeTotalCost}
                        purchaseItems={purchaseItems}
                        setPurchaseItems={setPurchaseItems}
                        upgradeHandler={handleAddUpgradeTx}
                        totalCharisma={totalCharisma}
                        adventurerItems={adventurerItems}
                        dropItems={dropItems}
                      />
                    </div>
                  </>
                )}

                {upgradeScreen === 2 && (
                  <div className="flex items-center w-full h-5/6">
                    <MarketplaceScreen
                      upgradeTotalCost={upgradeTotalCost}
                      purchaseItems={purchaseItems}
                      setPurchaseItems={setPurchaseItems}
                      upgradeHandler={handleAddUpgradeTx}
                      totalCharisma={totalCharisma}
                      adventurerItems={adventurerItems}
                      dropItems={dropItems}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Summary summary={summary} attributes={attributes} />
          )}
        </div>
      ) : (
        <h1 className="mx-auto">No upgrades available!</h1>
      )}
    </>
  );
}
