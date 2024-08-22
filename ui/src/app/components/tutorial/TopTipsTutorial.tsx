import { ReactNode } from "react";
import { HintDisplay } from "@/app/components/animations/Hint";

export const TopTipsTutorial = () => {
  const points: ReactNode[] = [
    <p className="sm:text-2xl uppercase" key={0}>
      Hunting beast types bolsters your chances (exploit weapon and armor
      weaknesses).
    </p>,
    <p className="sm:text-2xl uppercase" key={1}>
      Accumulating gold can unlock powerful opportunities.
    </p>,
    <p className="sm:text-2xl uppercase" key={2}>
      Prioritize acquiring a Tier 1 weapon and any armor pieces.
    </p>,
  ];

  return (
    <div className="flex flex-col gap-5 items-center text-center h-full p-20">
      <div className="flex flex-row gap-2">
        <h3 className="mt-0 uppercase text-terminal-yellow">Top Tips</h3>
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <HintDisplay points={points} displaySeconds={5} />
      </div>
    </div>
  );
};
