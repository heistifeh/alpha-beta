import { Pressable, Text, View } from "react-native";

interface StateMessageProps {
  message: string;
  onRetry?: () => void;
}

export function StateMessage({ message, onRetry }: StateMessageProps) {
  return (
    <View className="items-center justify-center py-6">
      <Text className="text-center text-sm text-slate-500">{message}</Text>
      {onRetry ? (
        <Pressable onPress={onRetry} className="mt-2">
          <Text className="text-sm font-semibold text-primary">Try again</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
