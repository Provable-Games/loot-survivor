import { EyeIcon } from "@/app/components/icons/Icons";
import { HintDisplay } from "@/app/components/animations/Hint";

export const PrescienceTutorial = () => {
  const points = [
    <p className="sm:text-2xl uppercase" key={0}>
      Each level in Loot Survivor is deterministic based on a verfiably random
      level seed.
    </p>,
    <p className="sm:text-2xl uppercase" key={1}>
      Use Prescience to strategically upgrade your adventurer&apos;s stats and
      gear.
    </p>,
  ];
  return (
    <div className="flex flex-col gap-5 uppercase items-center text-center h-full p-20">
      <div className="flex flex-row items-center gap-2 text-terminal-yellow">
        <span className="w-10 h-10">
          <EyeIcon />
        </span>
        <h3 className="mt-0">Prescience</h3>
        <h3 className="mt-0">1</h3>
      </div>
      <HintDisplay points={points} displaySeconds={4} />
    </div>
  );
};
