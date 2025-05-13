import React, { useState } from "react";
import { FlashCardData } from "../types/FlashCardData";
import "../css/FlashCard.css";

interface FlashCardProps {
  card: FlashCardData;
}

const FlashCard: React.FC<FlashCardProps> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [answer, setAnswer] = useState("");
  const handleSubmit = (userAnswer: string) => {
    console.log(userAnswer);
    setIsFlipped(!isFlipped);
  };

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
            <input
              type="text"
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
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
