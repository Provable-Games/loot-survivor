export const prologue =
  "An adventurer stirs from a slumber in a cold, dark cave.";
export const chapter1 =
  "Disoriented, they scour the darkness, the only sound a dripping echo and the biting whisper of wind.";
export const chapter2 =
  "Where? How? Water whispers nearby. They move, reaching through the mist. Suddenly, a fountain materializes, an ethereal sentinel obscured by the swirling vapor.";
export const chapter3 =
  "Intrigued, they draw closer, their form dancing on the water's surface. Four oddities lie within - a wand, a book, a club, and a sword.";
export const chapter4 =
  "They find golden coins in their pocket, glimmering in the dim light - an enigma wrapped in the shroud of the unexpected.";
export const battle = "A beast lurks in the shadow, prepare for battle!";

export const notificationAnimations = [
  { name: "idle", startFrame: 0, frameCount: 4 },
  { name: "run", startFrame: 9, frameCount: 5 },
  { name: "jump", startFrame: 11, frameCount: 7 },
  { name: "attack1", startFrame: 42, frameCount: 5 },
  { name: "attack2", startFrame: 47, frameCount: 6 },
  { name: "attack3", startFrame: 53, frameCount: 8 },
  { name: "damage", startFrame: 59, frameCount: 4 },
  { name: "die", startFrame: 64, frameCount: 9 },
  { name: "drawSword", startFrame: 70, frameCount: 5 },
  { name: "discoverItem", startFrame: 85, frameCount: 6 },
  { name: "slide", startFrame: 24, frameCount: 5 },
];

// ---- CONTRACT PARAMS
export const itemCharismaDiscount = 1;
export const itemBasePrice = 4;
export const itemMinimumPrice = 1;
export const potionCharismaDiscount = 2;
export const potionBasePrice = 2;
export const VRF_FEE_LIMIT = 5000000000000000; // 0.005 ETH
export const VRF_WAIT_TIME = 3000;
export const vitalityIncrease = 15;

// UI PARAMS
export const getWaitRetryInterval = (network: string) =>
  network === "mainnet" || network === "sepolia" ? 1000 : 10; // 6 seconds on sepolia + mainnet, 10ms on katana
export const ETH_INCREMENT = 0.001;
export const LORDS_INCREMENT = 5;
export const getMaxFee = (network: string) =>
  network === "mainnet" || network === "sepolia"
    ? 0.3 * 10 ** 18
    : 0.03 * 10 ** 18; // 0.3ETH on mainnet or sepolia, 0.0003ETH on goerli
export const ETH_PREFUND_AMOUNT = (network: string) =>
  network === "mainnet" || network === "sepolia"
    ? "0x2386F26FC10000"
    : "0x38D7EA4C68000"; // 0.01ETH on Mainnet or Sepolia, 0.001ETH on Testnet

export const deathMessages = [
  {
    rank: 3,
    message: "Supreme Conqueror! - Unrivaled mastery of survival!",
  },
  {
    rank: 10,
    message: "Glorious Victor! - A testament to your indomitable spirit!",
  },
  {
    rank: 25,
    message: "Heroic Endurance! - Legends will speak of your bravery!",
  },
  {
    rank: 50,
    message: "Valiant Survivor! - A remarkable display of fortitude!",
  },
  { rank: 100, message: "Brave Combatant! - A commendable effort!" },
  { rank: 250, message: "Daring Challenger! - A brave stand!" },
];

export const efficacyData = [
  { weapon: "Blade", metal: "Weak", hide: "Fair", cloth: "Strong" },
  { weapon: "Bludgeon", metal: "Fair", hide: "Strong", cloth: "Weak" },
  { weapon: "Magic", metal: "Strong", hide: "Weak", cloth: "Fair" },
];
