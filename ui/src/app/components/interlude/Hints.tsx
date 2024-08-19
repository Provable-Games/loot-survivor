import { useEffect, useState } from "react";
import { ItemsTutorial } from "../tutorial/ItemsTutorial";
import { UpgradeTutorial } from "../tutorial/UpgradeTutorial";
import { ElementalTutorial } from "../tutorial/ElementalTutorial";
import { UnlocksTutorial } from "../tutorial/ItemSpecialsTutorial";
import { ExploreTutorial } from "../tutorial/ExploreTutorial";
import { StrategyTutorial } from "../tutorial/StrategyTutorial";
import { PrescienceTutorial } from "../tutorial/PrescienceTutorial";

export default function Hints() {
  const [currentIndex, setCurrentIndex] = useState(5);
  const tutorials = [
    <ElementalTutorial key={0} />,
    <ItemsTutorial key={1} />,
    <UnlocksTutorial key={2} />,
    <UpgradeTutorial key={3} />,
    <ExploreTutorial key={4} />,
    <StrategyTutorial key={5} />,
    <PrescienceTutorial key={6} />,
  ];

  return (
    <div className="flex flex-col justify-center px-2 py-5 sm:p-6 2xl:px-12 2xl:py-6 w-full sm:w-3/4 gap-5">
      <div className="w-full">{tutorials[currentIndex]}</div>
    </div>
  );
}
