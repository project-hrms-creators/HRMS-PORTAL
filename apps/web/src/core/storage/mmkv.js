/**
 * Web-native Storage implementation matching the MMKV interface.
 * Uses window.localStorage with fallback handling for SSR / restricted environments.
 */

const getLocalStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  // In-memory fallback
  const memoryStore = new Map();
  return {
    getItem: (key) => memoryStore.get(key) || null,
    setItem: (key, val) => memoryStore.set(key, String(val)),
    removeItem: (key) => memoryStore.delete(key),
    clear: () => memoryStore.clear(),
  };
};

const ls = getLocalStorage();

export const storage = {
  set: (key, value) => {
    try {
      ls.setItem(key, String(value));
    } catch (e) {
      console.warn(`[storage] Failed to set key: ${key}`, e);
    }
  },

  getString: (key) => {
    try {
      const val = ls.getItem(key);
      return val !== null ? val : undefined;
    } catch (e) {
      return undefined;
    }
  },

  getBoolean: (key) => {
    try {
      return ls.getItem(key) === 'true';
    } catch (e) {
      return false;
    }
  },

  getNumber: (key) => {
    try {
      const val = ls.getItem(key);
      return val !== null && val !== '' ? Number(val) : undefined;
    } catch (e) {
      return undefined;
    }
  },

  delete: (key) => {
    try {
      ls.removeItem(key);
    } catch (e) {
      console.warn(`[storage] Failed to delete key: ${key}`, e);
    }
  },

  clearAll: () => {
    try {
      ls.clear();
    } catch (e) {
      console.warn('[storage] Failed to clear storage', e);
    }
  },
};

export default storage;
