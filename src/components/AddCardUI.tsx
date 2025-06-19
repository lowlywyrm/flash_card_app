import React, { useState } from "react";
import "../css/AddCardUI.css";

interface AddCardUIProps {
  onClose: () => void;
  onAddCard: (
    question: string,
    answer: string,
    category: string,
    level: number
  ) => void;
}

const AddCardUI: React.FC<AddCardUIProps> = ({ onClose, onAddCard }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && answer.trim() && category.trim()) {
      onAddCard(question.trim(), answer.trim(), category.trim(), level);
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="add-card-overlay">
      <div className="add-card-modal">
        <div className="add-card-header">
          <h2>Add New Card</h2>
          <button className="close-button" onClick={handleCancel}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="add-card-form">
          <div className="form-group">
            <label htmlFor="question">Question:</label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the question"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="answer">Answer:</label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the answer"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter the category"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="level">Level:</label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardUI;
