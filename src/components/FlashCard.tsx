import React, { useState } from "react";
import { FlashCardData } from "../types/FlashCardData";
import "../css/FlashCard.css";

interface FlashCardProps {
  card: FlashCardData;
}

const FlashCard: React.FC<FlashCardProps> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flash-card ${isFlipped ? "flipped" : ""}`}
      onClick={handleClick}
    >
      <div className="flash-card-inner">
        <div className="flash-card-front">
          <div className="card-content">
            <h3>Question</h3>
            <p>{card.question}</p>
            <div className="level-indicator">Level: {card.level}</div>
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
