import { ObjectId } from "mongodb";
import { TokenIdea } from "../db/models/token-idea";
import { News } from "../types/news";

// TODO: Ask ChatGPT to form a token idea
export async function generateTokenIdea(
  news: News[]
): Promise<TokenIdea | undefined> {
  return {
    _id: new ObjectId(),
    name: "AI Britannia",
    symbol: "AIBR",
    description:
      "AI Britannia ($AIBR) is a meme token inspired by the UK’s ambition to become an artificial intelligence superpower. Celebrating innovation and progress, $AIBR symbolizes the fusion of cutting-edge AI technology and Britain’s visionary leadership. Ride the wave of AI and innovation with $AIBR—where the future meets fun!",
    news: { url: "", title: "", description: "" },
  };
}
