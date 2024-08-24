import { useCallback, useMemo, useState } from "react";
import { useConnect, useContract, useProvider } from "@starknet-react/core";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import useUIStore from "@/app/hooks/useUIStore";
import useTransactionCartStore from "@/app/hooks/useTransactionCartStore";
import useLoadingStore from "@/app/hooks/useLoadingStore";
import { useQueriesStore } from "@/app/hooks/useQueryStore";
import useTransactionManager from "@/app/hooks/useTransactionManager";
import useNetworkAccount from "@/app/hooks/useNetworkAccount";
import { networkConfig } from "@/app/lib/networkConfig";
import { createSyscalls } from "@/app/lib/utils/syscalls";
import Game from "@/app/abi/Game.json";
import Lords from "@/app/abi/Lords.json";
import EthBalanceFragment from "@/app/abi/EthBalanceFragment.json";
import Beasts from "@/app/abi/Beasts.json";
import Pragma from "@/app/abi/Pragma.json";
import { fetchBalances, fetchEthBalance } from "@/app/lib/balances";

export function useGameSyscalls() {
  const { account, address } = useNetworkAccount();
  const { connector } = useConnect();
  const { provider } = useProvider();
  const network = useUIStore((state) => state.network);
  const adventurer = useAdventurerStore((state) => state.adventurer);
  const { data, resetData, setData } = useQueriesStore();
  const { addTransaction } = useTransactionManager();
  const { calls, addToCalls, handleSubmitCalls } = useTransactionCartStore();
  const { startLoading, stopLoading, setTxHash, setDeathMessage } =
    useLoadingStore();
  const {
    setEquipItems,
    setDropItems,
    showTopUpDialog,
    setTopUpAccount,
    setSpecialBeastDefeated,
    setSpecialBeast,
    setIsMintingLords,
    setIsWithdrawing,
    setEntropyReady,
    setFetchUnlocksEntropy,
    showDeathDialog,
    setScreen,
    setStartOption,
  } = useUIStore();
  const setAdventurer = useAdventurerStore((state) => state.setAdventurer);

  const { contract: gameContract } = useContract({
    address: networkConfig[network!].gameAddress,
    abi: Game,
  });
  const { contract: lordsContract } = useContract({
    address: networkConfig[network!].lordsAddress,
    abi: Lords,
  });
  const { contract: ethContract } = useContract({
    address: networkConfig[network!].ethAddress,
    abi: EthBalanceFragment,
  });
  const { contract: beastsContract } = useContract({
    address: networkConfig[network!].beastsAddress,
    abi: Beasts,
  });
  const { contract: pragmaContract } = useContract({
    address: networkConfig[network!].pragmaAddress,
    abi: Pragma,
  });

  const ethBalance = useUIStore((state) => state.ethBalance);
  const lordsBalance = useUIStore((state) => state.lordsBalance);
  const setEthBalance = useUIStore((state) => state.setEthBalance);
  const setLordsBalance = useUIStore((state) => state.setLordsBalance);

  const getBalances = useCallback(async () => {
    const balances = await fetchBalances(
      address ?? "0x0",
      ethContract,
      lordsContract,
      gameContract
    );
    console.log(balances);
    setEthBalance(balances[0]);
    setLordsBalance(balances[1]);
  }, [address, ethContract, lordsContract, gameContract]);

  const getEthBalance = async () => {
    const ethBalance = await fetchEthBalance(address ?? "0x0", ethContract);
    setEthBalance(ethBalance);
  };
  // Add other necessary state and functions here

  const syscalls = useMemo(
    () =>
      createSyscalls({
        gameContract: gameContract!,
        ethContract: ethContract!,
        lordsContract: lordsContract!,
        beastsContract: beastsContract!,
        pragmaContract: pragmaContract!,
        rendererContractAddress: networkConfig[network!].rendererAddress,
        addTransaction,
        queryData: data,
        resetData,
        setData,
        adventurer: adventurer!,
        addToCalls,
        calls,
        handleSubmitCalls,
        startLoading,
        stopLoading,
        setTxHash,
        setEquipItems,
        setDropItems,
        setDeathMessage,
        showDeathDialog,
        setScreen,
        setAdventurer,
        setStartOption,
        ethBalance, // You need to add this state
        showTopUpDialog,
        setTopUpAccount,
        account: account!,
        setSpecialBeastDefeated,
        setSpecialBeast,
        connector, // You need to add this
        getEthBalance, // You need to implement this function
        getBalances, // You need to implement this function
        setIsMintingLords,
        setIsWithdrawing,
        setEntropyReady,
        setFetchUnlocksEntropy,
        provider,
        network,
      }),
    [
      // Add dependencies here
      gameContract,
      ethContract,
      lordsContract,
      beastsContract,
      pragmaContract,
      network,
      addTransaction,
      data,
      adventurer,
      calls,
      account,
      provider,
      // ... other dependencies
    ]
  );

  return { ...syscalls, getBalances, ethBalance, lordsBalance };
}
