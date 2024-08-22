import { GiBattleGearIcon } from "@/app/components/icons/Icons";
import { HintDisplay } from "@/app/components/animations/Hint";

export const DiscoveriesTutorial = () => {
  const points = [
    <span className="sm:text-2xl uppercase" key={0}>
      Discoveries aid your quest for survival.
    </span>,
    <span className="sm:text-2xl uppercase" key={1}>
      Discoveries include Health, Gold and Loot Items.
    </span>,
    <span className="sm:text-2xl uppercase" key={2}>
      Consider using prescience to target specific Discoveries.
    </span>,
  ];
  return (
    <div className="flex flex-col gap-5 items-center text-center h-full p-20">
      <div className="flex flex-row items-center gap-2 text-terminal-yellow">
        <h3 className="mt-0 uppercase">Discoveries</h3>
        <GiBattleGearIcon className="w-10 h-10" />
      </div>
      <HintDisplay points={points} displaySeconds={4} />
    </div>
  );
};
