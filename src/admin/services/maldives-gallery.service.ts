import { MaldivesGalleryItem } from '../types/maldives-gallery';

const STORAGE_KEY = 'opulnet_maldives_gallery';

class MaldivesGalleryService {
  private _load(): MaldivesGalleryItem[] {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      const defaultItems: MaldivesGalleryItem[] = [
        {
          id: crypto.randomUUID(),
          title: "Overwater Bungalows & Luxury Stays",
          description: "Experience the iconic overwater villas perched above crystal-clear turquoise lagoons.",
          imageUrl: "",
          order: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: crypto.randomUUID(),
          title: "Pristine Coral Reefs & Diving",
          description: "Explore vibrant coral gardens teeming with manta rays, whale sharks, and tropical fish.",
          imageUrl: "",
          order: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: crypto.randomUUID(),
          title: "Sunset Cruises & Dolphin Watching",
          description: "Sail into breathtaking Maldivian sunsets while dolphins dance alongside your vessel.",
          imageUrl: "",
          order: 3,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: crypto.randomUUID(),
          title: "Sandbank Picnics & Beach Escapes",
          description: "Step onto a deserted sandbank surrounded by nothing but infinite ocean and sky.",
          imageUrl: "",
          order: 4,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: crypto.randomUUID(),
          title: "Local Island Culture & Cuisine",
          description: "Discover authentic Maldivian life, traditional crafts, and fresh seafood on local islands.",
          imageUrl: "",
          order: 5,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      this._save(defaultItems);
      return defaultItems;
    }

    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to parse Maldives gallery data from localStorage:', error);
      return [];
    }
  }

  private _save(items: MaldivesGalleryItem[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  getAll(): MaldivesGalleryItem[] {
    return this._load().sort((a, b) => a.order - b.order);
  }

  getById(id: string): MaldivesGalleryItem | undefined {
    return this._load().find(item => item.id === id);
  }

  create(data: Omit<MaldivesGalleryItem, 'id' | 'createdAt' | 'updatedAt'>): MaldivesGalleryItem {
    const items = this._load();
    const now = new Date().toISOString();
    const newItem: MaldivesGalleryItem = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
    items.push(newItem);
    this._save(items);
    return newItem;
  }

  update(id: string, data: Partial<Omit<MaldivesGalleryItem, 'id' | 'createdAt'>>): MaldivesGalleryItem {
    const items = this._load();
    const idx = items.findIndex(item => item.id === id);
    if (idx === -1) throw new Error(`Maldives gallery item with id ${id} not found`);
    const updatedItem: MaldivesGalleryItem = { ...items[idx], ...data, updatedAt: new Date().toISOString() };
    items[idx] = updatedItem;
    this._save(items);
    return updatedItem;
  }

  delete(id: string): void {
    this._save(this._load().filter(item => item.id !== id));
  }

  reorder(orderedIds: string[]): MaldivesGalleryItem[] {
    const items = this._load();
    const now = new Date().toISOString();
    const updatedItems = items.map(item => {
      const newOrder = orderedIds.indexOf(item.id) + 1;
      return { ...item, order: newOrder > 0 ? newOrder : item.order, updatedAt: now };
    });
    this._save(updatedItems);
    return updatedItems.sort((a, b) => a.order - b.order);
  }
}

export const maldivesGalleryService = new MaldivesGalleryService();
