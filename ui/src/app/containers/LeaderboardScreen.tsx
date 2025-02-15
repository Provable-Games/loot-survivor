import { Button } from "@/app/components/buttons/Button";
import { SkullIcon } from "@/app/components/icons/Icons";
import BeastTable from "@/app/components/leaderboard/BeastTable";
import ScoreTable from "@/app/components/leaderboard/ScoreTable";
import SeasonTable from "@/app/components/leaderboard/SeasonTable";
import {
  getAdventurerById,
  getAdventurerCounts,
  getItemsByAdventurer,
} from "@/app/hooks/graphql/queries";
import useCustomQuery from "@/app/hooks/useCustomQuery";
import { useQueriesStore } from "@/app/hooks/useQueryStore";
import useUIStore from "@/app/hooks/useUIStore";
import { Adventurer } from "@/app/types";
import { useEffect, useState } from "react";

interface LeaderboardScreenProps {
  tournamentPrizes: any;
}

/**
 * @container
 * @description Provides the leaderboard screen for the adventurer.
 */
export default function LeaderboardScreen({
  tournamentPrizes,
}: LeaderboardScreenProps) {
  const itemsPerPage = 10;
  const [showScores, setShowScores] = useState(false);
  const [showKilledBeasts, setShowKilledBeasts] = useState(false);

  const { data, refetch, setData, setIsLoading, setNotLoading } =
    useQueriesStore();

  const network = useUIStore((state) => state.network);

  const profile = useUIStore((state) => state.profile);

  useCustomQuery(network, "leaderboardByIdQuery", getAdventurerById, {
    id: profile ?? 0,
  });

  useCustomQuery(network, "itemsByProfileQuery", getItemsByAdventurer, {
    id: profile ?? 0,
  });

  const adventurerCountsData = useCustomQuery(
    network,
    "adventurerCountsQuery",
    getAdventurerCounts,
    undefined
  );

  const handlefetchProfileData = async (adventurerId: number) => {
    setIsLoading();
    const newProfileAdventurerData = await refetch("leaderboardByIdQuery", {
      id: adventurerId,
    });
    const newItemsByProfileData = await refetch("itemsByProfileQuery", {
      id: adventurerId,
    });
    setData("leaderboardByIdQuery", newProfileAdventurerData);
    setData("itemsByProfileQuery", newItemsByProfileData);
    setNotLoading();
  };

  const handleSortXp = (xpData: any) => {
    const copiedAdventurersByXpData = xpData?.adventurers.slice();

    const sortedAdventurersByXPArray = copiedAdventurersByXpData?.sort(
      (a: Adventurer, b: Adventurer) => (b.xp ?? 0) - (a.xp ?? 0)
    );

    const sortedAdventurersByXP = { adventurers: sortedAdventurersByXPArray };
    return sortedAdventurersByXP;
  };

  useEffect(() => {
    if (data.adventurersByXPQuery) {
      setIsLoading();
      const sortedAdventurersByXP = handleSortXp(data.adventurersByXPQuery);
      setData("adventurersByXPQuery", sortedAdventurersByXP);
      setNotLoading();
    }
  }, [data.adventurersByXPQuery]);

  return (
    <div className="flex flex-col items-center h-full xl:overflow-y-auto 2xl:overflow-hidden mt-5 sm:mt-0">
      <div className="flex flex-row gap-5 items-center">
        <div className="flex flex-row border border-terminal-green items-center justify-between w-16 h-8 sm:w-24 sm:h-12 px-2">
          <SkullIcon className="fill-current w-4 h-4 sm:w-8 sm:h-8" />
          <p className="sm:text-2xl">
            {adventurerCountsData?.countDeadAdventurers}
          </p>
        </div>
        <Button onClick={() => setShowKilledBeasts(!showKilledBeasts)}>
          {showKilledBeasts ? "Scores" : "Beast Leaderboard"}
        </Button>
      </div>
      {showKilledBeasts ? (
        <BeastTable />
      ) : (
        <div className="flex flex-row w-full">
          <div
            className={`${showScores ? "hidden " : ""}sm:block w-full sm:w-1/2`}
          >
            <SeasonTable
              itemsPerPage={itemsPerPage}
              handleFetchProfileData={handlefetchProfileData}
              prizes={tournamentPrizes}
            />
          </div>
          <div
            className={`${showScores ? "" : "hidden "}sm:block w-full sm:w-1/2`}
          >
            <ScoreTable
              itemsPerPage={itemsPerPage}
              handleFetchProfileData={handlefetchProfileData}
              adventurerCount={adventurerCountsData?.countDeadAdventurers}
            />
          </div>
        </div>
      )}
      <Button
        onClick={() =>
          showScores ? setShowScores(false) : setShowScores(true)
        }
        className="sm:hidden"
      >
        {showScores ? "Show Live Leaderboard" : "Show Scores"}
      </Button>
    </div>
  );
}
