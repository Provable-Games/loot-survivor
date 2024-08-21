import LootIcon from "../icons/LootIcon";

export const ItemsTutorial = () => {
  return (
    <div className="flex flex-col gap-5 uppercase items-center text-center h-full p-10">
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

      <p className="sm:text-lg">There are 101 different items in the game.</p>

      <p className="sm:text-xl sm:text-lg">
        Items range from Tier 1 (
        <span className="text-terminal-yellow">strongest</span>) - 5 (
        <span className="text-terminal-yellow">weakest</span>)
      </p>
    </div>
  );
};
