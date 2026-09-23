export type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "empty" }
  | { status: "error"; message: string };

export type ApiScenario = "success" | "empty" | "error";

export interface ApiRequestOptions {
  /** Force a specific response shape for demoing UI states without a real backend. */
  scenario?: ApiScenario;
  /** Override the simulated network delay, in ms. */
  delayMs?: number;
}
