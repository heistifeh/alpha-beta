import { mockTransactions } from "@/data/transactions";
import type { Transaction } from "@/types";

import { simulateNetworkDelay } from "./delay";
import type { ApiRequestOptions, ApiResponse } from "./types";

export async function getRecentTransactions(
  options: ApiRequestOptions = {},
): Promise<ApiResponse<Transaction[]>> {
  await simulateNetworkDelay(options.delayMs);

  switch (options.scenario) {
    case "error":
      return { status: "error", message: "Couldn't load your transactions. Please try again." };
    case "empty":
      return { status: "empty" };
    default:
      return { status: "success", data: mockTransactions };
  }
}
