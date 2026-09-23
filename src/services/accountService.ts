import { mockAccount } from "@/data/account";
import type { Account } from "@/types";

import { simulateNetworkDelay } from "./delay";
import type { ApiRequestOptions, ApiResponse } from "./types";

export async function getAccount(
  options: ApiRequestOptions = {},
): Promise<ApiResponse<Account>> {
  await simulateNetworkDelay(options.delayMs);

  switch (options.scenario) {
    case "error":
      return { status: "error", message: "Couldn't load your account. Please try again." };
    case "empty":
      return { status: "empty" };
    default:
      return { status: "success", data: mockAccount };
  }
}
