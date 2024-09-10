#!/bin/bash

dao_address=0x049FB4281D13E1f5f488540Cd051e1507149E99CC2E22635101041Ec5E4e4557

pg_address=0x036cE487952f25878a0158bA4A0C2Eb5eb66f0282567163a4B893A0EA5847D2d

lords_contract=0x0124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49

beasts_address=0x0158160018d590d93528995b340260e65aedd76d28a686e9daa5c4e8fad0c5dd

golden_token_address=0x04f5e296c805126637552cf3930e857f380e7c078e8f00696de4fc8545356b1d

terminal_timestamp=1725897600

randomness_contract=0x4fb09ce7113bbdf568f225bc757a29cb2b72959c21ca63a7d59bdb9026da661

oracle_address=0x2a85bd616f912537c50a49a4076db02c00b29b2cdc8a197ce92ed1837fa875b

eth_contract=0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7

num_qualifying_collections=8

bloberts_address=0x00539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1
blobert_claims_per_token=1

influence_address=0x0241B9c4Ce12C06F49fee2EC7C16337386fA5185168F538A7631aACECdf3Df74
influence_claims_per_token=1

ducks_address=0x058949fa2955b10b3a82521934e8b0505dc0b7ba929c3049622ae91d2c52e194
duck_claims_per_token=6

everai_address=0x02acee8c430f62333cf0e0e7a94b2347b5513b4c25f699461dd8d7b23c072478
everai_claims_per_token=2

pixel_banners_address=0x02d66679de61a5c6d57afd21e005a8c96118bd60315fd79a4521d68f5e5430d1
pixel_banners_claims_per_token=1

realms_address=0x07ae27a31bb6526e3de9cf02f081f6ce0615ac12a6d7b85ee58b8ad7947a2809
realms_claims_per_token=1

focus_tree_address=0x0377c2d65debb3978ea81904e7d59740da1f07412e30d01c5ded1c5d6f1ddc43
focus_tree_claims_per_token=1

syndicate_address=0x065a413ce0b5c169c583c7efad857913523485f1febcf5ef4f3909133f04904a
syndicate_claims_per_token=1

qualifying_collections="$num_qualifying_collections $bloberts_address $blobert_claims_per_token $influence_address $influence_claims_per_token $ducks_address $duck_claims_per_token $everai_address $everai_claims_per_token $pixel_banners_address $pixel_banners_claims_per_token $realms_address $realms_claims_per_token $focus_tree_address $focus_tree_claims_per_token $syndicate_address $syndicate_claims_per_token"

pragma_multisig=0x02d10bBF2cC27a2404E4E1dB2B2FBCf26B0Aa8BDaF3de16e0BfEE12699bc337a

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// TODO: UPDATE THESE SETTINGS BEFORE FULL RELEASE
launch_tournament_duration_seconds=2592000 // 30 days
launch_tournament_games_per_collection=1600 
game_start_delay=14400 // 4hrs
free_vrf_promotion_duration_seconds=604800
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# Source env vars
ENV_FILE="/workspaces/loot-survivor/.env"
source $ENV_FILE

# build game contract
cd /workspaces/loot-survivor/contracts/
scarb build

# declare renderer contract
starkli declare --watch /workspaces/loot-survivor/target/dev/game_RenderContract.contract_class.json

# declare game contract
game_class_hash=$(starkli declare --watch /workspaces/loot-survivor/target/dev/game_Game.contract_class.json --account $STARKNET_ACCOUNT --private-key $PRIVATE_KEY 2>/dev/null)

# deploy renderer
renderer_contract=$(starkli deploy --watch $renderer_class_hash --account $STARKNET_ACCOUNT --private-key $PRIVATE_KEY --max-fee 0.01 2>/dev/null)

# deploy game
game_contract=$(starkli deploy --watch $game_class_hash $lords_contract $eth_contract $dao_address $pg_address $beasts_address $golden_token_address $terminal_timestamp $randomness_contract $oracle_address $renderer_contract $qualifying_collections $launch_tournament_duration_seconds $pragma_multisig $launch_tournament_games_per_collection $game_start_delay $free_vrf_promotion_duration_seconds --account $STARKNET_ACCOUNT --private-key $PRIVATE_KEY --max-fee 0.01 2>/dev/null)
