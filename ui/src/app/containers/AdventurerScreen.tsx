import { Button } from "@/app/components/buttons/Button";
import ButtonMenu from "@/app/components/menu/ButtonMenu";
import { AdventurersList } from "@/app/components/start/AdventurersList";
import { CreateAdventurer } from "@/app/components/start/CreateAdventurer";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import useNetworkAccount from "@/app/hooks/useNetworkAccount";
import { useQueriesStore } from "@/app/hooks/useQueryStore";
import useUIStore from "@/app/hooks/useUIStore";
import { padAddress } from "@/app/lib/utils";
import { FormData, NullAdventurer } from "@/app/types";
import { useState } from "react";
import { AccountInterface, Contract } from "starknet";

interface AdventurerScreenProps {
  spawn: (
    formData: FormData,
    goldenTokenId: string,
    blobertTokenId: string,
    revenueAddresses: string[],
    costToPlay?: number
  ) => Promise<void>;
  startSeason: (
    formData: FormData,
    goldenTokenId: string,
    blobertTokenId: string,
    revenueAddresses: string[],
    costToPlay?: number,
    seasonCost?: number
  ) => Promise<void>;
  handleSwitchAdventurer: (adventurerId: number) => Promise<void>;
  gameContract: Contract;
  goldenTokens: number[];
  blobertsData: any;
  getBalances: () => Promise<void>;
  costToPlay: bigint;
  transferAdventurer: (
    account: AccountInterface,
    adventurerId: number,
    from: string,
    recipient: string
  ) => Promise<void>;
  lordsDollarValue: () => Promise<bigint>;
  changeAdventurerName: (
    account: AccountInterface,
    adventurerId: number,
    name: string,
    index: number
  ) => Promise<void>;
  tournamentPrizes: any;
}

/**
 * @container
 * @description Provides the start screen for the adventurer.
 */
export default function AdventurerScreen({
  spawn,
  startSeason,
  handleSwitchAdventurer,
  gameContract,
  goldenTokens,
  blobertsData,
  getBalances,
  costToPlay,
  transferAdventurer,
  lordsDollarValue,
  changeAdventurerName,
  tournamentPrizes,
}: AdventurerScreenProps) {
  const [activeMenu, setActiveMenu] = useState(0);
  const setAdventurer = useAdventurerStore((state) => state.setAdventurer);
  const resetData = useQueriesStore((state) => state.resetData);
  const startOption = useUIStore((state) => state.startOption);
  const setStartOption = useUIStore((state) => state.setStartOption);
  const setShowLoginDialog = useUIStore((state) => state.setShowLoginDialog);
  const { account } = useNetworkAccount();
  const owner = account?.address ? padAddress(account.address) : "";

  const menu = [
    {
      id: 1,
      label: "Create Adventurer",
      value: "create adventurer",
      action: () => {
        setStartOption("create adventurer");
        setAdventurer(NullAdventurer);
        resetData("adventurerByIdQuery");
      },
      disabled: false,
    },
    {
      id: 2,
      label: "Choose Adventurer",
      value: "choose adventurer",
      action: () => {
        setStartOption("choose adventurer");
      },
      disabled: false,
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row w-full h-full">
      <div className="w-full sm:w-1/6 h-10">
        <ButtonMenu
          buttonsData={menu}
          onSelected={(value) => setStartOption(value)}
          isActive={activeMenu == 0}
          setActiveMenu={setActiveMenu}
          className="sm:flex-col h-full"
        />
      </div>

      {startOption === "create adventurer" && (
        <div className="flex flex-col w-5/6 h-full mx-auto sm:justify-center sm:flex-row gap-2">
          <CreateAdventurer
            isActive={activeMenu == 1}
            onEscape={() => setActiveMenu(0)}
            spawn={spawn}
            startSeason={startSeason}
            goldenTokens={goldenTokens}
            blobertsData={blobertsData}
            gameContract={gameContract}
            getBalances={getBalances}
            costToPlay={costToPlay}
            lordsDollarValue={lordsDollarValue}
            tournamentPrizes={tournamentPrizes}
          />
        </div>
      )}

      {startOption === "choose adventurer" &&
        (owner !== "" ? (
          <div className="flex flex-col sm:w-5/6 h-[500px] sm:h-full w-full">
            <AdventurersList
              isActive={activeMenu == 2}
              onEscape={() => setActiveMenu(0)}
              handleSwitchAdventurer={handleSwitchAdventurer}
              gameContract={gameContract}
              transferAdventurer={transferAdventurer}
              changeAdventurerName={changeAdventurerName}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-5 sm:w-5/6 h-[500px] sm:h-full w-full justify-center items-center">
            <p className="text-2xl uppercase">
              You must have an account connected to view your owned adventurers.
            </p>
            <Button size="lg" onClick={() => setShowLoginDialog(true)}>
              Connect Account
            </Button>
          </div>
        ))}
    </div>
  );
}
