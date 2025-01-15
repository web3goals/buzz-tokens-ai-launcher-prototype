import axios from "axios";
import { TokenIdea } from "../db/models/token-idea";
import { News } from "../types/news";

export async function generateTokenIdea(
  news: News[]
): Promise<TokenIdea | undefined> {
  // Prepare messages
  const messages = [
    {
      role: "system",
      content: [
        { type: "text", text: SYSTEM_MESSAGE_FOR_TOKEN_IDEA_GENERATION },
      ],
    },
    { role: "user", content: [{ type: "text", text: JSON.stringify(news) }] },
  ];
  // Send request with retries
  const { data } = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: messages,
      response_format: {
        type: "json_schema",
        json_schema: JSON_SCHEMA_FOR_TOKEN_IDEA_GENERATION,
      },
      temperature: 0.5,
    },
    {
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      timeout: 45_000,
    }
  );
  // Parse response
  const reponseMessage = data?.choices?.[0]?.message;
  if (!reponseMessage) {
    throw new Error("Response message is empty");
  }
  if (reponseMessage.refusal) {
    throw new Error(reponseMessage.refusal);
  }
  const responseMessageContent = JSON.parse(reponseMessage.content);
  return {
    name: responseMessageContent.name,
    symbol: responseMessageContent.symbol,
    description: responseMessageContent.description,
    newsUrl: responseMessageContent.newsUrl,
    createdTime: new Date(),
  };
}

const SYSTEM_MESSAGE_FOR_TOKEN_IDEA_GENERATION = [
  "### INSTRUCTIONS",
  "- You are the best crypto and blockchain analyst in the world.",
  "- You'll get JSON with a list of recent news items containing a title and description.",
  "- You need to analyze all the news and suggest a funny meme coin linked to one of the news that will attract more attention of cryptocurrency users.",
  "### RULES",
  "- Use English language for the answer.",
  "- You will be PENALIZED for bad answer.",
  "- NEVER HALLUCINATE.",
  "- I'm going to tip $1,000,000 for the best answer.",
  "- Your answer is critical for my career.",
].join("\n\n");

const JSON_SCHEMA_FOR_TOKEN_IDEA_GENERATION = {
  name: "token_idea_generation",
  strict: true,
  schema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description:
          "Fun and unique token name related to the selected news item.",
      },
      symbol: {
        type: "string",
        description: "Token symbol linked to the token name.",
      },
      description: {
        type: "string",
        description:
          "Token short description linked to the token name and the selected news item..",
      },
      newsUrl: {
        type: "string",
        description: "Url the selected news item.",
      },
    },
    additionalProperties: false,
    required: ["name", "symbol", "description", "newsUrl"],
  },
};
