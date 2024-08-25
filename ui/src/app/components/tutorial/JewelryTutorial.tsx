import { HintDisplay } from "@/app/components/animations/Hint";

export const JewelryTutorial = () => {
  const points = [
    <table className="sm:w-[800px] border-collapse" key={0}>
      <thead>
        <tr className="bg-terminal-green/50">
          <th className="border border-terminal-green p-2">Ring</th>
          <th className="border border-terminal-green p-2">Boost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-terminal-green p-2">Pendant</td>
          <td className="border border-terminal-green p-2">
            3% increase per greatness hide armor defence.
          </td>
        </tr>
        <tr>
          <td className="border border-terminal-green p-2">Necklace</td>
          <td className="border border-terminal-green p-2">
            3% increase per greatness metal armor defence.
          </td>
        </tr>
        <tr>
          <td className="border border-terminal-green p-2">Amulet</td>
          <td className="border border-terminal-green p-2">
            3% increase per greatness cloth armor defence.{" "}
          </td>
        </tr>
      </tbody>
    </table>,
    <table className="sm:w-[800px] border-collapse" key={1}>
      <thead>
        <tr className="bg-terminal-green/50">
          <th className="border border-terminal-green p-2">Neck</th>
          <th className="border border-terminal-green p-2">Boost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-terminal-green p-2">Bronze Ring</td>
          <td className="border border-terminal-green p-2">
            No special ability (economy option).
          </td>
        </tr>
        <tr>
          <td className="border border-terminal-green p-2">Silver Ring</td>
          <td className="border border-terminal-green p-2">
            +20 Luck boost when equipped at G20 and +1 bonus luck per greatness
            when equipped.
          </td>
        </tr>
        <tr>
          <td className="border border-terminal-green p-2">Gold Ring</td>
          <td className="border border-terminal-green p-2">
            3% per greatness increase in gold rewards from beasts.
          </td>
        </tr>
        <tr>
          <td className="border border-terminal-green p-2">Platinum Ring</td>
          <td className="border border-terminal-green p-2">
            3% per greatness increase in name match damage bonus.
          </td>
        </tr>
        <tr>
          <td className="border border-terminal-green p-2">Titanium Ring</td>
          <td className="border border-terminal-green p-2">
            3% per greatness increase in critical hit damage bonus.
          </td>
        </tr>
      </tbody>
    </table>,
    <span
      className="flex items-center justify-center sm:text-2xl uppercase h-full"
      key={2}
    >
      Provides +1 Luck per level per item
    </span>,
  ];
  return (
    <div className="flex flex-col gap-2 uppercase items-center text-center h-full w-full">
      <h3 className="mt-0 uppercase text-terminal-yellow">Rings & Necklaces</h3>
      <HintDisplay points={points} displaySeconds={6} />
    </div>
  );
};
