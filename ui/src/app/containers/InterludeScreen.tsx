import { useEffect, useState } from "react";
import RandomnessLoader from "../components/animations/RandomnessLoader";
import SpriteAnimation from "@/app/components/animations/SpriteAnimation";
import { notificationAnimations } from "@/app/lib/constants";
import { Button } from "@/app/components/buttons/Button";
import { ItemsTutorial } from "@/app/components/tutorial/ItemsTutorial";
import { UpgradeTutorialPotions } from "@/app/components/tutorial/UpgradeTutorialPotions";
import { UpgradeTutorialItems } from "@/app/components/tutorial/UpgradeTutorialItems";
import { ElementalTutorial } from "@/app/components/tutorial/ElementalTutorial";
import { UnlocksTutorial } from "@/app/components/tutorial/ItemSpecialsTutorial";
import { BeastsTutorial } from "@/app/components/tutorial/BeastsTutorial";
import { CharismaTutorial } from "@/app/components/tutorial/CharismaTutorial";
import { PrescienceTutorial } from "@/app/components/tutorial/PrescienceTutorial";
import { Prescience2Tutorial } from "@/app/components/tutorial/Prescience2Tutorial";
import { JewelryTutorial } from "@/app/components/tutorial/JewelryTutorial";
import { TopTipsTutorial } from "@/app/components/tutorial/TopTipsTutorial";
import { ObstaclesTutorial } from "@/app/components/tutorial/ObstaclesTutorial";
import { DiscoveriesTutorial } from "@/app/components/tutorial/DiscoveriesTutorial";
import { CollectibleBeastsTutorial } from "@/app/components/tutorial/CollectibleBeatsTutorial";
import useUIStore from "@/app/hooks/useUIStore";

interface InterludeScreenProps {
  type: string;
}

export default function InterludeScreen({ type }: InterludeScreenProps) {
  const setOpenInterlude = useUIStore((state) => state.setOpenInterlude);
  const fetchUnlocksEntropy = useUIStore((state) => state.fetchUnlocksEntropy);
  const adventurerLeveledUp = useUIStore((state) => state.adventurerLeveledUp);

  const [loadingMessage, setLoadingMessage] = useState("");
  const [loading, setLoading] = useState(true);

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
    "Forging legendary weapons...",
    "Scattering gold coins in dark corners...",
    "Summoning ethereal wisps...",
    "Crafting intricate puzzle rooms...",
    "Awakening ancient golems...",
    "Inscribing magical runes...",
    "Unleashing packs of dire wolves...",
    "Concealing secret doors...",
    "Mixing volatile alchemical concoctions...",
    "Raising undead minions...",
    "Weaving illusions of grandeur...",
    "Sharpening guillotine blades...",
    "Summoning eldritch horrors...",
    "Enchanting rings of power...",
    "Brewing potions of invisibility...",
    "Scattering mimics throughout the dungeon...",
    "Polishing crystal balls...",
    "Unleashing swarms of bats...",
    "Placing cursed idols...",
    "Summoning spectral guardians...",
    "Crafting ornate lockboxes...",
    "Awakening slumbering liches...",
    "Arranging spike traps...",
    "Summoning will-o'-the-wisps...",
    "Crafting scrolls of teleportation...",
    "Unleashing hordes of kobolds...",
    "Hiding rare spell tomes...",
    "Summoning mischievous imps...",
    "Placing magical wardstones...",
    "Crafting amulets of protection...",
    "Unleashing gelatinous cubes...",
    "Scattering magical mushrooms...",
    "Summoning elemental spirits...",
    "Placing unstable portal rifts...",
    "Crafting wands of wonder...",
    "Unleashing packs of hellhounds...",
    "Hiding powerful artifacts...",
    "Summoning chaos elementals...",
    "Arranging falling boulder traps...",
  ];

  const [currentHintIndex, setCurrentHintIndex] = useState(13);

  const tutorials = [
    <ElementalTutorial key={0} />,
    <ItemsTutorial key={1} />,
    <UnlocksTutorial key={2} />,
    <UpgradeTutorialPotions key={3} />,
    <UpgradeTutorialItems key={4} />,
    <BeastsTutorial key={5} />,
    <ObstaclesTutorial key={6} />,
    <DiscoveriesTutorial key={7} />,
    <CharismaTutorial key={8} />,
    <PrescienceTutorial key={9} />,
    <Prescience2Tutorial key={10} />,
    <JewelryTutorial key={11} />,
    <TopTipsTutorial key={12} />,
    <CollectibleBeastsTutorial key={13} />,
  ];

  useEffect(() => {
    if (!adventurerLeveledUp && !fetchUnlocksEntropy) {
      setLoading(false);
    }
    const randomLoadingMessageIndex = Math.floor(
      Math.random() * loadingMessages.length
    );
    setLoadingMessage(loadingMessages[randomLoadingMessageIndex]);

    const randomHintIndex = Math.floor(Math.random() * tutorials.length);
    setCurrentHintIndex(randomHintIndex);
  }, [adventurerLeveledUp, fetchUnlocksEntropy]);

  return (
    <>
      <div className="fixed inset-0 left-0 right-0 bottom-0 bg-terminal-black z-40 sm:m-2 w-full h-full" />
      <div className="fixed inset-0 z-40 w-full h-full flex flex-col items-center sm:py-8">
        <h1 className="text-6xl animate-pulse">LEVEL COMPLETE</h1>
        <SpriteAnimation
          frameWidth={308}
          frameHeight={200}
          columns={5}
          rows={1}
          frameRate={4}
          animations={notificationAnimations}
          className="level-up-sprite"
          adjustment={0}
        />
        <div className="flex justify-center items-center h-1/2 sm:px-12 2xl:py-6 w-full sm:w-3/4 gap-5">
          {tutorials[currentHintIndex]}
        </div>
        {loading ? (
          <div className="flex flex-col w-full p-2 sm:w-[600px] sm:p-0">
            <p className="text-2xl">
              {type === "level"
                ? loadingMessage
                : "Loading Randomness for Item Unlocks"}
            </p>
            <RandomnessLoader loadingSeconds={15} />
          </div>
        ) : (
          <Button
            size={"lg"}
            className="text-2xl animate-pulse"
            onClick={() => setOpenInterlude(false)}
          >
            Proceed to next level
          </Button>
        )}
      </div>
    </>
  );
}
