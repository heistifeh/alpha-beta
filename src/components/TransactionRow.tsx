import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import type { Transaction } from "@/types";
import { formatCurrency, formatTransactionTimestamp } from "@/utils/format";

interface TransactionRowProps {
  transaction: Transaction;
  onPress?: () => void;
}

const STATUS_LABEL: Record<Transaction["status"], string> = {
  successful: "Successful",
};

export function TransactionRow({ transaction, onPress }: TransactionRowProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 py-3"
    >
      <View className="h-11 w-11 items-center justify-center rounded-full bg-slate-100">
        <Feather name="arrow-up-right" size={18} color="#334155" />
      </View>

      <View className="flex-1">
        <Text className="text-sm font-semibold text-slate-900">{transaction.title}</Text>
        <Text className="mt-0.5 text-xs text-slate-500">
          {formatTransactionTimestamp(transaction.timestamp)}
        </Text>
      </View>

      <View className="items-end">
        <Text className="text-sm font-semibold text-slate-900">
          {formatCurrency(transaction.amount, transaction.currencySymbol)}
        </Text>
        <Text className="mt-0.5 text-xs font-medium text-emerald-600">
          {STATUS_LABEL[transaction.status]}
        </Text>
      </View>
    </Pressable>
  );
}
