import React, { useState } from "react";
import { FlashCardData } from "../models/FlashCardData";
import "../css/FlashCard.css";

interface FlashCardProps {
  card: FlashCardData | null;
}

const FlashCard: React.FC<FlashCardProps> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleSubmit = (userAnswer: string) => {
    console.log(userAnswer);
    setIsFlipped(!isFlipped);
  };

  const handleCorrect = () => {
    console.log("Correct");
    setIsFlipped(false);
    setAnswer("");
  };

  const handleIncorrect = () => {
    console.log("Incorrect");
    setIsFlipped(false);
    setAnswer("");
  };

  if (!card) {
    return <div>No card found</div>;
  }

  return (
    <div className={`flash-card ${isFlipped ? "flipped" : ""}`}>
      <div className="flash-card-inner">
        <div className="flash-card-front">
          <div className="card-content">
            <h3>Question</h3>
            <p>{card.question}</p>
            <div className="level-indicator">Level: {card.level}</div>
          </div>
          <div className="input-area">
            <textarea
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer"
            />
            <button onClick={() => handleSubmit(answer)}>Submit</button>
          </div>
        </div>
        <div className="flash-card-back">
          <div className="card-content">
            <h3>Answer</h3>
            <p>{card.answer}</p>
          </div>
          <div className="answer-buttons">
            <button className="correct-button" onClick={handleCorrect}>
              {"\u2713"}
            </button>
            <button className="incorrect-button" onClick={handleIncorrect}>
              {"\u2717"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
