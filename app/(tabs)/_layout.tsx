import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

type TabItem = {
  name: string;
  title: string;
  icon: string;
  iconFocused: string;
};

const TABS: TabItem[] = [
  { name: "index", title: "Home",  icon: "home-outline",    iconFocused: "home"           },
  { name: "tasks", title: "Tasks", icon: "list-outline",    iconFocused: "list"           },
  { name: "focus", title: "Focus", icon: "radio-button-on-outline", iconFocused: "radio-button-on" },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const tab = TABS.find((t) => t.name === route.name);

        return {
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={(focused ? tab?.iconFocused : tab?.icon) as any}
              size={size}
              color={color}
            />
          ),
          tabBarActiveTintColor: "#1A1A18",
          tabBarInactiveTintColor: "#B0ADA8",
          tabBarStyle: {
            paddingTop: 12,
            paddingBottom: 12,
          },
          tabBarLabelStyle: {
            marginTop: 2,
          },
        };
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.title }} />
      ))}
    </Tabs>
  );
}