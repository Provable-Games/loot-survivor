import LootIcon from "@/app/components/icons/LootIcon";
import { HintDisplay } from "@/app/components/animations/Hint";

export const ItemsTutorial = () => {
  const points = [
    <span className="sm:text-2xl uppercase" key={0}>
      Loot survivor uses the 101 items featured in Loot.
    </span>,
    <span className="sm:text-2xl uppercase" key={1}>
      Items range from Tier 1 (
      <span className="text-terminal-yellow">strongest</span>) - Tier 5 (
      <span className="text-terminal-yellow">weakest</span>)
    </span>,
    <span className="sm:text-2xl uppercase" key={2}>
      There are 3 elemetal types: (Magic / Cloth), (Bludgeon / Metal) and (Blade
      / Hide)
    </span>,
    <span className="sm:text-2xl uppercase" key={3}>
      Items start at Greatness (lvl) 1 and max at Greatness 20.
    </span>,
  ];
  return (
    <div className="flex flex-col gap-5 uppercase items-center text-center h-full p-20">
      <h3 className="mt-0 uppercase text-terminal-yellow">Items</h3>
      <div className="flex flex-row gap-2">
        <LootIcon type="weapon" size="w-8" />
        <LootIcon type="chest" size="w-8" />
        <LootIcon type="head" size="w-8" />
        <LootIcon type="waist" size="w-8" />
        <LootIcon type="foot" size="w-8" />
        <LootIcon type="hand" size="w-8" />
        <LootIcon type="neck" size="w-8" />
        <LootIcon type="ring" size="w-8" />
      </div>
      <HintDisplay points={points} displaySeconds={5} />
    </div>
  );
};
