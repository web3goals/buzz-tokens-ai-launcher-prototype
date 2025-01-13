import TelegramBot from "node-telegram-bot-api";
import { TokenIdea } from "../types/token-idea";

export default class Agent {
  private bot: any;

  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  public start() {
    setInterval(async () => {
      const tokenIdea = await this.generateTokenIdea();
      if (tokenIdea) {
        this.broadcastTokenIdea(tokenIdea);
      }
    }, 10_000);
  }

  private async generateTokenIdea(): Promise<TokenIdea | undefined> {
    // TODO: Fetch tops news from newsapi.org
    // TODO: Ask ChatGPT to form a token idea
    // TODO: Save token idea in database
    return { id: "42", name: "Bitcoin", symbol: "BTC", description: "Bitcoin" };
  }

  private async broadcastTokenIdea(tokenIdea: TokenIdea) {
    // TODO: Load chat IDs from database
    const chatIds = ["5000261155"];
    for (let i = 0; i < chatIds.length; i++) {
      try {
        this.bot.sendMessage(
          chatIds[i],
          "News:\n...\n\n" +
            "Token:\n" +
            JSON.stringify(tokenIdea) +
            "\n\nLink:\n" +
            `https://t.me/buzz_tokens_ai_launcher_bot/app?startapp=${tokenIdea.id}`
        );
      } catch (error) {
        console.error(error);
      }
    }
  }
}
