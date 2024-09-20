export const networkConfig = {
  sepolia: {
    rpcUrl:
      "https://starknet-sepolia.blastapi.io/5ef61753-e7c1-4593-bc62-97fdf96f8de5",
    lsGQLURL: "https://ls-indexer-sepolia.provable.games/graphql",
    tokensGQLURL: "https://testnet.realms.world/api/graphql",
    ethAddress:
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    gameAddress:
      "0x012af3b1e79b2c20a61ca4b714851ac446e48208518c655ee61f46b45e87c65c",
    lordsAddress:
      "0x064fd80fcb41d00214430574a0aa19d21cc5d6452aeb4996f31b6e9ba4f466a0",
    beastsAddress:
      "0x041b6ffc02ce30c6e941f1b34244ef8af0b3e8a70f5528476a7a68765afd6b39",
    goldenTokenAddress:
      "0x07626660faba349aad9ad2aaa0ff8645c079fa8e043a168d640d92472806eeac",
    revenueAddresses: [
      "0x0314924118945405ac0bcd6181457712795c0effc29d8dd3be86d3f3ec62adc1",
    ],
    pragmaAddress:
      "0x036031daa264c24520b11d93af622c848b2499b66b41d611bac95e13cfca131a",
    rendererAddress: "0x0",
    appUrl: "https://sepolia.lootsurvivor.io",
    beastsViewer: "https://testnet.realms.world/collection/beasts",
    goldenTokenMintUrl: "https://testnet.realms.world/collection/goldenToken",
    blockExplorerUrl: "https://sepolia.voyager.online/",
    faucetUrl: "https://blastapi.io/faucets/starknet-sepolia-eth",
    masterAccount: "0x0",
    masterPrivateKey: "0x0",
    accountClassHash: "0x0",
  },
  mainnet: {
    rpcUrl: "https://api.cartridge.gg/x/starknet/mainnet",
    lsGQLURL: "https://ls-indexer-sepolia.provable.games/graphql",
    tokensGQLURL: "https://realms.world/api/graphql",
    ethAddress:
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    gameAddress:
      "0x018108b32cea514a78ef1b0e4a0753e855cdf620bc0565202c02456f618c4dc4",
    lordsAddress:
      "0x0124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49",
    beastsAddress:
      "0x0158160018d590d93528995b340260e65aedd76d28a686e9daa5c4e8fad0c5dd",
    goldenTokenAddress:
      "0x04f5e296c805126637552cf3930e857f380e7c078e8f00696de4fc8545356b1d",
    revenueAddresses: [
      "0x036cE487952f25878a0158bA4A0C2Eb5eb66f0282567163a4B893A0EA5847D2d",
      "0x0616E6a5F9b1f86a0Ece6E965B2f3b27E3D784be79Cb2F6304D92Db100C7D29E",
      "0x049FB4281D13E1f5f488540Cd051e1507149E99CC2E22635101041Ec5E4e4557",
      "0x02CD97240DB3f679De98A729aE91EB996cAb9Fd92a9A578Df11a72F49bE1c356",
    ],
    pragmaAddress:
      "0x2a85bd616f912537c50a49a4076db02c00b29b2cdc8a197ce92ed1837fa875b",
    rendererAddress: "0x0",
    appUrl: "https://lootsurvivor.io/",
    beastsViewer:
      "https://market.realms.world/token/0x0158160018d590d93528995b340260e65aedd76d28a686e9daa5c4e8fad0c5dd",
    goldenTokenMintUrl: "https://realms.world/collection/goldenToken",
    blockExplorerUrl: "https://voyager.online/",
    faucetUrl: "https://blastapi.io/faucets/starknet-sepolia-eth",
    masterAccount: "0x0",
    masterPrivateKey: "0x0",
    accountClassHash: "0x0",
  },
  katana: {
    rpcUrl: "https://ls-katana.provable.games:5443/",
    lsGQLURL: "https://ls-katana.provable.games:8080/graphql",
    tokensGQLURL: "",
    ethAddress: "0x0",
    gameAddress:
      "0x02801ab0118474bbab2f6d4b782d6a50c886d21de9d1f5a345f462f9a5e7f353",
    lordsAddress: "0x0",
    beastsAddress: "0x0",
    goldenTokenAddress: "0x0",
    revenueAddresses: ["0x0"],
    pragmaAddress: "0x0",
    rendererAddress: "0x0",
    appUrl: "https://lootsurvivor.io",
    beastsViewer: "",
    goldenTokenMintUrl: "",
    blockExplorerUrl: "",
    faucetUrl: "",
    masterAccount:
      "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca",
    masterPrivateKey:
      "0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a",
    accountClassHash:
      "0x5400e90f7e0ae78bd02c77cd75527280470e2fe19c54970dd79dc37a9d3645c",
  },
  localKatana: {
    rpcUrl: "http://localhost:5050",
    rpcAPIKey: "",
    lsGQLURL: "http://localhost:8080/graphql",
    tokensGQLURL: "",
    ethAddress: "0x0",
    gameAddress:
      "0x0047339334c614ce3dd6ce0321dfc81c87a1c523fc10b755f162ac7bc4b60342",
    lordsAddress: "0x0",
    beastsAddress: "0x0",
    goldenTokenAddress: "0x0",
    revenueAddresses: ["0x0"],
    pragmaAddress: "0x0",
    rendererAddress: "0x0",
    appUrl: "http://localhost:3000/",
    beastsViewer: "",
    goldenTokenMintUrl: "",
    blockExplorerUrl: "",
    faucetUrl: "",
    masterAccount:
      "0x5c84d31976a25d632deee7a1ed9bdbdc6795cb288103d7d601841030c976ee",
    masterPrivateKey:
      "0x22ab3e9b8c4fdf2c187609cb52550424675bb8fc7ee8c06b0fc170e56889ec0",
    accountClassHash:
      "0x5400e90f7e0ae78bd02c77cd75527280470e2fe19c54970dd79dc37a9d3645c",
  },
};
