import { mongoDBConfig } from "@/config/mongodb";
import { Collection, ObjectId } from "mongodb";
import clientPromise from "../client";
import { TokenIdea } from "../models/token-idea";

export async function findTokenIdea(id: string): Promise<TokenIdea | null> {
  const collection = await getCollectionTokenIdeas();
  const tokenIdea = await collection.findOne({ _id: new ObjectId(id) });
  return tokenIdea;
}

async function getCollectionTokenIdeas(): Promise<Collection<TokenIdea>> {
  const client = await clientPromise;
  const db = client.db(mongoDBConfig.database);
  return db.collection<TokenIdea>(mongoDBConfig.collectionTokenIdeas);
}
