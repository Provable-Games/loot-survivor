import ButtonMenu from "@/app/components/menu/ButtonMenu";
import { AdventurersList } from "@/app/components/start/AdventurersList";
import { CreateAdventurer } from "@/app/components/start/CreateAdventurer";
import {
  getAdventurersByOwnerCount,
  getAliveAdventurersCount,
} from "@/app/hooks/graphql/queries";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import useCustomQuery from "@/app/hooks/useCustomQuery";
import useNetworkAccount from "@/app/hooks/useNetworkAccount";
import { useQueriesStore } from "@/app/hooks/useQueryStore";
import useUIStore from "@/app/hooks/useUIStore";
import { indexAddress, padAddress } from "@/app/lib/utils";
import { FormData, NullAdventurer } from "@/app/types";
import { useEffect, useState } from "react";
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
}: AdventurerScreenProps) {
  const [activeMenu, setActiveMenu] = useState(0);
  const setAdventurer = useAdventurerStore((state) => state.setAdventurer);
  const resetData = useQueriesStore((state) => state.resetData);
  const startOption = useUIStore((state) => state.startOption);
  const setStartOption = useUIStore((state) => state.setStartOption);
  const network = useUIStore((state) => state.network);
  const { account } = useNetworkAccount();
  const owner = account?.address ? padAddress(account.address) : "";

  const adventurersByOwnerCountData = useCustomQuery(
    network,
    "adventurersByOwnerCountQuery",
    getAdventurersByOwnerCount,
    {
      owner: indexAddress(owner ?? "0x0").toLowerCase(),
    },
    owner === ""
  );

  const aliveAdventurersByOwnerCountData = useCustomQuery(
    network,
    "aliveAdventurersByOwnerCountQuery",
    getAliveAdventurersCount,
    {
      owner: indexAddress(owner ?? "0x0").toLowerCase(),
    },
    owner === ""
  );

  const adventurersByOwnerCount =
    adventurersByOwnerCountData?.countTotalAdventurers;

  const aliveAdventurersByOwnerCount =
    aliveAdventurersByOwnerCountData?.countAliveAdventurers;

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
      disabled: adventurersByOwnerCount == 0,
    },
  ];

  useEffect(() => {
    if (adventurersByOwnerCount == 0) {
      setStartOption("create adventurer");
    }
  }, []);

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
          />
        </div>
      )}

      {startOption === "choose adventurer" && (
        <div className="flex flex-col sm:w-5/6 h-[500px] sm:h-full w-full">
          <AdventurersList
            isActive={activeMenu == 2}
            onEscape={() => setActiveMenu(0)}
            handleSwitchAdventurer={handleSwitchAdventurer}
            gameContract={gameContract}
            adventurersCount={adventurersByOwnerCount}
            aliveAdventurersCount={aliveAdventurersByOwnerCount}
            transferAdventurer={transferAdventurer}
            changeAdventurerName={changeAdventurerName}
          />
        </div>
      )}
    </div>
  );
}
