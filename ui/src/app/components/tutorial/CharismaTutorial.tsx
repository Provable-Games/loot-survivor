import { CoinCharismaIcon } from "@/app/components/icons/Icons";
import { HintDisplay } from "@/app/components/animations/Hint";

export const CharismaTutorial = () => {
  const points = [
    <span className="sm:text-2xl" key={0}>
      In the early game gold is scarce. Use charisma to increase purchasing
      power.
    </span>,
    <span className="sm:text-2xl" key={1}>
      Buying items early allows you to build their power asap.
    </span>,
    <span className="sm:text-2xl" key={2}>
      Aiming for a tier 1 weapon and multiple types of armor is a good strategy.
    </span>,
    <span className="sm:text-2xl" key={3}>
      When you reach 3 charisma you can purchase tier 5 armor for 1 gold.
    </span>,
  ];
  return (
    <div className="flex flex-col gap-5 uppercase items-center text-center h-full p-20">
      <div className="flex flex-row items-center gap-2 text-terminal-yellow">
        <h3 className="mt-0">Charisma</h3>
        <span className="w-10 h-10">
          <CoinCharismaIcon />
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HintDisplay points={points} displaySeconds={6} />
      </div>
    </div>
  );
};
