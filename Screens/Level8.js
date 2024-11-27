import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";

import { Audio } from "expo-av";
import btnSound from "../Sounds/btn_click.mp3";
import wrongSound from '../Sounds/wrongBtn.mp3';

export default function Level8({ navigation }) {

  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  };


  // State to control modal visibility, tracking the current question
  const [modalVisible, setModalVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1); // Start with the first question
  const [userAnswer, setUserAnswer] = useState(""); // User's answer for the current question
  const [showFeedback, setShowFeedback] = useState(""); // Show feedback for correct/incorrect answers

  const timeDuration = 120;
  const [timeLeft, setTimeLeft] = useState(timeDuration); // Timer state for 60 seconds
  const [timerActive, setTimerActive] = useState(false); // Flag to track if the timer is active

  const timerRef = useRef(null); // Reference to store the timer interval ID

  const questions = [
    {
      question: "Which animal can sleep for up to three years at a time?",
      options: ["🐢", "🐸", "🦑"],
      correctAnswer: "🦑",  // The answer is the "Giant Squid"
    },
    {
      question: "Which animal has the longest migration route?",
      options: ["🦢", "🐋", "🦅"],
      correctAnswer: "🐋",  // The answer is the "Gray Whale"
    },
    {
      question: "Which animal's brain is the size of a peanut?",
      options: ["🐧", "🐘", "🦓"],
      correctAnswer: "🐧",  // The answer is the "Penguin"
    },
    {
      question: "Which animal can change its gender depending on the environment?",
      options: ["🐠", "🦎", "🐸"],
      correctAnswer: "🐠",  // The answer is the "Clownfish"
    },
    {
      question: "Which animal can hold its breath for over an hour underwater?",
      options: ["🐬", "🐊", "🐅"],
      correctAnswer: "🐊",  // The answer is the "Crocodile"
    },
    {
      question: "Which animal can produce the loudest sound of any animal?",
      options: ["🐋", "🦁", "🐯"],
      correctAnswer: "🐋",  // The answer is the "Blue Whale"
    },
  ];
  
  

  // Function to handle answer selection
  const handleAnswer = (answer) => {
    setUserAnswer(answer);
    const correctAnswer = questions[currentQuestion - 1].correctAnswer;

    if (answer === correctAnswer) {
      playSound(btnSound);

      // If correct, move to the next question
      if (currentQuestion < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setModalVisible(true); // Show next modal
      } else {
        setTimeout(() => {
          setModalVisible(false);
        }, 500);
        
        setShowFeedback("Congratulations!");
        setTimeout(() => {
          navigation.navigate("Level 9");
        }, 1000);
      }
    } else {
      playSound(wrongSound);

      setShowFeedback("Incorrect! Try again!");
      setCurrentQuestion(1); // Restart the game
      setModalVisible(false); // Close all modals
      resetTimer(); // Reset the timer if the answer is wrong
    }
  };

  // Modal content for each question
  const renderQuestionModal = () => {
    const questionData = questions[currentQuestion - 1];

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{questionData.question}</Text>
            {questionData.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}

            {currentQuestion === questions.length && (
              <Text style={styles.correctFeedbackText}>{showFeedback}</Text>
            )}
            <Text style={styles.timerText}>Time Left: {timeLeft}s</Text>
          </View>
        </View>
      </Modal>
    );
  };

  // Function to start the timer when the first question modal appears
  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // Clear any existing timer
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timerRef.current); // Stop the timer
          resetGame(); // Reset the game if time runs out
        }
        return prevTime - 1;
      });
    }, 1000); // Update timer every second
  };

  // Function to reset the game
  const resetGame = () => {
    setTimeLeft(timeDuration); // Reset time to initial time duration
    setCurrentQuestion(1); // Restart from the first question
    setModalVisible(false); // Close any open modals
    setShowFeedback(""); // Clear any feedback
  };

  // Reset the timer if the answer is wrong
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // Stop any active timer
    }
    setTimeLeft(timeDuration); // Reset time to initial time duration
    setTimerActive(false); // Stop the timer
  };

  useEffect(() => {
    // Clean up the timer when the component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.levelText}>Quiz</Text>

      {/* Button to start the first question */}
      <Pressable
        style={styles.startButton}
        onPress={() => {
          playSound(btnSound);
          setModalVisible(true); // Show the first question modal
          startTimer(); // Start the timer when the quiz begins
          setShowFeedback(""); // Clear any feedback
        }}
      >
        <Text style={styles.buttonText}>Start</Text>
      </Pressable>

      {currentQuestion !== 6 && (
        <Text style={styles.badFeedbackText}>{showFeedback}</Text>
      )}

      {/* Render the current question modal */}
      {renderQuestionModal()}
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
  levelText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  startButton: {
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "rgba(76, 175, 80, 0.3)",
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  optionText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  badFeedbackText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "rgb(255,0,0)",
  },
  correctFeedbackText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "rgb(0,220,0)",
  },
  timerText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Timer text color
  },
});
