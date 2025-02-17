import { Button } from "@/app/components/buttons/Button";
import LootIconLoader from "@/app/components/icons/Loader";
import SeasonRow from "@/app/components/leaderboard/SeasonRow";
import {
  getAdventurersInListByXP,
  getTournamentGames,
} from "@/app/hooks/graphql/queries";
import useCustomQuery from "@/app/hooks/useCustomQuery";
import useUIStore from "@/app/hooks/useUIStore";
import { tournamentClient } from "@/app/lib/clients";
import { networkConfig } from "@/app/lib/networkConfig";
import { Adventurer } from "@/app/types";
import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";

export interface SeasonTableProps {
  itemsPerPage: number;
  handleFetchProfileData: (adventurerId: number) => void;
  prizes: any;
}

const SeasonTable = ({
  itemsPerPage,
  handleFetchProfileData,
  prizes,
}: SeasonTableProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setScreen = useUIStore((state) => state.setScreen);
  const setProfile = useUIStore((state) => state.setProfile);
  const network = useUIStore((state) => state.network);

  const seasonActive = process.env.NEXT_PUBLIC_SEASON_ACTIVE === "true";
  const isDSTournamentActive =
    process.env.NEXT_PUBLIC_DS_TOURNAMENT_ACTIVE === "true";
  const dsTournamentId = process.env.NEXT_PUBLIC_DS_TOURNAMENT_ID ?? 0;

  // Memoize both the variables AND the client
  const { variables, client } = useMemo(() => {
    return {
      variables: {
        tournamentId: isDSTournamentActive
          ? dsTournamentId
          : networkConfig[network!].tournamentId,
      },
      client: tournamentClient(networkConfig[network!].tournamentGQLURL),
    };
  }, [network]); // Only recreate when network changes

  const { data: tournamentGames } = useQuery(getTournamentGames, {
    client,
    variables,
  });

  const gameIds = useMemo(() => {
    if (!tournamentGames?.lsTournamentsV0TournamentGameModels?.edges) {
      return [];
    }

    return tournamentGames.lsTournamentsV0TournamentGameModels.edges.map(
      (edge: any) => Number(edge.node.game_id)
    );
  }, [tournamentGames]);

  const adventurersByXPdata = useCustomQuery(
    network,
    "adventurersByXPQuery",
    getAdventurersInListByXP,
    { ids: gameIds }
  );

  const adventurers = adventurersByXPdata?.adventurers ?? [];

  const pagedAdventurers = useMemo(() => {
    if (!adventurers) return [];
    return adventurers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [adventurers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(adventurers.length / itemsPerPage);

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

  const formattedPrizes =
    prizes?.lsTournamentsV0TournamentPrizeModels?.edges ?? [];

  const groupedPrizes = formattedPrizes.reduce((acc: any, prize: any) => {
    const key = prize.node.payout_position;
    const isERC20 = prize.node.token_data_type.option === "erc20";
    if (isERC20) {
      if (!acc[key]) acc[key] = [];
      acc[key].push(prize.node);
    } else {
      acc[key] = [prize.node];
    }
    return acc;
  }, {} as Record<string, typeof prizes>);

  return (
    <>
      {!adventurers ? (
        <div className="flex justify-center items-center h-full">
          <LootIconLoader className="m-auto" size="w-10" />
        </div>
      ) : (
        <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between w-full">
          <div className="flex flex-col w-full sm:mr-4 flex-grow-2 p-2 gap-2">
            <h4 className="text-center text-2xl m-0 uppercase">
              {isDSTournamentActive
                ? "Dark Shuffle Tournament"
                : seasonActive
                ? "Opus Season 2"
                : "Season Ended"}
            </h4>
            {(isDSTournamentActive || seasonActive) && (
              <>
                <table className="w-full xl:text-lg 2xl:text-xl border border-terminal-green">
                  <thead className="border border-terminal-green">
                    <tr>
                      <th className="p-1">Rank</th>
                      <th className="p-1">Adventurer</th>
                      <th className="p-1">Level</th>
                      <th className="p-1">XP</th>
                      <th className="p-1">Health</th>
                      <th className="p-1">Prize</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedAdventurers?.map(
                      (adventurer: Adventurer, index: number) => (
                        <SeasonRow
                          key={index}
                          rank={index + 1 + (currentPage - 1) * itemsPerPage}
                          adventurer={adventurer}
                          handleRowSelected={handleRowSelected}
                          prize={
                            groupedPrizes[
                              (
                                index +
                                1 +
                                (currentPage - 1) * itemsPerPage
                              ).toString()
                            ]
                          }
                        />
                      )
                    )}
                  </tbody>
                </table>
                {adventurers.length > 10 && (
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SeasonTable;
