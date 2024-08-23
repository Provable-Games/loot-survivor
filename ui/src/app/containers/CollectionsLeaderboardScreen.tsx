import { formatXP } from "@/app/lib/utils";
import { CollectionScore } from "@/app/types";

/**
 * @container
 * @description Provides the collections leaderboard screen.
 */
export default function CollectionsLeaderboardScreen() {
  const sampleScores: CollectionScore[] = [
    {
      avatar: "/collections/Blobert.png",
      totalXP: 300,
      gamesPlayed: 20,
      name: "Bloberts",
    },
    {
      avatar: "/collections/Defi-Spring.png",
      totalXP: 2,
      gamesPlayed: 7,
      name: "Defi-Spring",
    },
    {
      avatar: "/collections/Ducks-Everywhere.png",
      totalXP: 60,
      gamesPlayed: 20,
      name: "Ducks Everywhere",
    },
    {
      avatar: "/collections/Everai.png",
      totalXP: 60,
      gamesPlayed: 900,
      name: "Everai",
    },
    {
      avatar: "/collections/Focus-Tree.png",
      totalXP: 60,
      gamesPlayed: 20,
      name: "Focus Tree",
    },
    {
      avatar: "/collections/Influence.png",
      totalXP: 60,
      gamesPlayed: 20,
      name: "Influence",
    },
    {
      avatar: "/collections/Open-Division.png",
      totalXP: 60,
      gamesPlayed: 20,
      name: "Open Division",
    },
    {
      avatar: "/collections/Pixel-Banners.png",
      totalXP: 60,
      gamesPlayed: 20,
      name: "Pixel Banners",
    },
    {
      avatar: "/collections/Realms.png",
      totalXP: 60,
      gamesPlayed: 20,
      name: "Realms",
    },
  ].sort((a, b) => b.totalXP - a.totalXP);

  // Calculate the maximum Total XP from all scores
  const maxTotalXP = Math.max(...sampleScores.map((score) => score.totalXP));
  const maxGamesPlayable = 1600; // Set this to the maximum possible XP

  return (
    <div className="flex flex-col h-full w-full">
      <h3 className="text-center uppercase">Collection Scores</h3>
      <ScoreGraph
        scores={sampleScores}
        maxGamesPlayable={maxGamesPlayable}
        maxTotalXP={maxTotalXP}
      />
    </div>
  );
}

import React from "react";

interface ScoreData {
  avatar: string;
  totalXP: number;
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
    <div className="relative flex flex-col h-full">
      <div className="flex items-end h-full justify-between">
        {scores.map((score, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-end w-32 h-full"
          >
            <div className="w-full flex flex-col items-center justify-end h-5/6">
              <div className="w-full flex flex-grow flex-col-reverse text-terminal-black text-center">
                <div
                  className="relative bg-terminal-green w-full relative"
                  style={{ height: `${(score.totalXP / maxTotalXP) * 100}%` }}
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
                  {score.totalXP > 0 && (
                    <span className="text-xl absolute top-0 left-0 right-0">
                      {formatXP(score.totalXP)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* X-axis */}
      <span className="absolute left-[-20px] bottom-[-20px] w-[105%] bg-terminal-green-50 h-2" />
      {/* Y-axis */}
      <span className="absolute left-[-20px] bottom-[-20px] w-2 bg-terminal-green-50 h-[105%]" />
      {/* Top 3 */}
      <div className="absolute top-0 flex flex-col left-1/2 transform -translate-x-1/2 uppercase text-center text-2xl">
        <span>1. {scores[0].name}</span>
        <span>2. {scores[1].name}</span>
        <span>3. {scores[2].name}</span>
      </div>
      <div className="absolute flex justify-end top-[-50px] border border-terminal-green p-2">
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
