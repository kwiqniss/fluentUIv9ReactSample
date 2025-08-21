// Form cache utility - persistent storage
export interface CacheEntry<T = any> {
  data: T;
}

export interface CacheData {
  [key: string]: CacheEntry;
}

class FormCache {
  private cache: CacheData = {};

  // Store data
  set<T>(key: string, data: T): void {
    this.cache[key] = {
      data,
    };
    console.log(`[FormCache] Cached data for ${key}:`, data);
  }

  // Get data
  get<T>(key: string): T | null {
    const entry = this.cache[key];
    
    if (!entry) {
      console.log(`[FormCache] No cached data found for ${key}`);
      return null;
    }

    console.log(`[FormCache] Retrieved cached data for ${key}:`, entry.data);
    return entry.data as T;
  }

  // Remove specific cache entry
  remove(key: string): void {
    delete this.cache[key];
    console.log(`[FormCache] Removed cached data for ${key}`);
  }

  // Clear all cache entries
  clear(): void {
    this.cache = {};
    console.log(`[FormCache] Cleared all cached data`);
  }

  // Get all cache keys (for debugging)
  getKeys(): string[] {
    return Object.keys(this.cache);
  }

  // Check if key exists
  has(key: string): boolean {
    return key in this.cache;
  }
}

// Create a singleton instance
export const formCache = new FormCache();

// Cache keys for different tabs
export const CACHE_KEYS = {
  BASIC_INPUTS: 'basicInputsTab',
  DATE_TIME: 'dateTimeTab', 
  SELECTION: 'selectionTab',
  ADVANCED: 'advancedTab',
  COMPONENT_SHOWCASE: 'componentShowcaseTab',
} as const;
