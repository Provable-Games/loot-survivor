ENV_FILE="/Users/supsam/Documents/code/anon/provable-games/loot-survivor/.env"

# If there is already an account in .env, skip that
if grep -q "^ACCOUNT_ADDRESS=" "$ENV_FILE"; then
    echo "Account already setup, exiting"
    exit
fi

# default to sepolia testnet
echo "STARKNET_NETWORK=\"sepolia\"" >> $ENV_FILE
export STARKNET_NETWORK="sepolia"

# initialize starknet directories
mkdir -p $HOME/.starknet
STARKNET_ACCOUNT=$HOME/.starknet/account
STARKNET_KEYSTORE=$HOME/.starknet/keystore

# Change directory to starkli
cd $HOME/.starkli/bin/

# Generate keypair
output=$(./starkli signer gen-keypair)

# Store keys as vars so we can use them and later write to .bashrc
private_key=$(echo "$output" | awk '/Private key/ {print $4}')
public_key=$(echo "$output" | awk '/Public key/ {print $4}')

# Initialize OZ account and save output
account_output=$(./starkli account oz init $STARKNET_ACCOUNT --private-key $private_key 2>&1)
account_address=$(echo "$account_output" | grep -oE '0x[0-9a-fA-F]+')

# Deploy Account
./starkli account deploy $STARKNET_ACCOUNT --private-key $private_key

# Output key and account info
echo "Private Key:  $private_key"
echo "Public Key:   $public_key"
echo "Account:      $account_address"

# Add keys and account to .bashrc as env vars for easy access in shell
echo "PRIVATE_KEY=\"$private_key\"" >> $ENV_FILE
echo "PUBLIC_KEY=\"$public_key\"" >> $ENV_FILE
echo "ACCOUNT_ADDRESS=\"$account_address\"" >> $ENV_FILE
echo "STARKNET_ACCOUNT=$STARKNET_ACCOUNT" >> $ENV_FILE
echo "STARKNET_KEYSTORE=$STARKNET_KEYSTORE" >> $ENV_FILE

echo "set -o allexport" >> ~/.bashrc
echo "source $ENV_FILE" >> ~/.bashrc
echo "set +o allexport" >> ~/.bashrc

source ~/.bashrc