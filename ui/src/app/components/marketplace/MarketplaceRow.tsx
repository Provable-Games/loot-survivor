import { Button } from "@/app/components/buttons/Button";
import EfficacyDisplay from "@/app/components/icons/EfficacyIcon";
import { CoinIcon } from "@/app/components/icons/Icons";
import LootIcon from "@/app/components/icons/LootIcon";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import { GameData } from "@/app/lib/data/GameData";
import {
  getItemData,
  getItemPrice,
  getKeyFromValue,
  removeSpaces,
} from "@/app/lib/utils";
import { Item, ItemPurchase, NullAdventurer, UpgradeStats } from "@/app/types";
import { useCallback, useEffect, useState } from "react";

interface MarketplaceRowProps {
  item: Item;
  index: number;
  activeMenu: number | null;
  setActiveMenu: (value: number | null) => void;
  calculatedNewGold: number;
  ownedItems: Item[];
  purchaseItems: ItemPurchase[];
  setPurchaseItems: (value: ItemPurchase[]) => void;
  upgradeHandler: (
    upgrades?: UpgradeStats,
    potions?: number,
    purchases?: ItemPurchase[]
  ) => void;
  totalCharisma: number;
  dropItems: string[];
}

const MarketplaceRow = ({
  item,
  index,
  activeMenu,
  setActiveMenu,
  calculatedNewGold,
  ownedItems,
  purchaseItems,
  setPurchaseItems,
  upgradeHandler,
  totalCharisma,
  dropItems,
}: MarketplaceRowProps) => {
  const [selectedButton, setSelectedButton] = useState<number>(0);
  const adventurer = useAdventurerStore((state) => state.adventurer);
  const gameData = new GameData();

  const singlePurchaseExists = (item: string) => {
    return purchaseItems.some(
      (purchasingItem: ItemPurchase) => purchasingItem.item == item
    );
  };

  const { tier, type, slot } = getItemData(item.item ?? "");
  const itemPrice = getItemPrice(tier, totalCharisma);
  const enoughGold = calculatedNewGold >= itemPrice;

  const checkOwned = (item: string) => {
    return ownedItems.some((ownedItem) => ownedItem.item == item);
  };

  const checkPurchased = (item: string) => {
    return purchaseItems.some(
      (purchaseItem) =>
        purchaseItem.item == getKeyFromValue(gameData.ITEMS, item)
    );
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          setSelectedButton((prev) => {
            const newIndex = Math.min(prev + 1, 1);
            return newIndex;
          });
          break;
        case "ArrowUp":
          setSelectedButton((prev) => {
            const newIndex = Math.max(prev - 1, 0);
            return newIndex;
          });
          break;
        case "Enter":
          setActiveMenu(0);
          break;
        case "Escape":
          setActiveMenu(0);
          break;
      }
    },
    [selectedButton, setActiveMenu]
  );

  const isActive = activeMenu == index;

  const equippedItems = ownedItems.filter((obj) => obj.equipped).length;
  const baggedItems = ownedItems.filter((obj) => !obj.equipped).length;

  // Check whether an equipped slot is free, if it is free then even if the bag is full the slot can be bought and equipped.
  const formatAdventurer = adventurer ?? NullAdventurer;
  const equippedItem = formatAdventurer[slot.toLowerCase()];
  const emptySlot = equippedItem === undefined || equippedItem === null;
  const slotEquipped = purchaseItems.some(
    (item) =>
      item.equip === "1" &&
      gameData.ITEM_SLOTS[
        removeSpaces(gameData.ITEMS[parseInt(item?.item)])
      ] === slot
  );

  const handlePurchase = () => {
    if (
      singlePurchaseExists(item.item ?? "") ||
      checkPurchased(item.item ?? "")
    ) {
      const newItems = purchaseItems.filter(
        (i) => gameData.ITEMS[parseInt(i.item)] !== item.item
      );
      setPurchaseItems(newItems);
      upgradeHandler(undefined, undefined, newItems);
    } else {
      const newPurchase = {
        item: getKeyFromValue(gameData.ITEMS, item?.item ?? "") ?? "0",
        equip: (emptySlot || slot === "Weapon") && !slotEquipped ? "1" : "0",
      };
      const newPurchases = [...purchaseItems, newPurchase];
      setPurchaseItems(newPurchases);
      upgradeHandler(undefined, undefined, newPurchases);
    }
  };

  const handleEquipPurchase = () => {
    const itemKey = getKeyFromValue(gameData.ITEMS, item?.item ?? "") ?? "0";

    const newPurchases = purchaseItems.map((purchaseItem) => {
      if (purchaseItem.item === itemKey) {
        return { ...purchaseItem, equip: "1" };
      }
      return purchaseItem;
    });

    setPurchaseItems(newPurchases);
    upgradeHandler(undefined, undefined, newPurchases);
  };

  const handleUnequipPurchase = () => {
    const itemKey = getKeyFromValue(gameData.ITEMS, item?.item ?? "") ?? "0";

    const newPurchases = purchaseItems.map((purchaseItem) => {
      if (purchaseItem.item === itemKey) {
        return { ...purchaseItem, equip: "0" };
      }
      return purchaseItem;
    });

    setPurchaseItems(newPurchases);
    upgradeHandler(undefined, undefined, newPurchases);
  };

  const purchaseNoEquipItems = purchaseItems.filter(
    (item) => item.equip === "0"
  ).length;
  const purchaseEquipItems = purchaseItems.filter(
    (item) => item.equip === "1"
  ).length;

  const equipFull = equippedItems + purchaseEquipItems === 8;
  const bagFull = baggedItems + purchaseNoEquipItems === 15;

  useEffect(() => {
    if (isActive) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isActive, handleKeyDown]);

  const showEquip =
    (singlePurchaseExists(item.item ?? "") ||
      checkPurchased(item.item ?? "")) &&
    !emptySlot &&
    !(slot === "Weapon") &&
    !purchaseItems.some(
      (pi) =>
        pi.item === getKeyFromValue(gameData.ITEMS, item?.item ?? "") &&
        pi.equip === "1"
    );

  const showUnequip =
    (singlePurchaseExists(item.item ?? "") ||
      checkPurchased(item.item ?? "")) &&
    !emptySlot &&
    slot === "Weapon" &&
    !purchaseItems.some(
      (pi) =>
        pi.item === getKeyFromValue(gameData.ITEMS, item?.item ?? "") &&
        pi.equip === "0"
    );

  return (
    <tr
      className={
        "border-b border-terminal-green hover:bg-terminal-green-50 hover:text-terminal-black w-full h-12 sm:h-full"
      }
    >
      <td className="text-center">{item.item}</td>
      <td className="text-center">{tier}</td>
      <td className="text-center">
        <div className="sm:hidden flex justify-center items-center">
          <LootIcon size={"w-5"} type={slot} />
        </div>
        <div className="hidden sm:flex justify-center items-center">
          <LootIcon size={"w-5"} type={slot} />
        </div>
      </td>
      <td className="text-center">
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="hidden sm:block">{type}</p>
          <EfficacyDisplay size="w-5" className="h-5 sm:w-8" type={type} />
        </div>
      </td>

      <td className="text-center">
        {item.item === "Bronze Ring" && `No Special Effect`}
        {item.item === "Silver Ring" && `+1 Luck | +20 Luck GR20`}
        {item.item === "Gold Ring" && "3% Beast Gold"}
        {item.item === "Platinum Ring" && "3% Name Match Dmg"}
        {item.item === "Titanium Ring" && "3% Crit Dmg"}

        {item.item === "Pendant" && (
          <div className="flex flex-row items-center justify-center gap-2">
            <p>3% Hide</p>
            <EfficacyDisplay size="w-5" className="h-5 sm:w-8" type={"Hide"} />
          </div>
        )}
        {item.item === "Necklace" && (
          <div className="flex flex-row items-center justify-center gap-2">
            <p>3% Metal</p>
            <EfficacyDisplay size="w-5" className="h-5 sm:w-8" type={"Metal"} />
          </div>
        )}
        {item.item === "Amulet" && (
          <div className="flex flex-row items-center justify-center gap-2">
            <p>3% Cloth</p>
            <EfficacyDisplay size="w-5" className="h-5 sm:w-8" type={"Cloth"} />
          </div>
        )}
      </td>
      <td className="text-center">
        <div className="flex flex-row items-center justify-center">
          <CoinIcon className="w-4 h-4 sm:w-8 sm:h-8 fill-current text-terminal-yellow" />
          <p className="text-terminal-yellow">
            {getItemPrice(tier, totalCharisma)}
          </p>
        </div>
      </td>

      <td className="w-20 sm:w-32 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center h-full">
          <Button
            onClick={() => handlePurchase()}
            className={`${
              showEquip ? "h-5" : "h-10"
            } sm:h-10 sm:w-16 sm:w-auto ${
              (singlePurchaseExists(item.item ?? "") ||
                checkPurchased(item.item ?? "")) &&
              "bg-terminal-yellow"
            }`}
            disabled={
              (itemPrice > (adventurer?.gold ?? 0) ||
                !enoughGold ||
                item.owner ||
                checkOwned(item.item ?? "") ||
                (equipFull && bagFull) ||
                (bagFull && !emptySlot)) &&
              !(
                singlePurchaseExists(item.item ?? "") ||
                checkPurchased(item.item ?? "")
              )
            }
            variant="secondary"
          >
            {singlePurchaseExists(item.item ?? "") ||
            checkPurchased(item.item ?? "")
              ? "Undo"
              : !enoughGold || itemPrice > (adventurer?.gold ?? 0)
              ? "Not Enough Gold"
              : checkOwned(item.item ?? "")
              ? "Owned"
              : (equipFull && bagFull) || (bagFull && !emptySlot)
              ? "Inventory Full"
              : "Purchase"}
          </Button>
          {showEquip ? (
            <Button
              onClick={() => handleEquipPurchase()}
              className="sm:h-10 sm:w-16 h-auto sm:w-auto text-terminal-green"
              variant="token"
            >
              Equip
            </Button>
          ) : showUnequip ? (
            <Button
              onClick={() => handleUnequipPurchase()}
              className="sm:h-10 sm:w-16 h-auto sm:w-auto text-terminal-green"
              variant="token"
            >
              Unequip
            </Button>
          ) : (
            <></>
          )}
        </div>
      </td>
    </tr>
  );
};

export default MarketplaceRow;
