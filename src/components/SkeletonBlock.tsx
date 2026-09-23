import { View, type ViewStyle } from "react-native";

interface SkeletonBlockProps {
  style?: ViewStyle;
  className?: string;
}

export function SkeletonBlock({ style, className }: SkeletonBlockProps) {
  return (
    <View
      className={`rounded-lg bg-slate-200 ${className ?? ""}`}
      style={style}
    />
  );
}
