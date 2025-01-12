use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};

use contracts::counter_factory::ICounterFactoryDispatcher;
use contracts::counter_factory::ICounterFactoryDispatcherTrait;
use contracts::simple_counter::ISimpleCounterDispatcher;
use contracts::simple_counter::ISimpleCounterDispatcherTrait;

#[test]
#[ignore]
fn test_create_counter() {
    // Deploy factory contract
    let factory_contract = declare("CounterFactory").unwrap().contract_class();
    let factory_constructor_data: Array::<core::felt252> = array![0, 0];
    let (factory_contract_address, _) = factory_contract.deploy(@factory_constructor_data).unwrap();
    println!("Factory contract address: {:?}", factory_contract_address);

    // Get factory dispatcher
    let factory_dispatcher = ICounterFactoryDispatcher {
        contract_address: factory_contract_address,
    };

    // Update factory init value
    let factory_init_value_before = factory_dispatcher.get_init_value();
    println!("Factory init value before: {:?}", factory_init_value_before);
    factory_dispatcher.update_init_value(42);
    let factory_init_value_after = factory_dispatcher.get_init_value();
    println!("Factory init value after: {:?}", factory_init_value_after);

    // Update factory counter class hash
    let simple_counter_contract = declare("SimpleCounter").unwrap().contract_class();
    let simple_counter_contract_class_hash = simple_counter_contract.class_hash;
    println!("SimpleCounter contract class hash: {:?}", simple_counter_contract_class_hash);
    factory_dispatcher.update_counter_class_hash(*simple_counter_contract_class_hash);
    let factory_counter_class_hash = factory_dispatcher.get_counter_class_hash();
    println!("Factory counter class hash: {:?}", factory_counter_class_hash);

    // Create counter using factory
    let counter_contract_addresss = factory_dispatcher.create_counter();
    println!("Counter contract address: {:?}", counter_contract_addresss);

    // Check created counter
    let counter_dispatcher = ISimpleCounterDispatcher {
        contract_address: counter_contract_addresss,
    };
    let counter_current_count_before = counter_dispatcher.get_current_count();
    println!("Counter current count before: {:?}", counter_current_count_before);
    counter_dispatcher.increment();
    let counter_current_count_after = counter_dispatcher.get_current_count();
    println!("Counter current count after: {:?}", counter_current_count_after);
}
