import { useNavigate, useParams } from "react-router-dom";
import FlashCard from "./FlashCard";
import { FlashCardData } from "../models/FlashCardData";
import { FlashCardDeck } from "../models/FlashCardDeck";
import FlashCardPriorityQueue from "../models/FlashCardQueue";
import { useState, useEffect } from "react";
import "../css/FlashCardUI.css";

const FlashCardUI: React.FC = () => {
  const navigate = useNavigate();
  const { deckLabel } = useParams();
  const [flashCardComponent, setFlashCardComponent] =
    useState<FlashCardData | null>(null);
  const [deck] = useState<FlashCardDeck>(new FlashCardDeck(deckLabel!));
  const [flashCardQueue] = useState<FlashCardPriorityQueue>(
    new FlashCardPriorityQueue(deckLabel!)
  );
  const [pendingAnswer, setPendingAnswer] = useState<boolean | null>(null);

  const initializeQueue = () => {
    console.log("FlashCardUI:", deckLabel);
    console.log("Initializing queue with deck size:", deck.getCardCount());

    // Only initialize queue if it's empty
    if (flashCardQueue.isEmpty()) {
      for (const card of deck.getAllCards()) {
        console.log("Enqueueing card:", { id: card.id, level: card.level });
        flashCardQueue.enqueue(card.id, card.level);
      }
    }

    console.log("Queue size before dequeue:", flashCardQueue.getSize());
    const nextCardId = flashCardQueue.peek();
    console.log("Queue size after dequeue:", flashCardQueue.getSize());
    console.log("Dequeued card ID:", nextCardId, "Type:", typeof nextCardId);
    if (!nextCardId) {
      console.error("No card found - Queue might be empty");
    } else {
      const card = deck.getCard(nextCardId);
      console.log("Retrieved card:", card);
      setFlashCardComponent(card);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    setPendingAnswer(isCorrect);
  };

  const processAnswer = () => {
    if (pendingAnswer === null) return;

    // Dequeue the current card
    const currentCardId = flashCardQueue.dequeue();
    if (!currentCardId) {
      console.error("No card found in queue");
      return;
    }

    // Get the next card
    const nextCardId = flashCardQueue.peek();
    if (!nextCardId) {
      console.error("No more cards in queue");
      setFlashCardComponent(null);
    } else {
      const nextCard = deck.getCard(nextCardId);
      setFlashCardComponent(nextCard);
    }

    setPendingAnswer(null);
  };

  useEffect(() => {
    if (deck.isEmpty()) {
      import("../../sample_data/sample_cards.json").then((module) => {
        console.log("Loading sample cards...");
        module.default.cards.forEach(
          (card: {
            question: string;
            answer: string;
            category: string;
            level: number;
          }) => {
            deck.addCardFromData(
              card.question,
              card.answer,
              card.category,
              card.level
            );
          }
        );
        initializeQueue();
      });
    } else {
      initializeQueue();
    }
  }, []);

  useEffect(() => {
    if (pendingAnswer !== null) {
      processAnswer();
    }
  }, [pendingAnswer]);

  return (
    <div className="flashcard-ui">
      <div className="app-container">
        <div className="flashcard-container">
          <button
            className="back-button"
            onClick={() => navigate("/")}
            aria-label="Back to deck selection"
          >
            ←
          </button>
          <FlashCard cardData={flashCardComponent} onAnswer={handleAnswer} />
        </div>
        <div className="metrics-container">
          <div className="metrics-item">Metrics here</div>
        </div>
      </div>
    </div>
  );
};

export default FlashCardUI;
