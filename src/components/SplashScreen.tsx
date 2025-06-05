import { useState, useEffect } from "react";
import "../css/SplashScreen.css";

interface SplashScreenProps {
  onDeckSelect: (deckLabel: string) => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onDeckSelect }) => {
  const [deckLabels, setDeckLabels] = useState<string[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<string>("default");

  useEffect(() => {
    // Load deck labels from localStorage
    const storedDeckLabels = Object.keys(
      JSON.parse(localStorage.getItem("deckLabelSet") || "{}")
    );
    setDeckLabels(storedDeckLabels.length > 0 ? storedDeckLabels : ["default"]);
  }, []);

  const handleSelect = () => {
    onDeckSelect(selectedDeck);
  };

  return (
    <div className="splash-screen">
      <h1>Flash Card App</h1>
      <div className="deck-selection">
        <h2>Select a Deck</h2>
        <select
          value={selectedDeck}
          onChange={(e) => setSelectedDeck(e.target.value)}
          className="deck-select"
        >
          {deckLabels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
        <button onClick={handleSelect} className="select-button">
          Select
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
