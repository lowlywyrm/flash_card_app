import "./css/App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import FlashCardUI from "./components/FlashCardUI";

function App() {
  const navigate = useNavigate();

  const handleDeckSelect = (deckLabel: string) => {
    console.log("Deck selected:", deckLabel);
    navigate(`/deck/${deckLabel}`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<SplashScreen onDeckSelect={handleDeckSelect} />}
      />
      <Route path="/deck/:deckLabel" element={<FlashCardUI />} />
    </Routes>
  );
}

export default App;
