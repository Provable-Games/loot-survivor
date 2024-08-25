import { useState, useEffect, useRef, ChangeEvent } from "react";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import { getPotionPrice } from "@/app/lib/utils";
import { UpgradeStats } from "@/app/types";
import { CoinIcon } from "@/app/components/icons/Icons";
import { vitalityIncrease } from "@/app/lib/constants";
import { HeartIcon, PotionArrowIcon } from "@/app/components/icons/Icons";
import { Button } from "@/app/components/buttons/Button";

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

  const handleIncrement = () => {
    if (potionAmount < max) {
      setPotionAmount(potionAmount + 1);
      setButtonClicked(true);
    }
  };

  const handleDecrement = () => {
    if (potionAmount > 0) {
      setPotionAmount(potionAmount - 1);
      setButtonClicked(true);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:gap-5 items-center justify-center w-full">
      <span className="flex flex-row gap-5 items-center uppercase">
        <div className="flex flex-row items-center">
          <p className="text-lg text-terminal-green">Potion Cost:</p>
          <CoinIcon className="mt-2 sm:mt-1 w-10 h-10 sm:w-8 sm:h-8 fill-current text-terminal-green" />
          <p className="text-lg text-terminal-green">{potionCost}</p>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-lg text-terminal-yellow">Total:</p>
          <CoinIcon className="mt-2 sm:mt-1 w-10 h-10 sm:w-8 sm:h-8 fill-current text-terminal-yellow" />
          <p className="text-lg text-terminal-yellow">
            {potionCost * potionAmount}
          </p>
        </div>
      </span>
      <div className="flex flex-col sm:flex-row sm:gap-5 items-center sm:w-1/2">
        <div className="flex flex-row items-center gap-1 w-full">
          <Button
            size="xxxs"
            onClick={handleDecrement}
            disabled={potionAmount <= 0}
            className="hidden sm:flex"
            variant="ghost"
          >
            <span className="absolute flex items-center justify-center w-4 h-4">
              <PotionArrowIcon className="transform rotate-180" />
            </span>
          </Button>
          <Button
            size="xs"
            onClick={handleDecrement}
            disabled={potionAmount <= 0}
            className="sm:hidden"
            variant="ghost"
          >
            <span className="absolute flex items-center justify-center w-4 h-4">
              <PotionArrowIcon className="transform rotate-180" />
            </span>
          </Button>
          <input
            type="range"
            min={0}
            max={max}
            value={potionAmount}
            onChange={handleSliderChange}
            className="w-full h-2 appearance-none cursor-pointer custom-range-input outline"
          />
          <Button
            size="xxxs"
            onClick={handleIncrement}
            disabled={potionAmount >= max}
            className="hidden sm:flex"
            variant="ghost"
          >
            <span className="absolute flex items-center justify-center w-4 h-4">
              <PotionArrowIcon />
            </span>
          </Button>
          <Button
            size="xs"
            onClick={handleIncrement}
            disabled={potionAmount >= max}
            className="sm:hidden"
            variant="ghost"
          >
            <span className="absolute flex items-center justify-center w-4 h-4">
              <PotionArrowIcon />
            </span>
          </Button>
        </div>
        <span className="flex flex-row gap-1 items-center ">
          <HeartIcon className="self-center mt-1 w-5 h-5 fill-current" />
          {`+${potionAmount * 10}`}
        </span>
      </div>
    </div>
  );
};

export default PurchaseHealth;
