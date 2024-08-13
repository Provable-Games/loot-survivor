import { useState, useEffect, useRef, ChangeEvent } from "react";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import { getPotionPrice } from "@/app/lib/utils";
import { UpgradeStats } from "@/app/types";
import { CoinIcon } from "@/app/components/icons/Icons";
import { vitalityIncrease } from "@/app/lib/constants";
import { HeartIcon } from "@/app/components/icons/Icons";

interface PurchaseHealthProps {
  upgradeTotalCost: number;
  potionAmount: number;
  setPotionAmount: (value: number) => void;
  totalCharisma: number;
  upgradeHandler: (
    upgrades?: UpgradeStats,
    potions?: number,
    items?: any[]
  ) => void;
  totalVitality: number;
  vitBoostRemoved: number;
}

const PurchaseHealth = ({
  upgradeTotalCost,
  potionAmount,
  setPotionAmount,
  totalCharisma,
  upgradeHandler,
  vitBoostRemoved,
}: PurchaseHealthProps) => {
  const adventurer = useAdventurerStore((state) => state.adventurer);
  const prevAmountRef = useRef<number | undefined>(0);
  const [buttonClicked, setButtonClicked] = useState(false);

  const potionCost = getPotionPrice(adventurer?.level ?? 0, totalCharisma);

  const maxHealth = 100 + (adventurer?.vitality ?? 0) * vitalityIncrease;

  const max = Math.min(
    Math.ceil(
      (maxHealth -
        (adventurer?.health ?? 0) -
        vitBoostRemoved * vitalityIncrease) /
        10
    ),
    Math.floor(
      (adventurer?.gold! - (upgradeTotalCost - potionAmount * potionCost)) /
        potionCost
    )
  );

  useEffect(() => {
    if (buttonClicked) {
      if (prevAmountRef.current !== undefined) {
        const prevAmount = prevAmountRef.current;
        if (potionAmount > prevAmount) {
          upgradeHandler(undefined, potionAmount, undefined);
        } else if (potionAmount <= prevAmount) {
          upgradeHandler(undefined, potionAmount, undefined);
        }
        setButtonClicked(false);
      }
      // after useEffect has run, update the ref with the new value
      prevAmountRef.current = potionAmount;
    }
  }, [potionAmount, buttonClicked]);

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setPotionAmount(value);
    setButtonClicked(true);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:gap-5 items-center justify-center w-full">
      <span className="flex flex-row items-center">
        <CoinIcon className="mt-2 sm:mt-1 w-10 h-10 sm:w-8 sm:h-8 fill-current text-terminal-yellow" />
        <p className="text-4xl sm:text-2xl text-terminal-yellow">
          {potionCost * potionAmount}
        </p>
      </span>
      <div className="flex flex-row gap-5 items-center w-1/2">
        <input
          type="range"
          min={0}
          max={max}
          value={potionAmount}
          onChange={handleSliderChange}
          className="w-full h-2 appearance-none cursor-pointer custom-range-input outline"
        />
        <span className="flex flex-row gap-1 items-center ">
          <HeartIcon className="self-center mt-1 w-5 h-5 fill-current" />
          {`+${potionAmount * 10}`}
        </span>
      </div>
    </div>
  );
};

export default PurchaseHealth;
