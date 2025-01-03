import { Button } from "@/app/components/buttons/Button";
import { AdventurerName } from "@/app/components/start/AdventurerName";
import Prizes from "@/app/components/start/Prizes";
import { Spawn } from "@/app/components/start/Spawn";
import { WeaponSelect } from "@/app/components/start/WeaponSelect";
import { getTournamentPrizes } from "@/app/hooks/graphql/queries";
import useLoadingStore from "@/app/hooks/useLoadingStore";
import useUIStore from "@/app/hooks/useUIStore";
import { tournamentClient } from "@/app/lib/clients";
import { networkConfig } from "@/app/lib/networkConfig";
import { FormData } from "@/app/types";
import { useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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

  // Memoize both the variables AND the client
  const { variables, client } = useMemo(() => {
    return {
      variables: {
        tournamentId: networkConfig[network!].tournamentId,
      },
      client: tournamentClient(networkConfig[network!].tournamentGQLURL),
    };
  }, [network]); // Only recreate when network changes

  const { data: tournamentPrizes } = useQuery(getTournamentPrizes, {
    client,
    variables,
  });

  console.log(tournamentPrizes);

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
    console.log(lordsValue);
  }, [lordsValue]);

  return (
    <>
      {step == 1 && (
        <div className="flex flex-col w-full justify-between items-center gap-2 sm:gap-0 py-2 sm:py-10">
          <div className="flex flex-col items-center w-full gap-2 sm:gap-5">
            <h3 className="uppercase text-center 2xl:text-5xl m-0">
              Enter Season 0
            </h3>
            <p className="w-5/6 sm:text-xl text-center">
              Introducing onchain seasons for Loot Survivor. This is the first
              weekly season with a prize pool of:
            </p>
            <div className="w-full sm:w-3/4">
              {tournamentPrizes && (
                <Prizes
                  prizes={tournamentPrizes}
                  lordsDollarValue={lordsDollarValue}
                />
              )}
            </div>
          </div>
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
