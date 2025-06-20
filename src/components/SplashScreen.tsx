import { useState, useEffect } from "react";
import "../css/SplashScreen.css";

interface SplashScreenProps {
  onDeckSelect: (deckName: string) => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onDeckSelect }) => {
  const [deckNames, setDeckNames] = useState<string[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<string>("default");

  useEffect(() => {
    // Load deck labels from localStorage
    const storedDeckNames = Object.keys(
      JSON.parse(localStorage.getItem("deckNameSet") || "{}")
    );
    setDeckNames(storedDeckNames.length > 0 ? storedDeckNames : ["default"]);
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
          {deckNames.map((name) => (
            <option key={name} value={name}>
              {name}
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
