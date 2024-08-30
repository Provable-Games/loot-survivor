import React, { useEffect, useState, useRef } from "react";
import { Attribute, UpgradeStats, ZeroUpgrade } from "@/app/types";
import useUIStore from "@/app/hooks/useUIStore";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import useTransactionCartStore from "@/app/hooks/useTransactionCartStore";

interface ButtonProps {
  amount: number;
  min: number;
  setAmount: (value: number) => void;
  attribute: Attribute;
  upgradeHandler: (
    upgrades?: UpgradeStats,
    potions?: number,
    items?: any[]
  ) => void;
}

const StatCard: React.FC<ButtonProps> = ({
  amount,
  min,
  setAmount,
  attribute,
  upgradeHandler,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const prevAmountRef = useRef<{ [key: string]: number }>({ ...ZeroUpgrade });
  const maxNonBoosted = (attribute.stat ?? 0) + amount >= 31;
  const adventurer = useAdventurerStore((state) => state.adventurer);
  const upgrades = useUIStore((state) => state.upgrades);
  const removeEntrypointFromCalls = useTransactionCartStore(
    (state) => state.removeEntrypointFromCalls
  );
  const upgradesTotal = Object.values(upgrades)
    .filter((value) => value !== 0)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const newUpgradeTotal =
    amount + ((adventurer?.statUpgrades ?? 0) - upgradesTotal);
  const max = maxNonBoosted ? amount : newUpgradeTotal;

  const handleIncrement = () => {
    if (amount < max) {
      setAmount(amount + 1);
      setButtonClicked(true);
    }
  };

  const handleDecrement = () => {
    if (amount > min) {
      setAmount(amount - 1);
      setButtonClicked(true);
    }
  };

  useEffect(() => {
    if (buttonClicked) {
      if (prevAmountRef.current !== undefined) {
        // Access the previous amount for the specific name
        const prevAmount = prevAmountRef.current[attribute.name];
        if (amount > prevAmount) {
          upgradeHandler(upgrades, undefined, undefined);
        } else if (amount <= prevAmount) {
          upgradeHandler(upgrades, undefined, undefined);
          if (
            Object.values(upgrades).filter((value) => value !== 0).length === 0
          ) {
            removeEntrypointFromCalls("upgrade");
          }
        }
        setButtonClicked(false);
        // after useEffect has run, update the ref with the new value
      }
      prevAmountRef.current[attribute.name] = amount;
    }
  }, [amount, buttonClicked]);

  const maxed = upgradesTotal >= (adventurer?.statUpgrades ?? 0);

  return (
    <div
      key={attribute.key}
      className="flex justify-center p-1 border border-terminal-green relative"
    >
      <span className="flex flex-col items-center justify-center gap-2 h-[105px] sm:h-[80px]">
        <span className="flex flex-row gap-2 items-center">
          <span
            onClick={handleDecrement}
            className={`flex justify-center items-center text-4xl w-8 h-8 border rounded-full cursor-pointer ${
              amount === 0
                ? "text-gray-500 border-gray-500"
                : "border-terminal-green"
            }`}
          >
            -
          </span>
          <span className="text-2xl">{`${
            (attribute.stat ?? 0) + amount
          }`}</span>
          <span
            onClick={handleIncrement}
            className={`flex justify-center items-center text-4xl w-8 h-8 border rounded-full cursor-pointer ${
              maxed ? "text-gray-500 border-gray-500" : "border-terminal-green"
            }`}
          >
            +
          </span>
        </span>
        <span
          className="relative flex flex-row gap-2 items-center cursor-pointer"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <span className="w-5 h-5">{attribute.icon}</span>
          <span className="pl-1">{attribute.abbrev}</span>
          {attribute.upgrades > 0 && (
            <span className="absolute top-[-5px] right-[-15px] text-sm">
              +{attribute.upgrades}
            </span>
          )}
        </span>
      </span>
      {showInfo && (
        <div className="fixed top-0 left-0 sm:top-40 sm:left-auto sm:right-80 w-full sm:w-80 flex flex-row gap-5 items-center p-2 bg-terminal-black border border-terminal-green text-terminal-green text-sm">
          <span className="w-10 h-10">{attribute.icon}</span>
          <span>{attribute.description}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
