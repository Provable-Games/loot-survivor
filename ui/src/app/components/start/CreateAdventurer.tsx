import { Button } from "@/app/components/buttons/Button";
import { AdventurerName } from "@/app/components/start/AdventurerName";
import Prizes from "@/app/components/start/Prizes";
import { Spawn } from "@/app/components/start/Spawn";
import { WeaponSelect } from "@/app/components/start/WeaponSelect";
import useLoadingStore from "@/app/hooks/useLoadingStore";
import useUIStore from "@/app/hooks/useUIStore";
import { networkConfig } from "@/app/lib/networkConfig";
import { FormData } from "@/app/types";
import React, { useCallback, useEffect, useState } from "react";
import { Contract } from "starknet";

export interface CreateAdventurerProps {
  isActive: boolean;
  onEscape: () => void;
  spawn: (...args: any[]) => any;
  startSeason: (...args: any[]) => any;
  goldenTokens: number[];
  blobertsData: any;
  gameContract: Contract;
  getBalances: () => Promise<void>;
  costToPlay: bigint;
  lordsDollarValue: () => Promise<bigint>;
  tournamentPrizes: any;
}

export const CreateAdventurer = ({
  isActive,
  onEscape,
  spawn,
  startSeason,
  goldenTokens,
  blobertsData,
  gameContract,
  getBalances,
  costToPlay,
  lordsDollarValue,
  tournamentPrizes,
}: CreateAdventurerProps) => {
  const [formData, setFormData] = useState<FormData>({
    startingWeapon: "",
    name: "",
    homeRealmId: "",
    class: "",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [step, setStep] = useState(1);
  const { onKatana } = useUIStore();
  const resetNotification = useLoadingStore((state) => state.resetNotification);
  const network = useUIStore((state) => state.network);
  const [lordsValue, setLordsValue] = useState(0n);

  const seasonActive = process.env.NEXT_PUBLIC_SEASON_ACTIVE === "true";

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent) => {
      if (!event.currentTarget) return;
      const form = (event.currentTarget as HTMLElement).closest("form");
      if (!form) return;
      const inputs = Array.from(form.querySelectorAll("input, select"));
      switch (event.key) {
        case "ArrowDown":
          setSelectedIndex((prev) => {
            const newIndex = Math.min(prev + 1, inputs.length - 1);
            return newIndex;
          });
          break;
        case "ArrowUp":
          setSelectedIndex((prev) => {
            const newIndex = Math.max(prev - 1, 0);
            return newIndex;
          });
        case "Escape":
          onEscape();
          break;
      }
      (inputs[selectedIndex] as HTMLElement).focus();
    },
    [selectedIndex, onEscape]
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
  }, [isActive, selectedIndex, handleKeyDown]);

  const handleBack = () => {
    setStep((step) => Math.max(step - 1, 1));
  };

  const handleNameEntry = async (name: string) => {
    setFormData({ ...formData, name: name });
    if (!onKatana) {
      setTimeout(() => {
        setStep(step + 1);
      }, 1000);
    } else {
      resetNotification();
      try {
        await spawn(
          formData,
          "0",
          "0",
          networkConfig[network!].revenueAddresses,
          0
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleGetLordsValue = async () => {
    const value = await lordsDollarValue();
    setLordsValue(value);
  };

  useEffect(() => {
    handleGetLordsValue();
  }, [lordsValue]);

  return (
    <>
      {step == 1 && (
        <div className="flex flex-col w-full justify-between items-center gap-5 sm:gap-0 py-2 sm:pt-10">
          {seasonActive ? (
            <div className="flex flex-col items-center w-full gap-2 sm:gap-5">
              <h3 className="uppercase text-center 2xl:text-5xl m-0">
                Opus Season 2
              </h3>
              <p className="w-5/6 sm:text-xl text-center">
                We&apos;ve teamed up with Opus, a cross-margin credit protocol,
                to sponsor on-chain tournaments with $CASH prizes.{" "}
                <a
                  className="underline uppercase"
                  href="https://www.opus.money/"
                >
                  Visit Opus
                </a>
              </p>
              <p className="sm:text-xl text-center">Ends 24/02 15:00 UTC</p>
              <div className="w-full sm:w-3/4">
                {tournamentPrizes && (
                  <Prizes
                    prizes={tournamentPrizes}
                    lordsDollarValue={lordsDollarValue}
                  />
                )}
              </div>
            </div>
          ) : (
            // <div className="flex flex-col items-center w-full gap-2 sm:gap-5">
            //   <h3 className="uppercase text-center 2xl:text-5xl m-0">
            //     No Season Active
            //   </h3>
            //   <p className="sm:text-xl text-center uppercase">
            //     The previous season has ended. Stay tuned for the next one.
            //   </p>
            // </div>
            <></>
          )}
          <WeaponSelect
            setFormData={setFormData}
            formData={formData}
            handleBack={handleBack}
            step={step}
            setStep={setStep}
          />
          <AdventurerName setFormData={setFormData} formData={formData} />
          <div className="sm:flex items-center justify-center mt-5">
            <Button
              size={"lg"}
              disabled={
                !formData.startingWeapon ||
                !formData.name ||
                formData.name === ""
              }
              onClick={() => handleNameEntry(formData.name)}
            >
              Play
            </Button>
          </div>
        </div>
      )}
      {step == 2 && (
        <div className="flex w-full h-full">
          <Spawn
            formData={formData}
            spawn={spawn}
            startSeason={startSeason}
            handleBack={handleBack}
            goldenTokens={goldenTokens}
            blobertsData={blobertsData}
            gameContract={gameContract}
            getBalances={getBalances}
            costToPlay={costToPlay}
            lordsValue={lordsValue}
            tournamentPrizes={tournamentPrizes}
          />
        </div>
      )}
    </>
  );
};
