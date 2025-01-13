import { TournamentTrophyIcon } from "@/app/components/icons/Icons";
import { useQueriesStore } from "@/app/hooks/useQueryStore";
import { soundSelector, useUiSounds } from "@/app/hooks/useUiSound";
import { calculateLevel } from "@/app/lib/utils";
import { Adventurer } from "@/app/types";

interface SeasonRowProps {
  rank: number;
  adventurer: Adventurer;
  handleRowSelected: (id: number) => void;
}

const SeasonRow = ({ rank, adventurer, handleRowSelected }: SeasonRowProps) => {
  const { play: clickPlay } = useUiSounds(soundSelector.click);
  const adventurersByOwner = useQueriesStore(
    (state) => state.data.adventurersByOwnerQuery?.adventurers ?? []
  );

  const ownedAdventurer = adventurersByOwner.some(
    (a) => a.id === adventurer.id
  );

  const topScores = [...adventurersByOwner].sort(
    (a, b) => (b.xp ?? 0) - (a.xp ?? 0)
  );
  const topScoreAdventurer = topScores[0]?.id === adventurer.id;

  return (
    <tr
      className={`text-center border-b border-terminal-green hover:bg-terminal-green/75 hover:text-terminal-black cursor-pointer xl:h-2 xl:text-lg 2xl:text-xl 2xl:h-10 ${
        topScoreAdventurer
          ? "bg-terminal-yellow-50"
          : ownedAdventurer
          ? "bg-terminal-green-50"
          : ""
      }`}
      onClick={() => {
        handleRowSelected(adventurer.id ?? 0);
        clickPlay();
      }}
    >
      <td>
        {rank <= 3 ? (
          <span
            className={`w-6 h-6 flex m-auto ${
              rank === 1
                ? "text-terminal-gold"
                : rank === 2
                ? "text-terminal-silver"
                : "text-terminal-bronze"
            }`}
          >
            <TournamentTrophyIcon />
          </span>
        ) : (
          <span>{rank}</span>
        )}
      </td>
      <td>{`${adventurer.name} - ${adventurer.id}`}</td>
      <td>{calculateLevel(adventurer.xp ?? 0)}</td>
      <td>
        <span className="flex justify-center">{adventurer.xp}</span>
      </td>
      <td>
        <span className="flex justify-center">{adventurer.health}</span>
      </td>
    </tr>
  );
};

export default SeasonRow;
