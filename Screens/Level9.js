import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Button } from "react-native-web";

export default function Level9({ navigation }) {


  return (
    <View style={styles.container}>
      <Text>lvl 9</Text>
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
  counterText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(50,50,50)",
    marginVertical: 5,
  },
});
