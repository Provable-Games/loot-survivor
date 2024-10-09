import { Network } from "@/app/hooks/useUIStore";
import { networkConfig } from "@/app/lib/networkConfig";
import { indexAddress } from "@/app/lib/utils";

export const getBeasts = async (
  owner: string,
  beastsAddress: string,
  network: Network
): Promise<number[]> => {
  const recursiveFetch: any = async (
    beasts: any[],
    nextPageKey: string | null
  ) => {
    let url = `${
      networkConfig[network!].blastUrl
    }/builder/getWalletNFTs?contractAddress=${beastsAddress}&walletAddress=${indexAddress(
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
      beasts = beasts.concat(
        data?.nfts?.map((beast: any) => {
          const tokenId = JSON.parse(beast.tokenId);
          return Number(tokenId);
        })
      );

      if (data.nextPageKey) {
        return recursiveFetch(beasts, data.nextPageKey);
      }
    } catch (ex) {
      console.log("error fetching beasts", ex);
    }

    return beasts;
  };

  let beastsData = await recursiveFetch([], null);

  return beastsData;
};
