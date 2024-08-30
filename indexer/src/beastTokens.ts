import type { Config } from "https://esm.sh/@apibara/indexer";
import type { Block, Starknet } from "https://esm.sh/@apibara/indexer/starknet";
import type { Mongo } from "https://esm.sh/@apibara/indexer/sink/mongo";
import type { Console } from "https://esm.sh/@apibara/indexer/sink/console";
import { TRANSFER, parseTransfer } from "./utils/events.ts";
import { updateBeastOwner } from "./utils/helpers.ts";
import { MONGO_CONNECTION_STRING } from "./utils/constants.ts";

const BEAST_TOKEN = Deno.env.get("BEAST_TOKEN");
const START = +(Deno.env.get("START") || 0);
const STREAM_URL = Deno.env.get("STREAM_URL");
const MONGO_DB = Deno.env.get("MONGO_DB");

const filter = {
  header: { weak: true },
  events: [{ fromAddress: BEAST_TOKEN, keys: [TRANSFER] }],
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
    collectionName: "beast_tokens",
    // @ts-ignore - indexer package not updated
    entityMode: true,
  },
};

export default function transform({ header, events }: Block) {
  return events.flatMap(({ event, receipt }) => {
    switch (event.keys[0]) {
      case TRANSFER: {
        const { value } = parseTransfer(event.data, 0);
        console.log("TRANSFER", "->", "BEAST_TOKENS UPDATES");
        return updateBeastOwner({
          token: event.fromAddress,
          tokenId: value.tokenId,
          newOwner: value.toAddress,
          timestamp: new Date().toISOString(),
        });
      }

      default: {
        console.warn("Unknown event", event.keys[0]);
        return [];
      }
    }
  });
}
