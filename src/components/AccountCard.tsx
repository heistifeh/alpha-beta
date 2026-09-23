import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import type { ImageSourcePropType } from "react-native";
import { Image, Pressable, Text, View } from "react-native";

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
  userName?: string;
  avatarSource?: ImageSourcePropType;
  hasUnreadNotifications?: boolean;
  onPressNotifications?: () => void;
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
  userName,
  avatarSource,
  hasUnreadNotifications = false,
  onPressNotifications,
}: AccountCardProps) {
  return (
    <LinearGradient
      colors={["#071522", "#020507", "#000000"]}
      locations={[0, 0.35, 0.65]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{
        borderRadius: 32,
        paddingHorizontal: 18,
        paddingTop: 48,
        paddingBottom: 24,
        overflow: "hidden",
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 overflow-hidden rounded-full bg-white/10">
            {avatarSource ? (
              <Image source={avatarSource} style={{ width: 40, height: 40 }} resizeMode="cover" />
            ) : null}
          </View>

          <Text className="text-base font-medium text-white">
            Hello {userName ?? "there"}
          </Text>
        </View>

        <Pressable
          onPress={onPressNotifications}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          className="h-10 w-10 items-center justify-center rounded-full bg-white/10"
        >
          <Feather name="bell" size={18} color="#FFFFFF" />
          {hasUnreadNotifications ? (
            <View className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
          ) : null}
        </Pressable>
      </View>

      <View className="mt-5 flex-row items-center justify-center gap-1.5">
        <Pressable
          onPress={onPressAccountSelector}
          accessibilityRole="button"
          accessibilityLabel="Select account"
          className="flex-row items-center gap-2 rounded-full bg-[#1C1C1E] px-3.5 py-2.5"
        >
          <Text className="text-sm">✌️</Text>

          <Text className="text-base font-medium text-[#E8EAF0]">
            {account.label}
          </Text>

          <Feather name="chevron-down" size={16} color="#E8EAF0" />
        </Pressable>

        <Pressable
          onPress={onToggleBalanceVisibility}
          accessibilityRole="button"
          accessibilityLabel={
            isBalanceVisible ? "Hide balance" : "Show balance"
          }
          className="h-10 w-10 items-center justify-center rounded-full border border-[#343638]"
        >
          <Feather
            name={isBalanceVisible ? "eye" : "eye-off"}
            size={20}
            color="#FFFFFF"
          />
        </Pressable>

        <Pressable
          onPress={onPressOverflowMenu}
          accessibilityRole="button"
          accessibilityLabel="More account options"
          className="h-10 w-10 items-center justify-center rounded-full border border-[#343638]"
        >
          <Feather name="more-vertical" size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      <View className="mt-2 min-h-[56px] items-center justify-center">
        {isBalanceVisible ? (
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: 40,
              fontWeight: "400",
              letterSpacing: -1,
              color: "#FFFFFF",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: "#777777",
                letterSpacing: 0,
              }}
            >
              {account.currencySymbol}
            </Text>
            {formatCurrency(account.balance, "")}
          </Text>
        ) : (
          <View className="flex-row items-center gap-2">
            {Array.from({ length: DOT_COUNT }, (_, index) => (
              <View
                key={index}
                className="h-2.5 w-2.5 rounded-full bg-white"
              />
            ))}
          </View>
        )}
      </View>

      <View className="mt-7 flex-row gap-2">
        <Pressable
          onPress={onDeposit}
          accessibilityRole="button"
          className="flex-1 flex-row items-center justify-center gap-1.5 rounded-2xl bg-[#4C5CCD] py-3.5"
        >
          <Feather name="arrow-down-left" size={18} color="#FFFFFF" />
          <Text className="text-sm font-medium text-white">Deposit</Text>
        </Pressable>

        <Pressable
          onPress={onWithdraw}
          accessibilityRole="button"
          className="flex-1 flex-row items-center justify-center gap-1.5 rounded-2xl bg-[#282828] py-3.5"
        >
          <Feather name="arrow-up-right" size={18} color="#FFFFFF" />
          <Text className="text-sm font-medium text-white">Withdraw</Text>
        </Pressable>

        <Pressable
          onPress={onTrade}
          accessibilityRole="button"
          className="flex-1 flex-row items-center justify-center gap-1.5 rounded-2xl bg-[#282828] py-3.5"
        >
          <Feather name="bar-chart-2" size={18} color="#FFFFFF" />
          <Text className="text-sm font-medium text-white">Trade</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}