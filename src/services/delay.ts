const DEFAULT_DELAY_MS = 800;

export function simulateNetworkDelay(ms: number = DEFAULT_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
