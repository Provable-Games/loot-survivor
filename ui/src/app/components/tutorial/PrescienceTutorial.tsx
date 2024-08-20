import { EyeIcon } from "../icons/Icons";
import Image from "next/image";

export const PrescienceTutorial = () => {
  return (
    <div className="flex flex-col gap-5 uppercase items-center text-center h-full">
      <div className="flex flex-row gap-2">
        <h3 className="mt-0">Prescience</h3>
        <span className="w-10 h-10">
          <EyeIcon />
        </span>
      </div>
      <p className="sm:text-2xl">Levels in Loot Survivor are deterministic.</p>
      <p className="sm:text-lg">
        Use Prescience during an upgrade to increase your chance of survival.
      </p>
      <p className="sm:text-lg">
        Follow the rows in the table to see the future outcomes based on your
        xp. It will be worth working out the optimal paths, fleeing from a beast
        will result in 1xp gain.
      </p>
      <span className="relative w-full h-40">
        <Image
          src="/tutorial/prescience.png"
          alt="Prescience"
          fill={true}
          className="object-contain"
        />
      </span>
    </div>
  );
};
