import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import Agent from "./lib/agent";

dotenv.config();

async function main() {
  console.log("Starting the bot...");

  // Create a new bot
  const bot = new TelegramBot(process.env.TOKEN as string, {
    polling: true,
    testEnvironment: true,
  });

  // Handle events
  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    // TODO: Save chat ID in database
    bot.sendMessage(chatId, `Hello, you will receive token ideas soon!`);
  });

  // Create a new agent
  const agent = new Agent(bot);
  agent.start();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
