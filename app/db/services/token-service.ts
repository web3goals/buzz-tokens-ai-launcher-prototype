import { mongoDBConfig } from "@/config/mongodb";
import { Collection, ObjectId } from "mongodb";
import clientPromise from "../client";
import { Token } from "../models/token";

export async function findTokens(creator: string): Promise<Token[] | null> {
  const collection = await getCollectionTokens();
  const tokenIdea = await collection.find({ creator: creator }).toArray();
  return tokenIdea;
}

export async function findToken(address: string): Promise<Token | null> {
  const collection = await getCollectionTokens();
  const tokenIdea = await collection.findOne({ address: address });
  return tokenIdea;
}

export async function insertToken(token: Token): Promise<ObjectId> {
  const collection = await getCollectionTokens();
  const insertOneResult = await collection.insertOne(token);
  return insertOneResult.insertedId;
}
async function getCollectionTokens(): Promise<Collection<Token>> {
  const client = await clientPromise;
  const db = client.db(mongoDBConfig.database);
  return db.collection<Token>(mongoDBConfig.collectionTokens);
}
