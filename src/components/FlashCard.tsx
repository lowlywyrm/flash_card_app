import React, { useState } from "react";
import { FlashCardData } from "../models/FlashCardData";
import "../css/FlashCard.css";

interface FlashCardProps {
  card: FlashCardData | null;
  onAnswer: (isCorrect: boolean) => void;
}

const FlashCard: React.FC<FlashCardProps> = ({ card, onAnswer }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [submittedAnswer, setSubmittedAnswer] = useState("");

  const handleSubmit = (userAnswer: string) => {
    console.log("User answer:", userAnswer);
    console.log("Submitted answer:", submittedAnswer);
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      console.log("Correct");
    } else {
      console.log("Incorrect");
    }
    setIsFlipped(false);
    setSubmittedAnswer("");
    const input = document.getElementById(
      "submitted-answer-input"
    ) as HTMLTextAreaElement;
    input.value = "";
  };

  const handleTransitionEnd = () => {
    if (!isFlipped) {
      onAnswer(true); // We'll handle the actual correctness in FlashCardUI
    }
  };

  if (!card) {
    return <div>No card found</div>;
  }

  return (
    <div
      className={`flash-card ${isFlipped ? "flipped" : ""}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="flash-card-inner">
        <div className="flash-card-front">
          <div className="card-content">
            <h3>Question</h3>
            <p>{card.question}</p>
            <div className="level-indicator">Level: {card.level}</div>
          </div>
          <div className="input-area">
            <textarea
              id="submitted-answer-input"
              onChange={(e) => setSubmittedAnswer(e.target.value)}
              placeholder="Enter your answer"
            />
            <button onClick={() => handleSubmit(submittedAnswer)}>
              Submit
            </button>
          </div>
        </div>
        <div className="flash-card-back">
          <div className="card-content">
            <h3>Answer</h3>
            <p>{card.answer}</p>
            <h3>Submitted answer</h3>
            <p>{submittedAnswer}</p>
          </div>
          <div className="answer-buttons">
            <button
              className="correct-button"
              onClick={() => handleAnswer(true)}
            >
              {"\u2713"}
            </button>
            <button
              className="incorrect-button"
              onClick={() => handleAnswer(false)}
            >
              {"\u2717"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
