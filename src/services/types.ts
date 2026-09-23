export type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "empty" }
  | { status: "error"; message: string };

export type ApiScenario = "success" | "empty" | "error";

export interface ApiRequestOptions {
  scenario?: ApiScenario;
  delayMs?: number;
}
