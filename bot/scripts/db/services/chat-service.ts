import { Collection } from "mongodb";
import { mongoDBConfig } from "../../config/mongodb";
import clientPromise from "../client";
import { Chat } from "../models/chat";

export async function findChats(): Promise<Chat[]> {
  const collection = await getCollectionTokenIdeas();
  return await collection.find({}).toArray();
}

export async function insertChat(chat: Chat): Promise<void> {
  const collection = await getCollectionTokenIdeas();
  await collection.updateOne(
    { id: chat.id },
    { $setOnInsert: chat },
    { upsert: true }
  );
}

async function getCollectionTokenIdeas(): Promise<Collection<Chat>> {
  const client = await clientPromise;
  const db = client.db(mongoDBConfig.database);
  return db.collection<Chat>(mongoDBConfig.collectionChats);
}
