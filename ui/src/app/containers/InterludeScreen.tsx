import { useEffect, useState } from "react";
import Hints from "@/app/components/interlude/Hints";
import { EntropyCountDown } from "@/app/components/CountDown";
import useAdventurerStore from "../hooks/useAdventurerStore";
import RandomnessLoader from "../components/animations/RandomnessLoader";
import RowLoader from "@/app/components/animations/RowLoader";

interface InterludeScreenProps {
  type: string;
}

export default function InterludeScreen({ type }: InterludeScreenProps) {
  const [countDownExpired, setCountDownExpired] = useState(false);
  const [nextEntropyTime, setNextEntropyTime] = useState<number | null>(null);
  const adventurer = useAdventurerStore((state) => state.adventurer);
  const [loadingMessage, setLoadingMessage] = useState("");

  const loadingMessages = [
    "Summoning ancient dragons...",
    "Sharpening rusty swords...",
    "Placing traps in dark corridors...",
    "Awakening slumbering beasts...",
    "Constructing labyrinthine dungeons...",
    "Brewing mysterious potions...",
    "Enchanting magical amulets...",
    "Unleashing hordes of goblins...",
    "Hiding secret passages...",
    "Polishing rare artifacts...",
    "Spawning venomous spiders...",
    "Assembling skeletal warriors...",
  ];

  useEffect(() => {
    const currentTime = new Date().getTime();
    setNextEntropyTime(currentTime + 15 * 1000);
  }, []);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * loadingMessages.length);
    setLoadingMessage(loadingMessages[randomIndex]);
  }, []);

  return (
    <>
      <div className="fixed inset-0 left-0 right-0 bottom-0 bg-terminal-black z-40 sm:m-2 w-full h-full" />
      <div className="fixed inset-0 z-40 w-full h-full flex flex-col justify-between items-center sm:py-8">
        <h1 className="text-6xl animate-pulse">LEVEL COMPLETE</h1>
        <div className="flex items-center justify-center">
          <span className="flex flex-col gap-1 items-center justify-center">
            <p className="text-2xl">
              {type === "level"
                ? loadingMessage
                : "Loading Randomness for Item Unlocks"}
            </p>
            {!countDownExpired ? (
              <RandomnessLoader loadingSeconds={15} />
            ) : (
              <p className="text-6xl animate-pulse text-terminal-yellow">
                Please wait
              </p>
            )}
          </span>
        </div>
        <div className="flex justify-center items-center h-1/2 w-full">
          <Hints />
        </div>
        <div className="w-full h-1/8 2xl:h-1/6">
          <RowLoader />
        </div>
      </div>
    </>
  );
}
