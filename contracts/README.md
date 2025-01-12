# Contracts

### Commands

- Build contracts - `scarb build`
- Run tests - `snforge test`
- Open file with Starknet accounts - `code /c/Users/kiv1n/.starknet_accounts/starknet_open_zeppelin_accounts.json`
- Deckare a contract - `sncast --account account_1 declare --url http://127.0.0.1:5055 --contract-name HelloStarknet`
- Deploy a contract - `sncast --account account_1 deploy --url http://127.0.0.1:5055 --class-hash 0x0227f52a4d2138816edf8231980d5f9e6e0c8a3deab45b601a1fcee3d4427b02`
- Invoke a contract - `sncast --account account_1 invoke --url http://127.0.0.1:5055 --contract-address 0x02c7b237e4eb1f4ef609b42046b42e1b425cf2028e9169f594e4a887a1f1fb15 --function "increase_balance" --arguments 42`
- Call a contract - `sncast call --url http://127.0.0.1:5055 --contract-address 0x02c7b237e4eb1f4ef609b42046b42e1b425cf2028e9169f594e4a887a1f1fb15 --function "get_balance"`
