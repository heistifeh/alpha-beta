import type { ImageSourcePropType } from "react-native";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: ImageSourcePropType;
  hasUnreadNotifications: boolean;
}
