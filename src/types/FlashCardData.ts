import { v5 as uuidv5 } from "uuid";

export interface FlashCardData {
  id: string;
  question: string;
  answer: string;
  level: number;
  category?: string;
  lastReviewed?: Date | null;
  lastAnsweredCorrectly?: Date | null;
}

const generateFlashCardId = (question: string, answer: string): string => {
  const namespace = "1b671a64-40d5-491e-99b0-da01ff1f3341";
  const content = `${question}:${answer}`;
  return uuidv5(content, namespace);
};

export const createFlashCard = (
  question: string,
  answer: string,
  category?: string,
  level: number = 1
): FlashCardData => {
  return {
    id: generateFlashCardId(question, answer),
    question,
    answer,
    level,
    category,
  };
};
