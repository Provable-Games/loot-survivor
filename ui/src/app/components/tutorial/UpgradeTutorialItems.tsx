import { GiBattleGearIcon } from "@/app/components/icons/Icons";
import { HintDisplay } from "@/app/components/animations/Hint";
import { ReactNode } from "react";

export const UpgradeTutorialItems = () => {
  const points: ReactNode[] = [
    <p className="sm:text-2xl uppercase" key={0}>
      New items are available for purchase at the start of each level.
    </p>,
    <p className="sm:text-2xl uppercase" key={1}>
      The price of the items is based on their tier.
    </p>,
    <p className="sm:text-2xl uppercase" key={2}>
      Charisma provides a discount on items.
    </p>,
  ];

  return (
    <div className="flex flex-col gap-5 items-center text-center h-full p-20">
      <div className="flex flex-row items-center gap-2">
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
