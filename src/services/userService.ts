import { mockUser } from "@/data/user";
import type { User } from "@/types";

import { simulateNetworkDelay } from "./delay";
import type { ApiRequestOptions, ApiResponse } from "./types";

export async function getCurrentUser(
  options: ApiRequestOptions = {},
): Promise<ApiResponse<User>> {
  await simulateNetworkDelay(options.delayMs);

  switch (options.scenario) {
    case "error":
      return { status: "error", message: "Couldn't load your profile. Please try again." };
    case "empty":
      return { status: "empty" };
    default:
      return { status: "success", data: mockUser };
  }
}
