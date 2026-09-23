import { Tabs } from "expo-router";
import { Image, type ColorValue, type ImageSourcePropType } from "react-native";

const ICONS: Record<string, ImageSourcePropType> = {
  home: require("../../../assets/icons/home-line.png"),
  services: require("../../../assets/icons/shopping-bag-03.png"),
  wallets: require("../../../assets/icons/wallet-04.png"),
  cards: require("../../../assets/icons/credit-card-02.png"),
  account: require("../../../assets/icons/settings-04.png"),
};

const PRIMARY = "#4F46E5";
const INACTIVE = "#9CA3AF";

function TabIcon({
  name,
  color,
}: {
  name: keyof typeof ICONS;
  color: ColorValue;
}) {
  return (
    <Image
      source={ICONS[name]}
      style={{ width: 24, height: 24 }}
      tintColor={color}
      resizeMode="contain"
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: INACTIVE,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          tabBarIcon: ({ color }) => <TabIcon name="services" color={color} />,
        }}
      />
      <Tabs.Screen
        name="wallets"
        options={{
          title: "Wallets",
          tabBarIcon: ({ color }) => <TabIcon name="wallets" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: "Cards",
          tabBarIcon: ({ color }) => <TabIcon name="cards" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => <TabIcon name="account" color={color} />,
        }}
      />
    </Tabs>
  );
}
