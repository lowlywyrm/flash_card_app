import { v5 as uuidv5 } from "uuid";

export interface FlashCardData {
  id: string;
  inverse_id: string | null;
  question: string;
  answer: string;
  level: number;
  category?: string;
  lastReviewed?: Date | null;
}

const generateFlashCardId = (question: string, answer: string): string => {
  const namespace = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"; // UUID namespace for URLs
  const content = `${question}:${answer}`;
  return uuidv5(content, namespace);
};

export const createFlashCard = (
  question: string,
  answer: string,
  level: number = 1,
  category?: string,
  inverse_id: string | null = null
): FlashCardData => {
  return {
    id: generateFlashCardId(question, answer),
    inverse_id,
    question,
    answer,
    level,
    category,
    lastReviewed: null,
  };
};
