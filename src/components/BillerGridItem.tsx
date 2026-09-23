import { Feather } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Image, type ImageSourcePropType, Pressable, Text, View } from "react-native";

interface BillerGridItemProps {
  name: string;
  logo?: ImageSourcePropType;
  fallbackIcon?: ComponentProps<typeof Feather>["name"];
  onPress?: () => void;
}

export function BillerGridItem({ name, logo, fallbackIcon, onPress }: BillerGridItemProps) {
  return (
    <Pressable onPress={onPress} className="w-full items-center gap-2 px-1">
      <View className="h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-slate-100">
        {logo ? (
          <Image source={logo} style={{ width: 56, height: 56 }} resizeMode="cover" />
        ) : (
          <Feather name={fallbackIcon ?? "arrow-right"} size={22} color="#334155" />
        )}
      </View>
      <Text className="text-center text-xs font-medium text-slate-700" numberOfLines={1}>
        {name}
      </Text>
    </Pressable>
  );
}
