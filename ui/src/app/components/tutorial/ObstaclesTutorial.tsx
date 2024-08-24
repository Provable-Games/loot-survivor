import { SpikedWallIcon } from "@/app/components/icons/Icons";
import { HintDisplay } from "@/app/components/animations/Hint";

export const ObstaclesTutorial = () => {
  const points = [
    <span className="sm:text-2xl uppercase" key={0}>
      Obstacles deal instant damage if they are not dodged.
    </span>,
    <span className="sm:text-2xl uppercase" key={1}>
      Increase your chance of dodging obstacles by upgrading Intelligence.
    </span>,
    <span className="sm:text-2xl uppercase" key={2}>
      Base damage is (6 - Tier) * Level.
    </span>,
    <span className="sm:text-2xl uppercase" key={3}>
      Their level range scales with adventurer level.
    </span>,
  ];
  return (
    <div className="flex flex-col gap-5 items-center text-center h-full p-20">
      <div className="flex flex-row items-center gap-2 text-terminal-yellow">
        <h3 className="mt-0 uppercase">Obstacles</h3>
        <SpikedWallIcon className="w-10 h-10" />
      </div>
      <HintDisplay points={points} displaySeconds={4} />
    </div>
  );
};
