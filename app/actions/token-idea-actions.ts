"use server";

import { findTokenIdea } from "@/db/services/token-idea-service";
import { errorToString } from "@/lib/converters";
import { ActionResponse } from "@/types/action-response";

export async function getTokenIdea(
  id: string
): Promise<ActionResponse<string> | undefined> {
  try {
    const tokenIdea = await findTokenIdea(id);
    if (!tokenIdea) {
      throw new Error(`Token idea '${id}' not found`);
    }
    return {
      data: JSON.stringify(tokenIdea),
    };
  } catch (error) {
    return {
      error: `Failed to get token idea: ${errorToString(error)}`,
    };
  }
}
