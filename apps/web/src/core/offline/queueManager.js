import { storageService } from '@/core/storage/storageService';
import { useOfflineStore } from '@/shared/stores/offlineStore';

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'act_' + Math.random().toString(36).substring(2, 9) + Date.now();
};

const QUEUE_STORAGE_KEY = 'OFFLINE_ACTION_QUEUE';

/**
 * Manages the offline request queue.
 * Persists pending actions to storage and syncs state with Zustand.
 */
export const queueManager = {
  /**
   * Add a new action to the queue
   */
  enqueueAction: (action) => {
    const currentQueue = queueManager.getQueue();
    
    const newAction = {
      ...action,
      id: generateId(),
      timestamp: new Date().toISOString(),
      retryCount: 0,
      status: 'pending' // 'pending' | 'failed' | 'in_progress'
    };

    const updatedQueue = [...currentQueue, newAction];
    storageService.setObject(QUEUE_STORAGE_KEY, updatedQueue);
    
    // Update global state
    useOfflineStore.getState().setPendingActionsCount(updatedQueue.length);
    
    return newAction.id;
  },

  /**
   * Retrieve the current queue
   */
  getQueue: () => {
    return storageService.getObject(QUEUE_STORAGE_KEY) || [];
  },

  /**
   * Remove an action from the queue by ID
   */
  dequeueAction: (id) => {
    const currentQueue = queueManager.getQueue();
    const updatedQueue = currentQueue.filter(a => a.id !== id);
    
    storageService.setObject(QUEUE_STORAGE_KEY, updatedQueue);
    useOfflineStore.getState().setPendingActionsCount(updatedQueue.length);
  },

  /**
   * Clear the entire queue
   */
  clearQueue: () => {
    storageService.removeItem(QUEUE_STORAGE_KEY);
    useOfflineStore.getState().setPendingActionsCount(0);
  },

  /**
   * Update a specific action's state (e.g. increment retry count)
   */
  updateAction: (id, updates) => {
    const currentQueue = queueManager.getQueue();
    const updatedQueue = currentQueue.map(action => 
      action.id === id ? { ...action, ...updates } : action
    );
    
    storageService.setObject(QUEUE_STORAGE_KEY, updatedQueue);
  },

  /**
   * Initialize the global store with the current queue length on app startup
   */
  initializeStore: () => {
    const queue = queueManager.getQueue();
    useOfflineStore.getState().setPendingActionsCount(queue.length);
  }
};
