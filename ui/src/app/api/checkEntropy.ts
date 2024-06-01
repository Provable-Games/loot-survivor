export const getEntropy = async () => {
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL!;
  const gameAddress = process.env.NEXT_PUBLIC_GAME_ADDRESS!;
  const response = await fetch(rpcUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "starknet_call",
      params: [
        {
          contract_address: gameAddress,
          entry_point_selector:
            "0xb0d944377304e5d17e57a0404b4c1714845736851cfe18cc171a33868091be", // get_adveturer_entropy
          calldata: [],
        },
        "pending",
      ],
      id: 0,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    console.log("Interface fetched successfully");
  } else {
    console.error("Error in response:", data);
  }

  return data;
};