import "./css/App.css";
import FlashCard from "./components/FlashCard";

function App() {
  return (
    <>
      <FlashCard
        card={{
          question:
            "Describe scoping for variables defined with the let keyword in Javascript.",
          answer:
            "Variables defined with let are only accessible in the block in which they are defined (They are block-scoped).",
          level: 1,
        }}
      />
    </>
  );
}

export default App;
