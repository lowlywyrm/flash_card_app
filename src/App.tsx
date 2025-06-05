import "./css/App.css";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import FlashCardUI from "./components/FlashCardUI";

function App() {
  const navigate = useNavigate();

  const handleDeckSelect = (deckLabel: string) => {
    navigate(`/deck/${deckLabel}`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<SplashScreen onDeckSelect={handleDeckSelect} />}
      />
      <Route
        path="/deck/:deckLabel"
        element={<FlashCardUI deckLabel={useParams().deckLabel!} />}
      />
    </Routes>
  );
}

export default App;
