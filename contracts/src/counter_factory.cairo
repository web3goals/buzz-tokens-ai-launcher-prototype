pub use starknet::{ContractAddress, ClassHash};

#[starknet::interface]
pub trait ICounterFactory<TContractState> {
    /// Create a new counter contract from stored arguments
    fn create_counter(ref self: TContractState) -> ContractAddress;

    /// Create a new counter contract from the given arguments
    fn create_counter_at(ref self: TContractState, init_value: u128) -> ContractAddress;

    fn get_init_value(ref self: TContractState) -> u128;

    fn get_counter_class_hash(ref self: TContractState) -> ClassHash;

    /// Update the argument
    fn update_init_value(ref self: TContractState, init_value: u128);

    /// Update the class hash of the Counter contract to deploy when creating a new counter
    fn update_counter_class_hash(ref self: TContractState, counter_class_hash: ClassHash);
}

#[starknet::contract]
pub mod CounterFactory {
    use starknet::{ContractAddress, ClassHash, syscalls::deploy_syscall};
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};

    #[storage]
    struct Storage {
        /// Store the constructor arguments of the contract to deploy
        init_value: u128,
        /// Store the class hash of the contract to deploy
        counter_class_hash: ClassHash,
    }

    #[constructor]
    fn constructor(ref self: ContractState, init_value: u128, class_hash: ClassHash) {
        self.init_value.write(init_value);
        self.counter_class_hash.write(class_hash);
    }

    #[abi(embed_v0)]
    impl Factory of super::ICounterFactory<ContractState> {
        fn create_counter_at(ref self: ContractState, init_value: u128) -> ContractAddress {
            // Constructor arguments
            let mut constructor_calldata: Array::<felt252> = array![init_value.into()];

            // Contract deployment
            let (deployed_address, _) = deploy_syscall(
                self.counter_class_hash.read(), 0, constructor_calldata.span(), false,
            )
                .unwrap();

            deployed_address
        }

        fn create_counter(ref self: ContractState) -> ContractAddress {
            self.create_counter_at(self.init_value.read())
        }

        fn get_init_value(ref self: ContractState) -> u128 {
            self.init_value.read()
        }

        fn get_counter_class_hash(ref self: ContractState) -> ClassHash {
            self.counter_class_hash.read()
        }

        fn update_init_value(ref self: ContractState, init_value: u128) {
            self.init_value.write(init_value);
        }

        fn update_counter_class_hash(ref self: ContractState, counter_class_hash: ClassHash) {
            self.counter_class_hash.write(counter_class_hash);
        }
    }
}
