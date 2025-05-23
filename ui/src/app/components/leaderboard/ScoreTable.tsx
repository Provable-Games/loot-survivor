import { Button } from "@/app/components/buttons/Button";
import LootIconLoader from "@/app/components/icons/Loader";
import ScoreRow from "@/app/components/leaderboard/ScoreRow";
import {
  getDeadAdventurersByXPPaginated,
  getScoresInList,
} from "@/app/hooks/graphql/queries";
import useCustomQuery from "@/app/hooks/useCustomQuery";
import useUIStore from "@/app/hooks/useUIStore";
import { Adventurer, Score } from "@/app/types";
import { useMemo, useState } from "react";

export interface ScoreLeaderboardTableProps {
  itemsPerPage: number;
  handleFetchProfileData: (adventurerId: number) => void;
  adventurerCount: number;
}

const ScoreLeaderboardTable = ({
  itemsPerPage,
  handleFetchProfileData,
  adventurerCount,
}: ScoreLeaderboardTableProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setScreen = useUIStore((state) => state.setScreen);
  const setProfile = useUIStore((state) => state.setProfile);
  const network = useUIStore((state) => state.network);
  const skip = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(adventurerCount / itemsPerPage);
  const leaderboardVariables = useMemo(() => {
    return {
      skip: skip,
    };
  }, [skip]);

  const adventurersByXPdata = useCustomQuery(
    network,
    "adventurersByXPQuery",
    getDeadAdventurersByXPPaginated,
    leaderboardVariables
  );
  const adventurers: Adventurer[] = adventurersByXPdata?.adventurers ?? [];

  const scoreIds = adventurers?.map((score) => score.id ?? 0);

  const scoresData = useCustomQuery(
    network,
    "topScoresQuery",
    getScoresInList,
    {
      ids: scoreIds,
    }
  );

  const mergedScores = adventurers.map((item1) => {
    const matchingItem2 = scoresData?.scores.find(
      (item2: Score) => item2.adventurerId === item1.id
    );

    return {
      ...item1,
      ...matchingItem2,
    };
  });

  const scoresWithLords = mergedScores;

  let previousXp = -1;
  let currentRank = 0;
  let rankOffset = 0;

  const rankXp = (
    adventurer: Adventurer,
    index: number,
    rankOffset: number
  ) => {
    if (adventurer.xp !== previousXp) {
      currentRank = index + 1 + (currentPage - 1) * itemsPerPage;
      rankOffset = 0;
    } else {
      rankOffset++;
    }
    previousXp = adventurer.xp ?? 0;
    return currentRank;
  };

  const handleRowSelected = async (adventurerId: number) => {
    try {
      setProfile(adventurerId);
      setScreen("profile");
      await handleFetchProfileData(adventurerId);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleClick = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      {!scoresData ? (
        <div className="flex justify-center items-center h-full">
          <LootIconLoader className="m-auto" size="w-10" />
        </div>
      ) : (
        <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between w-full">
          <div className="relative flex flex-col w-full sm:mr-4 flex-grow-2 p-2 gap-2">
            {adventurers.length > 0 ? (
              <>
                <h4 className="text-2xl text-center sm:text-2xl m-0 uppercase">
                  Global Leaderboard
                </h4>
                <table className="w-full sm:text-lg xl:text-xl border border-terminal-green">
                  <thead className="border border-terminal-green">
                    <tr>
                      <th className="p-1">Rank</th>
                      <th className="p-1">Adventurer</th>
                      <th className="p-1">Level</th>
                      <th className="p-1">XP</th>
                      <th className="p-1">Payout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoresWithLords.map((adventurer: any, index: number) => (
                      <ScoreRow
                        key={index}
                        adventurer={adventurer}
                        rank={rankXp(adventurer, index, rankOffset)}
                        handleRowSelected={handleRowSelected}
                      />
                    ))}
                  </tbody>
                </table>
                {adventurerCount > 10 && (
                  <div className="flex justify-center sm:mt-8 xl:mt-2">
                    <Button
                      variant={"outline"}
                      onClick={() =>
                        currentPage > 1 && handleClick(currentPage - 1)
                      }
                      disabled={currentPage === 1}
                    >
                      back
                    </Button>

                    <Button
                      variant={"outline"}
                      key={1}
                      onClick={() => handleClick(1)}
                      className={currentPage === 1 ? "animate-pulse" : ""}
                    >
                      {1}
                    </Button>

                    <Button
                      variant={"outline"}
                      key={totalPages}
                      onClick={() => handleClick(totalPages)}
                      className={
                        currentPage === totalPages ? "animate-pulse" : ""
                      }
                    >
                      {totalPages}
                    </Button>

                    <Button
                      variant={"outline"}
                      onClick={() =>
                        currentPage < totalPages && handleClick(currentPage + 1)
                      }
                      disabled={currentPage === totalPages}
                    >
                      next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              scoresData && (
                <h3 className="text-lg sm:text-2xl py-4">
                  No scores submitted yet. Be the first!
                </h3>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ScoreLeaderboardTable;
