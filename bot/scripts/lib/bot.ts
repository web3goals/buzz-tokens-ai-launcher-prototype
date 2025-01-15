import TelegramBot from "node-telegram-bot-api";
import { findChats, insertChat } from "../db/services/chat-service";

export default class Bot {
  private bot: TelegramBot | undefined;

  constructor() {}

  public start() {
    try {
      console.log("Starting the bot...");

      // Create a Telegram bot
      const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN as string, {
        polling: true,
        testEnvironment: true,
      });

      // Handle bot events
      bot.on("message", (msg) => {
        const chatId = msg.chat.id;
        // Save the chat in the database
        insertChat({ id: chatId.toString(), createdTime: new Date() });
        // Send an info message
        // TODO: Add link to the web app
        bot.sendMessage(
          chatId,
          "As soon as the AI agent finds a cool idea to launch a token, you'll get a notification 🔔"
        );
      });

      this.bot = bot;
    } catch (error) {
      console.error(error);
    }
  }

  public async broadcastMessage(message: string) {
    if (!this.bot) {
      throw new Error("Bot is not initialized");
    }
    const chats = await findChats();
    for (let i = 0; i < chats.length; i++) {
      try {
        this.bot.sendMessage(chats[i].id, message, {
          parse_mode: "Markdown",
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
