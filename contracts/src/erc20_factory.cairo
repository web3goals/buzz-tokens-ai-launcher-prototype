pub use starknet::{ContractAddress, ClassHash};

#[starknet::interface]
pub trait IERC20Factory<TContractState> {
    fn create_erc20(
        ref self: TContractState,
        name: felt252,
        name_len: usize,
        symbol: felt252,
        symbol_len: usize,
        supply: usize,
    ) -> ContractAddress;

    fn get_erc20_class_hash(ref self: TContractState) -> ClassHash;

    fn set_erc20_class_hash(ref self: TContractState, erc20_class_hash: ClassHash);
}

#[starknet::contract]
pub mod ERC20Factory {
    use starknet::{ContractAddress, get_caller_address, ClassHash, syscalls::deploy_syscall};
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};

    #[storage]
    struct Storage {
        erc20_class_hash: ClassHash,
    }

    #[event]
    #[derive(Copy, Drop, Debug, PartialEq, starknet::Event)]
    pub enum Event {
        ERC20Created: ERC20Created,
    }

    #[derive(Copy, Drop, Debug, PartialEq, starknet::Event)]
    pub struct ERC20Created {
        pub creator: ContractAddress,
        pub erc20: ContractAddress,
    }

    #[constructor]
    fn constructor(ref self: ContractState, erc20_class_hash: ClassHash) {
        self.erc20_class_hash.write(erc20_class_hash);
    }

    #[abi(embed_v0)]
    impl Factory of super::IERC20Factory<ContractState> {
        fn create_erc20(
            ref self: ContractState,
            name: felt252,
            name_len: usize,
            symbol: felt252,
            symbol_len: usize,
            supply: usize,
        ) -> ContractAddress {
            // Define caller
            let caller = get_caller_address();

            // Define constructor arguments
            let mut constructor_calldata: Array::<felt252> = array![
                name, name_len.into(), symbol, symbol_len.into(), supply.into(), caller.into(),
            ];

            // Deploy contract
            let (deployed_address, _) = deploy_syscall(
                self.erc20_class_hash.read(), 0, constructor_calldata.span(), false,
            )
                .unwrap();

            // Emit event
            self
                .emit(
                    Event::ERC20Created(ERC20Created { creator: caller, erc20: deployed_address }),
                );

            deployed_address
        }

        fn get_erc20_class_hash(ref self: ContractState) -> ClassHash {
            self.erc20_class_hash.read()
        }
        fn set_erc20_class_hash(ref self: ContractState, erc20_class_hash: ClassHash) {
            self.erc20_class_hash.write(erc20_class_hash);
        }
    }
}
