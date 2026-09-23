import { Feather } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

import type { User } from "@/types";

interface HomeHeaderProps {
  user: User | null;
  isLoading?: boolean;
  onPressNotifications?: () => void;
}

export function HomeHeader({ user, isLoading, onPressNotifications }: HomeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-4 pb-4 pt-2">
      <View className="flex-row items-center gap-3">
        <View className="h-10 w-10 overflow-hidden rounded-full bg-white/10">
          {user ? (
            <Image source={user.avatar} style={{ width: 40, height: 40 }} resizeMode="cover" />
          ) : null}
        </View>
        {isLoading ? (
          <View className="h-4 w-24 rounded-full bg-white/10" />
        ) : (
          <Text className="text-base font-medium text-white">
            Hello {user?.firstName ?? "there"}
          </Text>
        )}
      </View>

      <Pressable
        onPress={onPressNotifications}
        className="h-10 w-10 items-center justify-center rounded-full bg-white/10"
      >
        <Feather name="bell" size={18} color="#FFFFFF" />
        {user?.hasUnreadNotifications ? (
          <View className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
        ) : null}
      </Pressable>
    </View>
  );
}
