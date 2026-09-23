import type { Transaction } from "@/types";

export const mockTransactions: Transaction[] = [
  {
    id: "txn_1",
    title: "Airtime",
    category: "airtime",
    timestamp: "2025-12-31T13:12:00Z",
    amount: 15000,
    currencySymbol: "₦",
    status: "successful",
  },
  {
    id: "txn_2",
    title: "Electricity - EKEDC",
    category: "bills",
    timestamp: "2025-12-30T09:41:00Z",
    amount: 8500,
    currencySymbol: "₦",
    status: "successful",
  },
  {
    id: "txn_3",
    title: "DSTV Subscription",
    category: "bills",
    timestamp: "2025-12-29T18:05:00Z",
    amount: 24500,
    currencySymbol: "₦",
    status: "successful",
  },
  {
    id: "txn_4",
    title: "Airtime",
    category: "airtime",
    timestamp: "2025-12-28T11:30:00Z",
    amount: 15000,
    currencySymbol: "₦",
    status: "successful",
  },
  {
    id: "txn_5",
    title: "Crypto - USDT Buy",
    category: "crypto",
    timestamp: "2025-12-27T16:22:00Z",
    amount: 50000,
    currencySymbol: "₦",
    status: "successful",
  },
];
