#[starknet::contract]
mod ERC20 {
    use openzeppelin::token::erc20::{ERC20Component, ERC20HooksEmptyImpl};
    use starknet::{ContractAddress};

    component!(path: ERC20Component, storage: erc20, event: ERC20Event);

    // ERC20 Mixin
    #[abi(embed_v0)]
    impl ERC20MixinImpl = ERC20Component::ERC20MixinImpl<ContractState>;
    impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        name: felt252,
        name_len: usize,
        symbol: felt252,
        symbol_len: usize,
        supply: usize,
        recipient: ContractAddress,
    ) {
        let mut name_byte_array: ByteArray = "";
        name_byte_array.append_word(name, name_len);

        let mut symbol_byte_array: ByteArray = "";
        symbol_byte_array.append_word(symbol, symbol_len);

        self.erc20.initializer(name_byte_array, symbol_byte_array);

        self.erc20.mint(recipient, supply.into());
    }
}
