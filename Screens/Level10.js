import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Modal, Button } from "react-native";
import { Audio } from "expo-av";
import foundSound from "../Sounds/btn_click.mp3";

const allEmojiLists = [
  ["🦈", "🐛", "🐑", "🐝", "🐋", "🦔", "🐀", "🦄", "🐕", "🐢"], // emojiList
  ["🦜", "🐠", "🐓", "🐷", "🦍", "🐘", "🐂", "🐶", "🦧", "🐄"], // emojiList2
  ["🦥", "🦦", "🐱", "🦚", "🦉", "🦨", "🦩", "🦙", "🐬", "🦃"], // emojiList3
  ["🦒", "🐕‍🦺", "🦭", "🐌", "🐟", "🐜", "🪳", "🦘", "🐅", "🐞"], // emojiList4
  ["🐒", "🐎", "🦦", "🐪", "🐧", "🐃", "🐒", "🐹", "🦅", "🦋"], // emojiList...
  ["🦣", "🐇", "🐿️", "🐍", "🦎", "🐩", "🐗", "🦌", "🦢", "🐥"],
  ["🦫", "🐏", "🪶", "🐭", "🦦", "🐴", "🐬", "🐇", "🐯", "🐾"],
  ["🦛", "🐓", "🦏", "🐿️", "🦄", "🐬", "🐒", "🦓", "🦨", "🐹"],
];

export default function Level10({ navigation }) {
  const [index, setIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [animalRows, setAnimalRows] = useState(1);
  const [emojiLists, setEmojiLists] = useState(allEmojiLists);
  const [sleepTime, setSleepTime] = useState(1000);
  const [found, setFound] = useState(0);
  const animalCount = 4;

  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  };

  // Measure the width of the container
  const containerRef = useRef(null);
  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };
  const emojiFontSize = containerWidth * 0.1;

  useEffect(() => {
    console.log("mounted");
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % allEmojiLists[0].length); //Index 0-9
    }, sleepTime);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [sleepTime]);

  // Rotate lists
  const rotatedLists = emojiLists.map((list) => {
    const rotated = [...list.slice(index), ...list.slice(0, index)];
    return rotated;
  });

  const handlePress = (emoji) => {
    if (emoji === "🦔") {
      setSleepTime((prev) => prev * 0.9);
      playSound(foundSound);
      setFound((prev) => prev + 1);
      setAnimalRows((prev) => prev + 1);

      setEmojiLists((prevLists) => {
        // Find the list containing the hedgehog
        const sourceIndex = prevLists.findIndex((list) => list.includes("🦔"));
        if (sourceIndex === -1) return prevLists; // Hedgehog not found, no changes

        // Remove hedgehog from the current list
        const updatedLists = prevLists.map((list, idx) =>
          idx === sourceIndex ? list.filter((item) => item !== "🦔") : list
        );

        // Find valid indices for the random list
        const validIndices = updatedLists
          .map((_, idx) => idx) // Get all indices
          .filter((idx) => idx <= animalRows - 1); // Filter by the condition

        // If there are no valid indices, keep the lists unchanged
        if (validIndices.length === 0) return updatedLists;

        // Select a random index from validIndices
        const randomIndex =
          validIndices[Math.floor(Math.random() * validIndices.length)];

        // Add the hedgehog to the selected list
        updatedLists[randomIndex].push("🦔");
        //console.log("added hedghe to list with index = " + randomIndex);

        return updatedLists;
      });

      console.log("Found: " + found + " => 🦔");
    }
  };

  const restartGame = () => {
    setFound(0);
    navigation.navigate("Level 1");
  };

  return (
    <>
      {/* Check if player found 10 🦔*/}
      {found === 10 ? (
        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                {"🏆  🏆  🏆\nYOU WIN!\n🏆  🏆  🏆"}
              </Text>
              <Pressable 
                style={styles.restartGameBtn}
                onPress={() => restartGame()}>
                  <Text style={styles.buttonText}>Restart Game!</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      ) : (
        <>
          <View
            style={styles.container}
            ref={containerRef}
            onLayout={handleLayout} // Measure container width
          >
            <Text>🦔 {found}/10</Text>

            {rotatedLists.slice(0, animalRows).map((emojiList, index) => (
              <View key={index} style={styles.row}>
                {emojiList.slice(0, animalCount).map((emoji, index) => (
                  <Pressable key={index} onPress={() => handlePress(emoji)}>
                    <Text style={[styles.emoji, { fontSize: emojiFontSize }]}>
                      {emoji}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column", // Display emojis in a row
    borderWidth: 2,
  },
  emoji: {
    marginHorizontal: 10, // Space between emojis
  },
  row: {
    flexDirection: "row",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "rgb(0,180,0)",
  },
  modalTextGreen: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "rgb(0,180,0)",
  },
  restartGameBtn: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 40,
  },
});
