import { GiBattleGearIcon } from "../icons/Icons";
import { HintDisplay } from "../animations/Hint";
import { ReactNode } from "react";

export const UpgradeTutorialItems = () => {
  const points: ReactNode[] = [
    <p className="text-2xl uppercase">
      New items are available for purchase at the start of each level.
    </p>,
    <p className="text-2xl uppercase">
      The price of the items is based on the their tier.
    </p>,
    <p className="text-2xl uppercase">
      Charisma provides a discount on items.
    </p>,
  ];

  return (
    <div className="flex flex-col gap-5 items-center text-center h-full p-20">
      <div className="flex flex-row gap-2">
        <h3 className="text-lg sm:text-4xl text-terminal-yellow uppercase">
          Items
        </h3>
        <GiBattleGearIcon className="w-10 h-10 text-terminal-yellow" />
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <HintDisplay points={points} displaySeconds={4} />
      </div>
    </div>
  );
};
