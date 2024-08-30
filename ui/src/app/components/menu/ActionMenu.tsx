import React, { useRef } from "react";
import { Button } from "@/app/components/buttons/Button";
import { soundSelector, useUiSounds } from "@/app/hooks/useUiSound";
import { ButtonData } from "@/app/types";

interface ActionMenuProps {
  title: string;
  buttonsData: ButtonData[];
  size?: "default" | "xs" | "sm" | "lg" | "xl" | "fill";
  className?: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  title,
  buttonsData,
  size,
  className,
}) => {
  const { play } = useUiSounds(soundSelector.click);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className={`relative ${className ?? ""} flex w-full h-full`}>
      {buttonsData.map((buttonData, index) => (
        <Button
          key={index}
          ref={(ref) => (buttonRefs.current[index] = ref)}
          className={`flex flex-row gap-5 w-full h-full ${
            buttonData.className ?? ""
          } text-terminal-green text-sm sm:text-lg border border-terminal-green`}
          variant="outline"
          size={size}
          onClick={() => {
            play();
            buttonData.action();
          }}
          disabled={buttonData.disabled}
        >
          {buttonData.icon && <div className="w-6 h-6">{buttonData.icon}</div>}
          <div className="flex flex-col">
            {buttonData.label}
            <span className="text-xs text-red-400">{buttonData.tip}</span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default ActionMenu;
