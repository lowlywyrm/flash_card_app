import { createFlashCard, FlashCardData } from "./FlashCardData";

export class FlashCardDeck {
  private cards: Map<string, FlashCardData>;

  constructor() {
    this.cards = new Map();
  }

  addCardFromData(
    question: string,
    answer: string,
    category: string,
    level: number
  ): void {
    const card = createFlashCard(question, answer, category, level);
    this.cards.set(card.id, card);
  }

  addCard(card: FlashCardData): void {
    this.cards.set(card.id, card);
  }

  getCard(id: string): FlashCardData | null {
    return this.cards.get(id) || null;
  }

  removeCard(id: string): boolean {
    return this.cards.delete(id);
  }

  getAllCards(): FlashCardData[] {
    return Array.from(this.cards.values());
  }

  getCardCount(): number {
    return this.cards.size;
  }

  clear(): void {
    this.cards.clear();
  }
}
