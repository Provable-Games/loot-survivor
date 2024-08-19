import { HealthPotionIcon, GiBattleGearIcon } from "../icons/Icons";

export const UpgradeTutorial = () => {
  return (
    <div className="flex flex-col gap-5 items-center text-center h-full">
      <h3 className="mt-0 uppercase">Leveling Up</h3>
      <p className="sm:text-2xl">
        Every level up you get a stat upgrade and a chance to purchase items.
      </p>
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-row gap-2">
            <p className="text-lg sm:text-4xl text-terminal-yellow uppercase">
              Potions
            </p>
            <HealthPotionIcon className="w-10 h-10 text-terminal-yellow" />
          </div>
          <p className="text-sm sm:text-2xl">
            Potions replenish your health. The cost of potions increases each
            level, invest in Charisma to keep the cost down.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-row gap-2">
            <p className="text-lg sm:text-4xl text-terminal-yellow uppercase">
              Items
            </p>
            <GiBattleGearIcon className="w-10 h-10 text-terminal-yellow" />
          </div>
          <p className="sm:text-2xl">
            Each time you level up you get access to a random selection of
            items. Price of the items is based on the items tier. Similar to
            potions, Charisma provides a discount on items.
          </p>
        </div>
      </div>
    </div>
  );
};
