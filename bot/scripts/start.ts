import dotenv from "dotenv";
import Agent from "./lib/agent";
import Bot from "./lib/bot";

dotenv.config();

async function main() {
  console.log("Starting...");

  // Create and start the bot
  const bot = new Bot();
  bot.start();

  // Create and start the agent
  const agent = new Agent(bot);
  agent.start();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
