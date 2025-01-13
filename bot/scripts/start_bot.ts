import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();

async function main() {
  console.log("🤖 Bot started");

  const bot = new TelegramBot(process.env.TOKEN as string, {
    polling: true,
    testEnvironment: true,
  });

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, "Received your message");
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
