import { ObjectId } from "mongodb";
import { TokenIdea } from "../models/token-idea";

// TODO: Implement
export async function insertTokenIdea(tokenIdea: TokenIdea): Promise<ObjectId> {
  return new ObjectId();
}
