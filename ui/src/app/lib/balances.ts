import { CallData, Contract } from "starknet";

export const fetchEthBalance = async (
  accountName: string,
  ethContract?: Contract
) => {
  const ethResult = await ethContract?.call(
    "balanceOf",
    CallData.compile({ account: accountName })
  );
  return ethResult ? BigInt(ethResult[0]) : BigInt(0);
};

export const fetchBalances = async (
  accountName: string,
  ethContract?: Contract,
  lordsContract?: Contract,
  gameContract?: Contract
): Promise<bigint[]> => {
  const ethResult = await ethContract?.call(
    "balanceOf",
    CallData.compile({ account: accountName })
  );
  const lordsBalanceResult = await lordsContract?.call(
    "balance_of",
    CallData.compile({
      account: accountName,
    })
  );
  const lordsAllowanceResult = await lordsContract?.call(
    "allowance",
    CallData.compile({
      owner: accountName,
      spender: gameContract?.address ?? "",
    })
  );
  return [
    ethResult ? BigInt(ethResult[0]) : BigInt(0),
    lordsBalanceResult as bigint,
    lordsAllowanceResult as bigint,
  ];
};
