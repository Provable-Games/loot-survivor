import { QueryData } from "@/app/hooks/useQueryStore";
import { AdventurerClass } from "@/app/lib/classes";
import { vitalityIncrease } from "@/app/lib/constants";
import { GameData } from "@/app/lib/data/GameData";
import {
  getItemData,
  getItemPrice,
  getKeyFromValue,
  getValueFromKey,
} from "@/app/lib/utils";
import {
  getDecisionTree,
  getOutcomesWithPath,
} from "@/app/lib/utils/processFutures";
import {
  Item,
  ItemPurchase,
  ItemPurchaseObject,
  UpgradeStats,
} from "@/app/types";

export function getUpdatedAdventurer(
  adventurer: AdventurerClass | undefined,
  upgrades: UpgradeStats,
  potionAmount: number,
  purchaseItemsObjects: ItemPurchaseObject[],
  equipItemsObjects: any[],
  items: Item[]
): AdventurerClass | null {
  if (!adventurer) return null;

  const gameData = new GameData();

  let updatedAdventurer: AdventurerClass = { ...adventurer };

  const equippedItems = items
    ?.filter((item) => item.equipped)
    .map((item) => ({
      ...item,
      ...getItemData(item.item ?? ""),
    }));

  let strengthModifier = 0;
  let dexterityModifier = 0;
  let vitalityModifier = 0;
  let intelligenceModifier = 0;
  let wisdomModifier = 0;
  let charismaModifier = 0;

  // handle removal of boosts from equipping purchased items
  purchaseItemsObjects.forEach((purchaseItem) => {
    const matchingEquippedItem = equippedItems?.find(
      (equippedItem) => equippedItem.slot === purchaseItem.slot
    );

    if (matchingEquippedItem) {
      const itemSuffix = parseInt(
        getKeyFromValue(
          gameData.ITEM_SUFFIXES,
          matchingEquippedItem.special1 ?? ""
        ) ?? ""
      );
      const boost = getValueFromKey(
        gameData.ITEM_SUFFIX_BOOST,
        itemSuffix ?? 0
      );
      const strMatch = boost?.match(/STR \+(\d+)/);
      const dexMatch = boost?.match(/DEX \+(\d+)/);
      const vitMatch = boost?.match(/VIT \+(\d+)/);
      const intMatch = boost?.match(/INT \+(\d+)/);
      const wisMatch = boost?.match(/WIS \+(\d+)/);
      const chaMatch = boost?.match(/CHA \+(\d+)/);

      if (strMatch) {
        strengthModifier -= parseInt(strMatch[1]);
      }
      if (dexMatch) {
        dexterityModifier -= parseInt(dexMatch[1]);
      }
      if (vitMatch) {
        vitalityModifier -= parseInt(vitMatch[1]);
      }
      if (intMatch) {
        intelligenceModifier -= parseInt(intMatch[1]);
      }
      if (wisMatch) {
        wisdomModifier -= parseInt(wisMatch[1]);
      }
      if (chaMatch) {
        charismaModifier -= parseInt(chaMatch[1]);
      }
    }
  });

  equipItemsObjects?.forEach((item) => {
    const matchingEquippedItem = equippedItems?.find(
      (equippedItem) => equippedItem.slot === item.slot
    );
    if (matchingEquippedItem) {
      const itemSuffix = parseInt(
        getKeyFromValue(
          gameData.ITEM_SUFFIXES,
          matchingEquippedItem.special1 ?? ""
        ) ?? ""
      );
      const boost = getValueFromKey(
        gameData.ITEM_SUFFIX_BOOST,
        itemSuffix ?? 0
      );
      const strMatch = boost?.match(/STR \+(\d+)/);
      const dexMatch = boost?.match(/DEX \+(\d+)/);
      const vitMatch = boost?.match(/VIT \+(\d+)/);
      const intMatch = boost?.match(/INT \+(\d+)/);
      const wisMatch = boost?.match(/WIS \+(\d+)/);
      const chaMatch = boost?.match(/CHA \+(\d+)/);

      if (strMatch) {
        strengthModifier -= parseInt(strMatch[1]);
      }
      if (dexMatch) {
        dexterityModifier -= parseInt(dexMatch[1]);
      }
      if (vitMatch) {
        vitalityModifier -= parseInt(vitMatch[1]);
      }
      if (intMatch) {
        intelligenceModifier -= parseInt(intMatch[1]);
      }
      if (wisMatch) {
        wisdomModifier -= parseInt(wisMatch[1]);
      }
      if (chaMatch) {
        charismaModifier -= parseInt(chaMatch[1]);
      }
    }

    const itemSuffix = parseInt(
      getKeyFromValue(gameData.ITEM_SUFFIXES, item.special1 ?? "") ?? ""
    );
    const boost = getValueFromKey(gameData.ITEM_SUFFIX_BOOST, itemSuffix ?? 0);
    const strMatch = boost?.match(/STR \+(\d+)/);
    const dexMatch = boost?.match(/DEX \+(\d+)/);
    const vitMatch = boost?.match(/VIT \+(\d+)/);
    const intMatch = boost?.match(/INT \+(\d+)/);
    const wisMatch = boost?.match(/WIS \+(\d+)/);
    const chaMatch = boost?.match(/CHA \+(\d+)/);

    if (strMatch) {
      strengthModifier += parseInt(strMatch[1]);
    }
    if (dexMatch) {
      dexterityModifier += parseInt(dexMatch[1]);
    }
    if (vitMatch) {
      vitalityModifier += parseInt(vitMatch[1]);
    }
    if (intMatch) {
      intelligenceModifier += parseInt(intMatch[1]);
    }
    if (wisMatch) {
      wisdomModifier += parseInt(wisMatch[1]);
    }
    if (chaMatch) {
      charismaModifier += parseInt(chaMatch[1]);
    }
  });

  if (upgrades.Strength > 0 || strengthModifier !== 0) {
    updatedAdventurer.strength! += upgrades.Strength + strengthModifier;
  }
  if (upgrades.Dexterity > 0 || dexterityModifier !== 0) {
    updatedAdventurer.dexterity! += upgrades.Dexterity + dexterityModifier;
  }
  if (upgrades.Vitality > 0 || vitalityModifier !== 0) {
    updatedAdventurer.vitality =
      Number(updatedAdventurer.vitality) + upgrades.Vitality + vitalityModifier;
    updatedAdventurer.health =
      updatedAdventurer.health! +
      (upgrades.Vitality! + vitalityModifier) * vitalityIncrease;
  }
  if (upgrades.Intelligence > 0 || intelligenceModifier !== 0) {
    updatedAdventurer.intelligence! +=
      upgrades.Intelligence + intelligenceModifier;
  }
  if (upgrades.Wisdom > 0 || wisdomModifier !== 0) {
    updatedAdventurer.wisdom! += upgrades.Wisdom + wisdomModifier;
  }
  if (upgrades.Charisma > 0 || charismaModifier !== 0) {
    updatedAdventurer.charisma! += upgrades.Charisma + charismaModifier;
  }

  // Apply purchased potions
  if (potionAmount > 0) {
    updatedAdventurer.health = Math.min(
      updatedAdventurer.health! + potionAmount * 10,
      100 + updatedAdventurer.vitality! * vitalityIncrease
    );
  }

  const totalCost = purchaseItemsObjects.reduce((acc, item) => {
    return acc + getItemPrice(item.tier, updatedAdventurer?.charisma!);
  }, 0);

  updatedAdventurer.gold = adventurer?.gold! - totalCost;

  return updatedAdventurer;
}

export function getEquippedItemsObjects(
  equipItems: string[],
  gameData: GameData,
  items: Item[]
): any[] {
  const equippedItemsObjects = equipItems.map((item) => {
    const itemName = gameData.ITEMS[Number(item)];
    const itemData = getItemData(itemName);
    return {
      ...itemData,
      ...items.find((item) => item.item === itemName),
    };
  });

  return equippedItemsObjects;
}

export function getPurchaseItemsObjects(
  purchaseItems: ItemPurchase[],
  gameData: GameData
): ItemPurchaseObject[] {
  const purchaseItemsObjects = purchaseItems.map((item) => {
    const itemName = gameData.ITEMS[Number(item.item)];
    const itemData = getItemData(itemName);
    return {
      ...itemData,
      equip: item.equip === "1",
    };
  });

  return purchaseItemsObjects;
}

export function getItems(
  equipItems: string[],
  purchaseItems: ItemPurchase[],
  data: QueryData,
  gameData: GameData
): Item[] {
  const equippedItemsObjects = getEquippedItemsObjects(
    equipItems,
    gameData,
    data.itemsByAdventurerQuery?.items!
  );
  const purchaseItemsObjects = getPurchaseItemsObjects(purchaseItems, gameData);

  // const items = useMemo(() => {
  let equippedItems: Item[] =
    data.itemsByAdventurerQuery?.items
      .filter((item) => item.equipped)
      .map((item) => ({
        item: item.item,
        ...getItemData(item.item ?? ""),
        special2: item.special2,
        special3: item.special3,
        xp: Math.max(1, item.xp!),
      })) || [];

  let updatedItems: Item[] = equippedItems.map((item: any) => {
    const equipItem = equippedItemsObjects.find(
      (equipItem) => equipItem.slot === item.slot
    );
    const purchaseItem = purchaseItemsObjects
      .filter((item) => item.equip)
      .find((purchaseItem) => purchaseItem.slot === item.slot);
    if (purchaseItem) {
      return {
        ...purchaseItem,
        special2: undefined,
        special3: undefined,
        xp: 1, // Default XP for new items
      };
    }
    if (equipItem) {
      return equipItem;
    }
    return item;
  });

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
}

export function getPaths(
  updatedAdventurer: AdventurerClass | null,
  adventurerEntropy: bigint,
  items: Item[],
  gameData: GameData,
  data: QueryData,
  hasBeast: boolean
) {
  if (!updatedAdventurer || !items) return [];
  const decisionTree = getDecisionTree(
    updatedAdventurer!,
    items,
    adventurerEntropy,
    hasBeast,
    updatedAdventurer?.level!
  );
  return getOutcomesWithPath(decisionTree).sort(
    (a, b) =>
      b[b.length - 1].adventurer.health! - a[a.length - 1].adventurer.health!
  );
}
