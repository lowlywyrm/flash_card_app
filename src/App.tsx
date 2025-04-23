import "./css/App.css";
import FlashCard from "./components/FlashCard";
import { createFlashCard } from "./types/FlashCardData";

function App() {
  const question =
    "Describe scoping for variables defined with the let keyword in Javascript.";
  const answer =
    "Variables defined with let are only accessible in the block in which they are defined (They are block-scoped).";
  const flashCard = createFlashCard(question, answer);
  return (
    <>
      <FlashCard card={flashCard} />
    </>
  );
}

export default App;
