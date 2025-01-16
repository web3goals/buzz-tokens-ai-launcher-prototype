"use server";

import { Token } from "@/db/models/token";
import { findToken, insertToken } from "@/db/services/token-service";
import { errorToString } from "@/lib/converters";
import { ActionResponse } from "@/types/action-response";

export async function getToken(
  address: string
): Promise<ActionResponse<string> | undefined> {
  try {
    const token = await findToken(address);
    if (!token) {
      throw new Error(`Token '${address}' not found`);
    }
    return {
      data: JSON.stringify(token),
    };
  } catch (error) {
    return {
      error: `Failed to get token: ${errorToString(error)}`,
    };
  }
}

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
