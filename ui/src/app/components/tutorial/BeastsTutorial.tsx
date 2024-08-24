import { GiBruteIcon } from "@/app/components/icons/Icons";
import { HintDisplay } from "@/app/components/animations/Hint";

export const BeastsTutorial = () => {
  const points = [
    <span className="sm:text-2xl uppercase" key={0}>
      Finding a beast locks you in a battle, fight or flee.
    </span>,
    <span className="sm:text-2xl uppercase" key={1}>
      Base attack and defense is (6 - Tier) * Level.
    </span>,
    <span className="sm:text-2xl uppercase" key={2}>
      Beasts attack random locations on your adventurer, consider the type of
      armor across all slots.
    </span>,
    <span className="sm:text-2xl uppercase" key={3}>
      Their range of health and power scales with adventurer level.
    </span>,
    <span className="sm:text-2xl uppercase" key={4}>
      Beasts become collectible at level 19.
    </span>,
  ];
  return (
    <div className="flex flex-col gap-5 items-center text-center h-full p-20">
      <div className="flex flex-row items-center gap-2 text-terminal-yellow">
        <h3 className="mt-0 uppercase">Beasts</h3>{" "}
        <GiBruteIcon className="w-10 h-10" />
      </div>
      <HintDisplay points={points} displaySeconds={6} />
    </div>
  );
};
