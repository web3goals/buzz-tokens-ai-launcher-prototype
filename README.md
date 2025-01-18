![Cover](/cover.png)

# 🐝 Buzz Tokens AI Launcher

AI agent that finds ideas for meme or AI tokens based on the hottest news and helps you launch those tokens in a few clicks.

## ✨ Features

- Connect Argent Telegram wallet.
- Receive token ideas via Telegram bot.
- Launch a token in a few clicks.
- View token TVL, holder numbers, price change, etc,
- View a chart of token price.
- Swap a token.

## 🛠️ Technologies

- [Starknet](https://www.starknet.io/) is used as a blockchain to deploy and trade tokens created by users.
- [Argent](https://argent.xyz/) is used as a provider of the Starknet wallet in the Telegram ecosystem.
- [Alchemy](https://www.alchemy.com/) is used as an RPC provider that connects the application to the Starknet network.
- [OpenAI](https://openai.com/) and [News API](https://newsapi.org/) are used to build an AI agent that analyzes news and finds ideas for tokens.

## 🔗 Artifacts

- Application - [buzz-tokens-ai-launcher.vercel.app](https://buzz-tokens-ai-launcher.vercel.app/)
- Telegram bot & Telegram application - [@buzz_tokens_ai_launcher_bot](https://t.me/buzz_tokens_ai_launcher_bot)
  - ⚠️ Works only in Telegram [test environment](https://core.telegram.org/bots/webapps#testing-mini-apps).
  - ⚠️ Requires to [set up](https://www.npmjs.com/package/@argent/tma-wallet) Argent Telegram wallet.
- Contracts (Starknet Sepolia):
  - ERC20 Factory - [0x035be5ee5d95dbce0b1bd9dfdaab1c49ff6cca523ed834bce814d4f343accd22](https://sepolia.voyager.online/contract/0x035be5ee5d95dbce0b1bd9dfdaab1c49ff6cca523ed834bce814d4f343accd22)

## 🏗️ Architecture

![Architecture](/Architecture.png)
