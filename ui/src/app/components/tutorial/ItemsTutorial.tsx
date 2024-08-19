import LootIcon from "../icons/LootIcon";
import {
  BladeIcon,
  BludgeonIcon,
  MagicIcon,
  HideIcon,
  MetalIcon,
  ClothIcon,
} from "@/app/components/icons/Icons";

export const ItemsTutorial = () => {
  return (
    <div className="flex flex-col gap-5 uppercase items-center text-center h-full">
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
        Items range from Tier 1 - 5 (
        <span className="text-terminal-yellow">strongest</span> to{" "}
        <span className="text-red-500">weakest</span>)
      </p>
      <div className="flex flex-col items-center gap-2">
        <p className="sm:text-xl sm:text-lg">
          Items are split into different types.
        </p>
        <p className="sm:text-xl sm:text-lg uppercase">Weapons:</p>
        <p className="sm:text-xl sm:text-lg">
          <div className="flex flex-row gap-2">
            <span className="flex flex-row gap-2">
              <BladeIcon className="w-6 h-6" />
              Blade
            </span>
            ,
            <span className="flex flex-row gap-2">
              <BludgeonIcon className="w-6 h-6" />
              Bludgeon
            </span>
            and
            <span className="flex flex-row gap-2">
              <MagicIcon className="w-6 h-6" />
              Magic
            </span>
          </div>
        </p>
        <p className="sm:text-xl sm:text-lg uppercase">Armor:</p>
        <p className="sm:text-xl sm:text-lg">
          <div className="flex flex-row gap-2">
            <span className="flex flex-row gap-2">
              <HideIcon className="w-6 h-6" />
              Hide
            </span>
            ,
            <span className="flex flex-row gap-2">
              <MetalIcon className="w-6 h-6" />
              Metal
            </span>
            and
            <span className="flex flex-row gap-2">
              <ClothIcon className="w-6 h-6" />
              Cloth
            </span>
          </div>
        </p>
      </div>
    </div>
  );
};
