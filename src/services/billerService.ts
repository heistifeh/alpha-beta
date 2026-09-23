import { mockBillers } from "@/data/billers";
import type { Biller } from "@/types";

import { simulateNetworkDelay } from "./delay";
import type { ApiRequestOptions, ApiResponse } from "./types";

export async function getBillers(
  options: ApiRequestOptions = {},
): Promise<ApiResponse<Biller[]>> {
  await simulateNetworkDelay(options.delayMs);

  switch (options.scenario) {
    case "error":
      return { status: "error", message: "Couldn't load billers. Please try again." };
    case "empty":
      return { status: "empty" };
    default:
      return { status: "success", data: mockBillers };
  }
}
