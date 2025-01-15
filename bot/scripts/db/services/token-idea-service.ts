import { Collection, ObjectId } from "mongodb";
import { TokenIdea } from "../models/token-idea";
import clientPromise from "../client";
import { mongoDBConfig } from "../../config/mongodb";

export async function insertTokenIdea(tokenIdea: TokenIdea): Promise<ObjectId> {
  const collection = await getCollectionTokenIdeas();
  const insertOneResult = await collection.insertOne(tokenIdea);
  return insertOneResult.insertedId;
}

async function getCollectionTokenIdeas(): Promise<Collection<TokenIdea>> {
  const client = await clientPromise;
  const db = client.db(mongoDBConfig.database);
  return db.collection<TokenIdea>(mongoDBConfig.collectionTokenIdeas);
}
