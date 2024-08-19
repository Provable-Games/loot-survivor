import { CoinCharismaIcon } from "@/app/components/icons/Icons";
import { EyeIcon } from "@/app/components/icons/Icons";

export const StrategyTutorial = () => {
  return (
    <div className="flex flex-col gap-5 uppercase items-center text-center h-full">
      <h3 className="mt-0">Basic Strategy</h3>
      <div className="flex flex-col items-center gap-2">
        <span className="w-10 h-10">
          <CoinCharismaIcon />
        </span>
        <p className="sm:text-lg">
          In the early game charisma is the most useful. This will make items
          cheaper and allow you to build their power asap. Aiming for a tier 1
          weapon and as many elemental types of armor is a good strategy.
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="w-10 h-10">
          <EyeIcon />
        </span>
        <p className="sm:text-lg">
          Choosing stats reactively based on prescience is crucial. Being aware
          of dangerous obstacles and terrifying beasts ahead allows the player
          to steer their stats for the best effects.
        </p>
      </div>
    </div>
  );
};
