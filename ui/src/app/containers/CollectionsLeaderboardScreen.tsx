import { useMemo } from "react";
import { formatXP } from "@/app/lib/utils";
import { collectionData } from "@/app/lib/constants";
import { useQuery } from "@apollo/client";
import { getCollectionsTotals } from "@/app/hooks/graphql/queries";
import { gameClient } from "@/app/lib/clients";
import { networkConfig } from "@/app/lib/networkConfig";
import useUIStore from "@/app/hooks/useUIStore";
import { padAddress } from "@/app/lib/utils";

interface CollectionTotal {
  xp: number;
  gamesPlayed: number;
  collection: string;
}

/**
 * @container
 * @description Provides the collections leaderboard screen.
 */
export default function CollectionsLeaderboardScreen() {
  const network = useUIStore((state) => state.network);
  const client = useMemo(() => {
    return gameClient(networkConfig[network!].lsGQLURL);
  }, [network]);
  const { data } = useQuery(getCollectionsTotals, {
    client: client,
    fetchPolicy: "network-only",
  });
  const collectionsTotals = data?.collectionTotals ?? [];

  // Merge collectionsTotals with collectionData
  const mergedCollections = useMemo(() => {
    const totalsMap = new Map<string, CollectionTotal>(
      collectionsTotals.map((total: CollectionTotal) => [
        padAddress(total.collection),
        total,
      ]) || []
    );

    return collectionData
      .map((collection) => {
        const totals = totalsMap.get(collection.token) || {
          xp: 0,
          gamesPlayed: 0,
        };

        return {
          ...collection,
          xp: totals.xp || 0,
          gamesPlayed: totals.gamesPlayed || 0,
        };
      })
      .sort((a, b) => b.xp - a.xp);
  }, [collectionsTotals]);

  // Calculate the maximum Total XP from all scores
  const maxTotalXP = Math.max(
    ...mergedCollections.map((score: any) => score.xp)
  );

  const maxGamesPlayable = 1600; // Set this to the maximum possible XP

  return (
    <div className="flex flex-col h-full w-full">
      <h3 className="text-center uppercase">Collection Scores</h3>
      <ScoreGraph
        scores={mergedCollections}
        maxGamesPlayable={maxGamesPlayable}
        maxTotalXP={maxTotalXP}
      />
    </div>
  );
}

import React from "react";

interface ScoreData {
  avatar: string;
  xp: number;
  gamesPlayed: number;
  name: string;
}

interface ScoreGraphProps {
  scores: ScoreData[];
  maxGamesPlayable: number;
  maxTotalXP: number;
}

const ScoreGraph: React.FC<ScoreGraphProps> = ({
  scores,
  maxGamesPlayable,
  maxTotalXP,
}) => {
  return (
    <div className="relative flex flex-col sm:h-full">
      <div className="hidden sm:flex items-end h-full justify-between">
        {scores.map((score, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-end w-32 h-full"
          >
            <div className="w-full flex flex-col items-center justify-end h-5/6">
              <div className="w-full flex flex-grow flex-col-reverse text-terminal-black text-center">
                <div
                  className="relative bg-terminal-green w-full relative"
                  style={{ height: `${(score.xp / maxTotalXP) * 100}%` }}
                >
                  <img
                    src={score.avatar}
                    alt="Avatar"
                    className="absolute w-20 h-20 z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2"
                  />
                  <div
                    className="bg-terminal-yellow w-full absolute bottom-0"
                    style={{
                      height: `${
                        (score.gamesPlayed / maxGamesPlayable) * 100
                      }%`,
                    }}
                  >
                    {score.gamesPlayed > 0 && (
                      <span
                        className={`text-xl absolute left-1/2 transform -translate-x-1/2 ${
                          (score.gamesPlayed / maxGamesPlayable) * 100 <= 50
                            ? "bottom-full"
                            : "top-0"
                        }`}
                      >{`${Math.round(
                        (score.gamesPlayed / maxGamesPlayable) * 100
                      )}%`}</span>
                    )}
                  </div>
                  {score.xp > 0 && (
                    <span className="text-xl absolute top-0 left-0 right-0">
                      {formatXP(score.xp)} XP
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 sm:hidden items-end h-full w-full justify-between">
        {scores.map((score, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-end w-full h-12"
          >
            <div className="w-5/6 flex flex-row items-center justify-end h-full">
              <div className="flex flex-grow flex-row text-terminal-black text-center h-full">
                <div
                  className="relative bg-terminal-green h-full relative"
                  style={{ width: `${(score.xp / maxTotalXP) * 100}%` }}
                >
                  <img
                    src={score.avatar}
                    alt="Avatar"
                    className="absolute w-10 h-10 z-10 left-[-50px] top-1/2 transform -translate-y-1/2 min-w-[40px]"
                  />
                  <div
                    className="bg-terminal-yellow h-full absolute bottom-0"
                    style={{
                      width: `${(score.gamesPlayed / maxGamesPlayable) * 100}%`,
                    }}
                  >
                    {score.gamesPlayed > 0 && (
                      <span
                        className={`text-xl absolute top-1/2 transform -translate-y-1/2 ${
                          (score.xp / maxTotalXP) * 100 <= 10 && "hidden"
                        } ${
                          (score.gamesPlayed / maxGamesPlayable) * 100 <= 50
                            ? "left-full"
                            : "right-0"
                        }`}
                      >{`${Math.round(
                        (score.gamesPlayed / maxGamesPlayable) * 100
                      )}%`}</span>
                    )}
                  </div>
                  {score.xp > 0 && (
                    <span
                      className={`text-xl absolute right-1 top-1/2 transform -translate-y-1/2 ${
                        (score.xp / maxTotalXP) * 100 <= 90
                          ? "right-[-20px] text-terminal-green"
                          : ""
                      }`}
                    >
                      {formatXP(score.xp)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* X-axis */}
      <span className="hidden sm:block absolute left-[-20px] bottom-[-20px] w-[105%] bg-terminal-green-50 h-2" />
      {/* Y-axis */}
      <span className="hidden sm:block absolute left-[-20px] bottom-[-20px] w-2 bg-terminal-green-50 h-[105%]" />
      {/* Top 3 */}
      <div className="absolute hidden sm:flex justify-end top-[-50px] border border-terminal-green p-2">
        <div className="flex items-center mr-4">
          <div className="w-8 h-4 bg-terminal-green mr-2"></div>
          <span>TOTAL XP</span>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-4 bg-terminal-yellow mr-2"></div>
          <span>GAMES PLAYED</span>
        </div>
      </div>
    </div>
  );
};
