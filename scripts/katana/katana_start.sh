#!/bin/bash

# clear out previous .env file
echo '' >/katana/.env

# source bashrc
source ~/.bashrc

# Start katana in the background
/root/.dojo/bin/katana --disable-fee --allowed-origins "*" --block-time 10000 --seed 0x6c6f6f747375727669766f72 --accounts 10 --json-log --db-dir /katana/db >~/katana.log 2>&1 &

# Give katana a few seconds to initialize and log seed accounts
sleep 3

# init starkli env vars
export STARKNET_RPC="http:127.0.0.1:5050"
export STARKLI_NO_PLAIN_KEY_WARNING="true"
export STARKNET_ACCOUNT="/katana/starkli_account"

# we don't need any of these contracts for core functionality on katana
dao_address=0
pg_address=0
lords_contract=0
beasts_address=0
golden_token_address=0
terminal_timestamp=0
randomness_contract=0
oracle_address=0
renderer_address=0
golden_token_id="0 0"
eth_contract=0
qualifying_collections=0
launch_promotion_end_timestamp=0
vrf_premiums_address=0
launch_tournament_duration_seconds=0
launch_tournament_games_per_collection=0
start_delay_seconds=0
free_vrf_promotion_duration_seconds=0

# extract account details from katana logs
output=$(head -n 1 ~/katana.log | jq -r '.fields.message | fromjson | .accounts[0] | .[0], .[-1].private_key')
account_address=$(echo "$output" | head -n 1)
private_key=$(echo "$output" | tail -n 1)

# fetch katana account for easy usage with starkli
starkli account fetch --force --output /katana/starkli_account $account_address

# declare contract
game_class_hash=$(starkli declare --watch /root/loot-survivor/target/dev/game_Game.contract_class.json --private-key $private_key --compiler-version 2.7.1 2>/dev/null)

# deploy game
game_contract=$(starkli deploy --watch $game_class_hash $lords_contract $eth_contract $dao_address $pg_address $beasts_address $golden_token_address $terminal_timestamp $randomness_contract $oracle_address $renderer_contract $qualifying_collections $launch_promotion_end_timestamp $vrf_premiums_address $launch_tournament_duration_seconds $launch_tournament_games_per_collection $start_delay_seconds $free_vrf_promotion_duration_seconds --account $STARKNET_ACCOUNT --private-key $private_key --max-fee 0.01 2>/dev/null)

# Export game_contract and private key and publish to .bashrc
export game_contract
export private_key
echo "export game_contract=$game_contract" >>~/.bashrc
echo "export private_key=$private_key" >>~/.bashrc

# Append the game_contract value to katana.log
echo "Game contract deployed at: $game_contract" >>~/katana.log

# write account, private key, and game contract to shared volume for easy access from hos
echo "$account_address" >/katana/katana_account
echo "$private_key" >/katana/private_key
echo "$game_contract" >/katana/game_contract

# # Write environment variables to /env-katana
echo 'MONGO_CONNECTION_STRING="mongodb://test:test@mongo:27017"' >/katana/.env
echo 'MONGO_DB="mongo"' >>/katana/.env
echo 'AUTH_TOKEN="dna_jX3t04zs9zywBnHWVmUq"' >>/katana/.env
echo 'MONGO_USERNAME="test"' >>/katana/.env
echo 'MONGO_PASSWORD="test"' >>/katana/.env
echo 'STREAM_URL="http://dna:7171"' >>/katana/.env
echo 'START=0' >>/katana/.env
echo "GAME=$game_contract" >>/katana/.env

# Keep the script running
tail -f ~/katana.log
