import React, { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/app/components/buttons/Button";
import { soundSelector, useUiSounds } from "@/app/hooks/useUiSound";
import { ButtonData } from "@/app/types";
import useUIStore from "@/app/hooks/useUIStore";

interface ButtonMenuProps {
  buttonsData: ButtonData[];
  onSelected: (value: string) => void;
  onEnterAction?: boolean;
  isActive?: boolean;
  setActiveMenu?: (value: number) => void;
  size?: "default" | "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  leftAction?: boolean;
}

const ButtonMenu: React.FC<ButtonMenuProps> = ({
  buttonsData,
  onSelected,
  onEnterAction,
  isActive = true,
  setActiveMenu,
  size,
  className,
  leftAction,
}) => {
  const { play } = useUiSounds(soundSelector.click);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const onTabs = useUIStore((state) => state.onTabs);
  const setOnTabs = useUIStore((state) => state.setOnTabs);

  useEffect(() => {
    if (!onTabs) {
      onSelected(buttonsData[selectedIndex].value ?? "");
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (onTabs) {
      setSelectedIndex(-1);
    }
  }, [onTabs]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          play();
          setSelectedIndex((prev) => {
            setOnTabs(false);
            const newIndex = Math.min(prev + 1, buttonsData.length - 1);
            onSelected(buttonsData[newIndex].value ?? "");
            return newIndex;
          });
          break;
        case "ArrowUp":
          play();
          setSelectedIndex((prev) => {
            const newIndex = Math.max(prev - 1, 0);
            if (prev - 1 == -1) {
              setOnTabs(true);
              return -1;
            } else {
              onSelected(buttonsData[newIndex].value ?? "");
              return newIndex;
            }
          });
          break;
        case "ArrowRight":
          if (!onTabs) {
            play();
            setSelectedIndex((prev) => {
              setActiveMenu && setActiveMenu(buttonsData[prev].id);
              onEnterAction && buttonsData[prev].action();
              return prev;
            });
          }
          break;
        case "ArrowLeft":
          if (!onTabs) {
            play();
            setSelectedIndex((prev) => {
              if (onEnterAction && buttonsData[prev].reverseAction) {
                buttonsData[prev].reverseAction?.();
              }
              return prev;
            });
          }
          break;
      }
    },
    [onEnterAction, setActiveMenu, play, onSelected, buttonsData, onTabs]
  );

  useEffect(() => {
    if (isActive) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, handleKeyDown]);

  return (
    <div className={`${className} flex  w-full`}>
      {buttonsData.map((buttonData, index) => (
        <Button
          key={buttonData.id}
          ref={(ref) => (buttonRefs.current[index] = ref)}
          className={`flex flex-row gap-5 w-full ${
            selectedIndex === index &&
            "bg-terminal-green text-terminal-black hover:bg-terminal-green hover:text-terminal-black"
          }`}
          variant="outline"
          size={size}
          onClick={() => {
            setSelectedIndex(index);
            buttonData.action();
          }}
          disabled={buttonData.disabled}
        >
          {buttonData.icon && (
            <div className="flex items-center justify-center w-6 h-6">
              {buttonData.icon}
            </div>
          )}
          {buttonData.label}
        </Button>
      ))}
    </div>
  );
};

export default ButtonMenu;
