import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Audio } from "expo-av";
import foundSound from "../Sounds/btn_click.mp3";

export default function Level6({ navigation }) {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [intervalTime, setIntervalTime] = useState(1000);
  const [evenCount, setEvenCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  };

  useEffect(() => {
    let interval;

    if (isRunning) {
      console.log("intervalTime = " + intervalTime);
      interval = setInterval(() => {
        setCounter((prev) => prev + 1);
      }, intervalTime);

      if (intervalTime === 0) {
        console.log("NAVIGATE TO LVL 7");
        setTimeout(() => {
          navigation.navigate("Level 7");
        }, 2000);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, intervalTime]);

  const handleStop = () => {
    if (isButtonDisabled) return;

    playSound(foundSound);
    setIsRunning(false);

    if (counter % 2 === 0) {
      setEvenCount((prevCount) => prevCount + 1);
      setIntervalTime((prev) => prev - 200);
    } else {
      setEvenCount(0);
      setIntervalTime(1000);
    }

    setIsButtonDisabled(true);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 500);

    setIsRunning(true);
  };

  const renderGreenDots = () => {
    let dots = [];
    for (let i = 0; i < evenCount; i++) {
      dots.push(<View key={i} style={styles.greenDot} />);
    }

    return dots;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stop on even numbers</Text>
      <Text style={styles.counterText}>{counter}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={handleStop}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>STOP</Text>
      </Pressable>
      {intervalTime === 0 ? (
        <Text style={styles.WinMessage}>YOU WIN!</Text>
      ) : null}

      {/* Display how many times in a row an even number was pressed */}
      {evenCount > 0 && (
        <View style={styles.greenDotContainer}>{renderGreenDots()}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 70,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(200,200,230)",
  },
  title: {
    fontSize: 23,
    fontWeight: "400",
  },
  counterText: {
    padding: 30,
    fontSize: 30,
    fontWeight: "bold",
    color: "rgb(50,50,50)",
    marginVertical: 5,
  },
  WinMessage: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgb(0,150,0)",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.95 }],
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  greenDotContainer: {
    flexDirection: "row", // Align dots horizontally
    marginTop: 20,
  },
  greenDot: {
    width: 20, // Dot width
    height: 20, // Dot height
    borderRadius: 5, // Circle shape
    backgroundColor: "rgb(0,200,0)", // Green color
    marginRight: 5, // Space between dots
    borderColor: "rgb(0,0,0)",
    borderWidth: 2,
  },
});
