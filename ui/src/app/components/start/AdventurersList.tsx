import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Contract, validateChecksumAddress } from "starknet";
import { Button } from "@/app/components/buttons/Button";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import { CoinIcon, HeartIcon, SkullIcon } from "@/app/components/icons/Icons";
import useUIStore from "@/app/hooks/useUIStore";
import { useQueriesStore } from "@/app/hooks/useQueryStore";
import LootIconLoader from "@/app/components/icons/Loader";
import useCustomQuery from "@/app/hooks/useCustomQuery";
import { getAdventurersByOwner } from "@/app/hooks/graphql/queries";
import useNetworkAccount from "@/app/hooks/useNetworkAccount";
import { indexAddress, padAddress, calculateLevel } from "@/app/lib/utils";
import { Adventurer } from "@/app/types";
import { AdventurerListCard } from "@/app/components/start/AdventurerListCard";
import useTransactionCartStore from "@/app/hooks/useTransactionCartStore";
import { useGameSyscalls } from "@/app/hooks/useGameSyscalls";

export interface AdventurerListProps {
  isActive: boolean;
  onEscape: () => void;
  handleSwitchAdventurer: (adventurerId: number) => Promise<void>;
  gameContract: Contract;
  adventurersCount: number;
  aliveAdventurersCount: number;
}

export const AdventurersList = ({
  isActive,
  onEscape,
  handleSwitchAdventurer,
  gameContract,
  adventurersCount,
  aliveAdventurersCount,
}: AdventurerListProps) => {
  const { transferAdventurer } = useGameSyscalls();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showZeroHealth, setShowZeroHealth] = useState(true);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const network = useUIStore((state) => state.network);
  const { account, address } = useNetworkAccount();
  const owner = account?.address ? padAddress(account.address) : "";
  const adventurersPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const skip = (currentPage - 1) * adventurersPerPage;

  const { refetch, setData, isLoading } = useQueriesStore();

  const setAdventurer = useAdventurerStore((state) => state.setAdventurer);

  const [transferAddress, setTransferAddress] = useState("");

  const validAddress = (() => {
    const paddedAddress = padAddress(transferAddress);
    if (paddedAddress.length !== 66 || !transferAddress.startsWith("0x")) {
      return false;
    }
    try {
      return validateChecksumAddress(paddedAddress);
    } catch {
      return false;
    }
  })();

  const addToCalls = useTransactionCartStore((state) => state.addToCalls);

  const handleAddTransferTx = (recipient: string, adventurerId: number) => {
    const transferTx = {
      contractAddress: gameContract?.address ?? "",
      entrypoint: "transfer_from",
      calldata: [address!, recipient, adventurerId.toString() ?? "", "0"],
    };
    addToCalls(transferTx);
  };

  const adventurersVariables = useMemo(() => {
    return {
      owner: indexAddress(owner),
      health: showZeroHealth ? 0 : 1,
      skip: skip,
    };
  }, [owner, skip, showZeroHealth]);

  const adventurersData = useCustomQuery(
    network,
    "adventurersByOwnerQuery",
    getAdventurersByOwner,
    adventurersVariables,
    owner === ""
  );

  const adventurers: Adventurer[] = adventurersData?.adventurers ?? [];

  const totalPages = useMemo(
    () =>
      Math.ceil(
        (showZeroHealth ? adventurersCount : aliveAdventurersCount) /
          adventurersPerPage
      ),
    [adventurersCount, aliveAdventurersCount, showZeroHealth]
  );

  const formatAdventurersCount = showZeroHealth
    ? adventurersCount
    : aliveAdventurersCount;

  const handleClick = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "ArrowDown":
          setSelectedIndex((prev) =>
            Math.min(prev + 1, adventurers.length - 1)
          );
          break;
        case "Enter":
          setAdventurer(adventurers[selectedIndex]);
          break;
        case "Escape":
          onEscape();
          break;
      }
    },
    [setAdventurer, onEscape, selectedIndex, adventurers]
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
  }, [isActive, handleKeyDown]);

  const handleSelectAdventurer = useCallback(
    async (adventurerId: number) => {
      const newAdventurerItemsData = await refetch("itemsByAdventurerQuery", {
        id: adventurerId,
      });
      setData("itemsByAdventurerQuery", newAdventurerItemsData);
    },
    [selectedIndex, adventurers]
  );

  return (
    <div className="flex flex-col items-center h-full">
      {formatAdventurersCount > 0 ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-5 w-full h-full items-center sm:items-start">
          <div className="flex flex-col items-center sm:w-1/2 border border-terminal-green h-full w-full">
            <span className="relative flex items-center justify-center bg-terminal-green-50 w-full">
              <h2 className="text-xl uppercase text-center text-terminal-black h-10 flex items-center justify-center m-0">
                Adventurers
              </h2>
              {formatAdventurersCount > 0 && (
                <Button
                  className="absolute right-0 w-auto h-8"
                  size={"xs"}
                  onClick={() => setShowZeroHealth(!showZeroHealth)}
                  variant={showZeroHealth ? "default" : "contrast"}
                >
                  {showZeroHealth ? "Hide" : "Show"} dead
                </Button>
              )}
            </span>
            <div className="relative flex flex-col w-full overflow-y-auto default-scroll mx-2 sm:mx-0 border border-terminal-green sm:border-none h-[625px] 2xl:h-[625px]">
              <div className="h-7/8 flex flex-col  w-full overflow-y-auto default-scrol">
                {!isTransferOpen ? (
                  adventurers.map((adventurer, index) => (
                    <div className="relative w-full" key={index}>
                      {index === selectedIndex && (
                        <>
                          <div className="sm:hidden absolute inset-0 bg-terminal-black/75" />
                          <div className="sm:hidden absolute flex flex-row gap-5 w-full h-full items-center justify-center">
                            <Button
                              size={"lg"}
                              onClick={() => {
                                setAdventurer(adventurer);
                                handleSwitchAdventurer(adventurer.id!);
                              }}
                            >
                              Play
                            </Button>
                            <Button
                              size={"lg"}
                              variant={"contrast"}
                              className="border border-terminal-green"
                              onClick={() => setIsTransferOpen(true)}
                            >
                              Transfer
                            </Button>
                          </div>
                        </>
                      )}
                      <Button
                        key={index}
                        ref={(ref) => (buttonRefs.current[index] = ref)}
                        className={`text-lg sm:text-base w-full hover:animate-none`}
                        variant={selectedIndex === index ? "default" : "ghost"}
                        size={"lg"}
                        onClick={async () => {
                          setSelectedIndex(index);
                          await handleSelectAdventurer(adventurer.id!);
                        }}
                        disabled={adventurer?.health === 0}
                      >
                        <div className="aboslute w-full inset-0 flex flex-row justify-between">
                          <p className="w-1/2 overflow-hidden whitespace-nowrap text-ellipsis text-left">{`${adventurer.name} - ${adventurer.id}`}</p>
                          <div className="flex flex-row items-center gap-2">
                            <span className="flex flex-row gap-1">
                              <p>LVL</p>
                              <p>{calculateLevel(adventurer.xp!)}</p>
                            </span>
                            <div className="flex flex-row gap-1">
                              <HeartIcon className="w-5 fill-current" />
                              <span>{adventurer.health}</span>
                            </div>
                            <div className="flex flex-row text-terminal-yellow gap-1">
                              <CoinIcon className="w-5 fill-current" />
                              <span>{adventurer.gold}</span>
                            </div>
                          </div>
                          {adventurer?.health === 0 && (
                            <SkullIcon className="w-3 fill-current" />
                          )}
                        </div>
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="sm:hidden flex flex-col bg-terminal-black gap-2 items-center justify-center w-full h-full p-2">
                    <Button
                      size="lg"
                      variant={"token"}
                      onClick={() => setIsTransferOpen(false)}
                    >
                      Back
                    </Button>
                    <span className="uppercase text-2xl">Enter Address</span>
                    <div className="flex flex-col w-full items-center justify-center gap-10">
                      <input
                        type="text"
                        value={transferAddress}
                        onChange={(e) => {
                          let value = e.target.value;
                          setTransferAddress(value);
                        }}
                        className="p-1 h-12 text-2xl w-3/4 bg-terminal-black border border-terminal-green animate-pulse transform uppercase"
                      />
                      {transferAddress && !validAddress && (
                        <p className="absolute bottom-15 text-terminal-yellow">
                          INVALID ADDRESS!
                        </p>
                      )}
                      <div className="flex flex-row gap-2 items-center">
                        <Button
                          size={"lg"}
                          onClick={() =>
                            transferAdventurer(
                              account!,
                              adventurers[selectedIndex].id!,
                              address!,
                              transferAddress
                            )
                          }
                          disabled={!validAddress}
                        >
                          Send
                        </Button>
                        <Button
                          size={"lg"}
                          variant={"ghost"}
                          onClick={() =>
                            handleAddTransferTx(
                              transferAddress,
                              adventurers[selectedIndex].id!
                            )
                          }
                          disabled={!validAddress}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {formatAdventurersCount > 10 && (
                <div className="absolute bottom-0 flex items-end justify-center w-full h-1/8">
                  <Button
                    variant={"token"}
                    onClick={() =>
                      currentPage > 1 && handleClick(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    size={"lg"}
                    className="w-1/2"
                  >
                    Back
                  </Button>

                  <Button
                    variant={"token"}
                    onClick={() =>
                      currentPage < totalPages && handleClick(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                    size={"lg"}
                    className="w-1/2"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
          {adventurers.length > 0 && (
            <div className="relative hidden sm:block sm:w-6/12 md:w-6/12 lg:w-1/2 w-full h-full">
              {isLoading.global ? (
                <div className="flex justify-center items-center h-full">
                  <LootIconLoader size="w-10" />
                </div>
              ) : (
                <AdventurerListCard
                  adventurer={adventurers[selectedIndex]}
                  gameContract={gameContract}
                  handleSwitchAdventurer={handleSwitchAdventurer}
                  transferAdventurer={transferAdventurer}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="text-lg uppercase flex-1">
          You do not have any adventurers!
        </p>
      )}
    </div>
  );
};
