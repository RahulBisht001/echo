import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Easing, TouchableOpacity, View } from "react-native";
import { homeStyles } from "../assets/styles/home.styles";

const PulsingCircleButton = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[homeStyles.outestCircle, { transform: [{ scale: scaleAnim }] }]}
    >
      <Animated.View
        style={[homeStyles.outerCircle, { transform: [{ scale: scaleAnim }] }]}
      >
        <View style={homeStyles.innerCircle}>
          <TouchableOpacity>
            <Ionicons name="stop" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default PulsingCircleButton;
