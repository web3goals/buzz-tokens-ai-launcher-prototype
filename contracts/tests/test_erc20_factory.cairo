use contracts::erc20_factory::IERC20FactoryDispatcherTrait;
use openzeppelin::token::erc20::ERC20ABIDispatcher;
use openzeppelin::token::erc20::ERC20ABIDispatcherTrait;

use contracts::erc20_factory::IERC20FactoryDispatcher;

use snforge_std::{
    declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address_global, spy_events,
    EventSpyTrait,
};

use starknet::{contract_address_const, ContractAddress};

#[test]
// #[ignore]
fn test_create_erc20() {
    // Define caller address
    let caller: ContractAddress = contract_address_const::<'caller'>();
    println!("Caller: {:?}", caller);

    // Set global caller
    start_cheat_caller_address_global(caller);

    // Deploy factory contract
    let factory_contract = declare("ERC20Factory").unwrap().contract_class();
    let factory_constructor_data: Array::<felt252> = array![0];
    let (factory_contract_address, _) = factory_contract.deploy(@factory_constructor_data).unwrap();
    println!("Factory contract address: {:?}", factory_contract_address);

    // Get factory dispatcher
    let factory_dispatcher = IERC20FactoryDispatcher { contract_address: factory_contract_address };

    // Define ERC20 contract class hash
    let erc20_contract = declare("ERC20").unwrap().contract_class();
    let erc20_contract_class_hash = erc20_contract.class_hash;

    // Set factory ERC20 class hash
    factory_dispatcher.set_erc20_class_hash(*erc20_contract_class_hash);

    // Enable spy events
    let mut spy = spy_events();

    // Create ERC20 contract using factory
    let erc20_contract_address = factory_dispatcher.create_erc20('Test Token', 10, 'TT', 2, 1000);

    // let constructor_calldata: Array::<felt252> = array![
    //     'Test Token', 10.into(), 'TT', 2.into(), 1000,
    // ];
    // println!("Calldata {:?}", constructor_calldata);

    println!("ERC20 contract address: {:?}", erc20_contract_address);

    // Check events
    let events = spy.get_events();
    // println!("Events: {:?}", events.events);
    println!("Events len: {:?}", events.events.len());

    // Check balance
    let erc20_dispatcher = ERC20ABIDispatcher { contract_address: erc20_contract_address };
    let balance = erc20_dispatcher.balance_of(caller);
    println!("Balance: {:?}", balance);
}
