import React, { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/app/components/buttons/Button";
import { soundSelector, useUiSounds } from "@/app/hooks/useUiSound";
import { Menu } from "@/app/types";
import useUIStore from "@/app/hooks/useUIStore";

export interface ButtonData {
  id: number;
  label: string;
  value: string;
  disabled?: boolean;
}

interface HorizontalKeyboardControlProps {
  buttonsData: Menu[];
  disabled?: boolean[];
  onButtonClick: (value: any) => void;
  hideEncounters?: boolean;
}

const HorizontalKeyboardControl: React.FC<HorizontalKeyboardControlProps> = ({
  buttonsData,
  onButtonClick,
  disabled,
  hideEncounters,
}) => {
  const { play } = useUiSounds(soundSelector.click);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const screen = useUIStore((state) => state.screen);
  // const encounterTable = useUIStore((state) => state.encounterTable);
  // const showEncounterTable = useUIStore((state) => state.showEncounterTable);
  const onTabs = useUIStore((state) => state.onTabs);

  const arcadeButtonsData = buttonsData.length == 7 ? buttonsData : undefined;
  const arcadeDisabled = buttonsData.length == 7 ? disabled : undefined;

  useEffect(() => {
    if (arcadeButtonsData) {
      onButtonClick(arcadeButtonsData[selectedIndex]?.screen);
    }
  }, [selectedIndex, arcadeButtonsData]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (arcadeButtonsData && arcadeDisabled) {
        const getNextEnabledIndex = (
          currentIndex: number,
          direction: number
        ) => {
          let newIndex = currentIndex + direction;

          while (
            newIndex >= 0 &&
            newIndex < arcadeButtonsData.length &&
            arcadeDisabled[newIndex]
          ) {
            newIndex += direction;
          }

          return newIndex;
        };
        switch (event.key) {
          case "ArrowLeft":
            play();
            setSelectedIndex((prev) => {
              const newIndex = getNextEnabledIndex(prev, -1);
              return newIndex < 0 ? prev : newIndex;
            });
            break;
          case "ArrowRight":
            play();
            setSelectedIndex((prev) => {
              const newIndex = getNextEnabledIndex(prev, 1);
              return newIndex >= arcadeButtonsData.length ? prev : newIndex;
            });
            break;
        }
      }
    },
    [selectedIndex, arcadeButtonsData, arcadeDisabled]
  );

  useEffect(() => {
    if (onTabs) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [arcadeButtonsData, onTabs, arcadeDisabled]);

  useEffect(() => {
    setSelectedIndex(
      screen == "start"
        ? 0
        : screen == "play"
        ? 1
        : screen == "inventory"
        ? 2
        : screen == "upgrade"
        ? 3
        : screen == "leaderboard"
        ? 4
        : screen == "encounters"
        ? 5
        : 6
    );
  }, [onTabs]);

  return (
    <div className="flex justify-between sm:justify-start">
      <div className={`flex ${onTabs ? "shadow-lg" : ""}`}>
        {buttonsData.map((buttonData, index) => (
          <Button
            className="px-2.5 sm:px-3"
            key={buttonData.id}
            ref={(ref) => (buttonRefs.current[index] = ref)}
            variant={buttonData.screen === screen ? "default" : "outline"}
            onClick={() => {
              setSelectedIndex(index);
              onButtonClick(buttonData.screen);
            }}
            disabled={disabled ? disabled[index] : false}
          >
            {buttonData.label}
          </Button>
        ))}
        {/* <Button
          className="hidden sm:block px-2.5 sm:px-3"
          variant={encounterTable ? "default" : "outline"}
          onClick={() => showEncounterTable(!encounterTable)}
          disabled={hideEncounters}
        >
          Prescience
        </Button> */}
      </div>
    </div>
  );
};

export default HorizontalKeyboardControl;
