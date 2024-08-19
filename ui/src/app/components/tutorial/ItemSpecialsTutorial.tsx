export const UnlocksTutorial = () => {
  return (
    <div className="flex flex-col gap-5 items-center text-center h-full">
      <h3 className="mt-0 uppercase">Item Specials</h3>

      <p className="sm:text-2xl">
        Items receive special abilities as they progress.
      </p>
      <ul>
        <li className="sm:text-2xl mb-2">
          <span className="uppercase text-2xl text-terminal-yellow">
            Greatness 15:
          </span>{" "}
          Items receive a name suffix{" "}
          <span className="uppercase">(&quot;Of Power&quot;)</span> granting
          boosted stats on an Adventurer.
        </li>

        <li className="sm:text-2xl mb-2">
          <span className="uppercase text-2xl text-terminal-yellow">
            Greatness 19:
          </span>
          : Items receive a two part name prefix{" "}
          <span className="uppercase">(&quot;Agony Bane&quot;)</span>. Provides
          a powerful damage boost if matched to a beast name.
        </li>

        <li className="sm:text-2xl">
          <span className="uppercase text-2xl text-terminal-yellow">
            Greatness 20:
          </span>{" "}
          Items receive <span className="uppercase">(+1)</span> modifier which
          grants the player a stat upgrade for their Adventurer.
        </li>
      </ul>
      <p className="text-2xl">
        Example fully unlocked item:{" "}
        <span className="text-4xl">
          "Sorrow Peak" Hard Leather Belt of Titans +1
        </span>
      </p>
    </div>
  );
};
