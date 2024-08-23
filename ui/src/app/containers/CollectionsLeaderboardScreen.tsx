import { formatXP } from "@/app/lib/utils";

/**
 * @container
 * @description Provides the collections leaderboard screen.
 */
export default function CollectionsLeaderboardScreen() {
  const sampleScores = [
    { avatar: "/collections/Blobert.png", totalXP: 300, gamesPlayed: 20 },
    { avatar: "/collections/Defi-Spring.png", totalXP: 2, gamesPlayed: 1000 },
    {
      avatar: "/collections/Ducks-Everywhere.png",
      totalXP: 60,
      gamesPlayed: 20,
    },
    { avatar: "/collections/Everai.png", totalXP: 60, gamesPlayed: 20 },
    { avatar: "/collections/Focus-Tree.png", totalXP: 60, gamesPlayed: 20 },
    { avatar: "/collections/Influence.png", totalXP: 60, gamesPlayed: 20 },
    { avatar: "/collections/Open-Division.png", totalXP: 60, gamesPlayed: 20 },
    { avatar: "/collections/Pixel-Banners.png", totalXP: 60, gamesPlayed: 20 },
    { avatar: "/collections/Realms.png", totalXP: 60, gamesPlayed: 20 },
  ];

  // Calculate the maximum Total XP from all scores
  const maxTotalXP = Math.max(...sampleScores.map((score) => score.totalXP));
  const maxGamesPlayable = 1600; // Set this to the maximum possible XP

  return (
    <div className="flex flex-col h-full w-full">
      <h3 className="text-center">Collection Scores</h3>
      <div className="h-7/8">
        <ScoreGraph
          scores={sampleScores}
          maxGamesPlayable={maxGamesPlayable}
          maxTotalXP={maxTotalXP}
        />
      </div>
    </div>
  );
}

import React from "react";

interface ScoreData {
  avatar: string;
  totalXP: number;
  gamesPlayed: number;
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
      <div className="flex items-end h-full gap-2">
        {scores.map((score, index) => (
          <div key={index} className="flex flex-col items-center w-40 h-full">
            <div className="w-full flex flex-col items-center h-full">
              <img src={score.avatar} alt="Avatar" className="w-20 h-20 mb-2" />
              <div className="w-full flex flex-grow flex-col-reverse text-terminal-black text-center">
                <div
                  className="bg-terminal-green w-full relative"
                  style={{ height: `${(score.totalXP / maxTotalXP) * 100}%` }}
                >
                  <div
                    className="bg-terminal-yellow w-full absolute bottom-0"
                    style={{
                      height: `${
                        (score.gamesPlayed / maxGamesPlayable) * 100
                      }%`,
                    }}
                  >
                    {score.gamesPlayed > 0 && (
                      <span className="text-xs">{`${Math.round(
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
