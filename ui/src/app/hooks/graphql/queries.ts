import { gql } from "@apollo/client";

const ADVENTURER_FIELDS = `
  id
  owner
  entropy
  name
  health
  strength
  dexterity
  vitality
  intelligence
  wisdom
  charisma
  luck
  xp
  weapon
  chest
  head
  waist
  foot
  hand
  neck
  ring
  beastHealth
  statUpgrades
  birthDate
  deathDate
  goldenTokenId
  customRenderer
  battleActionCount
  gold
  createdTime
  lastUpdatedTime
  timestamp
`;

const ADVENTURERS_FRAGMENT = `
  fragment AdventurerFields on Adventurer {
    ${ADVENTURER_FIELDS}
  }
`;

const BATTLE_FIELDS = `
  adventurerId
  adventurerHealth
  beast
  beastHealth
  beastLevel
  special1
  special2
  special3
  seed
  attacker
  fled
  damageDealt
  damageTaken
  criticalHit
  damageLocation
  xpEarnedAdventurer
  xpEarnedItems
  goldEarned
  txHash
  blockTime
  timestamp
`;

const BATTLES_FRAGMENT = `
  fragment BattleFields on Battle {
    ${BATTLE_FIELDS}
  }
`;

const ITEM_FIELDS = `
  item
  adventurerId
  ownerAddress
  owner
  equipped
  purchasedTime
  special1
  special2
  special3
  xp
  isAvailable
  timestamp
`;

const ITEMS_FRAGMENT = `
  fragment ItemFields on Item {
    ${ITEM_FIELDS}
  }
`;

const DISCOVERY_FIELDS = `
  adventurerId
  adventurerHealth
  discoveryType
  subDiscoveryType
  outputAmount
  obstacle
  obstacleLevel
  dodgedObstacle
  damageTaken
  damageLocation
  xpEarnedAdventurer
  xpEarnedItems
  entity
  entityLevel
  entityHealth
  special1
  special2
  special3
  seed
  ambushed
  discoveryTime
  txHash
  timestamp
`;

const DISCOVERIES_FRAGMENT = `
  fragment DiscoveryFields on Discovery {
    ${DISCOVERY_FIELDS}
  }
`;

const BEAST_FIELDS = `
  adventurerId
  beast
  createdTime
  health
  lastUpdatedTime
  level
  tier
  power
  seed
  slainOnTime
  special1
  special2
  special3
  timestamp
`;

const BEASTS_FRAGMENT = `
  fragment BeastFields on Beast {
    ${BEAST_FIELDS}
  }
`;

const SCORE_FIELDS = `
  adventurerId
  timestamp
  totalPayout
`;

const SCORES_FRAGMENT = `
  fragment ScoreFields on Score {
    ${SCORE_FIELDS}
  }
`;

const GOLDEN_TOKEN_FIELDS = `
  contract_address
  id
  image
  name
  owner
  token_id
`;

const GOLDEN_TOKEN_FRAGMENT = `
  fragment GoldenTokenFields on ERC721Tokens {
    ${GOLDEN_TOKEN_FIELDS}
  }
`;

const getLatestDiscoveries = gql`
  ${DISCOVERIES_FRAGMENT}
  query getLatestDiscoveries($id: FeltValue) {
    discoveries(
      where: { adventurerId: { eq: $id } }
      limit: 10
      orderBy: { timestamp: { desc: true } }
    ) {
      ...DiscoveryFields
    }
  }
`;

const getLastBeastDiscovery = gql`
  ${DISCOVERIES_FRAGMENT}
  query get_last_beast_query($id: FeltValue) {
    discoveries(
      where: { adventurerId: { eq: $id }, entityLevel: { gt: 0 } }
      limit: 1
      orderBy: { timestamp: { desc: true } }
    ) {
      ...DiscoveryFields
    }
  }
`;

const getAdventurersByOwner = gql`
  ${ADVENTURERS_FRAGMENT}
  query get_adventurers_by_owner(
    $owner: HexValue
    $skip: Int
    $health: FeltValue
    $birthDate: FeltValue
  ) {
    adventurers(
      where: {
        owner: { eq: $owner }
        health: { gte: $health }
        birthDate: { gt: $birthDate }
      }
      limit: 10
      skip: $skip
      orderBy: { id: { asc: true } }
    ) {
      ...AdventurerFields
    }
  }
`;

const getAdventurersByOwnerCount = gql`
  query get_adventurers_by_owner_count($owner: HexValue) {
    countTotalAdventurers(owner: $owner)
  }
`;

const getAdventurerById = gql`
  ${ADVENTURERS_FRAGMENT}
  query get_adventurer_by_id($id: FeltValue) {
    adventurers(where: { id: { eq: $id } }) {
      ...AdventurerFields
    }
  }
`;

const getAdventurersInList = gql`
  ${ADVENTURERS_FRAGMENT}
  query get_adventurer_by_id($ids: [FeltValue!]) {
    adventurers(where: { id: { In: $ids } }, limit: 10) {
      ...AdventurerFields
    }
  }
`;

const getAdventurersInListByXP = gql`
  ${ADVENTURERS_FRAGMENT}
  query get_adventurer_by_id($ids: [FeltValue!]) {
    adventurers(
      where: { id: { In: $ids } }
      limit: 1000
      orderBy: { xp: { desc: true } }
    ) {
      ...AdventurerFields
    }
  }
`;

const getDeadAdventurersByXPPaginated = gql`
  ${ADVENTURERS_FRAGMENT}
  query get_dead_adventurers_by_xp_paginated($skip: Int) {
    adventurers(
      where: { health: { eq: 0 } }
      limit: 10
      skip: $skip
      orderBy: { xp: { desc: true } }
    ) {
      ...AdventurerFields
    }
  }
`;

const getAliveAdventurersByXPPaginated = gql`
  ${ADVENTURERS_FRAGMENT}
  query get_alive_adventurers_by_xp_paginated($skip: Int) {
    adventurers(
      where: { health: { notIn: [0] } }
      limit: 10
      skip: $skip
      orderBy: { xp: { desc: true } }
    ) {
      ...AdventurerFields
    }
  }
`;

const getBeast = gql`
  ${BEASTS_FRAGMENT}
  query get_beast_by_id(
    $beast: BeastValue
    $adventurerId: FeltValue
    $seed: HexValue
  ) {
    beasts(
      where: {
        beast: { eq: $beast }
        adventurerId: { eq: $adventurerId }
        seed: { eq: $seed }
      }
    ) {
      ...BeastFields
    }
  }
`;

const getKilledBeasts = gql`
  ${BEASTS_FRAGMENT}
  query get_killed_beasts {
    beasts(
      where: { health: { eq: 0 } }
      limit: 10
      orderBy: { power: { desc: true } }
    ) {
      ...BeastFields
    }
  }
`;

const getDiscoveriesAndBattlesByAdventurerPaginated = gql`
  query getDiscoveryBattleCount($adventurerId: FeltValue, $skip: Int) {
    discoveriesAndBattles(
      limit: 10
      skip: $skip
      where: { adventurerId: { eq: $adventurerId } }
    ) {
      data {
        ... on Discovery {
          adventurerId
          adventurerHealth
          discoveryType
          subDiscoveryType
          outputAmount
          obstacle
          obstacleLevel
          dodgedObstacle
          damageTaken
          damageLocation
          xpEarnedAdventurer
          xpEarnedItems
          entity
          entityLevel
          entityHealth
          special1
          special2
          special3
          seed
          ambushed
          discoveryTime
          txHash
          timestamp
        }
        ... on Battle {
          adventurerId
          adventurerHealth
          beast
          beastHealth
          beastLevel
          special1
          special2
          special3
          seed
          attacker
          fled
          damageDealt
          damageTaken
          criticalHit
          damageLocation
          xpEarnedAdventurer
          xpEarnedItems
          goldEarned
          txHash
          blockTime
          timestamp
        }
      }
    }
  }
`;

const getBattlesByBeast = gql`
  ${BATTLES_FRAGMENT}
  query get_battles_by_beast(
    $adventurerId: FeltValue
    $beast: BeastValue
    $seed: HexValue
  ) {
    battles(
      where: {
        adventurerId: { eq: $adventurerId }
        beast: { eq: $beast }
        seed: { eq: $seed }
      }
      orderBy: { timestamp: { desc: true } }
    ) {
      ...BattleFields
    }
  }
`;

const getLatestMarketItems = gql`
  ${ITEMS_FRAGMENT}
  query get_latest_market_items($id: FeltValue) {
    items(
      where: { adventurerId: { eq: $id }, isAvailable: { eq: true } }
      limit: 100000
    ) {
      ...ItemFields
    }
  }
`;

const getItemsByAdventurer = gql`
  ${ITEMS_FRAGMENT}
  query get_items_by_adventurer($id: FeltValue) {
    items(
      where: { adventurerId: { eq: $id }, owner: { eq: true } }
      limit: 101
    ) {
      ...ItemFields
    }
  }
`;

const getScoresInList = gql`
  ${SCORES_FRAGMENT}
  query get_top_scores($ids: [FeltValue!]) {
    scores(where: { adventurerId: { In: $ids } }, limit: 10) {
      ...ScoreFields
    }
  }
`;

const getGoldenTokensByOwner = gql`
  ${GOLDEN_TOKEN_FRAGMENT}
  query getGoldenTokensByOwner($contractAddress: String!, $owner: String!) {
    getERC721Tokens(
      contract_address: $contractAddress
      cursor: 0
      limit: 101
      owner: $owner
    ) {
      ...GoldenTokenFields
    }
  }
`;

const getAdventurerCounts = gql`
  query getAdventurerCounts {
    countAliveAdventurers
    countDeadAdventurers
    countTotalAdventurers
  }
`;

const getAliveAdventurersCount = gql`
  query getAliveAdventurersCount($owner: HexValue, $birthDate: FeltValue) {
    countAliveAdventurers(owner: $owner, birthDate: $birthDate)
  }
`;

const getDiscoveryBattleCount = gql`
  query getDiscoveryBattleCount($adventurerId: Int) {
    countDiscoveriesAndBattles(adventurerId: $adventurerId)
  }
`;

const getAdventurerRank = gql`
  query getAdventurerRank($adventurerId: Int!, $adventurerXp: Int!) {
    adventurerRank(adventurerId: $adventurerId, adventurerXp: $adventurerXp) {
      rank
    }
  }
`;

const getCollectionsTotals = gql`
  query getCollectionsTotals {
    collectionTotals {
      collection
      gamesPlayed
      xp
    }
  }
`;

const getOwnerTokens = gql`
  query getOwnerTokens($token: HexValue, $owner: HexValue) {
    tokens(
      where: { token: { eq: $token }, nftOwnerAddress: { eq: $owner } }
      limit: 1000
    ) {
      hash
      nftOwnerAddress
      timestamp
      token
      tokenId
    }
  }
`;

const getTournamentGames = gql`
  query getTournamentGames($tournamentId: String) {
    lsTournamentsV0TournamentGameModels(
      where: { tournament_id: $tournamentId }
      limit: 1000
    ) {
      edges {
        node {
          tournament_id
          address
          game_id
        }
      }
    }
  }
`;

const getTournamentPrizes = gql`
  query getTournamentPrizes($tournamentId: String) {
    lsTournamentsV0TournamentPrizeModels(
      where: { tournament_id: $tournamentId }
      limit: 1000
      order: { field: PAYOUT_POSITION, direction: ASC }
    ) {
      edges {
        node {
          tournament_id
          prize_key
          payout_position
          token
          token_data_type {
            option
            erc20 {
              token_amount
            }
            erc721 {
              token_id
            }
          }
        }
      }
    }
  }
`;

const getTournament = gql`
  query getTournament($tournamentId: String) {
    lsTournamentsV0TournamentModels(where: { tournament_id: $tournamentId }) {
      edges {
        node {
          tournament_id
        }
      }
    }
  }
`;

const getBlobertlaimedFreeGames = gql`
  query getBlobertlaimedFreeGames($tokenIds: [FeltValue!]) {
    claimedFreeGames(
      where: {
        token: {
          eq: "0x539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1"
        }
        tokenId: { In: $tokenIds }
      }
      limit: 1000
    ) {
      token
      tokenId
      adventurerId
      gameOwnerAddress
      revealed
      hash
    }
  }
`;

export {
  getAdventurerById,
  getAdventurerCounts,
  getAdventurerRank,
  getAdventurersByOwner,
  getAdventurersByOwnerCount,
  getAdventurersInList,
  getAdventurersInListByXP,
  getAliveAdventurersByXPPaginated,
  getAliveAdventurersCount,
  getBattlesByBeast,
  getBeast,
  getBlobertlaimedFreeGames,
  getCollectionsTotals,
  getDeadAdventurersByXPPaginated,
  getDiscoveriesAndBattlesByAdventurerPaginated,
  getDiscoveryBattleCount,
  getGoldenTokensByOwner,
  getItemsByAdventurer,
  getKilledBeasts,
  getLastBeastDiscovery,
  getLatestDiscoveries,
  getLatestMarketItems,
  getOwnerTokens,
  getScoresInList,
  getTournament,
  getTournamentGames,
  getTournamentPrizes,
};
