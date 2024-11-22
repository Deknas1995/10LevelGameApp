import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Platform,
  Text,
  Dimensions,
} from "react-native";

import { Audio } from "expo-av";
import wrongSound from "../Sounds/btn_click.mp3";

const playSound = async (soundFile) => {
  const { sound } = await Audio.Sound.createAsync(soundFile);
  await sound.playAsync();
};

export default function Level5({ navigation }) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [lastTap, setLastTap] = useState(null);

  const disableResetRef = useRef(false);
  const targetPosition = useRef({ x: 0, y: 0 });
  const boxPosition = useRef({ x: 0, y: 0 });
  const [failCount, setFailCount] = useState(0);

  // Create an animated value for color
  const [colorAnim] = useState(new Animated.Value(0)); // 0 represents the original color, 1 represents light green

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("grant");

        // Animate the background color to light green when pressing the box
        Animated.timing(colorAnim, {
          toValue: 1, // Light green color
          duration: 10,
          useNativeDriver: false,
        }).start();

        // Ensure the pan value is updated to match the box's current position
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (event, gestureState) => {
        Animated.event(
          [
            null,
            { dx: pan.x, dy: pan.y },
          ],
          { useNativeDriver: false }
        )(event, gestureState);
      },
      onPanResponderRelease: () => {
        console.log("release");

        // Revert the background color to the original color when the box is released
        Animated.timing(colorAnim, {
          toValue: 0, // Revert back to original color
          duration: 10,
          useNativeDriver: false,
        }).start();

        if (!disableResetRef.current) {
          setFailCount((prev) => prev + 1);

          // Reset to starting position
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        } else {
          pan.flattenOffset();
          boxPosition.current = { x: pan.x._value, y: pan.y._value };
          checkIfBoxInsideTarget();
        }
      },
    })
  ).current;

  const handleDoublePress = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      disableResetRef.current = true;
    } else {
      setLastTap(now);
    }
  };

  const checkIfBoxInsideTarget = () => {
    const targetSize = 120;
    const boxSize = 100;

    const boxX = boxPosition.current.x;
    const boxY = boxPosition.current.y;

    const placeArea = Dimensions.get("window").height / 2.14;
    if (boxY + placeArea < 0) {
      navigation.navigate("Level 6");
    }
  };

  const handleTargetLayout = (event) => {
    const { x, y } = event.nativeEvent.layout;
    targetPosition.current = { x, y };
  };

  // Interpolating the color based on colorAnim value
  const boxColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(0,200,0)", "rgb(144,238,144)"], // From original color to light green
  });

  return (
    <View style={styles.container}>
      {/* Target box */}
      <View
        style={[
          styles.targetContainer,
          styles.targetBox,
          { width: Dimensions.get("window").width },
        ]}
        onLayout={handleTargetLayout}
      >
        <Text style={styles.targetText}>Place the box here</Text>
      </View>

      <Animated.View
        onTouchStart={handleDoublePress}
        {...panResponder.panHandlers}
        style={[
          styles.box,
          { transform: pan.getTranslateTransform() },
          { backgroundColor: boxColor }, // Apply animated color
          Platform.OS === "web" ? { cursor: "grab" } : {},
        ]}
      />

      {failCount >= 3 && (
        <Text style={styles.hint}>Hint: double press to unlock.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  targetContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  targetText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  targetBox: {
    width: "100%",
    height: 280,
    marginBottom: 220,
    backgroundColor: "#FFD700",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  hint: {
    backgroundColor: "rgb(224,224,224)",
    padding: 10,
    borderRadius: 7,
  },
});
