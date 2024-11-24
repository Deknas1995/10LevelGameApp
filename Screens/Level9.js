import { shuffle } from 'lodash'; 
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import { Audio } from "expo-av";
import wrongSound from "../Sounds/btn_click.mp3";

const emojiList = [
  "🦈", "🐛", "🐑", "🐝", "🐋", "🦉", "🐀", "🦄", "🐕", "🐢", 
  "🦜", "🐠", "🐓", "🐷", "🦍", "🐘", "🐂", "🐶", "🦧", "🐄", 
  "🦥", "🦦", "🐱", "🦚", "🐡", "🦨", "🦩", "🦙", "🐬", "🦃", 
  "🦒", "🐕‍🦺", "🦭", "🐌", "🐟", "🐜", "🪳", "🦘", "🐅", "🐞", 
  "🐒", "🐎", "🦦", "🐪", "🐧", "🐃", "🐒", "🐹", "🦅", "🦋", 
  "🦣", "🐇", "🐿️", "🐍", "🦎", "🐩", "🐗", "🦌", "🦢", "🐥", 
  "🦫", "🐏", "🪶", "🐭", "🦦", "🐴", "🐬", "🐇", "🐯", "🐾", 
  "🦛", "🐓", "🦏", "🐿️", "🦄", "🐬", "🐒", "🦓", "🦨", "🐹", 
  "🦈", "🐛", "🐑", "🐝", "🐋", "🦉", "🐀", "🦄", "🐕", "🐢", 
  "🦜", "🐠", "🐓", "🐷", "🦍", "🐘", "🐂", "🐶", "🦧", "🐄", 
  "🦥", "🦦", "🐱", "🦚", "🐡", "🦨", "🦩", "🦙", "🐬", "🦃", 
  "🐖", "🐸", "🦥", "🐒", "🦆", "🐒", "🦤", "🦦", "🦢", "🐣", 
  "🐺", "🦦", "🐔", "🐤", "🦢", "🐸", "🦥", "🐦", "🐿️", "🦙", 
  "🦭", "🦮", "🐾", "🦢", "🦬", "🦡", "🐜", "🦎", "🐇", "🐦", 
  "🦜", "🐋", "🪲", "🐙", "🦂", "🕷️", "🦗", "🐊", "🦧", "🐩", 
  "🐾", "🦛", "🐉", "🐕‍🦺", "🦒", "🦦", "🐏", "🦄", "🐢", "🦜", 
  "🐠", "🐓", "🐷", "🦍", "🐘", "🐂", "🐶", "🦧", "🐄", "🦥", 
  "🦦", "🐱", "🦚", "🐡", "🦨", "🦩", "🦙", "🐬", "🦃", "🦒", 
  "🐕‍🦺", "🦭", "🐌", "🐟", "🐜", "🪳", "🦘", "🐅", "🐞", "🐒", 
  "🐎", "🦦", "🐪", "🐧", "🐃", "🐒", "🐹", "🦅", "🦋", "🦣", 
  "🐇", "🐿️", "🐍", "🦎", "🐩", "🐗", "🦌", "🦢", "🐥", "🦫", 
  "🐏", "🪶", "🐭", "🦦", "🐴", "🐬", "🐇", "🐯", "🐾", "🦛", 
  "🐓", "🦏", "🐿️", "🦄", "🐬", "🦛", "🦓", "🦨", "🐹", "🐖", 
  "🐸", "🦥", "🐒", "🦆", "🐒", "🦤", "🦦", "🦢", "🐣", "🐺", 
  "🦦", "🐔", "🐤", "🦢", "🐸", "🦥", "🐦", "🐿️", "🦙", "🦭", 
  "🦈", "🐛", "🐑", "🐝", "🐋", "🦉", "🐀", "🦄", "🐕", "🐢", 
  "🦜", "🐠", "🐓", "🐷", "🦍", "🐘", "🐂", "🐶", "🦧", "🐄", 
  "🦥", "🦦", "🐱", "🦚", "🐡", "🦨", "🦩", "🦙", "🐬", "🦃", 
  "🦈", "🐛", "🐑", "🐝", "🐋", "🦉", "🐀", "🦄", "🐕", "🐢", 
  "🦜", "🐠", "🐓", "🐷", "🦍", "🐘", "🐂", "🐶", "🦧", "🐄", 
  "🦥", "🦦", "🐱", "🦚", "🐡", "🦨", "🦩", "🦙", "🐬", "🦃", 
  "🦮", "🐾", "🦢", "🦬", "🦡", "🐜", "🦎", "🐇", "🐦", "🦜", 
  "🐋", "🪲", "🐙", "🦂", "🕷️", "🦗", "🐊", "🦧", "🐩", "🐾", 
  "🪲", "🦛", "🐉", "🐕‍🦺", "🦒", "🦦", "🐏", "🦄", "🐢", "🦜", 
  "🐠", "🐓", "🐷", "🦍", "🐘", "🐂", "🐶", "🦧", "🐄", "🦥", 
  "🦦", "🐱", "🦚", "🐡", "🦨", "🦩", "🦙", "🐬", "🦃", "🦒", 
  "🐕‍🦺", "🦭", "🐌", "🐟", "🐜", "🪳", "🦘", "🐅", "🐞", "🐒", 
  "🐎", "🦦", "🐪", "🐧", "🐃", "🐒", "🐹", "🦅", "🦋", "🦣", 
  "🐇", "🐿️", "🐍", "🦎", "🐩", "🐗", "🦌", "🦢", "🐥", "🦫", 
  "🐏", "🪶", "🐭", "🦦", "🐴", "🐬", "🐇", "🐯", "🐾", "🦛", 
  "🐓", "🦏", "🐿️", "🦄", "🐬", "🦦", "🦓", "🦨", "🐹", "🐖", 
  "🐸", "🦥", "🐒", "🦆", "🐒", "🦤", "🦦", "🦢", "🐣", "🐺", 
  "🦦", "🐔", "🐤", "🦢", "🐸", "🦥", "🐦", "🐿️", "🦙", "🦭", 
  "🦮", "🐾", "🦢", "🦬", "🦡", "🐜", "🦎", "🐇", "🐦", "🦜", 
  "🐋", "🪲", "🐙", "🦂", "🕷️", "🦗", "🐊", "🦧", "🐩", "🐾", 
  "🐇", "🐿️", "🐍", "🦎", "🐩", "🐗", "🦌", "🦢", "🐥", "🦫", 
  "🐏", "🪶", "🐭", "🦦", "🐴", "🐬", "🐇", "🐯", "🐾", "🦛", 
  "🐓", "🦏", "🐿️", "🦄", "🐬", "🦦", "🦓", "🦨", "🐹", "🐖", 
  "🐸", "🦥", "🐒", "🦆", "🐒", "🦤", "🦦", "🦢", "🐣", "🐺", 
  "🦦", "🐔", "🐤", "🦢", "🐸", "🦥", "🐦", "🐿️", "🦙", "🦭", 
  "🦮", "🐾", "🦢", "🦬", "🦡", "🐜", "🦎", "🐇", "🐦", "🦜", 
  "🐋", "🪲", "🐙", "🦂", "🕷️", "🦗", "🐊", "🦧", "🐩", "🐾", 
  "🐇", "🐿️", "🐍", "🦎", "🐩", "🐗", "🦌", "🦢", "🐥", "🦫", 
  "🐏", "🪶", "🐭", "🦦", "🐴", "🐬", "🐇", "🐯", "🐾", "🦛", 
  "🐓", "🦏", "🐿️", "🦄", "🐬", "🦦", "🦓", "🦨", "🐹", "🐖", 
  "🐸", "🦥", "🐒", "🦆", "🐒", "🦤", "🦦", "🦢", "🐣", "🐺", 
  "🦦", "🐔", "🐤", "🦢", "🐸", "🦥", "🐦", "🐿️", "🦙", "🦭", 
  "🦮", "🐾", "🦢", "🦬", "🦡", "🐜", "🦎", "🐇", "🐦", "🦜", 
  "🐋", "🪲", "🐙", "🦂", "🕷️", "🦗", "🐊", "🦧", "🐩", "🐾", 
  "🦜", "🐠", "🐓", "🐷", "🦍", "🐘", "🐂", "🐶", "🦧", "🐄", 
  "🦥", "🦦", "🐱", "🦚", "🐡", "🦨", "🦩", "🦙", "🐬", "🦃", 
  "🦒", "🐕‍🦺", "🦭", "🐌", "🐟", "🐜", "🪳", "🦘", "🐅", "🐞", 
  "🐒", "🐎", "🦦", "🐪", "🐧", "🐃", "🐒", "🐹", "🦅", "🦋", 
  "🦥", "🦦", "🐱", "🦚", "🐡", "🦨", "🦩", "🦙", "🐬", "🦃", 
  "🦒", "🐕‍🦺", "🦭", "🐌", "🐟", "🐜", "🪳", "🦘", "🐅", "🐞", 
  "🐒", "🐎", "🦦", "🐪", "🐧", "🐃", "🐒", "🐹", "🦅", "🦋", 
  "🦣", "🐇", "🐿️", "🐍", "🦎", "🐩", "🐗", "🦌", "🦢", "🐥", 
  "🦫", "🐏", "🪶", "🐭", "🦦", "🐴", "🐬", "🐇", "🐯", "🐾", 
  "🦛", "🐓", "🦏", "🐿️", "🦄", "🐬", "🐒", "🦓", "🦨", "🐹", 
  "🦣", "🐇", "🐿️", "🐍", "🦎", "🐩", "🐗", "🦌", "🦢", "🐥", 
  "🦫", "🐏", "🪶", "🐭", "🦦", "🐴", "🐬", "🐇", "🐯", "🐾", 
  "🦛", "🐓", "🦏", "🐿️", "🦄", "🐬", "🐒", "🦓", "🦨", "🐹", 
  "🐖", "🐸", "🦥", "🐒", "🦆", "🐒", "🦤", "🦦", "🦢", "🐣", 
  "🐺", "🦦", "🐔", "🐤", "🦢", "🐸", "🦥", "🐦", "🐿️", "🦙", 
  "🦭", "🦮", "🐾", "🦢", "🦬", "🦡", "🐜", "🦎", "🐇", "🐦", 
  "🦜", "🐋", "🪲", "🐙", "🦂", "🕷️", "🦗", "🐊", "🦧", "🐩", 
  "🐾", "🦛", "🐉", "🐕‍🦺", "🦒", "🦦", "🐏", "🦄", "🐢", "🦜", 
  "🐠", "🐓", "🐷", "🦍", "🐘", "🐂", "🐶", "🦧", "🐄", "🦥", 
  "🦛", "🦛", "🐉", "🐕‍🦺", "🦒", "🦦", "🐏", "🦄"
];

const playSound = async (soundFile) => {
  const { sound } = await Audio.Sound.createAsync(soundFile);
  await sound.playAsync();
};

export default function Level9({ navigation }) {
  const timeDuration = 25;
  const startAnimals = 20;
  
  const [startGame, setStartGame] = useState(false);

  const [animalCount, setAnimalCount] = useState(startAnimals);
  const [timeLeft, setTimeLeft] = useState(timeDuration);
  const [message, setMessage] = useState(""); // State for message visibility
  const [messageColor, setMessageColor] = useState("red"); // New state for message color
  const [foundCounter, setFoundCounter] = useState(0);
  const [bgColor, setBgColor] = useState("transparent");

  const timerRef = useRef(null);

  const [shuffledEmojis, setShuffledEmojis] = useState([]);

  const handleShuffle = () => {
    const shuffled = shuffle(emojiList).slice(0, animalCount); // Shuffle and slice the list
    const randomIndex = Math.floor(Math.random() * shuffled.length); // Generate a random index
    shuffled.splice(randomIndex, 0, "🦔"); // Insert 🦔 at the random index
    setShuffledEmojis(shuffled); // Update the state with shuffled emojis

    setTimeout(() => {
      setMessage("");
    }, 3000);
    
  };
  

  // Start the timer countdown
  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      playSound(wrongSound);
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timerRef.current);
          showMessageAndReset(); // Show the message and reset game
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Show the "you failed" message for 2 seconds and reset the timer
  const showMessageAndReset = () => {
    setFoundCounter(0);
    setMessage("You failed! Try again!"); // Show the message
    setMessageColor("red"); // Set the message color to red
    setBgColor("rgb(255,100,100)")
    setTimeout(() => {
      setBgColor("transparent")
    }, 2000);

    setTimeout(() => {
      setAnimalCount(startAnimals);
      handleShuffle();
      setMessage(""); // Hide the message after 2 seconds
      setTimeLeft(timeDuration); // Reset the timer
      startTimer(); // Restart the timer
    }, 2000); // 2-second delay
  };

  // Handle emoji press (check if it matches the hedgehog)
  const handlePress = (emoji) => {
    if (emoji === "🦔") {
      console.log("U FOUND HIM!");
      //setMessage("You found the hedgehog!"); // Show a success message
      //setMessageColor("green"); // Set the message color to green
      setBgColor("lightgreen")
      setTimeout(() => {
        setBgColor("transparent")
      }, 300);

      setAnimalCount((prev) => prev + 50);
      handleShuffle();

      setFoundCounter((prev) => prev + 1);
    }
  };

  const checkIfGameWon = () => {
    if (foundCounter >= 6) {
      clearInterval(timerRef.current);
      setTimeout(() => {
        setFoundCounter(0);
        navigation.navigate("Level 10");
      }, 2000);
      return true;
    }
    return false;
  };
  
  useEffect(() => {

    if(startGame)
    {
      startTimer(); // Start the timer when start btn pressed
      setAnimalCount((prev) => prev + 50);
      handleShuffle(); // Shuffle emojis when component mounts
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current); // Clean up timer when component unmounts
      }
    };
  }, [startGame]);

  return (
    <>
      {/* Initial Modal for Starting the Game */}
      {!startGame ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{`You have ${timeDuration}s To Find 6 🦔 `}</Text>
              <Button style={styles.StartGameBtn} title="Start Game" onPress={() => setStartGame(true)} />
            </View>
          </View>
        </Modal>
      ) : (
        <>
          {/* Modal shown when enough hedgehogs are found */}
          {checkIfGameWon() ? (
            <Modal
              visible={true}
              animationType="slide"
              transparent={true}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Congratulations, You Win!</Text>
                </View>
              </View>
            </Modal>
          ) : (
            <>
              {/* Gameplay Content */}
              <Text style={styles.timerText}>{`(${foundCounter}/6) Time Left: ${timeLeft}s`}</Text>
              {message !== "" && (
                <Text style={[styles.messageText, { color: messageColor }]}>
                  {message}
                </Text>
              )}
  
              {/* ScrollView for scrolling the emoji list */}
              <ScrollView
                style={[
                  styles.scrollView,
                  { height: 1 },
                  { backgroundColor: bgColor },
                ]}
                contentContainerStyle={styles.container}
              >
                {shuffledEmojis.slice(0, animalCount).map((emoji, index) => (
                  <Pressable key={index} onPress={() => handlePress(emoji)}>
                    <Text
                      style={[
                        styles.emoji,
                        { /* backgroundColor: emoji === "🦔" ? "red" : null */ },
                      ]}
                    >
                      {emoji}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </>
          )}
        </>
      )}
    </>
  );
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  timerText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Timer text color
    textAlign: "center",
  },
  messageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red", // Error message color
    marginBottom: 20,
    textAlign: "center",
  },
  scrollView: {
    width: "100%",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // Center the emojis
  },
  emoji: {
    fontSize: 30,
    margin: 5, // Add spacing between emojis
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
    textAlign:"center",
    color: "rgb(0,140,0)"
  },
  StartGameBtn:{
    borderWidth: 0,
  }
});
