import { TokenIdea } from "../db/models/token-idea";
import { insertTokenIdea } from "../db/services/token-idea-service";
import { generateTokenIdea } from "./ai";
import Bot from "./bot";
import { fetchNews } from "./news";

export default class Agent {
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  // TODO: Enable interval for production
  public async start() {
    console.log("Starting the agent...");

    // const agentInterval = 10_000;
    // setInterval(async () => {
    //   this.startIteration();
    // }, agentInterval);
    this.startIteration();
  }

  private async startIteration() {
    try {
      console.log("Starting an iteration...");
      // Get news
      const news = await fetchNews();
      if (!news) {
        throw new Error("No news fetched");
      }
      // Get token idea
      const tokenIdea = await generateTokenIdea(news);
      if (!tokenIdea) {
        throw new Error("No token idea generated");
      }
      // Save token idea
      await insertTokenIdea(tokenIdea);
      // Broadcast token idea
      const broadcastMessage = this.generateBroadcastMessage(tokenIdea);
      await this.bot.broadcastMessage(broadcastMessage);
      console.log("Iteration completed");
    } catch (error) {
      console.error(error);
    }
  }

  private generateBroadcastMessage(tokenIdea: TokenIdea): string {
    return (
      "\n\nToken idea:\n" +
      JSON.stringify(tokenIdea) +
      "\n\nLink for launching:\n" +
      `https://t.me/buzz_tokens_ai_launcher_bot/app?startapp=i_${tokenIdea._id?.toString()}`
    );
  }
}
