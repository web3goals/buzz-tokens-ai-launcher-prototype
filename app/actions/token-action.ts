"use server";

import { Token } from "@/db/models/token";
import { insertToken } from "@/db/services/token-service";
import { errorToString } from "@/lib/converters";
import { ActionResponse } from "@/types/action-response";

export async function createToken(
  token: Token
): Promise<ActionResponse<string> | undefined> {
  try {
    const tokenId = await insertToken(token);
    token._id = tokenId;
    return {
      data: JSON.stringify(token),
    };
  } catch (error) {
    return {
      error: `Failed to create a token: ${errorToString(error)}`,
    };
  }
}
