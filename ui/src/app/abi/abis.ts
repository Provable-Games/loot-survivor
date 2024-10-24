import { Abi } from "starknet";

const gameAbi = [
  {
    type: "impl",
    name: "Game",
    interface_name: "game::game::interfaces::IGame",
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "enum",
    name: "adventurer::constants::discovery_constants::DiscoveryEnums::ExploreResult",
    variants: [
      {
        name: "Beast",
        type: "()",
      },
      {
        name: "Obstacle",
        type: "()",
      },
      {
        name: "Discovery",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "adventurer::stats::Stats",
    members: [
      {
        name: "strength",
        type: "core::integer::u8",
      },
      {
        name: "dexterity",
        type: "core::integer::u8",
      },
      {
        name: "vitality",
        type: "core::integer::u8",
      },
      {
        name: "intelligence",
        type: "core::integer::u8",
      },
      {
        name: "wisdom",
        type: "core::integer::u8",
      },
      {
        name: "charisma",
        type: "core::integer::u8",
      },
      {
        name: "luck",
        type: "core::integer::u8",
      },
    ],
  },
  {
    type: "struct",
    name: "market::market::ItemPurchase",
    members: [
      {
        name: "item_id",
        type: "core::integer::u8",
      },
      {
        name: "equip",
        type: "core::bool",
      },
    ],
  },
  {
    type: "struct",
    name: "core::array::Span::<core::felt252>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::felt252>",
      },
    ],
  },
  {
    type: "struct",
    name: "core::byte_array::ByteArray",
    members: [
      {
        name: "data",
        type: "core::array::Array::<core::bytes_31::bytes31>",
      },
      {
        name: "pending_word",
        type: "core::felt252",
      },
      {
        name: "pending_word_len",
        type: "core::integer::u32",
      },
    ],
  },
  {
    type: "struct",
    name: "adventurer::item::Item",
    members: [
      {
        name: "id",
        type: "core::integer::u8",
      },
      {
        name: "xp",
        type: "core::integer::u16",
      },
    ],
  },
  {
    type: "struct",
    name: "adventurer::equipment::Equipment",
    members: [
      {
        name: "weapon",
        type: "adventurer::item::Item",
      },
      {
        name: "chest",
        type: "adventurer::item::Item",
      },
      {
        name: "head",
        type: "adventurer::item::Item",
      },
      {
        name: "waist",
        type: "adventurer::item::Item",
      },
      {
        name: "foot",
        type: "adventurer::item::Item",
      },
      {
        name: "hand",
        type: "adventurer::item::Item",
      },
      {
        name: "neck",
        type: "adventurer::item::Item",
      },
      {
        name: "ring",
        type: "adventurer::item::Item",
      },
    ],
  },
  {
    type: "struct",
    name: "adventurer::adventurer::Adventurer",
    members: [
      {
        name: "health",
        type: "core::integer::u16",
      },
      {
        name: "xp",
        type: "core::integer::u16",
      },
      {
        name: "gold",
        type: "core::integer::u16",
      },
      {
        name: "beast_health",
        type: "core::integer::u16",
      },
      {
        name: "stat_upgrades_available",
        type: "core::integer::u8",
      },
      {
        name: "stats",
        type: "adventurer::stats::Stats",
      },
      {
        name: "equipment",
        type: "adventurer::equipment::Equipment",
      },
      {
        name: "battle_action_count",
        type: "core::integer::u8",
      },
      {
        name: "mutated",
        type: "core::bool",
      },
      {
        name: "awaiting_item_specials",
        type: "core::bool",
      },
    ],
  },
  {
    type: "struct",
    name: "adventurer::adventurer_meta::AdventurerMetadata",
    members: [
      {
        name: "birth_date",
        type: "core::integer::u64",
      },
      {
        name: "death_date",
        type: "core::integer::u64",
      },
      {
        name: "level_seed",
        type: "core::integer::u64",
      },
      {
        name: "item_specials_seed",
        type: "core::integer::u16",
      },
      {
        name: "rank_at_death",
        type: "core::integer::u8",
      },
      {
        name: "delay_stat_reveal",
        type: "core::bool",
      },
      {
        name: "golden_token_id",
        type: "core::integer::u8",
      },
      {
        name: "launch_tournament_winner_token_id",
        type: "core::integer::u32",
      },
    ],
  },
  {
    type: "struct",
    name: "adventurer::bag::Bag",
    members: [
      {
        name: "item_1",
        type: "adventurer::item::Item",
      },
      {
        name: "item_2",
        type: "adventurer::item::Item",
      },
      {
        name: "item_3",
        type: "adventurer::item::Item",
      },
      {
        name: "item_4",
        type: "adventurer::item::Item",
      },
      {
        name: "item_5",
        type: "adventurer::item::Item",
      },
      {
        name: "item_6",
        type: "adventurer::item::Item",
      },
      {
        name: "item_7",
        type: "adventurer::item::Item",
      },
      {
        name: "item_8",
        type: "adventurer::item::Item",
      },
      {
        name: "item_9",
        type: "adventurer::item::Item",
      },
      {
        name: "item_10",
        type: "adventurer::item::Item",
      },
      {
        name: "item_11",
        type: "adventurer::item::Item",
      },
      {
        name: "item_12",
        type: "adventurer::item::Item",
      },
      {
        name: "item_13",
        type: "adventurer::item::Item",
      },
      {
        name: "item_14",
        type: "adventurer::item::Item",
      },
      {
        name: "item_15",
        type: "adventurer::item::Item",
      },
      {
        name: "mutated",
        type: "core::bool",
      },
    ],
  },
  {
    type: "enum",
    name: "combat::constants::CombatEnums::Tier",
    variants: [
      {
        name: "None",
        type: "()",
      },
      {
        name: "T1",
        type: "()",
      },
      {
        name: "T2",
        type: "()",
      },
      {
        name: "T3",
        type: "()",
      },
      {
        name: "T4",
        type: "()",
      },
      {
        name: "T5",
        type: "()",
      },
    ],
  },
  {
    type: "enum",
    name: "combat::constants::CombatEnums::Type",
    variants: [
      {
        name: "None",
        type: "()",
      },
      {
        name: "Magic_or_Cloth",
        type: "()",
      },
      {
        name: "Blade_or_Hide",
        type: "()",
      },
      {
        name: "Bludgeon_or_Metal",
        type: "()",
      },
      {
        name: "Necklace",
        type: "()",
      },
      {
        name: "Ring",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "combat::combat::SpecialPowers",
    members: [
      {
        name: "special1",
        type: "core::integer::u8",
      },
      {
        name: "special2",
        type: "core::integer::u8",
      },
      {
        name: "special3",
        type: "core::integer::u8",
      },
    ],
  },
  {
    type: "struct",
    name: "combat::combat::CombatSpec",
    members: [
      {
        name: "tier",
        type: "combat::constants::CombatEnums::Tier",
      },
      {
        name: "item_type",
        type: "combat::constants::CombatEnums::Type",
      },
      {
        name: "level",
        type: "core::integer::u16",
      },
      {
        name: "specials",
        type: "combat::combat::SpecialPowers",
      },
    ],
  },
  {
    type: "struct",
    name: "beasts::beast::Beast",
    members: [
      {
        name: "id",
        type: "core::integer::u8",
      },
      {
        name: "starting_health",
        type: "core::integer::u16",
      },
      {
        name: "combat_spec",
        type: "combat::combat::CombatSpec",
      },
    ],
  },
  {
    type: "struct",
    name: "adventurer::adventurer::ItemSpecial",
    members: [
      {
        name: "item_id",
        type: "core::integer::u8",
      },
      {
        name: "special_power",
        type: "combat::combat::SpecialPowers",
      },
    ],
  },
  {
    type: "struct",
    name: "adventurer::leaderboard::Score",
    members: [
      {
        name: "adventurer_id",
        type: "core::integer::u64",
      },
      {
        name: "xp",
        type: "core::integer::u16",
      },
      {
        name: "gold",
        type: "core::integer::u16",
      },
    ],
  },
  {
    type: "struct",
    name: "adventurer::leaderboard::Leaderboard",
    members: [
      {
        name: "first",
        type: "adventurer::leaderboard::Score",
      },
      {
        name: "second",
        type: "adventurer::leaderboard::Score",
      },
      {
        name: "third",
        type: "adventurer::leaderboard::Score",
      },
    ],
  },
  {
    type: "enum",
    name: "game::FreeGameTokenType",
    variants: [
      {
        name: "GoldenToken",
        type: "()",
      },
      {
        name: "LaunchTournamentChampion",
        type: "()",
      },
    ],
  },
  {
    type: "interface",
    name: "game::game::interfaces::IGame",
    items: [
      {
        type: "function",
        name: "new_game",
        inputs: [
          {
            name: "client_reward_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "weapon",
            type: "core::integer::u8",
          },
          {
            name: "name",
            type: "core::felt252",
          },
          {
            name: "golden_token_id",
            type: "core::integer::u8",
          },
          {
            name: "delay_reveal",
            type: "core::bool",
          },
          {
            name: "custom_renderer",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "launch_tournament_winner_token_id",
            type: "core::integer::u32",
          },
          {
            name: "mint_to",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "explore",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
          {
            name: "till_beast",
            type: "core::bool",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<adventurer::constants::discovery_constants::DiscoveryEnums::ExploreResult>",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "attack",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
          {
            name: "to_the_death",
            type: "core::bool",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "flee",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
          {
            name: "to_the_death",
            type: "core::bool",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "equip",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
          {
            name: "items",
            type: "core::array::Array::<core::integer::u8>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "drop",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
          {
            name: "items",
            type: "core::array::Array::<core::integer::u8>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "upgrade",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
          {
            name: "potions",
            type: "core::integer::u8",
          },
          {
            name: "stat_upgrades",
            type: "adventurer::stats::Stats",
          },
          {
            name: "items",
            type: "core::array::Array::<market::market::ItemPurchase>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "receive_random_words",
        inputs: [
          {
            name: "requestor_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "request_id",
            type: "core::integer::u64",
          },
          {
            name: "random_words",
            type: "core::array::Span::<core::felt252>",
          },
          {
            name: "calldata",
            type: "core::array::Array::<core::felt252>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "update_cost_to_play",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u128",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "set_adventurer_renderer",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
          {
            name: "render_contract",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "increase_vrf_allowance",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
          {
            name: "amount",
            type: "core::integer::u128",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "update_adventurer_name",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
          {
            name: "name",
            type: "core::felt252",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "set_adventurer_obituary",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
          {
            name: "obituary",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "slay_expired_adventurers",
        inputs: [
          {
            name: "adventurer_ids",
            type: "core::array::Array::<core::felt252>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "enter_launch_tournament",
        inputs: [
          {
            name: "weapon",
            type: "core::integer::u8",
          },
          {
            name: "name",
            type: "core::felt252",
          },
          {
            name: "custom_renderer",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "delay_stat_reveal",
            type: "core::bool",
          },
          {
            name: "collection_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token_id",
            type: "core::integer::u32",
          },
          {
            name: "mint_to",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<core::felt252>",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "enter_launch_tournament_with_signature",
        inputs: [
          {
            name: "weapon",
            type: "core::integer::u8",
          },
          {
            name: "name",
            type: "core::felt252",
          },
          {
            name: "custom_renderer",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "delay_stat_reveal",
            type: "core::bool",
          },
          {
            name: "collection_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token_id",
            type: "core::integer::u32",
          },
          {
            name: "mint_from",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "mint_to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "signature",
            type: "core::array::Array::<core::felt252>",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<core::felt252>",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "settle_launch_tournament",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_adventurer",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "adventurer::adventurer::Adventurer",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_adventurer_name",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_adventurer_obituary",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::byte_array::ByteArray",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_adventurer_no_boosts",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "adventurer::adventurer::Adventurer",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_adventurer_meta",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "adventurer::adventurer_meta::AdventurerMetadata",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_client_provider",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_bag",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "adventurer::bag::Bag",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_market",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<core::integer::u8>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_potion_price",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::integer::u16",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_item_price",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
          {
            name: "item_id",
            type: "core::integer::u8",
          },
        ],
        outputs: [
          {
            type: "core::integer::u16",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_attacking_beast",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "beasts::beast::Beast",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_item_specials",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<adventurer::adventurer::ItemSpecial>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "obstacle_critical_hit_chance",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::integer::u8",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "beast_critical_hit_chance",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
          {
            name: "is_ambush",
            type: "core::bool",
          },
        ],
        outputs: [
          {
            type: "core::integer::u8",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_game_count",
        inputs: [],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_leaderboard",
        inputs: [],
        outputs: [
          {
            type: "adventurer::leaderboard::Leaderboard",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_cost_to_play",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u128",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "free_game_available",
        inputs: [
          {
            name: "token_type",
            type: "game::FreeGameTokenType",
          },
          {
            name: "token_id",
            type: "core::integer::u32",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "uses_custom_renderer",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_adventurer_renderer",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_adventurer_vrf_allowance",
        inputs: [
          {
            name: "adventurer_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::integer::u128",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_vrf_premiums_address",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "free_vrf_promotion_active",
        inputs: [],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "is_launch_tournament_active",
        inputs: [],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_launch_tournament_winner",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_launch_tournament_end_time",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "impl",
    name: "ERC721Mixin",
    interface_name: "game::game::interfaces::IERC721Mixin",
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "interface",
    name: "game::game::interfaces::IERC721Mixin",
    items: [
      {
        type: "function",
        name: "balance_of",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "owner_of",
        inputs: [
          {
            name: "token_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "safe_transfer_from",
        inputs: [
          {
            name: "from",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token_id",
            type: "core::integer::u256",
          },
          {
            name: "data",
            type: "core::array::Span::<core::felt252>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "transfer_from",
        inputs: [
          {
            name: "from",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "approve",
        inputs: [
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "set_approval_for_all",
        inputs: [
          {
            name: "operator",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "approved",
            type: "core::bool",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_approved",
        inputs: [
          {
            name: "token_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "is_approved_for_all",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "operator",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "name",
        inputs: [],
        outputs: [
          {
            type: "core::byte_array::ByteArray",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "symbol",
        inputs: [],
        outputs: [
          {
            type: "core::byte_array::ByteArray",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "token_uri",
        inputs: [
          {
            name: "token_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::byte_array::ByteArray",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "balanceOf",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "ownerOf",
        inputs: [
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "safeTransferFrom",
        inputs: [
          {
            name: "from",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
          {
            name: "data",
            type: "core::array::Span::<core::felt252>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "transferFrom",
        inputs: [
          {
            name: "from",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "setApprovalForAll",
        inputs: [
          {
            name: "operator",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "approved",
            type: "core::bool",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "getApproved",
        inputs: [
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "isApprovedForAll",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "operator",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "tokenURI",
        inputs: [
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::byte_array::ByteArray",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "supports_interface",
        inputs: [
          {
            name: "interface_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "supportsInterface",
        inputs: [
          {
            name: "interfaceId",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "struct",
    name: "game::LaunchTournamentCollections",
    members: [
      {
        name: "collection_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "games_per_token",
        type: "core::integer::u8",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "payment_token",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "eth_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "dao_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "pg_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "beasts_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "golden_token_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "terminal_timestamp",
        type: "core::integer::u64",
      },
      {
        name: "vrf_provider_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "oracle_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "render_contract",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "qualifying_collections",
        type: "core::array::Array::<game::LaunchTournamentCollections>",
      },
      {
        name: "launch_tournament_duration_seconds",
        type: "core::integer::u64",
      },
      {
        name: "vrf_payments_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "launch_tournament_games_per_collection",
        type: "core::integer::u16",
      },
      {
        name: "launch_tournament_start_delay_seconds",
        type: "core::integer::u64",
      },
      {
        name: "free_vrf_promotion_duration_seconds",
        type: "core::integer::u64",
      },
    ],
  },
  {
    type: "struct",
    name: "game::Game::AdventurerState",
    members: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "adventurer_id",
        type: "core::felt252",
      },
      {
        name: "level_seed",
        type: "core::integer::u64",
      },
      {
        name: "adventurer",
        type: "adventurer::adventurer::Adventurer",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::StartGame",
    kind: "struct",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
        kind: "data",
      },
      {
        name: "adventurer_meta",
        type: "adventurer::adventurer_meta::AdventurerMetadata",
        kind: "data",
      },
      {
        name: "adventurer_name",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "custom_renderer",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::UpgradesAvailable",
    kind: "struct",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
        kind: "data",
      },
      {
        name: "items",
        type: "core::array::Array::<core::integer::u8>",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::DiscoveredHealth",
    kind: "struct",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
        kind: "data",
      },
      {
        name: "amount",
        type: "core::integer::u16",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::DiscoveredGold",
    kind: "struct",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
        kind: "data",
      },
      {
        name: "amount",
        type: "core::integer::u16",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::DiscoveredLoot",
    kind: "struct",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
        kind: "data",
      },
      {
        name: "item_id",
        type: "core::integer::u8",
        kind: "data",
      },
    ],
  },
  {
    type: "struct",
    name: "game::Game::ObstacleDetails",
    members: [
      {
        name: "id",
        type: "core::integer::u8",
      },
      {
        name: "level",
        type: "core::integer::u16",
      },
      {
        name: "damage_taken",
        type: "core::integer::u16",
      },
      {
        name: "damage_location",
        type: "core::integer::u8",
      },
      {
        name: "critical_hit",
        type: "core::bool",
      },
      {
        name: "adventurer_xp_reward",
        type: "core::integer::u16",
      },
      {
        name: "item_xp_reward",
        type: "core::integer::u16",
      },
    ],
  },
  {
    type: "struct",
    name: "game::Game::ObstacleEvent",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
      },
      {
        name: "obstacle_details",
        type: "game::Game::ObstacleDetails",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::DodgedObstacle",
    kind: "struct",
    members: [
      {
        name: "obstacle_event",
        type: "game::Game::ObstacleEvent",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::HitByObstacle",
    kind: "struct",
    members: [
      {
        name: "obstacle_event",
        type: "game::Game::ObstacleEvent",
        kind: "data",
      },
    ],
  },
  {
    type: "struct",
    name: "game::Game::BattleDetails",
    members: [
      {
        name: "seed",
        type: "core::integer::u32",
      },
      {
        name: "id",
        type: "core::integer::u8",
      },
      {
        name: "beast_specs",
        type: "combat::combat::CombatSpec",
      },
      {
        name: "damage",
        type: "core::integer::u16",
      },
      {
        name: "critical_hit",
        type: "core::bool",
      },
      {
        name: "location",
        type: "core::integer::u8",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::AmbushedByBeast",
    kind: "struct",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
        kind: "data",
      },
      {
        name: "beast_battle_details",
        type: "game::Game::BattleDetails",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::DiscoveredBeast",
    kind: "struct",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
        kind: "data",
      },
      {
        name: "seed",
        type: "core::integer::u32",
        kind: "data",
      },
      {
        name: "id",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "beast_specs",
        type: "combat::combat::CombatSpec",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::AttackedBeast",
    kind: "struct",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
        kind: "data",
      },
      {
        name: "beast_battle_details",
        type: "game::Game::BattleDetails",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::AttackedByBeast",
    kind: "struct",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
        kind: "data",
      },
      {
        name: "beast_battle_details",
        type: "game::Game::BattleDetails",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::SlayedBeast",
    kind: "struct",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
        kind: "data",
      },
      {
        name: "seed",
        type: "core::integer::u32",
        kind: "data",
      },
      {
        name: "id",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "beast_specs",
        type: "combat::combat::CombatSpec",
        kind: "data",
      },
      {
        name: "damage_dealt",
        type: "core::integer::u16",
        kind: "data",
      },
      {
        name: "critical_hit",
        type: "core::bool",
        kind: "data",
      },
      {
        name: "xp_earned_adventurer",
        type: "core::integer::u16",
        kind: "data",
      },
      {
        name: "xp_earned_items",
        type: "core::integer::u16",
        kind: "data",
      },
      {
        name: "gold_earned",
        type: "core::integer::u16",
        kind: "data",
      },
    ],
  },
  {
    type: "struct",
    name: "game::Game::FleeEvent",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
      },
      {
        name: "seed",
        type: "core::integer::u32",
      },
      {
        name: "id",
        type: "core::integer::u8",
      },
      {
        name: "beast_specs",
        type: "combat::combat::CombatSpec",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::FleeFailed",
    kind: "struct",
    members: [
      {
        name: "flee_event",
        type: "game::Game::FleeEvent",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::FleeSucceeded",
    kind: "struct",
    members: [
      {
        name: "flee_event",
        type: "game::Game::FleeEvent",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::AdventurerLeveledUp",
    kind: "struct",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
        kind: "data",
      },
      {
        name: "previous_level",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "new_level",
        type: "core::integer::u8",
        kind: "data",
      },
    ],
  },
  {
    type: "struct",
    name: "game::Game::AdventurerStateWithBag",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
      },
      {
        name: "bag",
        type: "adventurer::bag::Bag",
      },
    ],
  },
  {
    type: "enum",
    name: "combat::constants::CombatEnums::Slot",
    variants: [
      {
        name: "None",
        type: "()",
      },
      {
        name: "Weapon",
        type: "()",
      },
      {
        name: "Chest",
        type: "()",
      },
      {
        name: "Head",
        type: "()",
      },
      {
        name: "Waist",
        type: "()",
      },
      {
        name: "Foot",
        type: "()",
      },
      {
        name: "Hand",
        type: "()",
      },
      {
        name: "Neck",
        type: "()",
      },
      {
        name: "Ring",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "loot::loot::Loot",
    members: [
      {
        name: "id",
        type: "core::integer::u8",
      },
      {
        name: "tier",
        type: "combat::constants::CombatEnums::Tier",
      },
      {
        name: "item_type",
        type: "combat::constants::CombatEnums::Type",
      },
      {
        name: "slot",
        type: "combat::constants::CombatEnums::Slot",
      },
    ],
  },
  {
    type: "struct",
    name: "market::market::LootWithPrice",
    members: [
      {
        name: "item",
        type: "loot::loot::Loot",
      },
      {
        name: "price",
        type: "core::integer::u16",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::PurchasedItems",
    kind: "struct",
    members: [
      {
        name: "adventurer_state_with_bag",
        type: "game::Game::AdventurerStateWithBag",
        kind: "data",
      },
      {
        name: "purchases",
        type: "core::array::Array::<market::market::LootWithPrice>",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::PurchasedPotions",
    kind: "struct",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
        kind: "data",
      },
      {
        name: "quantity",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "cost",
        type: "core::integer::u16",
        kind: "data",
      },
      {
        name: "health",
        type: "core::integer::u16",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::AdventurerUpgraded",
    kind: "struct",
    members: [
      {
        name: "adventurer_state_with_bag",
        type: "game::Game::AdventurerStateWithBag",
        kind: "data",
      },
      {
        name: "strength_increase",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "dexterity_increase",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "vitality_increase",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "intelligence_increase",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "wisdom_increase",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "charisma_increase",
        type: "core::integer::u8",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::EquipmentChanged",
    kind: "struct",
    members: [
      {
        name: "adventurer_state_with_bag",
        type: "game::Game::AdventurerStateWithBag",
        kind: "data",
      },
      {
        name: "equipped_items",
        type: "core::array::Array::<core::integer::u8>",
        kind: "data",
      },
      {
        name: "bagged_items",
        type: "core::array::Array::<core::integer::u8>",
        kind: "data",
      },
      {
        name: "dropped_items",
        type: "core::array::Array::<core::integer::u8>",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::EquippedItems",
    kind: "struct",
    members: [
      {
        name: "adventurer_state_with_bag",
        type: "game::Game::AdventurerStateWithBag",
        kind: "data",
      },
      {
        name: "equipped_items",
        type: "core::array::Array::<core::integer::u8>",
        kind: "data",
      },
      {
        name: "unequipped_items",
        type: "core::array::Array::<core::integer::u8>",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::DroppedItems",
    kind: "struct",
    members: [
      {
        name: "adventurer_state_with_bag",
        type: "game::Game::AdventurerStateWithBag",
        kind: "data",
      },
      {
        name: "item_ids",
        type: "core::array::Array::<core::integer::u8>",
        kind: "data",
      },
    ],
  },
  {
    type: "struct",
    name: "adventurer::adventurer::ItemLeveledUp",
    members: [
      {
        name: "item_id",
        type: "core::integer::u8",
      },
      {
        name: "previous_level",
        type: "core::integer::u8",
      },
      {
        name: "new_level",
        type: "core::integer::u8",
      },
      {
        name: "suffix_unlocked",
        type: "core::bool",
      },
      {
        name: "prefixes_unlocked",
        type: "core::bool",
      },
      {
        name: "specials",
        type: "combat::combat::SpecialPowers",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::ItemsLeveledUp",
    kind: "struct",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
        kind: "data",
      },
      {
        name: "items",
        type: "core::array::Array::<adventurer::adventurer::ItemLeveledUp>",
        kind: "data",
      },
    ],
  },
  {
    type: "struct",
    name: "game::Game::DeathDetails",
    members: [
      {
        name: "killed_by_beast",
        type: "core::integer::u8",
      },
      {
        name: "killed_by_obstacle",
        type: "core::integer::u8",
      },
      {
        name: "killed_by_old_age",
        type: "core::bool",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::AdventurerDied",
    kind: "struct",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
        kind: "data",
      },
      {
        name: "death_details",
        type: "game::Game::DeathDetails",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::NewHighScore",
    kind: "struct",
    members: [
      {
        name: "adventurer_state",
        type: "game::Game::AdventurerState",
        kind: "data",
      },
      {
        name: "rank",
        type: "core::integer::u8",
        kind: "data",
      },
    ],
  },
  {
    type: "struct",
    name: "game::Game::PlayerReward",
    members: [
      {
        name: "adventurer_id",
        type: "core::felt252",
      },
      {
        name: "rank",
        type: "core::integer::u8",
      },
      {
        name: "amount",
        type: "core::integer::u128",
      },
      {
        name: "address",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "struct",
    name: "game::Game::ClientReward",
    members: [
      {
        name: "amount",
        type: "core::integer::u128",
      },
      {
        name: "address",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::RewardDistribution",
    kind: "struct",
    members: [
      {
        name: "first_place",
        type: "game::Game::PlayerReward",
        kind: "data",
      },
      {
        name: "second_place",
        type: "game::Game::PlayerReward",
        kind: "data",
      },
      {
        name: "third_place",
        type: "game::Game::PlayerReward",
        kind: "data",
      },
      {
        name: "client",
        type: "game::Game::ClientReward",
        kind: "data",
      },
      {
        name: "dao",
        type: "core::integer::u128",
        kind: "data",
      },
      {
        name: "pg",
        type: "core::integer::u128",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::PriceChangeEvent",
    kind: "struct",
    members: [
      {
        name: "previous_price",
        type: "core::integer::u128",
        kind: "data",
      },
      {
        name: "new_price",
        type: "core::integer::u128",
        kind: "data",
      },
      {
        name: "lords_price",
        type: "core::integer::u128",
        kind: "data",
      },
      {
        name: "changer",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::ReceivedLevelSeed",
    kind: "struct",
    members: [
      {
        name: "adventurer_id",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "vrf_address",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "seed",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "request_id",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::RequestedLevelSeed",
    kind: "struct",
    members: [
      {
        name: "adventurer_id",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "vrf_address",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "seed",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::RequestedItemSpecialsSeed",
    kind: "struct",
    members: [
      {
        name: "adventurer_id",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "vrf_address",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::ReceivedItemSpecialsSeed",
    kind: "struct",
    members: [
      {
        name: "adventurer_id",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "vrf_address",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "seed",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "request_id",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::UpdatedAdventurerName",
    kind: "struct",
    members: [
      {
        name: "adventurer_id",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "name",
        type: "core::felt252",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::SetAdventurerObituary",
    kind: "struct",
    members: [
      {
        name: "adventurer_id",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "obituary",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_token::erc721::erc721::ERC721Component::Transfer",
    kind: "struct",
    members: [
      {
        name: "from",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "to",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "token_id",
        type: "core::integer::u256",
        kind: "key",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_token::erc721::erc721::ERC721Component::Approval",
    kind: "struct",
    members: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "approved",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "token_id",
        type: "core::integer::u256",
        kind: "key",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_token::erc721::erc721::ERC721Component::ApprovalForAll",
    kind: "struct",
    members: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "operator",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "approved",
        type: "core::bool",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_token::erc721::erc721::ERC721Component::Event",
    kind: "enum",
    variants: [
      {
        name: "Transfer",
        type: "openzeppelin_token::erc721::erc721::ERC721Component::Transfer",
        kind: "nested",
      },
      {
        name: "Approval",
        type: "openzeppelin_token::erc721::erc721::ERC721Component::Approval",
        kind: "nested",
      },
      {
        name: "ApprovalForAll",
        type: "openzeppelin_token::erc721::erc721::ERC721Component::ApprovalForAll",
        kind: "nested",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_introspection::src5::SRC5Component::Event",
    kind: "enum",
    variants: [],
  },
  {
    type: "event",
    name: "game::Game::ClaimedFreeGame",
    kind: "struct",
    members: [
      {
        name: "adventurer_id",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "collection_address",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "token_id",
        type: "core::integer::u32",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::NewCollectionTotal",
    kind: "struct",
    members: [
      {
        name: "collection_address",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "xp",
        type: "core::integer::u32",
        kind: "data",
      },
      {
        name: "games_played",
        type: "core::integer::u16",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "game::Game::Event",
    kind: "enum",
    variants: [
      {
        name: "StartGame",
        type: "game::Game::StartGame",
        kind: "nested",
      },
      {
        name: "UpgradesAvailable",
        type: "game::Game::UpgradesAvailable",
        kind: "nested",
      },
      {
        name: "DiscoveredHealth",
        type: "game::Game::DiscoveredHealth",
        kind: "nested",
      },
      {
        name: "DiscoveredGold",
        type: "game::Game::DiscoveredGold",
        kind: "nested",
      },
      {
        name: "DiscoveredLoot",
        type: "game::Game::DiscoveredLoot",
        kind: "nested",
      },
      {
        name: "DodgedObstacle",
        type: "game::Game::DodgedObstacle",
        kind: "nested",
      },
      {
        name: "HitByObstacle",
        type: "game::Game::HitByObstacle",
        kind: "nested",
      },
      {
        name: "AmbushedByBeast",
        type: "game::Game::AmbushedByBeast",
        kind: "nested",
      },
      {
        name: "DiscoveredBeast",
        type: "game::Game::DiscoveredBeast",
        kind: "nested",
      },
      {
        name: "AttackedBeast",
        type: "game::Game::AttackedBeast",
        kind: "nested",
      },
      {
        name: "AttackedByBeast",
        type: "game::Game::AttackedByBeast",
        kind: "nested",
      },
      {
        name: "SlayedBeast",
        type: "game::Game::SlayedBeast",
        kind: "nested",
      },
      {
        name: "FleeFailed",
        type: "game::Game::FleeFailed",
        kind: "nested",
      },
      {
        name: "FleeSucceeded",
        type: "game::Game::FleeSucceeded",
        kind: "nested",
      },
      {
        name: "AdventurerLeveledUp",
        type: "game::Game::AdventurerLeveledUp",
        kind: "nested",
      },
      {
        name: "PurchasedItems",
        type: "game::Game::PurchasedItems",
        kind: "nested",
      },
      {
        name: "PurchasedPotions",
        type: "game::Game::PurchasedPotions",
        kind: "nested",
      },
      {
        name: "AdventurerUpgraded",
        type: "game::Game::AdventurerUpgraded",
        kind: "nested",
      },
      {
        name: "EquipmentChanged",
        type: "game::Game::EquipmentChanged",
        kind: "nested",
      },
      {
        name: "EquippedItems",
        type: "game::Game::EquippedItems",
        kind: "nested",
      },
      {
        name: "DroppedItems",
        type: "game::Game::DroppedItems",
        kind: "nested",
      },
      {
        name: "ItemsLeveledUp",
        type: "game::Game::ItemsLeveledUp",
        kind: "nested",
      },
      {
        name: "AdventurerDied",
        type: "game::Game::AdventurerDied",
        kind: "nested",
      },
      {
        name: "NewHighScore",
        type: "game::Game::NewHighScore",
        kind: "nested",
      },
      {
        name: "RewardDistribution",
        type: "game::Game::RewardDistribution",
        kind: "nested",
      },
      {
        name: "PriceChangeEvent",
        type: "game::Game::PriceChangeEvent",
        kind: "nested",
      },
      {
        name: "ReceivedLevelSeed",
        type: "game::Game::ReceivedLevelSeed",
        kind: "nested",
      },
      {
        name: "RequestedLevelSeed",
        type: "game::Game::RequestedLevelSeed",
        kind: "nested",
      },
      {
        name: "RequestedItemSpecialsSeed",
        type: "game::Game::RequestedItemSpecialsSeed",
        kind: "nested",
      },
      {
        name: "ReceivedItemSpecialsSeed",
        type: "game::Game::ReceivedItemSpecialsSeed",
        kind: "nested",
      },
      {
        name: "UpdatedAdventurerName",
        type: "game::Game::UpdatedAdventurerName",
        kind: "nested",
      },
      {
        name: "SetAdventurerObituary",
        type: "game::Game::SetAdventurerObituary",
        kind: "nested",
      },
      {
        name: "ERC721Event",
        type: "openzeppelin_token::erc721::erc721::ERC721Component::Event",
        kind: "flat",
      },
      {
        name: "SRC5Event",
        type: "openzeppelin_introspection::src5::SRC5Component::Event",
        kind: "flat",
      },
      {
        name: "ClaimedFreeGame",
        type: "game::Game::ClaimedFreeGame",
        kind: "nested",
      },
      {
        name: "NewCollectionTotal",
        type: "game::Game::NewCollectionTotal",
        kind: "nested",
      },
    ],
  },
] as const satisfies Abi;

const lordsAbi = [
  {
    type: "function",
    name: "constructor",
    inputs: [
      {
        name: "l2_bridge",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [
      {
        type: "core::felt252",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [
      {
        type: "core::felt252",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [
      {
        type: "core::integer::u8",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "total_supply",
    inputs: [],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "balance_of",
    inputs: [
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "transfer_from",
    inputs: [
      {
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      {
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "burn",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "struct",
    name: "Transfer",
    kind: "event",
    members: [
      {
        name: "from",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "to",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "value",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "struct",
    name: "Approval",
    kind: "event",
    members: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "value",
        type: "core::integer::u256",
      },
    ],
  },
] as const satisfies Abi;

const ethAbi = [
  {
    type: "impl",
    name: "MintableToken",
    interface_name: "src::mintable_token_interface::IMintableToken",
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "interface",
    name: "src::mintable_token_interface::IMintableToken",
    items: [
      {
        type: "function",
        name: "permissioned_mint",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "permissioned_burn",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "MintableTokenCamelImpl",
    interface_name: "src::mintable_token_interface::IMintableTokenCamel",
  },
  {
    type: "interface",
    name: "src::mintable_token_interface::IMintableTokenCamel",
    items: [
      {
        type: "function",
        name: "permissionedMint",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "permissionedBurn",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "Replaceable",
    interface_name: "src::replaceability_interface::IReplaceable",
  },
  {
    type: "struct",
    name: "core::array::Span::<core::felt252>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::felt252>",
      },
    ],
  },
  {
    type: "struct",
    name: "src::replaceability_interface::EICData",
    members: [
      {
        name: "eic_hash",
        type: "core::starknet::class_hash::ClassHash",
      },
      {
        name: "eic_init_data",
        type: "core::array::Span::<core::felt252>",
      },
    ],
  },
  {
    type: "enum",
    name: "core::option::Option::<src::replaceability_interface::EICData>",
    variants: [
      {
        name: "Some",
        type: "src::replaceability_interface::EICData",
      },
      {
        name: "None",
        type: "()",
      },
    ],
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "src::replaceability_interface::ImplementationData",
    members: [
      {
        name: "impl_hash",
        type: "core::starknet::class_hash::ClassHash",
      },
      {
        name: "eic_data",
        type: "core::option::Option::<src::replaceability_interface::EICData>",
      },
      {
        name: "final",
        type: "core::bool",
      },
    ],
  },
  {
    type: "interface",
    name: "src::replaceability_interface::IReplaceable",
    items: [
      {
        type: "function",
        name: "get_upgrade_delay",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_impl_activation_time",
        inputs: [
          {
            name: "implementation_data",
            type: "src::replaceability_interface::ImplementationData",
          },
        ],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "add_new_implementation",
        inputs: [
          {
            name: "implementation_data",
            type: "src::replaceability_interface::ImplementationData",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "remove_implementation",
        inputs: [
          {
            name: "implementation_data",
            type: "src::replaceability_interface::ImplementationData",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "replace_to",
        inputs: [
          {
            name: "implementation_data",
            type: "src::replaceability_interface::ImplementationData",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "AccessControlImplExternal",
    interface_name: "src::access_control_interface::IAccessControl",
  },
  {
    type: "interface",
    name: "src::access_control_interface::IAccessControl",
    items: [
      {
        type: "function",
        name: "has_role",
        inputs: [
          {
            name: "role",
            type: "core::felt252",
          },
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_role_admin",
        inputs: [
          {
            name: "role",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "impl",
    name: "RolesImpl",
    interface_name: "src::roles_interface::IMinimalRoles",
  },
  {
    type: "interface",
    name: "src::roles_interface::IMinimalRoles",
    items: [
      {
        type: "function",
        name: "is_governance_admin",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "is_upgrade_governor",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "register_governance_admin",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "remove_governance_admin",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "register_upgrade_governor",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "remove_upgrade_governor",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "renounce",
        inputs: [
          {
            name: "role",
            type: "core::felt252",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "ERC20Impl",
    interface_name: "openzeppelin::token::erc20::interface::IERC20",
  },
  {
    type: "interface",
    name: "openzeppelin::token::erc20::interface::IERC20",
    items: [
      {
        type: "function",
        name: "name",
        inputs: [],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "symbol",
        inputs: [],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "decimals",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u8",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "total_supply",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "balance_of",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "allowance",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "spender",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "transfer",
        inputs: [
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "transfer_from",
        inputs: [
          {
            name: "sender",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "approve",
        inputs: [
          {
            name: "spender",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "ERC20CamelOnlyImpl",
    interface_name: "openzeppelin::token::erc20::interface::IERC20CamelOnly",
  },
  {
    type: "interface",
    name: "openzeppelin::token::erc20::interface::IERC20CamelOnly",
    items: [
      {
        type: "function",
        name: "totalSupply",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "balanceOf",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "transferFrom",
        inputs: [
          {
            name: "sender",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "name",
        type: "core::felt252",
      },
      {
        name: "symbol",
        type: "core::felt252",
      },
      {
        name: "decimals",
        type: "core::integer::u8",
      },
      {
        name: "initial_supply",
        type: "core::integer::u256",
      },
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "permitted_minter",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "provisional_governance_admin",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "upgrade_delay",
        type: "core::integer::u64",
      },
    ],
  },
  {
    type: "function",
    name: "increase_allowance",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "added_value",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "decrease_allowance",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "subtracted_value",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "increaseAllowance",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "addedValue",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "decreaseAllowance",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "subtractedValue",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "event",
    name: "openzeppelin::token::erc20_v070::erc20::ERC20::Transfer",
    kind: "struct",
    members: [
      {
        name: "from",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "to",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "value",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin::token::erc20_v070::erc20::ERC20::Approval",
    kind: "struct",
    members: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "value",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::replaceability_interface::ImplementationAdded",
    kind: "struct",
    members: [
      {
        name: "implementation_data",
        type: "src::replaceability_interface::ImplementationData",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::replaceability_interface::ImplementationRemoved",
    kind: "struct",
    members: [
      {
        name: "implementation_data",
        type: "src::replaceability_interface::ImplementationData",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::replaceability_interface::ImplementationReplaced",
    kind: "struct",
    members: [
      {
        name: "implementation_data",
        type: "src::replaceability_interface::ImplementationData",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::replaceability_interface::ImplementationFinalized",
    kind: "struct",
    members: [
      {
        name: "impl_hash",
        type: "core::starknet::class_hash::ClassHash",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::access_control_interface::RoleGranted",
    kind: "struct",
    members: [
      {
        name: "role",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::access_control_interface::RoleRevoked",
    kind: "struct",
    members: [
      {
        name: "role",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::access_control_interface::RoleAdminChanged",
    kind: "struct",
    members: [
      {
        name: "role",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "previous_admin_role",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "new_admin_role",
        type: "core::felt252",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::roles_interface::GovernanceAdminAdded",
    kind: "struct",
    members: [
      {
        name: "added_account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "added_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::roles_interface::GovernanceAdminRemoved",
    kind: "struct",
    members: [
      {
        name: "removed_account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "removed_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::roles_interface::UpgradeGovernorAdded",
    kind: "struct",
    members: [
      {
        name: "added_account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "added_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::roles_interface::UpgradeGovernorRemoved",
    kind: "struct",
    members: [
      {
        name: "removed_account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "removed_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin::token::erc20_v070::erc20::ERC20::Event",
    kind: "enum",
    variants: [
      {
        name: "Transfer",
        type: "openzeppelin::token::erc20_v070::erc20::ERC20::Transfer",
        kind: "nested",
      },
      {
        name: "Approval",
        type: "openzeppelin::token::erc20_v070::erc20::ERC20::Approval",
        kind: "nested",
      },
      {
        name: "ImplementationAdded",
        type: "src::replaceability_interface::ImplementationAdded",
        kind: "nested",
      },
      {
        name: "ImplementationRemoved",
        type: "src::replaceability_interface::ImplementationRemoved",
        kind: "nested",
      },
      {
        name: "ImplementationReplaced",
        type: "src::replaceability_interface::ImplementationReplaced",
        kind: "nested",
      },
      {
        name: "ImplementationFinalized",
        type: "src::replaceability_interface::ImplementationFinalized",
        kind: "nested",
      },
      {
        name: "RoleGranted",
        type: "src::access_control_interface::RoleGranted",
        kind: "nested",
      },
      {
        name: "RoleRevoked",
        type: "src::access_control_interface::RoleRevoked",
        kind: "nested",
      },
      {
        name: "RoleAdminChanged",
        type: "src::access_control_interface::RoleAdminChanged",
        kind: "nested",
      },
      {
        name: "GovernanceAdminAdded",
        type: "src::roles_interface::GovernanceAdminAdded",
        kind: "nested",
      },
      {
        name: "GovernanceAdminRemoved",
        type: "src::roles_interface::GovernanceAdminRemoved",
        kind: "nested",
      },
      {
        name: "UpgradeGovernorAdded",
        type: "src::roles_interface::UpgradeGovernorAdded",
        kind: "nested",
      },
      {
        name: "UpgradeGovernorRemoved",
        type: "src::roles_interface::UpgradeGovernorRemoved",
        kind: "nested",
      },
    ],
  },
] as const satisfies Abi;

const beastsAbi = [
  {
    name: "BeastsImpl",
    type: "impl",
    interface_name: "LootSurvivorBeasts::interfaces::IBeasts",
  },
  {
    name: "core::integer::u256",
    type: "struct",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    name: "core::bool",
    type: "enum",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    name: "LootSurvivorBeasts::interfaces::IBeasts",
    type: "interface",
    items: [
      {
        name: "owner",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "transferOwnership",
        type: "function",
        inputs: [
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "renounceOwnership",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "name",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "symbol",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "balanceOf",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "ownerOf",
        type: "function",
        inputs: [
          {
            name: "tokenID",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "transferFrom",
        type: "function",
        inputs: [
          {
            name: "from",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "tokenID",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "approve",
        type: "function",
        inputs: [
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "tokenID",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "setApprovalForAll",
        type: "function",
        inputs: [
          {
            name: "operator",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "approved",
            type: "core::bool",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "getApproved",
        type: "function",
        inputs: [
          {
            name: "tokenID",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "isApprovedForAll",
        type: "function",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "operator",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "supportsInterface",
        type: "function",
        inputs: [
          {
            name: "interfaceId",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "registerInterface",
        type: "function",
        inputs: [
          {
            name: "interface_id",
            type: "core::felt252",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "mintGenesisBeasts",
        type: "function",
        inputs: [
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "setMinter",
        type: "function",
        inputs: [
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "getMinter",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "mint",
        type: "function",
        inputs: [
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "beast",
            type: "core::integer::u8",
          },
          {
            name: "prefix",
            type: "core::integer::u8",
          },
          {
            name: "suffix",
            type: "core::integer::u8",
          },
          {
            name: "level",
            type: "core::integer::u16",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "isMinted",
        type: "function",
        inputs: [
          {
            name: "beast",
            type: "core::integer::u8",
          },
          {
            name: "prefix",
            type: "core::integer::u8",
          },
          {
            name: "suffix",
            type: "core::integer::u8",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "tokenURI",
        type: "function",
        inputs: [
          {
            name: "tokenID",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<core::felt252>",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "tokenSupply",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    name: "constructor",
    type: "constructor",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "whitelist",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "name",
        type: "core::felt252",
      },
      {
        name: "symbol",
        type: "core::felt252",
      },
    ],
  },
  {
    kind: "struct",
    name: "LootSurvivorBeasts::beasts::Beasts::Transfer",
    type: "event",
    members: [
      {
        kind: "data",
        name: "from",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "to",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "token_id",
        type: "core::integer::u256",
      },
    ],
  },
  {
    kind: "struct",
    name: "LootSurvivorBeasts::beasts::Beasts::Approval",
    type: "event",
    members: [
      {
        kind: "data",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "approved",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "token_id",
        type: "core::integer::u256",
      },
    ],
  },
  {
    kind: "struct",
    name: "LootSurvivorBeasts::beasts::Beasts::ApprovalForAll",
    type: "event",
    members: [
      {
        kind: "data",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "operator",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "approved",
        type: "core::bool",
      },
    ],
  },
  {
    kind: "enum",
    name: "LootSurvivorBeasts::beasts::Beasts::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "Transfer",
        type: "LootSurvivorBeasts::beasts::Beasts::Transfer",
      },
      {
        kind: "nested",
        name: "Approval",
        type: "LootSurvivorBeasts::beasts::Beasts::Approval",
      },
      {
        kind: "nested",
        name: "ApprovalForAll",
        type: "LootSurvivorBeasts::beasts::Beasts::ApprovalForAll",
      },
    ],
  },
] as const satisfies Abi;

const pragmaAbi = [
  {
    name: "IOracleImpl",
    type: "impl",
    interface_name: "pragma::oracle::oracle::IOracleABI",
  },
  {
    name: "pragma::entry::structs::DataType",
    type: "enum",
    variants: [
      {
        name: "SpotEntry",
        type: "core::felt252",
      },
      {
        name: "FutureEntry",
        type: "(core::felt252, core::integer::u64)",
      },
      {
        name: "GenericEntry",
        type: "core::felt252",
      },
    ],
  },
  {
    name: "core::option::Option::<core::integer::u64>",
    type: "enum",
    variants: [
      {
        name: "Some",
        type: "core::integer::u64",
      },
      {
        name: "None",
        type: "()",
      },
    ],
  },
  {
    name: "pragma::entry::structs::PragmaPricesResponse",
    type: "struct",
    members: [
      {
        name: "price",
        type: "core::integer::u128",
      },
      {
        name: "decimals",
        type: "core::integer::u32",
      },
      {
        name: "last_updated_timestamp",
        type: "core::integer::u64",
      },
      {
        name: "num_sources_aggregated",
        type: "core::integer::u32",
      },
      {
        name: "expiration_timestamp",
        type: "core::option::Option::<core::integer::u64>",
      },
    ],
  },
  {
    name: "core::array::Span::<core::felt252>",
    type: "struct",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::felt252>",
      },
    ],
  },
  {
    name: "pragma::entry::structs::AggregationMode",
    type: "enum",
    variants: [
      {
        name: "Median",
        type: "()",
      },
      {
        name: "Mean",
        type: "()",
      },
      {
        name: "Error",
        type: "()",
      },
    ],
  },
  {
    name: "core::array::Span::<pragma::entry::structs::DataType>",
    type: "struct",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<pragma::entry::structs::DataType>",
      },
    ],
  },
  {
    name: "core::array::Span::<pragma::entry::structs::PragmaPricesResponse>",
    type: "struct",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<pragma::entry::structs::PragmaPricesResponse>",
      },
    ],
  },
  {
    name: "pragma::entry::structs::BaseEntry",
    type: "struct",
    members: [
      {
        name: "timestamp",
        type: "core::integer::u64",
      },
      {
        name: "source",
        type: "core::felt252",
      },
      {
        name: "publisher",
        type: "core::felt252",
      },
    ],
  },
  {
    name: "pragma::entry::structs::SpotEntry",
    type: "struct",
    members: [
      {
        name: "base",
        type: "pragma::entry::structs::BaseEntry",
      },
      {
        name: "price",
        type: "core::integer::u128",
      },
      {
        name: "pair_id",
        type: "core::felt252",
      },
      {
        name: "volume",
        type: "core::integer::u128",
      },
    ],
  },
  {
    name: "pragma::entry::structs::FutureEntry",
    type: "struct",
    members: [
      {
        name: "base",
        type: "pragma::entry::structs::BaseEntry",
      },
      {
        name: "price",
        type: "core::integer::u128",
      },
      {
        name: "pair_id",
        type: "core::felt252",
      },
      {
        name: "volume",
        type: "core::integer::u128",
      },
      {
        name: "expiration_timestamp",
        type: "core::integer::u64",
      },
    ],
  },
  {
    name: "pragma::entry::structs::GenericEntry",
    type: "struct",
    members: [
      {
        name: "base",
        type: "pragma::entry::structs::BaseEntry",
      },
      {
        name: "key",
        type: "core::felt252",
      },
      {
        name: "value",
        type: "core::integer::u128",
      },
    ],
  },
  {
    name: "pragma::entry::structs::PossibleEntries",
    type: "enum",
    variants: [
      {
        name: "Spot",
        type: "pragma::entry::structs::SpotEntry",
      },
      {
        name: "Future",
        type: "pragma::entry::structs::FutureEntry",
      },
      {
        name: "Generic",
        type: "pragma::entry::structs::GenericEntry",
      },
    ],
  },
  {
    name: "core::array::Span::<pragma::entry::structs::PossibleEntries>",
    type: "struct",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<pragma::entry::structs::PossibleEntries>",
      },
    ],
  },
  {
    name: "pragma::entry::structs::Checkpoint",
    type: "struct",
    members: [
      {
        name: "timestamp",
        type: "core::integer::u64",
      },
      {
        name: "value",
        type: "core::integer::u128",
      },
      {
        name: "aggregation_mode",
        type: "pragma::entry::structs::AggregationMode",
      },
      {
        name: "num_sources_aggregated",
        type: "core::integer::u32",
      },
    ],
  },
  {
    name: "pragma::entry::structs::SimpleDataType",
    type: "enum",
    variants: [
      {
        name: "SpotEntry",
        type: "()",
      },
      {
        name: "FutureEntry",
        type: "()",
      },
    ],
  },
  {
    name: "core::bool",
    type: "enum",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    name: "pragma::entry::structs::Currency",
    type: "struct",
    members: [
      {
        name: "id",
        type: "core::felt252",
      },
      {
        name: "decimals",
        type: "core::integer::u32",
      },
      {
        name: "is_abstract_currency",
        type: "core::bool",
      },
      {
        name: "starknet_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "ethereum_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    name: "pragma::entry::structs::Pair",
    type: "struct",
    members: [
      {
        name: "id",
        type: "core::felt252",
      },
      {
        name: "quote_currency_id",
        type: "core::felt252",
      },
      {
        name: "base_currency_id",
        type: "core::felt252",
      },
    ],
  },
  {
    name: "pragma::oracle::oracle::IOracleABI",
    type: "interface",
    items: [
      {
        name: "get_decimals",
        type: "function",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
        ],
        outputs: [
          {
            type: "core::integer::u32",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_data_median",
        type: "function",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
        ],
        outputs: [
          {
            type: "pragma::entry::structs::PragmaPricesResponse",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_data_median_for_sources",
        type: "function",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
          {
            name: "sources",
            type: "core::array::Span::<core::felt252>",
          },
        ],
        outputs: [
          {
            type: "pragma::entry::structs::PragmaPricesResponse",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_data",
        type: "function",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode",
          },
        ],
        outputs: [
          {
            type: "pragma::entry::structs::PragmaPricesResponse",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_data_median_multi",
        type: "function",
        inputs: [
          {
            name: "data_types",
            type: "core::array::Span::<pragma::entry::structs::DataType>",
          },
          {
            name: "sources",
            type: "core::array::Span::<core::felt252>",
          },
        ],
        outputs: [
          {
            type: "core::array::Span::<pragma::entry::structs::PragmaPricesResponse>",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_data_entry",
        type: "function",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
          {
            name: "source",
            type: "core::felt252",
          },
          {
            name: "publisher",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "pragma::entry::structs::PossibleEntries",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_data_entry_for_publishers",
        type: "function",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
          {
            name: "source",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "pragma::entry::structs::PossibleEntries",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_data_for_sources",
        type: "function",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode",
          },
          {
            name: "sources",
            type: "core::array::Span::<core::felt252>",
          },
        ],
        outputs: [
          {
            type: "pragma::entry::structs::PragmaPricesResponse",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_data_entries",
        type: "function",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
        ],
        outputs: [
          {
            type: "core::array::Span::<pragma::entry::structs::PossibleEntries>",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_data_entries_for_sources",
        type: "function",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
          {
            name: "sources",
            type: "core::array::Span::<core::felt252>",
          },
        ],
        outputs: [
          {
            type: "(core::array::Span::<pragma::entry::structs::PossibleEntries>, core::integer::u64)",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_last_checkpoint_before",
        type: "function",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
          {
            name: "timestamp",
            type: "core::integer::u64",
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode",
          },
        ],
        outputs: [
          {
            type: "(pragma::entry::structs::Checkpoint, core::integer::u64)",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_data_with_USD_hop",
        type: "function",
        inputs: [
          {
            name: "base_currency_id",
            type: "core::felt252",
          },
          {
            name: "quote_currency_id",
            type: "core::felt252",
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode",
          },
          {
            name: "typeof",
            type: "pragma::entry::structs::SimpleDataType",
          },
          {
            name: "expiration_timestamp",
            type: "core::option::Option::<core::integer::u64>",
          },
        ],
        outputs: [
          {
            type: "pragma::entry::structs::PragmaPricesResponse",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_publisher_registry_address",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_latest_checkpoint_index",
        type: "function",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode",
          },
        ],
        outputs: [
          {
            type: "(core::integer::u64, core::bool)",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_latest_checkpoint",
        type: "function",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode",
          },
        ],
        outputs: [
          {
            type: "pragma::entry::structs::Checkpoint",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_checkpoint",
        type: "function",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
          {
            name: "checkpoint_index",
            type: "core::integer::u64",
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode",
          },
        ],
        outputs: [
          {
            type: "pragma::entry::structs::Checkpoint",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_sources_threshold",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u32",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_admin_address",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_all_publishers",
        type: "function",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
        ],
        outputs: [
          {
            type: "core::array::Span::<core::felt252>",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_all_sources",
        type: "function",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
        ],
        outputs: [
          {
            type: "core::array::Span::<core::felt252>",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "publish_data",
        type: "function",
        inputs: [
          {
            name: "new_entry",
            type: "pragma::entry::structs::PossibleEntries",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "publish_data_entries",
        type: "function",
        inputs: [
          {
            name: "new_entries",
            type: "core::array::Span::<pragma::entry::structs::PossibleEntries>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "set_admin_address",
        type: "function",
        inputs: [
          {
            name: "new_admin_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "update_publisher_registry_address",
        type: "function",
        inputs: [
          {
            name: "new_publisher_registry_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "add_currency",
        type: "function",
        inputs: [
          {
            name: "new_currency",
            type: "pragma::entry::structs::Currency",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "update_currency",
        type: "function",
        inputs: [
          {
            name: "currency_id",
            type: "core::felt252",
          },
          {
            name: "currency",
            type: "pragma::entry::structs::Currency",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "get_currency",
        type: "function",
        inputs: [
          {
            name: "currency_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "pragma::entry::structs::Currency",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "update_pair",
        type: "function",
        inputs: [
          {
            name: "pair_id",
            type: "core::felt252",
          },
          {
            name: "pair",
            type: "pragma::entry::structs::Pair",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "add_pair",
        type: "function",
        inputs: [
          {
            name: "new_pair",
            type: "pragma::entry::structs::Pair",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "get_pair",
        type: "function",
        inputs: [
          {
            name: "pair_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "pragma::entry::structs::Pair",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "set_checkpoint",
        type: "function",
        inputs: [
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "set_checkpoints",
        type: "function",
        inputs: [
          {
            name: "data_types",
            type: "core::array::Span::<pragma::entry::structs::DataType>",
          },
          {
            name: "aggregation_mode",
            type: "pragma::entry::structs::AggregationMode",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "remove_source",
        type: "function",
        inputs: [
          {
            name: "source",
            type: "core::felt252",
          },
          {
            name: "data_type",
            type: "pragma::entry::structs::DataType",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "set_sources_threshold",
        type: "function",
        inputs: [
          {
            name: "threshold",
            type: "core::integer::u32",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "upgrade",
        type: "function",
        inputs: [
          {
            name: "impl_hash",
            type: "core::starknet::class_hash::ClassHash",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    name: "core::array::Span::<pragma::entry::structs::Currency>",
    type: "struct",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<pragma::entry::structs::Currency>",
      },
    ],
  },
  {
    name: "core::array::Span::<pragma::entry::structs::Pair>",
    type: "struct",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<pragma::entry::structs::Pair>",
      },
    ],
  },
  {
    name: "constructor",
    type: "constructor",
    inputs: [
      {
        name: "admin_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "publisher_registry_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "currencies",
        type: "core::array::Span::<pragma::entry::structs::Currency>",
      },
      {
        name: "pairs",
        type: "core::array::Span::<pragma::entry::structs::Pair>",
      },
    ],
  },
  {
    kind: "struct",
    name: "pragma::oracle::oracle::Oracle::UpdatedPublisherRegistryAddress",
    type: "event",
    members: [
      {
        kind: "data",
        name: "old_publisher_registry_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "new_publisher_registry_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "struct",
    name: "pragma::oracle::oracle::Oracle::SubmittedSpotEntry",
    type: "event",
    members: [
      {
        kind: "data",
        name: "spot_entry",
        type: "pragma::entry::structs::SpotEntry",
      },
    ],
  },
  {
    kind: "struct",
    name: "pragma::oracle::oracle::Oracle::SubmittedFutureEntry",
    type: "event",
    members: [
      {
        kind: "data",
        name: "future_entry",
        type: "pragma::entry::structs::FutureEntry",
      },
    ],
  },
  {
    kind: "struct",
    name: "pragma::oracle::oracle::Oracle::SubmittedGenericEntry",
    type: "event",
    members: [
      {
        kind: "data",
        name: "generic_entry",
        type: "pragma::entry::structs::GenericEntry",
      },
    ],
  },
  {
    kind: "struct",
    name: "pragma::oracle::oracle::Oracle::SubmittedCurrency",
    type: "event",
    members: [
      {
        kind: "data",
        name: "currency",
        type: "pragma::entry::structs::Currency",
      },
    ],
  },
  {
    kind: "struct",
    name: "pragma::oracle::oracle::Oracle::UpdatedCurrency",
    type: "event",
    members: [
      {
        kind: "data",
        name: "currency",
        type: "pragma::entry::structs::Currency",
      },
    ],
  },
  {
    kind: "struct",
    name: "pragma::oracle::oracle::Oracle::UpdatedPair",
    type: "event",
    members: [
      {
        kind: "data",
        name: "pair",
        type: "pragma::entry::structs::Pair",
      },
    ],
  },
  {
    kind: "struct",
    name: "pragma::oracle::oracle::Oracle::SubmittedPair",
    type: "event",
    members: [
      {
        kind: "data",
        name: "pair",
        type: "pragma::entry::structs::Pair",
      },
    ],
  },
  {
    kind: "struct",
    name: "pragma::oracle::oracle::Oracle::CheckpointSpotEntry",
    type: "event",
    members: [
      {
        kind: "data",
        name: "pair_id",
        type: "core::felt252",
      },
      {
        kind: "data",
        name: "checkpoint",
        type: "pragma::entry::structs::Checkpoint",
      },
    ],
  },
  {
    kind: "struct",
    name: "pragma::oracle::oracle::Oracle::CheckpointFutureEntry",
    type: "event",
    members: [
      {
        kind: "data",
        name: "pair_id",
        type: "core::felt252",
      },
      {
        kind: "data",
        name: "expiration_timestamp",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "checkpoint",
        type: "pragma::entry::structs::Checkpoint",
      },
    ],
  },
  {
    kind: "struct",
    name: "pragma::oracle::oracle::Oracle::ChangedAdmin",
    type: "event",
    members: [
      {
        kind: "data",
        name: "new_admin",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "enum",
    name: "pragma::oracle::oracle::Oracle::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "UpdatedPublisherRegistryAddress",
        type: "pragma::oracle::oracle::Oracle::UpdatedPublisherRegistryAddress",
      },
      {
        kind: "nested",
        name: "SubmittedSpotEntry",
        type: "pragma::oracle::oracle::Oracle::SubmittedSpotEntry",
      },
      {
        kind: "nested",
        name: "SubmittedFutureEntry",
        type: "pragma::oracle::oracle::Oracle::SubmittedFutureEntry",
      },
      {
        kind: "nested",
        name: "SubmittedGenericEntry",
        type: "pragma::oracle::oracle::Oracle::SubmittedGenericEntry",
      },
      {
        kind: "nested",
        name: "SubmittedCurrency",
        type: "pragma::oracle::oracle::Oracle::SubmittedCurrency",
      },
      {
        kind: "nested",
        name: "UpdatedCurrency",
        type: "pragma::oracle::oracle::Oracle::UpdatedCurrency",
      },
      {
        kind: "nested",
        name: "UpdatedPair",
        type: "pragma::oracle::oracle::Oracle::UpdatedPair",
      },
      {
        kind: "nested",
        name: "SubmittedPair",
        type: "pragma::oracle::oracle::Oracle::SubmittedPair",
      },
      {
        kind: "nested",
        name: "CheckpointSpotEntry",
        type: "pragma::oracle::oracle::Oracle::CheckpointSpotEntry",
      },
      {
        kind: "nested",
        name: "CheckpointFutureEntry",
        type: "pragma::oracle::oracle::Oracle::CheckpointFutureEntry",
      },
      {
        kind: "nested",
        name: "ChangedAdmin",
        type: "pragma::oracle::oracle::Oracle::ChangedAdmin",
      },
    ],
  },
] as const satisfies Abi;

export { beastsAbi, ethAbi, gameAbi, lordsAbi, pragmaAbi };
