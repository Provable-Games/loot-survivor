import { HintDisplay } from "../animations/Hint";
import { ReactNode } from "react";

export const UnlocksTutorial = () => {
  const points: ReactNode[] = [
    <span className="text-2xl">
      <span className="uppercase text-terminal-yellow">Greatness 15:</span>{" "}
      Items receive a name suffix{" "}
      <span className="uppercase">(&quot;Of Power&quot;)</span> providing a stat
      boost to the Adventurer.
    </span>,
    <span className="text-2xl">
      <span className="uppercase text-terminal-yellow">Greatness 19:</span>{" "}
      Items receive a name prefix{" "}
      <span className="uppercase">(&quot;Agony Bane&quot;)</span>. Providing a
      powerful damage boost if it matches a beast name.
    </span>,
    <span className="text-2xl">
      <span className="uppercase text-terminal-yellow">Greatness 20:</span>{" "}
      Items receive <span className="uppercase">(+1)</span> modifier which
      provides a permanent stat upgrade for the Adventurer.
    </span>,
  ];
  return (
    <div className="flex flex-col gap-5 items-center text-center h-full p-20">
      <h3 className="mt-0 uppercase text-terminal-yellow">Item Specials</h3>
      <HintDisplay points={points} displaySeconds={8} />
    </div>
  );
};
