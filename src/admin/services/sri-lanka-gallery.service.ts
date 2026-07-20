import { SriLankaGalleryItem } from '../types/sri-lanka-gallery';

const STORAGE_KEY = 'opulnet_sri_lanka_gallery';

class SriLankaGalleryService {
  /**
   * Private method to load items from localStorage
   * Seeds default data if localStorage is empty
   */
  private _load(): SriLankaGalleryItem[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (!stored) {
      // Seed default data
      const defaultItems: SriLankaGalleryItem[] = [
        {
          id: crypto.randomUUID(),
          title: "Pristine Beaches & Coastal Escapes",
          description: "Relax on golden sands, surf the waves, or enjoy vibrant marine life along the stunning coastline.",
          imageUrl: "",
          order: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: crypto.randomUUID(),
          title: "Wild Safaris & Nature Reserves",
          description: "Encounter elephants, leopards, and a myriad of exotic birds in sprawling national parks.",
          imageUrl: "",
          order: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: crypto.randomUUID(),
          title: "Lush Hill Country & Tea Plantations",
          description: "Wander through emerald tea estates, mist-shrouded mountains, and cascading waterfalls.",
          imageUrl: "/assets/images/Sri_Lankan_02.jpg",
          order: 3,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: crypto.randomUUID(),
          title: "Adventure & Ecotourism",
          description: "Thrill-seeking awaits with hiking, white-water rafting, and responsible exploration of natural wonders.",
          imageUrl: "",
          order: 4,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: crypto.randomUUID(),
          title: "Historical & Cultural Wonders",
          description: "Step back in time amidst ancient cities, majestic temples, and UNESCO World Heritage sites.",
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
      console.error('Failed to parse Sri Lanka gallery data from localStorage:', error);
      return [];
    }
  }

  /**
   * Private method to save items to localStorage
   */
  private _save(items: SriLankaGalleryItem[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  /**
   * Get all gallery items sorted by order ascending
   */
  getAll(): SriLankaGalleryItem[] {
    const items = this._load();
    return items.sort((a, b) => a.order - b.order);
  }

  /**
   * Get a gallery item by ID
   */
  getById(id: string): SriLankaGalleryItem | undefined {
    const items = this._load();
    return items.find(item => item.id === id);
  }

  /**
   * Create a new gallery item
   */
  create(data: Omit<SriLankaGalleryItem, 'id' | 'createdAt' | 'updatedAt'>): SriLankaGalleryItem {
    const items = this._load();
    const now = new Date().toISOString();
    
    const newItem: SriLankaGalleryItem = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now
    };
    
    items.push(newItem);
    this._save(items);
    
    return newItem;
  }

  /**
   * Update an existing gallery item
   */
  update(id: string, data: Partial<Omit<SriLankaGalleryItem, 'id' | 'createdAt'>>): SriLankaGalleryItem {
    const items = this._load();
    const itemIndex = items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      throw new Error(`Gallery item with id ${id} not found`);
    }
    
    const updatedItem: SriLankaGalleryItem = {
      ...items[itemIndex],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    items[itemIndex] = updatedItem;
    this._save(items);
    
    return updatedItem;
  }

  /**
   * Delete a gallery item by ID
   */
  delete(id: string): void {
    const items = this._load();
    const filteredItems = items.filter(item => item.id !== id);
    this._save(filteredItems);
  }

  /**
   * Reorder gallery items based on provided ordered IDs array
   */
  reorder(orderedIds: string[]): SriLankaGalleryItem[] {
    const items = this._load();
    const now = new Date().toISOString();
    
    // Update order values based on position in orderedIds array (1-based)
    const updatedItems = items.map(item => {
      const newOrder = orderedIds.indexOf(item.id) + 1;
      return {
        ...item,
        order: newOrder > 0 ? newOrder : item.order,
        updatedAt: now
      };
    });
    
    this._save(updatedItems);
    return updatedItems.sort((a, b) => a.order - b.order);
  }
}

// Export singleton instance
export const sriLankaGalleryService = new SriLankaGalleryService();