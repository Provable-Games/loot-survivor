import { EyeIcon } from "../icons/Icons";
import Image from "next/image";
import { HintDisplay } from "../animations/Hint";

export const Prescience2Tutorial = () => {
  const points = [
    <p className="text-2xl">
      Follow the rows in the table to see the future outcomes based on your xp.
    </p>,
    <p className="text-2xl">
      Try working out the optimal paths, fleeing from a beast will result in 1xp
      gain.
    </p>,
    <span className="flex w-[600px] h-[200px]">
      <Image
        src="/tutorial/prescience.png"
        alt="Prescience"
        fill={true}
        className="object-contain"
      />
    </span>,
  ];
  return (
    <div className="relative flex flex-col gap-5 uppercase items-center text-center w-full h-full p-10">
      <div className="flex flex-row gap-2 text-terminal-yellow">
        <span className="w-10 h-10">
          <EyeIcon />
        </span>
        <h3 className="mt-0">Prescience</h3>
        <h3 className="mt-0">2</h3>
      </div>
      <HintDisplay points={points} displaySeconds={5} />
    </div>
  );
};
