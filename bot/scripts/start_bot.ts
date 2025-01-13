import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();

async function main() {
  console.log("🤖 Bot started");

  const bot = new TelegramBot(process.env.TOKEN as string, {
    polling: true,
    testEnvironment: true,
  });

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Welcome! How can I assist you today?");
  });

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    if (msg.text !== "/start") {
      bot.sendMessage(chatId, `You said: ${msg.text}`);
    }
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
