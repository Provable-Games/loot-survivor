import React, { useState, useEffect, useCallback } from "react";
import { Contract } from "starknet";
import { FormData } from "@/app/types";
import { AdventurerName } from "@/app/components/start/AdventurerName";
import { WeaponSelect } from "@/app/components/start/WeaponSelect";
import { Spawn } from "@/app/components/start/Spawn";
import { networkConfig } from "@/app/lib/networkConfig";
import useLoadingStore from "@/app/hooks/useLoadingStore";
import useUIStore from "@/app/hooks/useUIStore";

export interface CreateAdventurerProps {
  isActive: boolean;
  onEscape: () => void;
  spawn: (...args: any[]) => any;
  lordsBalance?: bigint;
  goldenTokenData: any;
  gameContract: Contract;
  getBalances: () => Promise<void>;
  mintLords: (lordsAmount: number) => Promise<void>;
  costToPlay: bigint;
}

export const CreateAdventurer = ({
  isActive,
  onEscape,
  spawn,
  lordsBalance,
  goldenTokenData,
  gameContract,
  getBalances,
  mintLords,
  costToPlay,
}: CreateAdventurerProps) => {
  const [formData, setFormData] = useState<FormData>({
    startingWeapon: "",
    name: "",
    homeRealmId: "",
    class: "",
  });
  const [step, setStep] = useState(1);
  const resetNotification = useLoadingStore((state) => state.resetNotification);
  const network = useUIStore((state) => state.network);
  const onKatana = useUIStore((state) => state.onKatana);

  const lordsGameCost = Number(costToPlay);

  const handleSubmitLords = async () => {
    console.log("submit");
    resetNotification();
    await spawn(
      formData,
      "0",
      networkConfig[network!].revenueAddress,
      lordsGameCost
    );
    if (!onKatana) {
      await getBalances();
    }
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent) => {
      console.log(event);
      switch (event.key) {
        case "Enter":
          console.log("Enter");
          if (formData.name) {
            handleSubmitLords();
          }
          break;
      }
    },
    [onEscape, formData, isActive]
  );

  useEffect(() => {
    if (isActive) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, handleKeyDown, formData.name]);

  const handleBack = () => {
    setStep((step) => Math.max(step - 1, 1));
  };

  return (
    <>
      {step == 1 && (
        <>
          <div className="hidden sm:flex flex-col 2xl:gap-5 justify-center items-center">
            <WeaponSelect
              setFormData={setFormData}
              formData={formData}
              handleBack={handleBack}
              step={step}
              setStep={setStep}
              onEscape={onEscape}
            />
            <AdventurerName
              setFormData={setFormData}
              formData={formData}
              handleBack={handleBack}
              step={step}
              setStep={setStep}
            />
          </div>
          <div className="sm:hidden">
            <WeaponSelect
              setFormData={setFormData}
              formData={formData}
              handleBack={handleBack}
              step={step}
              setStep={setStep}
              onEscape={onEscape}
            />
          </div>
        </>
      )}
      {step == 2 && (
        <>
          <div className="hidden sm:flex w-full">
            <Spawn
              formData={formData}
              spawn={spawn}
              handleBack={handleBack}
              lordsBalance={lordsBalance}
              goldenTokenData={goldenTokenData}
              gameContract={gameContract}
              getBalances={getBalances}
              mintLords={mintLords}
              costToPlay={costToPlay}
            />
          </div>
          <div className="sm:hidden">
            <AdventurerName
              setFormData={setFormData}
              formData={formData}
              handleBack={handleBack}
              step={step}
              setStep={setStep}
            />
          </div>
        </>
      )}
      {step == 3 && (
        <div className="sm:hidden">
          <Spawn
            formData={formData}
            spawn={spawn}
            handleBack={handleBack}
            lordsBalance={lordsBalance}
            goldenTokenData={goldenTokenData}
            gameContract={gameContract}
            getBalances={getBalances}
            mintLords={mintLords}
            costToPlay={costToPlay}
          />
        </div>
      )}
    </>
  );
};
