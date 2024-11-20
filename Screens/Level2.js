import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Level2({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.title}>Press</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Level 3")}>
        <Text style={styles.title}> hedgehog </Text>
      </Pressable>

      <Pressable>
        <Text style={styles.title}>to go to the next level.</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
  },
  title: {
    fontSize: 20,
    textAlign: "center", 
  },
});
