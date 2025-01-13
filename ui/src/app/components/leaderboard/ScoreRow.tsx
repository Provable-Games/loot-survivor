import { FirstIcon, SecondIcon, ThirdIcon } from "@/app/components/icons/Icons";
import { soundSelector, useUiSounds } from "@/app/hooks/useUiSound";
import { calculateLevel, formatNumber } from "@/app/lib/utils";
import { Adventurer } from "@/app/types";
import Lords from "public/icons/lords.svg";

interface ScoreLeaderboardRowProps {
  adventurer: Adventurer;
  rank: number;
  handleRowSelected: (id: number) => void;
}

const ScoreRow = ({
  adventurer,
  rank,
  handleRowSelected,
}: ScoreLeaderboardRowProps) => {
  const { play: clickPlay } = useUiSounds(soundSelector.click);
  return (
    <tr
      className="text-center border-b border-terminal-green hover:bg-terminal-green/75 hover:text-terminal-black cursor-pointer xl:h-2 xl:text-lg 2xl:text-xl 2xl:h-10"
      onClick={() => {
        handleRowSelected(adventurer.id ?? 0);
        clickPlay();
      }}
    >
      <td>
        {rank === 1 ? (
          <span className="flex m-auto w-4 h-8">
            <FirstIcon />
          </span>
        ) : rank === 2 ? (
          <span className="flex m-auto  w-4 h-8">
            <SecondIcon />
          </span>
        ) : rank === 3 ? (
          <span className="flex m-auto  w-4 h-8">
            <ThirdIcon />
          </span>
        ) : (
          rank
        )}
      </td>
      <td>
        <span className="block whitespace-nowrap overflow-hidden text-ellipsis w-40 sm:w-full">{`${adventurer.name} - ${adventurer.id}`}</span>
      </td>
      <td>{calculateLevel(adventurer.xp ?? 0)}</td>
      <td>{adventurer.xp}</td>
      <td>
        {((adventurer.totalPayout as number) ?? 0) > 0 ? (
          <span className="flex flex-row gap-1 items-center justify-center">
            <Lords className="h-4 w-4 sm:w-5 sm:h-5 fill-current" />
            {formatNumber(adventurer.totalPayout as number)}
          </span>
        ) : (
          "-"
        )}
      </td>
    </tr>
  );
};

export default ScoreRow;
