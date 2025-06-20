import "./css/App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import FlashCardUI from "./components/FlashCardUI";

function App() {
  const navigate = useNavigate();

  const handleDeckSelect = (deckName: string) => {
    console.log("Deck selected:", deckName);
    navigate(`/deck/${deckName}`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<SplashScreen onDeckSelect={handleDeckSelect} />}
      />
      <Route path="/deck/:deckName" element={<FlashCardUI />} />
    </Routes>
  );
}

export default App;
