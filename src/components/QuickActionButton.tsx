import { Image, type ImageSourcePropType, Pressable, Text, View } from "react-native";

interface QuickActionButtonProps {
  label: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
}

export function QuickActionButton({ label, icon, onPress }: QuickActionButtonProps) {
  return (
    <Pressable onPress={onPress} className="items-center gap-2" style={{ width: 64 }}>
      <View className="h-14 w-14 items-center justify-center rounded-full bg-slate-100">
        <Image source={icon} style={{ width: 22, height: 22 }} resizeMode="contain" />
      </View>
      <Text className="text-center text-xs font-medium text-slate-700" numberOfLines={2}>
        {label}
      </Text>
    </Pressable>
  );
}
