interface PriorityQueueItem {
  id: string;
  priority: number;
}

class FlashCardPriorityQueue {
  private queue: PriorityQueueItem[];
  private readonly storageKeyBase = "flashcard-queue";
  private readonly storageKey: string;
  private deckLabel: string;

  constructor(deckLabel: string) {
    console.log("FlashCardPriorityQueue: Creating queue for deck:", deckLabel);
    this.storageKey = `${this.storageKeyBase}-${deckLabel}`;
    const savedQueue = localStorage.getItem(this.storageKey);
    this.queue = savedQueue ? JSON.parse(savedQueue) : [];
    this.deckLabel = deckLabel;
  }

  private save(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.queue));
  }

  // Add item to queue, higher priority towards end of queue
  enqueue(id: string, priority: number): void {
    const newItem = { id, priority };

    // Finding index for item insert, higher priority towards end of queue
    const insertIndex = this.queue.findIndex(
      (item) => item.priority < priority
    );

    if (insertIndex === -1) {
      this.queue.push(newItem);
    } else {
      this.queue.splice(insertIndex, 0, newItem);
    }

    this.save();
  }

  // Remove item with highest priority from end of queue
  dequeue(): string | null {
    if (this.queue.length === 0) return null;
    const item = this.queue.pop(); // Use pop instead of shift
    this.save();
    return item?.id ?? null;
  }

  remove(id: string): void {
    this.queue = this.queue.filter((item) => item.id !== id);
    this.save();
  }

  updatePriority(id: string, newPriority: number): void {
    this.remove(id);
    this.enqueue(id, newPriority);
    this.save();
  }

  peek(): string | null {
    return this.queue.length > 0 ? this.queue[this.queue.length - 1].id : null; // Look at last item
  }

  clear(): void {
    this.queue = [];
    this.save();
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  getSize(): number {
    return this.queue.length;
  }

  getDeckLabel(): string {
    return this.deckLabel;
  }
}

export default FlashCardPriorityQueue;
