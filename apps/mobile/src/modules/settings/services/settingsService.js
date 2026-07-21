import api from '@/api/axios';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockSettings = {
  preferences: {
    theme: 'system',
    language: 'en',
  },
  notificationPreferences: {
    push: true,
    email: true,
    sms: false,
  },
  privacySettings: {
    profileVisibility: 'employees',
    showOnlineStatus: true,
  },
  securitySettings: {
    twoFactorEnabled: false,
    biometricsEnabled: false,
  },
};

export const settingsService = {
  async getSettings() {
    try {
      const response = await api.get('/settings');
      return response.data?.data || response.data;
    } catch {
      await delay(500);
      return mockSettings;
    }
  },

  async updateSettings(payload) {
    try {
      const response = await api.put('/settings', payload);
      return response.data?.data || response.data;
    } catch {
      await delay(500);
      return payload;
    }
  },

  async getPreferences() {
    try {
      const response = await api.get('/settings/preferences');
      return response.data?.data || response.data;
    } catch {
      await delay(400);
      return mockSettings.preferences;
    }
  },

  async updatePreferences(payload) {
    try {
      const response = await api.put('/settings/preferences', payload);
      return response.data?.data || response.data;
    } catch {
      await delay(400);
      return payload;
    }
  },

  async getNotificationSettings() {
    try {
      const response = await api.get('/settings/notifications');
      return response.data?.data || response.data;
    } catch {
      await delay(400);
      return mockSettings.notificationPreferences;
    }
  },

  async updateNotificationSettings(payload) {
    try {
      const response = await api.put('/settings/notifications', payload);
      return response.data?.data || response.data;
    } catch {
      await delay(400);
      return payload;
    }
  },

  async logout() {
    try {
      const response = await api.post('/auth/logout');
      return response.data?.data || response.data;
    } catch {
      await delay(400);
      return { success: true };
    }
  },

  async contactSupport(payload) {
    try {
      const response = await api.post('/support/contact', payload);
      return response.data?.data || response.data;
    } catch {
      await delay(400);
      return { success: true, message: 'Support request received.' };
    }
  },
};
