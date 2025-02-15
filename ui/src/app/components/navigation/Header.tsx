import { Button } from "@/app/components/buttons/Button";
import {
  CartIcon,
  CartridgeIcon,
  GithubIcon,
  LogoutIcon,
  SettingsIcon,
  SoundOffIcon,
  SoundOnIcon,
} from "@/app/components/icons/Icons";
import TransactionCart from "@/app/components/navigation/TransactionCart";
import TransactionHistory from "@/app/components/navigation/TransactionHistory";
import { useController } from "@/app/context/ControllerContext";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import useLoadingStore from "@/app/hooks/useLoadingStore";
import useNetworkAccount from "@/app/hooks/useNetworkAccount";
import { useQueriesStore } from "@/app/hooks/useQueryStore";
import useTransactionCartStore from "@/app/hooks/useTransactionCartStore";
import useUIStore from "@/app/hooks/useUIStore";
import { soundSelector, useUiSounds } from "@/app/hooks/useUiSound";
import { checkCartridgeConnector } from "@/app/lib/connectors";
import { vitalityIncrease } from "@/app/lib/constants";
import {
  displayAddress,
  getItemData,
  getItemPrice,
  processItemName,
} from "@/app/lib/utils";
import {
  Call,
  Item,
  NullAdventurer,
  NullItem,
  UpgradeStats,
  ZeroUpgrade,
} from "@/app/types";
import CartridgeConnector from "@cartridge/connector/controller";
import { useConnect, useDisconnect } from "@starknet-react/core";
import Logo from "public/icons/logo.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { Contract } from "starknet";

export interface HeaderProps {
  multicall: (
    loadingMessage: string[],
    notification: string[],
    upgradeTx?: any
  ) => Promise<void>;
  mintLords: (lordsAmount: number) => Promise<void>;
  ethBalance: bigint;
  lordsBalance: bigint;
  gameContract: Contract;
  costToPlay: bigint;
}

export default function Header({
  multicall,
  mintLords,
  ethBalance,
  lordsBalance,
  gameContract,
  costToPlay,
}: HeaderProps) {
  const { account } = useNetworkAccount();
  const { disconnect } = useDisconnect();
  const resetData = useQueriesStore((state) => state.resetData);
  const { connector } = useConnect();
  const username = useUIStore((state) => state.username);

  const isMuted = useUIStore((state) => state.isMuted);
  const setIsMuted = useUIStore((state) => state.setIsMuted);
  const displayCart = useUIStore((state) => state.displayCart);
  const setDisplayCart = useUIStore((state) => state.setDisplayCart);
  const displayHistory = useUIStore((state) => state.displayHistory);
  const setScreen = useUIStore((state) => state.setScreen);
  const setNetwork = useUIStore((state) => state.setNetwork);
  const onMainnet = useUIStore((state) => state.onMainnet);
  const onKatana = useUIStore((state) => state.onKatana);
  const vitBoostRemoved = useUIStore((state) => state.vitBoostRemoved);
  const handleOffboarded = useUIStore((state) => state.handleOffboarded);
  const setLoginScreen = useUIStore((state) => state.setLoginScreen);
  const setShowLoginDialog = useUIStore((state) => state.setShowLoginDialog);

  const calls = useTransactionCartStore((state) => state.calls);
  const txInCart = calls.length > 0;

  const { play: clickPlay } = useUiSounds(soundSelector.click);

  const displayCartButtonRef = useRef<HTMLButtonElement>(null);
  const displayHistoryButtonRef = useRef<HTMLButtonElement>(null);

  const checkCartridge = checkCartridgeConnector(connector);

  const [notification, setNotification] = useState<any[]>([]);
  const [loadingMessage, setLoadingMessage] = useState<string[]>([]);
  const notificationData = useLoadingStore((state) => state.notificationData);
  const resetNotification = useLoadingStore((state) => state.resetNotification);
  const purchaseItems = useUIStore((state) => state.purchaseItems);
  const adventurer = useAdventurerStore((state) => state.adventurer);
  const setAdventurer = useAdventurerStore((state) => state.setAdventurer);
  const data = useQueriesStore((state) => state.data);
  const potionAmount = useUIStore((state) => state.potionAmount);
  const upgrades = useUIStore((state) => state.upgrades);
  const selectedVitality = upgrades["Vitality"] ?? 0;
  const totalVitality = (adventurer?.vitality ?? 0) + selectedVitality;
  const addToCalls = useTransactionCartStore((state) => state.addToCalls);
  const removeEntrypointFromCalls = useTransactionCartStore(
    (state) => state.removeEntrypointFromCalls
  );
  const resetCalls = useTransactionCartStore((state) => state.resetCalls);
  const equipItems = useUIStore((state) => state.equipItems);
  const setEquipItems = useUIStore((state) => state.setEquipItems);
  const dropItems = useUIStore((state) => state.dropItems);
  const setDropItems = useUIStore((state) => state.setDropItems);
  const setPotionAmount = useUIStore((state) => state.setPotionAmount);
  const setPurchaseItems = useUIStore((state) => state.setPurchaseItems);
  const setUpgrades = useUIStore((state) => state.setUpgrades);
  const setUpgradeScreen = useUIStore((state) => state.setUpgradeScreen);
  const setSlayAdventurers = useUIStore((state) => state.setSlayAdventurers);
  const encounterTable = useUIStore((state) => state.encounterTable);
  const showEncounterTable = useUIStore((state) => state.showEncounterTable);

  const items = data.latestMarketItemsQuery
    ? data.latestMarketItemsQuery.items
    : [];

  const handleBuyItem = useCallback(
    (call: any) => {
      const item = items.find(
        (item: Item) =>
          item.item === (Array.isArray(call.calldata) && call.calldata[0])
      );
      const itemName = processItemName(item ?? NullItem);
      const { tier } = getItemData(item?.item ?? "");
      setNotification((notifications) => [
        ...notifications,
        `You purchased ${item?.item && itemName} for ${getItemPrice(
          tier,
          adventurer?.charisma ?? 0
        )} gold`,
      ]);
      setLoadingMessage((messages) => [...messages, "Purchasing"]);
    },
    [items]
  );

  const handleEquipItem = () => {
    setNotification((notifications) => [
      ...notifications,
      `You equipped ${equipItems.length} items!`,
    ]);
    setLoadingMessage((messages) => [...messages, "Equipping"]);
  };

  const handleDropItems = () => {
    setNotification((notifications) => [
      ...notifications,
      `You dropped ${dropItems.length} items!`,
    ]);
    setLoadingMessage((messages) => [...messages, "Dropping"]);
  };

  const handleUpgradeAdventurer = () => {
    setNotification((notifications) => [
      ...notifications,
      {
        Stats: upgrades,
        Items: purchaseItems,
        Potions: potionAmount,
      },
    ]);
    setLoadingMessage((messages) => [...messages, "Upgrading"]);
  };

  const handleSlayIdleAdventurers = useCallback((call: any) => {
    setNotification((notifications) => [
      ...notifications,
      `You slayed ${
        Array.isArray(call.calldata) && call.calldata[0]
      } Adventurers`,
    ]);
    setLoadingMessage((messages) => [...messages, "Slaying Adventurer"]);
  }, []);

  const prevCallsRef = useRef<Call[]>([]);

  const handleLoadData = useCallback(() => {
    const prevCalls = prevCallsRef.current;

    const addedCalls = calls.filter((call) => !prevCalls.includes(call));
    addedCalls.forEach((call) => {
      switch (call.entrypoint) {
        case "buy_item":
          handleBuyItem(call);
          break;
        case "equip":
          handleEquipItem();
          break;
        case "drop":
          handleDropItems();
          break;
        case "upgrade":
          handleUpgradeAdventurer();
          break;
        case "slay_idle_adventurers":
          handleSlayIdleAdventurers(call);
          break;
        default:
          break;
      }
    });

    prevCallsRef.current = calls;
  }, [
    calls,
    handleBuyItem,
    handleEquipItem,
    handleDropItems,
    handleUpgradeAdventurer,
    handleSlayIdleAdventurers,
  ]);

  useEffect(() => {
    handleLoadData();
  }, [calls]);

  const handleResetCalls = () => {
    resetCalls();
    setEquipItems([]);
    setDropItems([]);
    setPotionAmount(0);
    setPurchaseItems([]);
    setUpgrades({ ...ZeroUpgrade });
    setUpgradeScreen(1);
    setSlayAdventurers([]);
  };

  const handleAddUpgradeTx = (
    currentUpgrades?: UpgradeStats,
    potions?: number,
    items?: any[]
  ) => {
    removeEntrypointFromCalls("upgrade");
    const upgradeTx = {
      contractAddress: gameContract?.address ?? "",
      entrypoint: "upgrade",
      calldata: [
        adventurer?.id?.toString() ?? "",
        potions! >= 0 ? potions?.toString() : potionAmount.toString(),
        currentUpgrades
          ? currentUpgrades["Strength"].toString()
          : upgrades["Strength"].toString(),
        currentUpgrades
          ? currentUpgrades["Dexterity"].toString()
          : upgrades["Dexterity"].toString(),
        currentUpgrades
          ? currentUpgrades["Vitality"].toString()
          : upgrades["Vitality"].toString(),
        currentUpgrades
          ? currentUpgrades["Intelligence"].toString()
          : upgrades["Intelligence"].toString(),
        currentUpgrades
          ? currentUpgrades["Wisdom"].toString()
          : upgrades["Wisdom"].toString(),
        currentUpgrades
          ? currentUpgrades["Charisma"].toString()
          : upgrades["Charisma"].toString(),
        "0",
        items ? items.length.toString() : purchaseItems.length.toString(),
        ...(items
          ? items.flatMap(Object.values)
          : purchaseItems.flatMap(Object.values)),
      ],
    };
    addToCalls(upgradeTx);
  };

  const handleSubmitMulticall = async () => {
    resetNotification();
    // Handle for vitBoostRemoval
    let upgradeTx: any;
    if (potionAmount > 0) {
      // Check whether health + pots is within vitBoostRemoved of the maxHealth
      const maxHealth = 100 + totalVitality * vitalityIncrease;
      const newMaxHealth =
        100 + (totalVitality - vitBoostRemoved) * vitalityIncrease;
      const currentHealth =
        adventurer?.health! + selectedVitality * vitalityIncrease;
      const healthPlusPots = Math.min(
        currentHealth! + potionAmount * 10,
        maxHealth
      );
      const healthOverflow = healthPlusPots > newMaxHealth;
      if (healthOverflow) {
        const newUpgradeTx = handleAddUpgradeTx(
          undefined,
          Math.max(potionAmount - vitBoostRemoved, 0),
          undefined
        );
        upgradeTx = newUpgradeTx;
      }
    }
    setDisplayCart(false);
    await multicall(loadingMessage, notification, upgradeTx);
    handleResetCalls();
  };

  const { addControl } = useController();

  useEffect(() => {
    addControl("i", () => {
      console.log("Key i pressed");
      if (calls.length > 0) {
        handleSubmitMulticall();
        clickPlay();
      }
    });
  }, [calls, notification]);

  useEffect(() => {
    setNotification([]);
  }, [notificationData]);

  return (
    <div className="flex flex-row justify-between px-1 h-10 ">
      <div className="flex flex-row items-center gap-2 sm:gap-5">
        <Logo className="fill-current w-24 md:w-32 xl:w-40 2xl:w-72 2xl:mb-5" />
      </div>
      <div className="flex flex-row items-center self-end sm:gap-1 self-center">
        <Button
          className="sm:hidden px-2.5 sm:px-3 h-12 shadow-md"
          variant="token"
          onClick={() => showEncounterTable(!encounterTable)}
        >
          Prescience
        </Button>
        <Button
          size={"xs"}
          variant={"outline"}
          className="hidden sm:block self-center xl:px-5"
          onClick={() => {
            if (onMainnet) {
              setNetwork("katana");
            } else {
              handleOffboarded();
              setLoginScreen(true);
              setNetwork("sepolia");
            }
          }}
          disabled
        >
          {onMainnet ? "Play on Testnet" : "Play on Mainnet"}
        </Button>

        <Button
          size={"xs"}
          variant={"outline"}
          onClick={() => {
            setIsMuted(!isMuted);
            clickPlay();
          }}
          className="hidden sm:block xl:px-5"
        >
          {isMuted ? (
            <SoundOffIcon className="sm:w-5 sm:h-5 h-3 w-3 justify-center fill-current" />
          ) : (
            <SoundOnIcon className="sm:w-5 sm:h-5 h-3 w-3 justify-center fill-current" />
          )}
        </Button>
        {account && (
          <>
            <span className="sm:hidden w-5 h-5 mx-2">
              <Button
                variant={"outline"}
                size={"fill"}
                ref={displayCartButtonRef}
                onClick={() => {
                  setDisplayCart(!displayCart);
                  clickPlay();
                }}
                className={`xl:px-5 ${txInCart ? "animate-pulse" : ""}`}
              >
                <CartIcon className="w-5 h-5 fill-current" />
              </Button>
            </span>
            <Button
              variant={"outline"}
              size={"xs"}
              ref={displayCartButtonRef}
              onClick={() => {
                setDisplayCart(!displayCart);
                clickPlay();
              }}
              className={`hidden sm:block xl:px-5 ${
                txInCart
                  ? "animate-pulse bg-terminal-green-50 text-terminal-black"
                  : ""
              }`}
            >
              <CartIcon className="w-5 h-5 fill-current" />
            </Button>
          </>
        )}
        {displayCart && (
          <TransactionCart
            buttonRef={displayCartButtonRef}
            handleSubmitMulticall={handleSubmitMulticall}
            handleAddUpgradeTx={handleAddUpgradeTx}
            handleResetCalls={handleResetCalls}
          />
        )}
        <span className="sm:hidden flex flex-row gap-2 items-center">
          <div className="relative">
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => {
                if (account) {
                  if (!onKatana) {
                    (
                      connector as unknown as CartridgeConnector
                    ).controller.openProfile();
                  } else {
                    disconnect();
                    resetData();
                    setAdventurer(NullAdventurer);
                    setNetwork(undefined);
                  }
                } else {
                  setShowLoginDialog(true);
                }
              }}
              className="xl:px-5 p-0"
            >
              {account ? (
                username ? (
                  <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[100px]">
                    {username}
                  </span>
                ) : (
                  displayAddress(account.address)
                )
              ) : (
                "Connect"
              )}
            </Button>
          </div>
          <Button
            size={"fill"}
            variant={"outline"}
            onClick={() => {
              setScreen("settings");
              clickPlay();
            }}
            className="xl:px-5"
          >
            <SettingsIcon className="fill-current h-5 w-5" />
          </Button>
        </span>
        <div className="hidden sm:block sm:flex sm:flex-row sm:items-center sm:gap-1">
          <Button
            variant={"outline"}
            size={"sm"}
            href="https://github.com/BibliothecaDAO/loot-survivor"
            className="xl:px-5"
          >
            <GithubIcon className="w-6 fill-current" />
          </Button>
          <div className="relative">
            <Button
              variant={account ? "token" : "outline"}
              size={"sm"}
              onClick={() => {
                if (account) {
                  if (!onKatana) {
                    (
                      connector as unknown as CartridgeConnector
                    ).controller.openProfile();
                  } else {
                    disconnect();
                    resetData();
                    setAdventurer(NullAdventurer);
                    setNetwork(undefined);
                  }
                } else {
                  setShowLoginDialog(true);
                }
              }}
              className="xl:px-5"
            >
              {account ? (
                username ? (
                  <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[100px]">
                    {username}
                  </span>
                ) : (
                  displayAddress(account.address)
                )
              ) : (
                "Connect"
              )}
            </Button>
            {checkCartridge && (
              <div className="absolute top-0 right-2">
                <CartridgeIcon className="w-5 h-5 fill-current" />
              </div>
            )}
          </div>

          {account && (
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => {
                disconnect();
                resetData();
                setAdventurer(NullAdventurer);
                setNetwork(undefined);
                handleOffboarded();
              }}
            >
              <LogoutIcon className="w-5 h-5 fill-current" />
            </Button>
          )}
        </div>
        {account && displayHistory && (
          <TransactionHistory buttonRef={displayHistoryButtonRef} />
        )}
      </div>
    </div>
  );
}
