import { useCallback, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AccountCard } from "@/components/AccountCard";
import { BillerGridItem } from "@/components/BillerGridItem";
import { QuickActionButton } from "@/components/QuickActionButton";
import { SkeletonBlock } from "@/components/SkeletonBlock";
import { StateMessage } from "@/components/StateMessage";
import { TransactionRow } from "@/components/TransactionRow";
import { useApiResource } from "@/hooks/useApiResource";
import { getBillers, getCurrentUser, getRecentTransactions } from "@/services";
import { useAccountStore } from "@/store/useAccountStore";
import type { Biller } from "@/types";

const QUICK_ACTIONS = [
  { label: "Pay Bills", icon: require("../../../assets/icons/receipt-check.png") },
  { label: "Giftcards", icon: require("../../../assets/icons/credit-card-refresh.png") },
  { label: "Crypto", icon: require("../../../assets/icons/coins-swap-01.png") },
  { label: "Cards", icon: require("../../../assets/icons/credit-card-lock.png") },
  { label: "Rates", icon: require("../../../assets/icons/coins-03.png") },
];

const SERVICES_TILE_INDEX = 3;

export default function HomeScreen() {
  const {
    account,
    status: accountStatus,
    errorMessage: accountError,
    isBalanceVisible,
    fetchAccount,
    toggleBalanceVisibility,
  } = useAccountStore();

  const user = useApiResource(getCurrentUser);
  const transactions = useApiResource(getRecentTransactions);
  const billers = useApiResource(getBillers);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  const retryAccount = useCallback(() => fetchAccount(), [fetchAccount]);

  type BillerItem = { key: string; name: string; logo?: Biller["logo"] };

  const billerItems: BillerItem[] =
    billers.status === "success"
      ? [
          ...billers.data.slice(0, SERVICES_TILE_INDEX).map(
            (biller): BillerItem => ({ key: biller.id, name: biller.name, logo: biller.logo }),
          ),
          { key: "services", name: "Services" },
          ...billers.data.slice(SERVICES_TILE_INDEX).map(
            (biller): BillerItem => ({ key: biller.id, name: biller.name, logo: biller.logo }),
          ),
        ]
      : [];

  return (
    <SafeAreaView className="flex-1 bg-black" edges={["top"]}>
      <ScrollView contentContainerClassName="pb-8" className="flex-1">
        <View className="px-4">
          {accountStatus === "loading" || accountStatus === "idle" ? (
            <View className="gap-4 rounded-3xl bg-white/5 p-5">
              <SkeletonBlock className="bg-white/10" style={{ height: 36, width: 140 }} />
              <SkeletonBlock className="bg-white/10" style={{ height: 40, width: 200 }} />
              <View className="flex-row gap-3">
                <SkeletonBlock className="flex-1 bg-white/10" style={{ height: 48 }} />
                <SkeletonBlock className="flex-1 bg-white/10" style={{ height: 48 }} />
                <SkeletonBlock className="flex-1 bg-white/10" style={{ height: 48 }} />
              </View>
            </View>
          ) : accountStatus === "error" ? (
            <View className="rounded-3xl bg-white/5 p-5">
              <StateMessage
                message={accountError ?? "Couldn't load your account."}
                onRetry={retryAccount}
              />
            </View>
          ) : accountStatus === "success" && account ? (
            <AccountCard
              account={account}
              isBalanceVisible={isBalanceVisible}
              onToggleBalanceVisibility={toggleBalanceVisibility}
              userName={user.status === "success" ? user.data.firstName : undefined}
              avatarSource={user.status === "success" ? user.data.avatar : undefined}
              hasUnreadNotifications={
                user.status === "success" ? user.data.hasUnreadNotifications : false
              }
            />
          ) : (
            <View className="rounded-3xl bg-white/5 p-5">
              <StateMessage message="No account found." />
            </View>
          )}
        </View>

        <View className="mx-4 mt-4 rounded-3xl bg-white p-5">
          <View className="flex-row justify-between">
            {QUICK_ACTIONS.map((action) => (
              <QuickActionButton key={action.label} label={action.label} icon={action.icon} />
            ))}
          </View>

          <View className="mt-6 border-t border-slate-100 pt-5">
            {billers.status === "loading" ? (
              <View className="flex-row flex-wrap gap-y-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <View key={index} className="items-center gap-2" style={{ width: "25%" }}>
                    <SkeletonBlock style={{ height: 56, width: 56, borderRadius: 28 }} />
                    <SkeletonBlock style={{ height: 10, width: 40 }} />
                  </View>
                ))}
              </View>
            ) : billers.status === "error" ? (
              <StateMessage message={billers.message} onRetry={billers.reload} />
            ) : billers.status === "empty" ? (
              <StateMessage message="No billers available right now." />
            ) : (
              <View className="flex-row flex-wrap gap-y-4">
                {billerItems.map((item) => (
                  <View key={item.key} style={{ width: "25%" }}>
                    <BillerGridItem
                      name={item.name}
                      logo={item.logo}
                      fallbackIcon="arrow-right"
                    />
                  </View>
                ))}
              </View>
            )}
          </View>

          <View className="mt-6 flex-row items-center justify-between">
            <Text className="text-base font-semibold text-slate-900">Recent transactions</Text>
            <Text className="text-sm font-medium text-primary">View more</Text>
          </View>

          <View className="mt-2">
            {transactions.status === "loading" ? (
              <View className="gap-4 py-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <View key={index} className="flex-row items-center gap-3">
                    <SkeletonBlock style={{ height: 44, width: 44, borderRadius: 22 }} />
                    <View className="flex-1 gap-2">
                      <SkeletonBlock style={{ height: 12, width: "60%" }} />
                      <SkeletonBlock style={{ height: 10, width: "40%" }} />
                    </View>
                  </View>
                ))}
              </View>
            ) : transactions.status === "error" ? (
              <StateMessage message={transactions.message} onRetry={transactions.reload} />
            ) : transactions.status === "empty" ? (
              <StateMessage message="No recent transactions yet." />
            ) : (
              transactions.data.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
