import "./css/App.css";
import FlashCard from "./components/FlashCard";
import { FlashCardData } from "./types/FlashCardData";
import { useState, useEffect } from "react";
import FlashCardPriorityQueue from "./types/FlashCardQueue";
import { FlashCardDeck } from "./types/FlashCardDeck";

function App() {
  const [flashCard, setFlashCard] = useState<FlashCardData | null>(null);
  const flashCardQueue = new FlashCardPriorityQueue();
  const deck = new FlashCardDeck();

  useEffect(() => {
    // Clear queue and reload cards if deck is empty
    if (deck.isEmpty()) {
      flashCardQueue.clear();
      import("../sample_data/sample_cards.json").then((module) => {
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
      // If deck has cards, just initialize the queue
      initializeQueue();
    }
  }, []);

  const initializeQueue = () => {
    console.log("Initializing queue with deck size:", deck.getCardCount());
    for (const card of deck.getAllCards()) {
      console.log("Enqueueing card:", { id: card.id, level: card.level });
      flashCardQueue.enqueue(card.id, card.level);
    }
    console.log("Queue size before dequeue:", flashCardQueue.getSize());
    const nextCardId = flashCardQueue.dequeue();
    console.log("Queue size after dequeue:", flashCardQueue.getSize());
    console.log("Dequeued card ID:", nextCardId, "Type:", typeof nextCardId);
    if (!nextCardId) {
      console.error("No card found - Queue might be empty");
    } else {
      const card = deck.getCard(nextCardId);
      console.log("Retrieved card:", card);
      setFlashCard(card);
    }
  };

  return (
    <>
      <div className="app-container">
        <div className="flashcard-container">
          <FlashCard card={flashCard} />
        </div>
        <div className="metrics-container">
          <div className="metrics-item">Metrics here</div>
        </div>
      </div>
    </>
  );
}

export default App;
