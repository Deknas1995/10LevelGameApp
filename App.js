import "react-native-gesture-handler"; // Must be at the top for gesture handling
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Level1 from "./Screens/Level1";
import Level2 from "./Screens/Level2";
import Level3 from "./Screens/Level3";
import Level4 from "./Screens/Level4";
import Level5 from "./Screens/Level5";
import Level6 from "./Screens/Level6";
import Level7 from "./Screens/Level7";

const Stack = createStackNavigator(); // Create a Stack Navigator

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Level 6"
        screenOptions={{ headerShown: true, headerLeft: null }}
      >
        <Stack.Screen name="Level 1" component={Level1} />
        <Stack.Screen name="Level 2" component={Level2} />
        <Stack.Screen name="Level 3" component={Level3} />
        <Stack.Screen name="Level 4" component={Level4} />
        <Stack.Screen name="Level 5" component={Level5} />
        <Stack.Screen name="Level 6" component={Level6} />
        <Stack.Screen name="Level 7" component={Level7} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
