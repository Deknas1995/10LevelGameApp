import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Audio } from 'expo-av';

// Import sounds
import btnSound from '../Sounds/btn_sound.wav';
import wrongSound from '../Sounds/btn_click.mp3';

const playSound = async (soundFile) => {
  const { sound } = await Audio.Sound.createAsync(soundFile);
  await sound.playAsync();
};


export default function Level4({ navigation }) {
  const [btnPressed, setBtnPressed] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const correctSequence = [1, 3, 4, 6];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayError, setDisplayError] = useState(false);
  const [displayCorrect, setDisplayCorrect] = useState(false);

  const handleButtonPress = (btnVal) => {

    if (btnVal === correctSequence[currentIndex]) {
      playSound(btnSound); // Play correct button sound

      setInputValue((prevValue) => prevValue + btnVal.toString());
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setDisplayCorrect(true);

      if (currentIndex + 1 === correctSequence.length) {
        console.log("sequence completed!");
        setDisplayCorrect(true);
        navigation.navigate("Level 5")
      }

      setTimeout(() => {
        setDisplayCorrect(false);
      }, 300);

    } else {
      playSound(wrongSound); // Play wrong button sound

      setCurrentIndex(0);
      setInputValue("WRONG!");
      setDisplayError(true);

      // Reset the error styles after a short delay
      setTimeout(() => {
        setDisplayError(false);
        setInputValue("");
      }, 500);
    }
  };

  const buttonNumbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <View
          style={[
            styles.display,
            displayError && styles.displayError,
            displayCorrect && styles.displayCorrect,
          ]}
        >
          <Text style={styles.displayText}>
            {inputValue || "Enter secret code"}
          </Text>
        </View>

        {buttonNumbers.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((buttonVal) => (
              <Pressable
                key={buttonVal}
                style={[
                  styles.button,
                  btnPressed === buttonVal && styles.buttonPressed,
                ]}
                onPressIn={() => setBtnPressed(buttonVal)}
                onPressOut={() => setBtnPressed(null)}
                onPress={() => handleButtonPress(buttonVal)}
              >
                <Text style={styles.buttonText}>{buttonVal}</Text>
              </Pressable>
            ))}
          </View>
        ))}

        <Pressable
          key={0}
          style={[styles.zeroButton, btnPressed === 0 && styles.buttonPressed]} // Custom style for the "0" button
          onPressIn={() => setBtnPressed(0)}
          onPressOut={() => setBtnPressed(null)}
          onPress={() => handleButtonPress(0)}
        >
          <Text style={styles.buttonText}>{0}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 70,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  display: {
    alignSelf: "stretch", // Make display span the full width of the grid
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(240, 240, 240)",
    borderWidth: 2,
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  displayText: {
    padding: 20,
    fontSize: 20,
    color: "rgb(50, 50, 50)",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "column", // Arrange rows vertically
    borderWidth: 2,
    borderColor: "rgb(222, 222, 222)",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "rgb(235, 235, 235)",
  },
  row: {
    flexDirection: "row", // Arrange buttons horizontally
    marginBottom: 10,
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(100, 100, 100)",
    borderWidth: 2,
    borderColor: "buttonVal",
    borderRadius: 10,
    margin: 5,
  },
  zeroButton: {
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2ecc71", // Different color for the "0" button
    borderWidth: 2,
    borderColor: "rgb(10, 10, 10)",
    borderRadius: 10,
    margin: 5,
  },
  displayError: {
    fontWeight:"900",
    borderColor:"black",
    backgroundColor: "red", // Make display red when an error occurs
  },
  displayCorrect: {
    fontWeight:"900",
    borderColor:"black",
    backgroundColor: "green", // Make display red when an error occurs
  },
  buttonText: {
    fontSize: 30,
    color: "#fff",
  },
  buttonPressed: {
    backgroundColor: "rgb(200, 200, 200)",
  },
});
