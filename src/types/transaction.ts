export type TransactionStatus = "successful";

export interface Transaction {
  id: string;
  title: string;
  category: string;
  timestamp: string;
  amount: number;
  currencySymbol: string;
  status: TransactionStatus;
}
