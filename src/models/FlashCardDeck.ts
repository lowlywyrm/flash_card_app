import { createFlashCard, FlashCardData } from "./FlashCardData";

export class FlashCardDeck {
  private cards: Map<string, FlashCardData>;
  private readonly storageKeyBase = "flashcard-deck";
  private readonly storageKey: string;
  private deckName: string;

  constructor(deckName: string) {
    this.storageKey = `${this.storageKeyBase}-${deckName}`;
    const savedCards = localStorage.getItem(this.storageKey);
    this.cards = savedCards
      ? new Map(Object.entries(JSON.parse(savedCards)))
      : new Map();
    this.deckName = deckName;
  }

  private save(): void {
    const cardsObject = Object.fromEntries(this.cards);
    localStorage.setItem(this.storageKey, JSON.stringify(cardsObject));
  }

  public getDeckName(): string {
    return this.deckName;
  }

  addCardFromData(
    question: string,
    answer: string,
    category: string,
    level: number
  ): void {
    const card = createFlashCard(question, answer, category, level);
    this.cards.set(card.id, card);
    this.save();
  }

  addCard(card: FlashCardData): void {
    this.cards.set(card.id, card);
    this.save();
  }

  getCard(id: string): FlashCardData | null {
    return this.cards.get(id) || null;
  }

  removeCard(id: string): boolean {
    const result = this.cards.delete(id);
    if (result) {
      this.save();
    }
    return result;
  }

  getAllCards(): FlashCardData[] {
    return Array.from(this.cards.values());
  }

  getCardCount(): number {
    return this.cards.size;
  }

  isEmpty(): boolean {
    return this.cards.size === 0;
  }

  clear(): void {
    this.cards.clear();
    this.save();
  }
}
