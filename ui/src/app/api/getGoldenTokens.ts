import { Network } from "@/app/hooks/useUIStore";
import { networkConfig } from "@/app/lib/networkConfig";
import { indexAddress } from "@/app/lib/utils";

export const getGoldenTokens = async (
  owner: string,
  goldenTokenAddress: string,
  network: Network
): Promise<number[]> => {
  const recursiveFetch: any = async (
    goldenTokens: any[],
    nextPageKey: string | null
  ) => {
    let url = `${
      networkConfig[network!].blastUrl
    }/builder/getWalletNFTs?contractAddress=${goldenTokenAddress}&walletAddress=${indexAddress(
      owner
    ).toLowerCase()}&pageSize=100`;

    if (nextPageKey) {
      url += `&pageKey=${nextPageKey}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      goldenTokens = goldenTokens.concat(
        data?.nfts?.map((goldenToken: any) => {
          const tokenId = JSON.parse(goldenToken.tokenId);
          return Number(tokenId);
        })
      );

      if (data.nextPageKey) {
        return recursiveFetch(goldenTokens, data.nextPageKey);
      }
    } catch (ex) {
      console.log("error fetching golden tokens", ex);
    }

    return goldenTokens;
  };

  let goldenTokenData = await recursiveFetch([], null);

  return goldenTokenData;
};
