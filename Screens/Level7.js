import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";

export default function Level7({ navigation }) {
  // State to control modal visibility, tracking the current question
  const [modalVisible, setModalVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1); // Start with the first question
  const [userAnswer, setUserAnswer] = useState(""); // User's answer for the current question
  const [showFeedback, setShowFeedback] = useState(""); // Show feedback for correct/incorrect answers
  
  const timeDuration = 30;
  const [timeLeft, setTimeLeft] = useState(timeDuration); // Timer state for 60 seconds
  const [timerActive, setTimerActive] = useState(false); // Flag to track if the timer is active

  const questions = [
    {
      question: "What is 5 + 3?",
      options: ["7", "8", "9"],
      correctAnswer: "8",
    },
    {
      question: "What is 12 - 7?",
      options: ["4", "5", "6"],
      correctAnswer: "5",
    },
    {
      question: "What is 9 * 6?",
      options: ["54", "52", "48"],
      correctAnswer: "54",
    },
    {
      question: "What is 15 / 3?",
      options: ["3", "4", "5"],
      correctAnswer: "5",
    },
    {
      question: "What is 8 + 16?",
      options: ["22", "24", "26"],
      correctAnswer: "24",
    },
    {
      question: "What is 45 - 18?",
      options: ["27", "28", "29"],
      correctAnswer: "27",
    },
  ];

  // Function to handle answer selection
  const handleAnswer = (answer) => {
    setUserAnswer(answer);
    const correctAnswer = questions[currentQuestion - 1].correctAnswer;

    if (answer === correctAnswer) {
      // If correct, move to the next question
      if (currentQuestion < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setModalVisible(true); // Show next modal
      } else {
        setShowFeedback("Congratulations! You've completed all the questions.");
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate("Level 8");
        }, 1500);
      }
    } else {
      setShowFeedback("Incorrect! Try again!.");
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
    setTimerActive(true);
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer); // Stop the timer
          resetGame(); // Reset the game if time runs out
        }
        return prevTime - 1;
      });
    }, 1000); // Update timer every second
  };

  // Function to reset the game
  const resetGame = () => {
    setTimeLeft(timeDuration); // Reset time to 60 seconds
    setCurrentQuestion(1); // Restart from the first question
    setModalVisible(false); // Close any open modals
    setShowFeedback(""); // Clear any feedback
  };

  // Reset the timer if the answer is wrong
  const resetTimer = () => {
    setTimeLeft(timeDuration); // Reset time to 60 seconds
    setTimerActive(false); // Stop the timer
  };

  return (
    <View style={styles.container}>
      <Text style={styles.levelText}>Math Quiz</Text>

      {/* Button to start the first question */}
      <Pressable
        style={styles.startButton}
        onPress={() => {
          setModalVisible(true); // Show the first question modal
          startTimer(); // Start the timer when the quiz begins
          setShowFeedback(""); // Clear any feedback
        }}
      >
        <Text style={styles.buttonText}>Start</Text>
      </Pressable>

      <Text style={styles.feedbackText}>{showFeedback}</Text>

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
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  feedbackText: {
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
