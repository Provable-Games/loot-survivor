import type { Config } from "https://esm.sh/@apibara/indexer";
import type { Block, Starknet } from "https://esm.sh/@apibara/indexer/starknet";
import type { Mongo } from "https://esm.sh/@apibara/indexer/sink/mongo";
import type { Console } from "https://esm.sh/@apibara/indexer/sink/console";
import { TRANSFER, parseTransfer, CLAIMED_FREE_GAME } from "./utils/events.ts";
import { updateTokenFreeGame } from "./utils/helpers.ts";
import { MONGO_CONNECTION_STRING } from "./utils/constants.ts";

const GAME = Deno.env.get("GAME");
const tokenAddresses = Deno.env.get("TOKENS")?.split(",") || [];
const START = +(Deno.env.get("TOKEN_START") || 0);
const STREAM_URL = Deno.env.get("STREAM_URL");
const MONGO_DB = Deno.env.get("MONGO_DB");

const baseEvents = [{ fromAddress: GAME, keys: [CLAIMED_FREE_GAME] }];

const additionalEvents = tokenAddresses.map((address) => ({
  fromAddress: address,
  keys: [TRANSFER],
}));

const filter = {
  header: { weak: true },
  events: [...baseEvents, ...additionalEvents],
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
    collectionName: "free_games",
    // @ts-ignore - indexer package not updated
    entityMode: true,
  },
};

export default function transform({ header, events }: Block) {
  return events.flatMap(({ event, receipt }) => {
    switch (event.keys[0]) {
      case CLAIMED_FREE_GAME: {
        const { value } = parseTransfer(event.data, 0);
        console.log("CLAIMED_FREE_GAME", "->", "TOKENS UPDATES");
        return updateTokenFreeGame({
          token: value.toAddress,
          tokenId: value.tokenId,
          used: true,
        });
      }

      default: {
        console.warn("Unknown event", event.keys[0]);
        return [];
      }
    }
  });
}
