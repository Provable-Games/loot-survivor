import { Button } from "@/app/components/buttons/Button";
import {
  CartridgeIcon,
  ClockIcon,
  CoinIcon,
  HeartIcon,
  SkullIcon,
  StarknetIdIcon,
} from "@/app/components/icons/Icons";
import LootIconLoader from "@/app/components/icons/Loader";
import { AdventurerListCard } from "@/app/components/start/AdventurerListCard";
import {
  getAdventurersByOwner,
  getAdventurersByOwnerCount,
  getAliveAdventurersCount,
} from "@/app/hooks/graphql/queries";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import useCustomQuery from "@/app/hooks/useCustomQuery";
import useNetworkAccount from "@/app/hooks/useNetworkAccount";
import { useQueriesStore } from "@/app/hooks/useQueryStore";
import useTransactionCartStore from "@/app/hooks/useTransactionCartStore";
import useUIStore from "@/app/hooks/useUIStore";
import { calculateLevel, indexAddress, padAddress } from "@/app/lib/utils";
import { Adventurer } from "@/app/types";
import { useProvider } from "@starknet-react/core";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AccountInterface,
  constants,
  Contract,
  validateAndParseAddress,
} from "starknet";
import { StarknetIdNavigator } from "starknetid.js";

export interface AdventurerListProps {
  isActive: boolean;
  onEscape: () => void;
  handleSwitchAdventurer: (adventurerId: number) => Promise<void>;
  gameContract: Contract;
  transferAdventurer: (
    account: AccountInterface,
    adventurerId: number,
    from: string,
    recipient: string
  ) => Promise<void>;
  changeAdventurerName: (
    account: AccountInterface,
    adventurerId: number,
    name: string,
    index: number
  ) => Promise<void>;
}

export const AdventurersList = ({
  isActive,
  onEscape,
  handleSwitchAdventurer,
  gameContract,
  transferAdventurer,
  changeAdventurerName,
}: AdventurerListProps) => {
  const { provider } = useProvider();
  const starknetIdNavigator = new StarknetIdNavigator(
    provider,
    constants.StarknetChainId.SN_MAIN
  );
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showZeroHealth, setShowZeroHealth] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [adventurerForTransfer, setAdventurerForTransfer] =
    useState<Adventurer | null>(null);
  const [adventurerForEdit, setAdventurerForEdit] = useState<Adventurer | null>(
    null
  );
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const network = useUIStore((state) => state.network);
  const { account, address } = useNetworkAccount();
  const owner = account?.address ? padAddress(account.address) : "";
  const adventurersPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const skip = (currentPage - 1) * adventurersPerPage;

  const { refetch, setData, data } = useQueriesStore();

  const setAdventurer = useAdventurerStore((state) => state.setAdventurer);

  const [transferAddress, setTransferAddress] = useState("");
  const [validAddress, setValidAddress] = useState<string | false>(false);
  const [subdomain, setSubdomain] = useState(".ctrl");
  const [resolvedAddresses, setResolvedAddresses] = useState<{
    ctrl: string | null;
    starknetId: string | null;
  }>({
    ctrl: null,
    starknetId: null,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<
    "send" | "addToCart" | null
  >(null);

  const [adventurerName, setAdventurerName] = useState("");

  const [isMaxLength, setIsMaxLength] = useState(false);

  const addToCalls = useTransactionCartStore((state) => state.addToCalls);

  const adventurersByOwnerCountData = useCustomQuery(
    network,
    "adventurersByOwnerCountQuery",
    getAdventurersByOwnerCount,
    {
      owner: indexAddress(owner ?? "0x0").toLowerCase(),
    },
    owner === ""
  );

  let currentTimestamp = Math.floor(Date.now() / 1000);
  let tenDaysInSeconds = 10 * 24 * 60 * 60;
  let expiredStartCutoff = currentTimestamp - tenDaysInSeconds;

  const aliveAdventurersVariables = useMemo(() => {
    return {
      owner: indexAddress(owner ?? "0x0").toLowerCase(),
      birthDate: expiredStartCutoff,
    };
  }, [owner]);

  const aliveAdventurersByOwnerCountData = useCustomQuery(
    network,
    "aliveAdventurersByOwnerCountQuery",
    getAliveAdventurersCount,
    aliveAdventurersVariables,
    owner === ""
  );

  const adventurersCount = adventurersByOwnerCountData?.countTotalAdventurers;

  const aliveAdventurersCount =
    aliveAdventurersByOwnerCountData?.countAliveAdventurers;

  const handleAddTransferTx = (recipient: string, adventurerId: number) => {
    const transferTx = {
      contractAddress: gameContract?.address ?? "",
      entrypoint: "transfer_from",
      calldata: [address!, recipient, adventurerId.toString() ?? "", "0"],
    };
    addToCalls(transferTx);
  };

  useEffect(() => {
    const validateAddress = async () => {
      let ctrlAddress = null;
      let starknetIdAddress = null;

      // Try to resolve Starknet ID with .ctrl
      try {
        const ctrlId = transferAddress + ".ctrl.stark";
        ctrlAddress = await starknetIdNavigator.getAddressFromStarkName(ctrlId);
      } catch (e) {
        console.log("Failed to resolve .ctrl address:", e);
      }

      // Try to resolve Starknet ID without subdomain
      try {
        const starknetId = transferAddress + ".stark";
        starknetIdAddress = await starknetIdNavigator.getAddressFromStarkName(
          starknetId
        );
      } catch (e) {
        console.log("Failed to resolve .stark address:", e);
      }

      setResolvedAddresses({
        ctrl: ctrlAddress,
        starknetId: starknetIdAddress,
      });

      // Set validAddress based on the current subdomain
      if (
        subdomain === ".ctrl" &&
        ctrlAddress &&
        !transferAddress.startsWith("0x")
      ) {
        setValidAddress(ctrlAddress);
      } else if (
        subdomain === "" &&
        starknetIdAddress &&
        !transferAddress.startsWith("0x")
      ) {
        setValidAddress(starknetIdAddress);
      } else {
        // If not a Starknet ID, validate as a regular address
        try {
          const paddedAddress = padAddress(transferAddress.toLowerCase());
          if (paddedAddress.length === 66 && transferAddress.startsWith("0x")) {
            const parsedAddress = validateAndParseAddress(paddedAddress);
            setValidAddress(parsedAddress);
          } else {
            setValidAddress(false);
          }
        } catch (e) {
          console.log("Failed to validate address:", e);
          setValidAddress(false);
        }
      }
    };

    validateAddress();
  }, [transferAddress, subdomain]);

  const adventurersVariables = useMemo(() => {
    return {
      owner: indexAddress(owner).toLowerCase(),
      health: showZeroHealth ? 0 : 1,
      birthDate: showZeroHealth ? 0 : expiredStartCutoff,
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

  useEffect(() => {
    setData("adventurersByOwnerQuery", adventurersData);
  }, [adventurersData]);

  const isLoading = adventurersData === undefined;

  const adventurers: Adventurer[] =
    data.adventurersByOwnerQuery?.adventurers ?? [];

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

  const handleConfirmAction = () => {
    if (confirmationAction === "send") {
      transferAdventurer(
        account!,
        adventurerForTransfer?.id!,
        address!,
        validAddress as string
      );
    } else if (confirmationAction === "addToCart") {
      handleAddTransferTx(validAddress as string, adventurerForTransfer?.id!);
    }
    setShowConfirmation(false);
    setIsTransferOpen(false);
  };

  const handleNameChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setAdventurerName(value.slice(0, 31));
    if (value.length >= 31) {
      setIsMaxLength(true);
    } else {
      setIsMaxLength(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-5 w-full h-full items-center sm:items-start">
        <div className="flex flex-col items-center sm:w-1/2 border border-terminal-green h-full w-full">
          <span className="relative flex items-center justify-center bg-terminal-green-50 w-full">
            <h2 className="text-xl uppercase text-center text-terminal-black h-10 flex items-center justify-center m-0">
              Adventurers
            </h2>
            <div className="absolute right-0 flex flex-row gap-2">
              <Button
                className="w-auto h-8"
                size={"xs"}
                onClick={() => {
                  setShowZeroHealth(!showZeroHealth);
                  setCurrentPage(1);
                }}
                variant={showZeroHealth ? "default" : "contrast"}
              >
                {showZeroHealth ? "Hide" : "Show"} dead
              </Button>
            </div>
          </span>
          <div className="relative flex flex-col w-full overflow-y-auto default-scroll mx-2 sm:mx-0 border border-terminal-green sm:border-none h-[625px] 2xl:h-[625px]">
            {isLoading && (
              <div className="absolute flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <LootIconLoader size="w-10" />
              </div>
            )}
            <div className="h-7/8 flex flex-col  w-full overflow-y-auto default-scroll">
              {formatAdventurersCount > 0 ? (
                !isTransferOpen && !isEditOpen ? (
                  adventurers.map((adventurer, index) => {
                    const birthstamp = parseInt(adventurer.birthDate!);
                    const currentTimestamp = Math.floor(Date.now() / 1000);
                    const tenDaysInSeconds = 10 * 24 * 60 * 60; // 10 days in seconds
                    const futureTimestamp = birthstamp + tenDaysInSeconds;

                    const timeRemainingSeconds =
                      futureTimestamp - currentTimestamp;
                    const timeRemainingHours = Math.max(
                      0,
                      Math.ceil(timeRemainingSeconds / 3600)
                    );

                    const expired = currentTimestamp >= futureTimestamp;
                    const dead = adventurer.health === 0;
                    return (
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
                                disabled={dead || expired}
                              >
                                Play
                              </Button>
                              <Button
                                size={"lg"}
                                variant={"contrast"}
                                className="border border-terminal-green"
                                onClick={() => {
                                  setAdventurerForTransfer(adventurer);
                                  setIsTransferOpen(true);
                                }}
                              >
                                Transfer
                              </Button>
                              <Button
                                size={"lg"}
                                variant={"contrast"}
                                className="border border-terminal-green"
                                onClick={() => {
                                  setAdventurerForEdit(adventurer);
                                  setIsEditOpen(true);
                                }}
                                disabled={dead || expired}
                              >
                                Edit
                              </Button>
                            </div>
                          </>
                        )}
                        <Button
                          key={index}
                          ref={(ref) => (buttonRefs.current[index] = ref)}
                          className={`text-lg sm:text-base w-full hover:animate-none`}
                          variant={
                            selectedIndex === index ? "default" : "ghost"
                          }
                          size={"lg"}
                          onClick={async () => {
                            setSelectedIndex(index);
                            await handleSelectAdventurer(adventurer.id!);
                          }}
                        >
                          {expired && !dead && (
                            <div className="flex items-center justify-center absolute inset-0 bg-terminal-black/50 text-terminal-yellow/50">
                              Expired
                            </div>
                          )}
                          <div className="aboslute w-full inset-0 flex flex-row gap-1 justify-between">
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
                            {timeRemainingSeconds > 0 && !dead && (
                              <div
                                className={`relative flex flex-row sm:gap-1 items-center ${
                                  timeRemainingHours <= 24
                                    ? "text-red-500"
                                    : timeRemainingHours <= 72
                                    ? "text-terminal-yellow"
                                    : "text-terminal-green"
                                }`}
                              >
                                <ClockIcon className="w-5 h-5" />
                                <p className="text-xs">
                                  {timeRemainingHours} hrs
                                </p>
                              </div>
                            )}
                            {adventurer?.health === 0 && (
                              <SkullIcon className="w-3 fill-current" />
                            )}
                          </div>
                        </Button>
                      </div>
                    );
                  })
                ) : isTransferOpen ? (
                  <div className="sm:hidden flex flex-col bg-terminal-black gap-2 items-center justify-center w-full h-full p-2">
                    <Button
                      size="lg"
                      variant={"token"}
                      onClick={() => setIsTransferOpen(false)}
                    >
                      Back
                    </Button>
                    <div className="flex flex-row items-center justify-between w-full">
                      <div className="w-1/4"></div>
                      <span className="uppercase text-2xl">Enter Address</span>
                      <span className="flex flex-row w-1/4 justify-end gap-2">
                        <Button
                          onClick={() => setSubdomain(".ctrl")}
                          variant={
                            subdomain === ".ctrl" || resolvedAddresses.ctrl
                              ? "default"
                              : "ghost"
                          }
                          className={
                            subdomain !== ".ctrl" && resolvedAddresses.ctrl
                              ? "animate-pulse"
                              : ""
                          }
                        >
                          <CartridgeIcon className="w-6 h-6" />
                        </Button>
                        <Button
                          onClick={() => setSubdomain("")}
                          variant={
                            subdomain === "" || resolvedAddresses.starknetId
                              ? "default"
                              : "ghost"
                          }
                          className={
                            subdomain !== "" && resolvedAddresses.starknetId
                              ? "animate-pulse"
                              : ""
                          }
                        >
                          <StarknetIdIcon className="w-6 h-6" />
                        </Button>
                      </span>
                    </div>
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
                          onClick={() => {
                            setConfirmationAction("send");
                            setShowConfirmation(true);
                          }}
                          disabled={!validAddress}
                        >
                          Send
                        </Button>
                        <Button
                          size={"lg"}
                          variant={"ghost"}
                          onClick={() => {
                            setConfirmationAction("addToCart");
                            setShowConfirmation(true);
                          }}
                          disabled={!validAddress}
                        >
                          Add to Cart
                        </Button>
                      </div>
                      {showConfirmation && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                          <div className="bg-terminal-black border border-terminal-green p-4 rounded-lg max-w-md w-full">
                            <div className="mb-4">
                              <h1 className="text-xl font-bold">
                                Confirm Action
                              </h1>
                            </div>
                            <p className="mb-2">
                              Are you sure you want to{" "}
                              {confirmationAction === "send"
                                ? "send"
                                : "add to cart"}{" "}
                              this adventurer?
                            </p>
                            <p className="mb-4">
                              Recipient address: {validAddress}
                            </p>
                            <div className="flex justify-end gap-2">
                              <Button
                                onClick={() => setShowConfirmation(false)}
                                variant="secondary"
                              >
                                Cancel
                              </Button>
                              <Button onClick={handleConfirmAction}>
                                Confirm
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="sm:hidden flex flex-col bg-terminal-black gap-2 items-center justify-center w-full h-full p-2">
                    <Button
                      size="lg"
                      variant={"token"}
                      onClick={() => setIsEditOpen(false)}
                    >
                      Back
                    </Button>
                    <div className="flex flex-row items-center justify-center w-full">
                      <span className="uppercase text-2xl text-center flex-grow whitespace-nowrap">
                        Change Adventurer Name
                      </span>
                    </div>
                    <div className="relative flex flex-col w-full items-center justify-center gap-10">
                      <input
                        type="text"
                        value={adventurerName}
                        onChange={handleNameChange}
                        className="p-1 h-12 text-2xl w-3/4 bg-terminal-black border border-terminal-green animate-pulse transform"
                      />
                      {isMaxLength && (
                        <p className="absolute top-14">MAX LENGTH!</p>
                      )}
                      <div className="flex flex-row gap-2 items-center">
                        <Button
                          size={"lg"}
                          onClick={() => {
                            changeAdventurerName(
                              account!,
                              adventurerForEdit?.id!,
                              adventurerName,
                              selectedIndex
                            );
                            setIsEditOpen(false);
                          }}
                          disabled={
                            adventurerName === "" ||
                            adventurerName === adventurerForEdit?.name
                          }
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <p className="text-lg text-center uppercase flex-1">
                  You do not have any adventurers!
                </p>
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
        <div className="relative hidden sm:block sm:w-6/12 md:w-6/12 lg:w-1/2 w-full h-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <LootIconLoader size="w-10" />
            </div>
          ) : (
            <AdventurerListCard
              adventurer={adventurers[selectedIndex]}
              gameContract={gameContract}
              handleSwitchAdventurer={handleSwitchAdventurer}
              transferAdventurer={transferAdventurer}
              changeAdventurerName={changeAdventurerName}
              index={selectedIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
};
