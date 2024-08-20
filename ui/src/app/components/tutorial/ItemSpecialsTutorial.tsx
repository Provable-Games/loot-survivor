export const UnlocksTutorial = () => {
  return (
    <div className="flex flex-col gap-5 items-center text-center h-full">
      <h3 className="mt-0 uppercase">Item Specials</h3>

      <p className="sm:text-2xl">
        Items receive special abilities as they level up.
      </p>
      <ul>
        <li className="sm:text-2xl mb-2">
          <span className="uppercase text-2xl text-terminal-yellow">
            Greatness 15:
          </span>{" "}
          Items receive a name suffix{" "}
          <span className="uppercase">(&quot;Of Power&quot;)</span> providing a
          stat boost to the Adventurer.
        </li>

        <li className="sm:text-2xl mb-2">
          <span className="uppercase text-2xl text-terminal-yellow">
            Greatness 19:
          </span>{" "}
          Items receive a name prefix{" "}
          <span className="uppercase">(&quot;Agony Bane&quot;)</span>. Providing
          a powerful damage boost if it matches a beast name.
        </li>

        <li className="sm:text-2xl">
          <span className="uppercase text-2xl text-terminal-yellow">
            Greatness 20:
          </span>{" "}
          Items receive <span className="uppercase">(+1)</span> modifier which
          provides a permanent stat upgrade for the Adventurer.
        </li>
      </ul>
    </div>
  );
};
