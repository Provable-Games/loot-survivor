import { GiBruteIcon, SpikedWallIcon, GiBattleGearIcon } from "../icons/Icons";

export const ExploreTutorial = () => {
  return (
    <div className="flex flex-col gap-5 items-center text-center h-full">
      <h3 className="mt-0 uppercase">Exploration</h3>
      <div className="flex flex-col gap-5 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-row gap-2">
            <p className="text-lg sm:text-4xl text-terminal-yellow uppercase">
              Beasts
            </p>
            <GiBruteIcon className="w-10 h-10 text-terminal-yellow" />
          </div>
          <span className="text-2xl">
            Finding a beast locks you in a battle, fight or flee. Beasts have a
            wide range of health and power.
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-row gap-2">
            <p className="text-lg sm:text-4xl text-terminal-yellow uppercase">
              Obstacles
            </p>
            <SpikedWallIcon className="w-10 h-10 text-terminal-yellow" />
          </div>
          <span className="text-2xl">
            Obstacles deal instant damage. Increase your chance of dodging
            obstacles by upgrading Intelligence.
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-row items-center justify-center gap-2">
            <p className="text-lg sm:text-4xl text-terminal-yellow uppercase">
              Items
            </p>
            <GiBattleGearIcon className="w-10 h-10 text-terminal-yellow" />
          </div>
          <span className="flex flex-col justify-center items-center text-2xl">
            <span>
              Discovering items will aid your quest for survival. Items include:
            </span>
            <ul className="list-[square] pl-5 space-y-1 w-1/3">
              <li>Health</li>
              <li>Gold</li>
              <li>Loot Items</li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
};
