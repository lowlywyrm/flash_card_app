import "./css/App.css";
import FlashCard from "./components/FlashCard";
import { createFlashCard } from "./types/FlashCardData";

function App() {
  const question =
    "Describe scoping for variables defined with the let keyword in Javascript.";
  const answer =
    "Variables defined with let are only accessible in the block in which they are defined (They are block-scoped).";
  let flashCard = createFlashCard(question, answer);
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
