use core::{
    starknet::{ContractAddress},
};

#[starknet::interface]
trait IERC721Mint<TContractState> {
    fn mint(ref self: TContractState, to: ContractAddress);
}


#[starknet::contract]
mod MockNft {
    use core::{
        starknet::{ContractAddress},
    };
    use openzeppelin::token::erc721::{ERC721Component, ERC721HooksEmptyImpl};
    use openzeppelin::introspection::src5::SRC5Component;
    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);
    
    #[abi(embed_v0)]
    impl ERC721Impl = ERC721Component::ERC721Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721CamelOnly = ERC721Component::ERC721CamelOnlyImpl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721MetadataImpl = ERC721Component::ERC721MetadataImpl<ContractState>;
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        token_supply: u256,
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
    ) {
        let name = "DUCKSEVERYWHERE";
        let symbol = "DUCKS";
        let base_uri = "https://duckseverywhere.com/";
        self.erc721.initializer(name, symbol, base_uri);
    }

    #[abi(embed_v0)]
    impl Mint of super::IERC721Mint<ContractState> {
        fn mint(ref self: ContractState, to: ContractAddress) {
            let current_supply = self.token_supply.read();
            self.erc721.mint(to, current_supply);
            let new_supply = current_supply + 1;
            self.token_supply.write(new_supply);
        }
}
}
