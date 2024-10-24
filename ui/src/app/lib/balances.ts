import { ethAbi, gameAbi, lordsAbi } from "@/app/abi/abis";
import { balanceSchema } from "@/app/lib/utils";
import { StarknetTypedContract } from "@starknet-react/core";
import { uint256 } from "starknet";

export const fetchEthBalance = async (
  accountName: string,
  ethContract?: StarknetTypedContract<typeof ethAbi>
) => {
  const ethResult = await ethContract?.call("balanceOf", [accountName]);
  return ethResult
    ? uint256.uint256ToBN(balanceSchema.parse(ethResult).balance)
    : BigInt(0);
};

export const fetchBalances = async (
  accountName: string,
  ethContract?: StarknetTypedContract<typeof ethAbi>,
  lordsContract?: StarknetTypedContract<typeof lordsAbi>,
  gameContract?: StarknetTypedContract<typeof gameAbi>
): Promise<bigint[]> => {
  const ethResult = await ethContract?.populate("balanceOf", [accountName]);
  const lordsBalanceResult = await lordsContract?.call("balance_of", [
    accountName,
  ]);
  const lordsAllowanceResult = await lordsContract?.call("allowance", [
    accountName,
    gameContract?.address ?? "",
  ]);
  return [
    ethResult
      ? uint256.uint256ToBN(balanceSchema.parse(ethResult).balance)
      : BigInt(0),
    lordsBalanceResult as bigint,
    lordsAllowanceResult as bigint,
  ];
};
