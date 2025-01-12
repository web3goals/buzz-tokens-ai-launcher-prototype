use openzeppelin::token::erc20::ERC20ABIDispatcher;
use openzeppelin::token::erc20::ERC20ABIDispatcherTrait;

use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};
use starknet::{contract_address_const, ContractAddress};

#[test]
#[ignore]
fn test_deploy() {
    // Get caller address
    let caller: ContractAddress = contract_address_const::<'caller'>();
    println!("Caller: {:?}", caller);

    // Deploy contract
    let contract = declare("ERC20").unwrap().contract_class();
    let mut constructor_calldata = array!['Test Token', 10, 'TT', 2, 1000, caller.into()];
    let (contract_address, _) = contract.deploy(@constructor_calldata).unwrap();
    println!("Contract address: {:?}", contract_address);

    // Define contract dispatcher
    let dispatcher = ERC20ABIDispatcher { contract_address };

    // Test dispatcher
    let name = dispatcher.name();
    println!("Name: {:?}", name);
    let symbol = dispatcher.symbol();
    println!("Symbol: {:?}", symbol);

    let balance = dispatcher.balance_of(caller);
    print!("Balance: {:?}", balance);
}
