import { create } from "zustand";

import { getAccount } from "@/services";
import type { ApiRequestOptions } from "@/services";
import type { Account } from "@/types";

type AccountStatus = "idle" | "loading" | "success" | "empty" | "error";

interface AccountState {
  account: Account | null;
  status: AccountStatus;
  errorMessage: string | null;
  isBalanceVisible: boolean;
  fetchAccount: (options?: ApiRequestOptions) => Promise<void>;
  toggleBalanceVisibility: () => void;
}

export const useAccountStore = create<AccountState>((set) => ({
  account: null,
  status: "idle",
  errorMessage: null,
  isBalanceVisible: true,

  fetchAccount: async (options) => {
    set({ status: "loading", errorMessage: null });

    const response = await getAccount(options);

    switch (response.status) {
      case "success":
        set({ status: "success", account: response.data });
        break;
      case "empty":
        set({ status: "empty", account: null });
        break;
      case "error":
        set({ status: "error", errorMessage: response.message });
        break;
    }
  },

  toggleBalanceVisibility: () =>
    set((state) => ({ isBalanceVisible: !state.isBalanceVisible })),
}));
