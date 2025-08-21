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

// Types for different tab form data
export interface BasicInputsFormData {
  textValue: string;
  emailValue: string;
  passwordValue: string;
  textareaValue: string;
  numberValue: string;
  dialogName: string;
  dialogEmail: string;
  messages: string[];
}

export interface DateTimeFormData {
  dateValue: string;
  timeValue: string;
  datetimeValue: string;
  monthValue: string;
  weekValue: string;
  messages: string[];
}

export interface SelectionFormData {
  comboboxValue: string;
  dropdownValue: string;
  radioValue: string;
  checkboxValues: { [key: string]: boolean };
  switchValue: boolean;
  messages: string[];
}

export interface AdvancedFormData {
  sliderValue: number;
  spinButtonValue: number;
  rangeValue: number;
  colorValue: string;
  fileValue: string;
  progressValue: number;
  messages: string[];
}

export interface ComponentShowcaseFormData {
  searchValue: string;
  toastCount: number;
  accordionExpanded: { [key: string]: boolean };
  menuSelection: string;
  tableSelection: string[];
  messages: string[];
}

// Cache keys for different tabs
export const CACHE_KEYS = {
  BASIC_INPUTS: 'basicInputsTab',
  DATE_TIME: 'dateTimeTab', 
  SELECTION: 'selectionTab',
  ADVANCED: 'advancedTab',
  COMPONENT_SHOWCASE: 'componentShowcaseTab',
} as const;
