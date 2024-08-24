import { HintDisplay } from "@/app/components/animations/Hint";

export const CollectibleBeastsTutorial = () => {
  const points = [
    <span className="sm:text-2xl uppercase" key={0}>
      Beasts receive special name prefixes and become collectible starting at
      level 19.
    </span>,
    <span className="sm:text-2xl uppercase" key={1}>
      There are 75 beasts with 1242 name variants of each. A total of 93150
      collectible beasts!
    </span>,
    <span className="sm:text-2xl uppercase" key={2}>
      The first adventurer to defeat a named beast claims earns it as an NFT.
    </span>,
  ];
  return (
    <div className="flex flex-col gap-5 items-center text-center h-full p-20">
      <div className="flex flex-row gap-2 text-terminal-yellow">
        <h3 className="mt-0 uppercase">Collectible Beasts</h3>
      </div>
      <HintDisplay points={points} displaySeconds={6} />
    </div>
  );
};
