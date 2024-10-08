#!/bin/bash

lords_cairo_string=0x6c6f726473
initial_supply=10000000000000000
dao_address=0x06a519DCcd7Ed4D1aACD3975691AEEae47bF7f9F5b62Ed7C2D929D2E27A9CC5E
pg_address=0x0346ffd70958b6c8A00Fe49d69A7710b99A8Fa56Cfa574619F5587F772499354
lords_contract=0x064fd80fcb41d00214430574a0aa19d21cc5d6452aeb4996f31b6e9ba4f466a0
beasts_address=0x041b6ffc02ce30c6e941f1b34244ef8af0b3e8a70f5528476a7a68765afd6b39
golden_token_address=0x06a519DCcd7Ed4D1aACD3975691AEEae47bF7f9F5b62Ed7C2D929D2E27A9CC5E
terminal_timestamp=0
randomness_contract=0x60c69136b39319547a4df303b6b3a26fab8b2d78de90b6bd215ce82e9cb515c
randomness_rotation_interval=1
oracle_address=0x36031daa264c24520b11d93af622c848b2499b66b41d611bac95e13cfca131a
client_reward_address=0x06a519DCcd7Ed4D1aACD3975691AEEae47bF7f9F5b62Ed7C2D929D2E27A9CC5E
starting_weapon=12
player_name=0x706c6179657231
golden_token_id="0 0"
interface_camel=0
vrf_fee_limit=5000000000000000
eth_contract=0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
custom_renderer=0x0
qualifying_collections="3 0x07c006181ea9cc7dd1b09c29e9ff23112be30ecfef73b760fabe5bc7ae6ecb44 1 0x04efe851716110abeee81b7f22f7964845355ffa32e6833fc3a557a1881721ac 2 0x04a79a62dc260f2e9e4b208181b2014c14f3ff44fe7d0e6452a759ed91a106d1 3"
vrf_premiums_address=0x06a519DCcd7Ed4D1aACD3975691AEEae47bF7f9F5b62Ed7C2D929D2E27A9CC5E
launch_tournament_duration_seconds=86400
launch_tournament_games_per_collection=300
launch_tournament_winner_token_id=0
start_delay_seconds=3600
free_vrf_promotion_duration_seconds=604800
mint_to=0

# Source env vars
ENV_FILE="/workspaces/loot-survivor/.env"
source $ENV_FILE

# build game contract
cd /workspaces/loot-survivor/contracts/
scarb build

# declare renderer contract
renderer_class_hash=$(starkli declare --watch /workspaces/loot-survivor/target/dev/game_RenderContract.contract_class.json --account $STARKNET_ACCOUNT --private-key $PRIVATE_KEY 2>/dev/null)

# declare game contract
game_class_hash=$(starkli declare --watch /workspaces/loot-survivor/target/dev/game_Game.contract_class.json --account $STARKNET_ACCOUNT --private-key $PRIVATE_KEY 2>/dev/null)

# deploy renderer
renderer_contract=$(starkli deploy --watch $renderer_class_hash --account $STARKNET_ACCOUNT --private-key $PRIVATE_KEY --max-fee 0.01 2>/dev/null)

# deploy game
game_contract=$(starkli deploy --watch $game_class_hash $lords_contract $eth_contract $dao_address $pg_address $beasts_address $golden_token_address $terminal_timestamp $randomness_contract $oracle_address $renderer_contract $qualifying_collections $launch_tournament_duration_seconds $vrf_premiums_address $launch_tournament_games_per_collection $start_delay_seconds $free_vrf_promotion_duration_seconds --account $STARKNET_ACCOUNT --private-key $PRIVATE_KEY --max-fee 0.01 2>/dev/null)

# mint lords
echo "minting lords"
starkli invoke --watch $lords_contract mint_lords $ACCOUNT_ADDRESS 1000000000000000000000 0 --account $STARKNET_ACCOUNT --private-key $PRIVATE_KEY --max-fee 0.01 2>/dev/null

# give game contract approval to spent lords
echo "approving game contract to spend lords"
starkli invoke --watch $lords_contract approve $game_contract 1000000000000000000000 0 --account $STARKNET_ACCOUNT --private-key $PRIVATE_KEY --max-fee 0.01 2>/dev/null

# transfer eth to game contract so it can pay for VRF
echo "transfering eth to game contract"
starkli invoke --watch $eth_contract transfer $game_contract 50000000000000000 0 --account $STARKNET_ACCOUNT --private-key $PRIVATE_KEY --max-fee 0.01 2>/dev/null

# start new game
echo "starting new game"
starkli invoke --watch $game_contract new_game $client_reward_address $starting_weapon $player_name $golden_token_id $interface_camel $vrf_fee_limit $custom_renderer $launch_tournament_winner_token_id $mint_to --account $STARKNET_ACCOUNT --private-key $PRIVATE_KEY --max-fee 0.01 2>/dev/null

#output contracts and export contract vars
echo "game contract: " $game_contract
echo "lords contract: " $lords_contract
export game_contract
export lords_contract
