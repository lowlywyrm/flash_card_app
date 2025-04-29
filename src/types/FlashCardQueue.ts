interface PriorityQueueItem {
  id: string;
  priority: number;
}

class FlashCardPriorityQueue {
  private queue: PriorityQueueItem[];
  private readonly storageKey = "flashcard-queue";

  constructor() {
    const savedQueue = localStorage.getItem(this.storageKey);
    this.queue = savedQueue ? JSON.parse(savedQueue) : [];
  }

  private save(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.queue));
  }

  enqueue(id: string, priority: number): void {
    const newItem = { id, priority };

    // Find position to insert based on priority (higher priority first)
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

  dequeue(): string | null {
    if (this.queue.length === 0) return null;
    const item = this.queue.shift();
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
  }

  peek(): string | null {
    return this.queue.length > 0 ? this.queue[0].id : null;
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
}
