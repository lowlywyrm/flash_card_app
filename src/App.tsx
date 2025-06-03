import "./css/App.css";
import FlashCard from "./components/FlashCard";
import { FlashCardData } from "./models/FlashCardData";
import { useState, useEffect } from "react";
import FlashCardPriorityQueue from "./models/FlashCardQueue";
import { FlashCardDeck } from "./models/FlashCardDeck";

function App() {
  const deckLabelSet = new Set(
    Object.keys(JSON.parse(localStorage.getItem("deckLabelSet") || "{}"))
  );

  const [flashCard, setFlashCard] = useState<FlashCardData | null>(null);

  const initializeQueue = (
    deck: FlashCardDeck,
    flashCardQueue: FlashCardPriorityQueue
  ) => {
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

  // Map deck levels (strings) to decks
  let deckMap: Map<string, FlashCardDeck> = new Map<string, FlashCardDeck>();
  for (const deckLabel of deckLabelSet) {
    const deck = new FlashCardDeck(deckLabel);
    const flashCardQueue = new FlashCardPriorityQueue(deckLabel);
    deckMap.set(deckLabel, deck);

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
          initializeQueue(deck, flashCardQueue);
        });
      } else {
        // If deck has cards, just initialize the queue
        initializeQueue(deck, flashCardQueue);
      }
    }, []);
  }

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
