import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import MarketplaceRow from "@/app/components/marketplace/MarketplaceRow";
import { Item, UpgradeStats, ItemPurchase } from "@/app/types";
import { getItemData, getKeyFromValue } from "@/app/lib/utils";
import { useQueriesStore } from "@/app/hooks/useQueryStore";
import LootIconLoader from "@/app/components/icons/Loader";
import { Button } from "@/app/components/buttons/Button";
import { GameData } from "@/app/lib/data/GameData";
import { useUiSounds, soundSelector } from "@/app/hooks/useUiSound";

export interface MarketplaceTableProps {
  purchaseItems: ItemPurchase[];
  setPurchaseItems: (value: ItemPurchase[]) => void;
  upgradeHandler: (
    upgrades?: UpgradeStats,
    potions?: number,
    purchases?: ItemPurchase[]
  ) => void;
  totalCharisma: number;
  calculatedNewGold: number;
  adventurerItems: Item[];
  dropItems: string[];
  selected?: boolean;
  selectedMarketplaceIndex: number;
  setSelectedMarketplaceIndex: Dispatch<SetStateAction<number>>;
  setScreenOverride: Dispatch<SetStateAction<boolean>>;
}

const MarketplaceTable = ({
  purchaseItems,
  setPurchaseItems,
  upgradeHandler,
  totalCharisma,
  calculatedNewGold,
  adventurerItems,
  dropItems,
  selected,
  selectedMarketplaceIndex,
  setSelectedMarketplaceIndex,
  setScreenOverride,
}: MarketplaceTableProps) => {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showEquipQ, setShowEquipQ] = useState<number | null>(null);
  const { play } = useUiSounds(soundSelector.click);

  const gameData = new GameData();

  const { isLoading } = useQueriesStore();

  const marketLatestItems = useQueriesStore(
    (state) => state.data.latestMarketItemsQuery?.items || []
  );

  const headings = ["Item", "Tier", "Slot", "Type", "Cost", "Actions"];

  const headingToKeyMapping: { [key: string]: string } = {
    Item: "item",
    Tier: "tier",
    Slot: "slot",
    Type: "type",
    Cost: "cost",
  };

  const handleSort = (heading: string) => {
    const mappedField = headingToKeyMapping[heading];
    if (!mappedField) return;

    if (sortField === mappedField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(mappedField);
      setSortDirection("asc");
    }
  };

  const sortedMarketLatestItems = useMemo(() => {
    if (!sortField) return marketLatestItems;
    const sortedItems = [...marketLatestItems].sort((a, b) => {
      let aItemData = getItemData(a.item ?? ""); // get item data for a
      let bItemData = getItemData(b.item ?? ""); // get item data for b
      let aValue, bValue;

      if (
        sortField === "tier" ||
        sortField === "type" ||
        sortField === "slot"
      ) {
        aValue = aItemData[sortField];
        bValue = bItemData[sortField];
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
      }

      if (typeof aValue === "string" && !isNaN(Number(aValue))) {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if ((aValue ?? "") < (bValue ?? ""))
        return sortDirection === "asc" ? -1 : 1;
      if ((aValue ?? "") > (bValue ?? ""))
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return sortedItems;
  }, [marketLatestItems, sortField, sortDirection]);

  useEffect(() => {
    handleSort("Tier");
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          if (showEquipQ == null) {
            play();
            setSelectedMarketplaceIndex((prev: number) => {
              const newIndex = Math.min(
                prev + 1,
                sortedMarketLatestItems.length - 1
              );
              return newIndex;
            });
          }
          break;
        case "ArrowUp":
          if (showEquipQ == null) {
            play();
            setSelectedMarketplaceIndex((prev) => {
              const newIndex = Math.max(prev - 1, -1);
              return newIndex;
            });
          }
          break;
        // case "ArrowRight":
        //   play();
        //   setSelectedIndex((prev) => {
        //     setActiveMenu && setActiveMenu(buttonsData[prev].id);
        //     onEnterAction && buttonsData[prev].action();
        //     return prev;
        //   });
        //   break;
        // // case "ArrowLeft":
        //   if (!onTabs) {
        //     play();
        //     setSelectedIndex((prev) => {
        //       // setActiveMenu && setActiveMenu(buttonsData[prev].id);
        //       onEnterAction && buttonsData[prev].reverseAction();
        //       return prev;
        //     });
        //   }
        //   break;
      }
    },
    [showEquipQ]
  );

  const tableRef = useRef<HTMLTableElement | null>(null);

  const scrollToSelectedRow = useCallback(() => {
    if (tableRef.current) {
      const rows = tableRef.current.getElementsByTagName("tr");
      if (selectedMarketplaceIndex !== null && rows[selectedMarketplaceIndex]) {
        rows[selectedMarketplaceIndex + 1].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedMarketplaceIndex]);

  useEffect(() => {
    scrollToSelectedRow();
  }, [selectedMarketplaceIndex, scrollToSelectedRow]);

  useEffect(() => {
    if (selected) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selected, handleKeyDown]);

  useEffect(() => {
    if (showEquipQ) {
      setScreenOverride(true);
    } else {
      setScreenOverride(false);
    }
  }, [showEquipQ]);

  return (
    <>
      {marketLatestItems.length > 0 ? (
        <table
          ref={tableRef}
          className={`w-full sm:border sm:border-terminal-green ${
            showEquipQ === null ? "" : "hidden sm:table h-full"
          } ${selected ? "shadow-lg" : ""}`}
        >
          <thead className="sticky top-0 sm:border z-5 sm:border-terminal-green bg-terminal-black sm:text-xl">
            <tr className="">
              {headings.map((heading, index) => (
                <th
                  key={index}
                  className="px-2.5 sm:px-3 cursor-pointer"
                  onClick={() => handleSort(heading)}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-xs sm:text-base">
            {!isLoading.latestMarketItemsQuery ? (
              sortedMarketLatestItems.map((item: Item, index: number) => (
                <MarketplaceRow
                  item={item}
                  index={index}
                  activeMenu={showEquipQ}
                  setActiveMenu={setShowEquipQ}
                  calculatedNewGold={calculatedNewGold}
                  ownedItems={adventurerItems}
                  purchaseItems={purchaseItems}
                  setPurchaseItems={setPurchaseItems}
                  upgradeHandler={upgradeHandler}
                  totalCharisma={totalCharisma}
                  dropItems={dropItems}
                  key={index}
                  selectedIndex={selectedMarketplaceIndex}
                />
              ))
            ) : (
              <div className="h-full w-full flex justify-center p-10 align-center">
                Generating Loot{" "}
                <LootIconLoader className="self-center ml-3" size={"w-4"} />
              </div>
            )}
          </tbody>
        </table>
      ) : (
        <div className="h-full w-full flex justify-center p-10 align-center">
          <LootIconLoader className="m-auto" size="w-10" />
        </div>
      )}
      {showEquipQ !== null && showEquipQ >= 0 && (
        <div className="sm:hidden h-full">
          {(() => {
            const item = sortedMarketLatestItems[showEquipQ ?? 0];
            const bagFull =
              adventurerItems.filter((obj) => !obj.equipped).length == 15;

            return (
              <div
                className={`${
                  showEquipQ !== null ? "" : "hidden"
                } w-full m-auto h-full flex flex-row items-center justify-center gap-2`}
              >
                <p>{`Equip ${item?.item} ?`}</p>
                <Button
                  onClick={() => {
                    const newPurchases = [
                      ...purchaseItems,
                      {
                        item:
                          getKeyFromValue(gameData.ITEMS, item?.item ?? "") ??
                          "0",
                        equip: "1",
                      },
                    ];
                    setPurchaseItems(newPurchases);
                    upgradeHandler(undefined, undefined, newPurchases);
                    setShowEquipQ(null);
                  }}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => {
                    const newPurchases = [
                      ...purchaseItems,
                      {
                        item:
                          getKeyFromValue(gameData.ITEMS, item?.item ?? "") ??
                          "0",
                        equip: "0",
                      },
                    ];
                    setPurchaseItems(newPurchases);
                    upgradeHandler(undefined, undefined, newPurchases);
                    setShowEquipQ(null);
                  }}
                  disabled={bagFull}
                >
                  No
                </Button>
                <Button
                  onClick={() => {
                    setShowEquipQ(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            );
          })()}
        </div>
      )}
    </>
  );
};

export default MarketplaceTable;
