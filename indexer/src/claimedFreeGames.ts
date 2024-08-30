import type { Config } from "https://esm.sh/@apibara/indexer";
import type { Block, Starknet } from "https://esm.sh/@apibara/indexer/starknet";
import type { Mongo } from "https://esm.sh/@apibara/indexer/sink/mongo";
import type { Console } from "https://esm.sh/@apibara/indexer/sink/console";
import {
  parseClaimedFreeGame,
  CLAIMED_FREE_GAME,
  parseReceivedLevelSeed,
  RECEIVED_LEVEL_SEED,
  START_GAME,
  parseStartGame,
} from "./utils/events.ts";
import {
  insertFreeGame,
  updateClaimedFreeGame,
  updateRevealedFreeGame,
} from "./utils/helpers.ts";
import { MONGO_CONNECTION_STRING } from "./utils/constants.ts";

const GAME = Deno.env.get("GAME");
const START = +(Deno.env.get("START") || 0);
const STREAM_URL = Deno.env.get("STREAM_URL");
const MONGO_DB = Deno.env.get("MONGO_DB");

const filter = {
  header: { weak: true },
  events: [
    { fromAddress: GAME, keys: [START_GAME] },
    { fromAddress: GAME, keys: [CLAIMED_FREE_GAME] },
    { fromAddress: GAME, keys: [RECEIVED_LEVEL_SEED] },
  ],
};

export const config: Config<Starknet, Mongo | Console> = {
  streamUrl: STREAM_URL,
  network: "starknet",
  filter,
  startingBlock: START,
  finality: "DATA_STATUS_PENDING",
  sinkType: "mongo",
  sinkOptions: {
    connectionString: MONGO_CONNECTION_STRING,
    database: MONGO_DB,
    collectionName: "claimed_free_games",
    // @ts-ignore - indexer package not updated
    entityMode: true,
  },
};

export default function transform({ header, events }: Block) {
  return events.flatMap(({ event, receipt }) => {
    switch (event.keys[0]) {
      case START_GAME: {
        const { value } = parseStartGame(event.data, 0);
        console.log("START_GAME", "->", "CLAIMED_FREE_GAMES UPDATES");
        const as = value.adventurerState;
        return insertFreeGame({
          adventurerId: as.adventurerId,
          gameOwnerAddress: as.owner,
          revealed: false,
        });
      }

      case CLAIMED_FREE_GAME: {
        const { value } = parseClaimedFreeGame(event.data, 0);
        console.log("CLAIMED_FREE_GAME", "->", "CLAIMED_FREE_GAMES UPDATES");
        return updateClaimedFreeGame({
          adventurerId: value.adventurerId,
          token: value.tokenAddress,
          tokenId: value.tokenId,
        });
      }

      case RECEIVED_LEVEL_SEED: {
        const { value } = parseReceivedLevelSeed(event.data, 0);
        console.log("RECEIVED_LEVEL_SEED", "->", "CLAIMED_FREE_GAMES UPDATES");
        return updateRevealedFreeGame({
          adventurerId: value.adventurerId,
          revealed: true,
        });
      }

      default: {
        console.warn("Unknown event", event.keys[0]);
        return [];
      }
    }
  });
}
