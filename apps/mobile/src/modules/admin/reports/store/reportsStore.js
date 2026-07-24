import { create } from 'zustand';
import { reportsService } from '../services/reportsService';

export const useReportsStore = create((set) => ({
  reports: [],
  savedReports: [],
  analyticsSummary: null,
  filters: {},
  isLoading: false,
  error: null,

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  setFilters: (filters) => set({ filters }),

  fetchReports: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await reportsService.getReports();
      set({ reports: response.data || [], isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchSavedReports: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await reportsService.getSavedReports();
      set({ savedReports: response.data || [], isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchAnalyticsSummary: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await reportsService.getAnalyticsSummary();
      set({ analyticsSummary: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  exportReport: async (config) => {
    set({ isLoading: true, error: null });
    try {
      const response = await reportsService.exportReport(config);
      set({ isLoading: false });
      return response.url;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  }
}));
