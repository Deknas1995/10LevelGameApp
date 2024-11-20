import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Level1({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Can you solve 20 Levels?</Text>

      <View style={styles.buttons}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Level 2")}
        >
          <Text style={styles.buttonText}>Yes</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Level 2")}
        >
          <Text style={styles.buttonText}>No</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50", // Background color
    paddingVertical: 15, // Button height
    paddingHorizontal: 25, // Button width
    margin: 10, // Space between buttons
    borderRadius: 5, // Rounded corners
  },
  buttonText: {
    color: "white", // Text color
    fontSize: 40, // Font size
    textAlign: "center", // Center the text
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    padding: 20,
    fontSize: 30,
  },
});
