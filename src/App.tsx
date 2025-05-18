import "./css/App.css";
import FlashCard from "./components/FlashCard";
import { FlashCardData } from "./types/FlashCardData";
import { useState, useEffect } from "react";
import FlashCardPriorityQueue from "./types/FlashCardQueue";
import { FlashCardDeck } from "./types/FlashCardDeck";

function App() {
  const [flashCard, setFlashCard] = useState<FlashCardData | null>(null);
  const flashCardQueue = new FlashCardPriorityQueue();

  useEffect(() => {
    if (flashCardQueue.isEmpty()) {
      import("../sample_data/sample_cards.json").then((module) => {
        const deck = new FlashCardDeck();
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
        for (const card of deck.getAllCards()) {
          flashCardQueue.enqueue(card.id, card.level);
        }
        const nextCardId = flashCardQueue.dequeue();
        if (!nextCardId) {
          console.error("No card found");
        } else {
          setFlashCard(deck.getCard(nextCardId));
        }
      });
    }
  }, []);

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
