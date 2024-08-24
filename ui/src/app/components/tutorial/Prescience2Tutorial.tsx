import { EyeIcon } from "@/app/components/icons/Icons";
import { HintDisplay } from "@/app/components/animations/Hint";

export const Prescience2Tutorial = () => {
  const points = [
    <p className="sm:text-2xl" key={0}>
      Follow the rows in the table to see the future outcomes based on your xp.
    </p>,
    <p className="sm:text-2xl" key={1}>
      Try working out the optimal paths, fleeing from a beast will result in 1xp
      gain.
    </p>,
    // <span className="flex w-[600px] h-[200px]">
    //   <Image
    //     src="/tutorial/prescience.png"
    //     alt="Prescience"
    //     fill={true}
    //     className="object-contain"
    //   />
    // </span>,
  ];
  return (
    <div className="relative flex flex-col gap-5 uppercase items-center text-center w-full h-full p-10">
      <div className="flex flex-row items-center gap-2 text-terminal-yellow">
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
