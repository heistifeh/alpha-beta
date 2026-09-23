import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";

import type { Account } from "@/types";
import { formatCurrency } from "@/utils/format";

interface AccountCardProps {
  account: Account;
  isBalanceVisible: boolean;
  onToggleBalanceVisibility: () => void;
  onPressAccountSelector?: () => void;
  onPressOverflowMenu?: () => void;
  onDeposit?: () => void;
  onWithdraw?: () => void;
  onTrade?: () => void;
}

const DOT_COUNT = 10;

export function AccountCard({
  account,
  isBalanceVisible,
  onToggleBalanceVisibility,
  onPressAccountSelector,
  onPressOverflowMenu,
  onDeposit,
  onWithdraw,
  onTrade,
}: AccountCardProps) {
  return (
    <LinearGradient
      colors={["#008FD4", "#373F90", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.25, 0.75]}
      className="rounded-3xl p-5"
    >
      <View className="flex-row items-center justify-between">
        <Pressable
          onPress={onPressAccountSelector}
          className="flex-row items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2"
        >
          <Text className="text-sm">🔥</Text>
          <Text className="text-sm font-medium text-white">{account.label}</Text>
          <Feather name="chevron-down" size={16} color="#FFFFFF" />
        </Pressable>

        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={onToggleBalanceVisibility}
            className="h-9 w-9 items-center justify-center rounded-full bg-white/10"
          >
            <Feather
              name={isBalanceVisible ? "eye" : "eye-off"}
              size={18}
              color="#FFFFFF"
            />
          </Pressable>
          <Pressable
            onPress={onPressOverflowMenu}
            className="h-9 w-9 items-center justify-center rounded-full bg-white/10"
          >
            <Feather name="more-vertical" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      <View className="mt-6 min-h-[44px] flex-row items-center">
        {isBalanceVisible ? (
          <Text className="text-4xl font-bold text-white">
            <Text className="text-3xl font-bold text-white">{account.currencySymbol}</Text>
            {formatCurrency(account.balance, "")}
          </Text>
        ) : (
          <View className="flex-row items-center gap-2">
            {Array.from({ length: DOT_COUNT }).map((_, index) => (
              <View key={index} className="h-3 w-3 rounded-full bg-white" />
            ))}
          </View>
        )}
      </View>

      <View className="mt-6 flex-row gap-3">
        <Pressable
          onPress={onDeposit}
          className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl bg-primary py-3.5"
        >
          <Feather name="arrow-down-left" size={16} color="#FFFFFF" />
          <Text className="text-sm font-semibold text-white">Deposit</Text>
        </Pressable>
        <Pressable
          onPress={onWithdraw}
          className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl bg-white/10 py-3.5"
        >
          <Feather name="arrow-up-right" size={16} color="#FFFFFF" />
          <Text className="text-sm font-semibold text-white">Withdraw</Text>
        </Pressable>
        <Pressable
          onPress={onTrade}
          className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl bg-white/10 py-3.5"
        >
          <Feather name="bar-chart-2" size={16} color="#FFFFFF" />
          <Text className="text-sm font-semibold text-white">Trade</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
