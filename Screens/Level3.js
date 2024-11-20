import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TextInput } from "react-native-gesture-handler";

const Tab = createMaterialTopTabNavigator();

// Define the first tab screen
function Tab1() {
  return (
    <View style={styles.tabContainer}>
      <Text style={styles.tabText}>1</Text>
    </View>
  );
}

// Define the second tab screen
function Tab2() {
  return (
    <View style={styles.tabContainer}>
      <Text style={styles.tabText}>2</Text>
    </View>
  );
}

// Define the third tab screen
function Tab3() {
  return (
    <View style={styles.tabContainer}>
      <Text style={styles.tabText}>4</Text>
    </View>
  );
}

export default function Level3({ navigation }) {
  const [inputText, setInputText] = useState("");

  const checkInput = (text) => {
    setInputText(text);

    console.log(inputText);

    if (text === "124") {
      navigation.navigate("Level 4")
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter secret code here"
          value={inputText}
          onChangeText={checkInput}
        />
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <Tab.Screen name="Tab1" component={Tab1} />
        <Tab.Screen name="Tab2" component={Tab2} />
        <Tab.Screen name="Tab3" component={Tab3} />
      </Tab.Navigator>
    </View>
  );
}

// Add basic styling for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Add some padding at the top to prevent overlap
    backgroundColor: "#f5f5f5",
  },
  input: {
    marginBottom: 40,
    borderRadius: 5,
  },
  inputText: {
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 30,
    height: 60,
  },
  tabContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  tabText: {
    fontSize: 20,
  },
});
