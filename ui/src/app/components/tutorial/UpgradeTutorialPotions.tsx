import { ReactNode } from "react";
import { HealthPotionIcon } from "../icons/Icons";
import { HintDisplay } from "../animations/Hint";

export const UpgradeTutorialPotions = () => {
  const points: ReactNode[] = [
    <p className="text-2xl uppercase">Potions replenish your health.</p>,
    <p className="text-2xl uppercase">
      The cost of potions increases each level.
    </p>,
    <p className="text-2xl uppercase">
      Increase Charisma to keep the cost down.
    </p>,
  ];

  return (
    <div className="flex flex-col gap-5 items-center text-center h-full p-20">
      <div className="flex flex-row gap-2">
        <h3 className="mt-0 uppercase text-terminal-yellow">Potions</h3>
        <HealthPotionIcon className="w-10 h-10 text-terminal-yellow" />
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <HintDisplay points={points} displaySeconds={4} />
      </div>
    </div>
  );
};
