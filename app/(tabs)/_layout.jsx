import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/colors";

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textLight,

          tabBarStyle: {
            backgroundColor: COLORS.white,
            borderTopColor: COLORS.border,
            borderTopWidth: 1,
            paddingBottom: 8,
            paddingTop: 8,
            height: 110,
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: "Outfit-Medium",
          },
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={0.7} />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Record",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="mic" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="recordings"
          options={{
            title: "Recordings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="albums" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="more"
          options={{
            title: "More",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
