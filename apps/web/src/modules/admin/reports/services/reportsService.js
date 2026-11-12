const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const reportsService = {
  getReports: async () => {
    await delay(500);
    return { data: [] }; // Placeholder
  },
  
  getReportDetails: async (_id) => {
    await delay(500);
    return { data: null };
  },

  getSavedReports: async () => {
    await delay(500);
    return { data: [] };
  },
  
  saveReport: async (savedReportData) => {
    await delay(500);
    return { success: true, data: { ...savedReportData, id: 'new-uuid' } };
  },
  
  deleteSavedReport: async (_id) => {
    await delay(500);
    return { success: true };
  },
  
  exportReport: async (_exportConfig) => {
    await delay(500);
    // Simulating returning a file URL
    return { success: true, url: 'https://example.com/export.csv' };
  },

  scheduleReport: async (_scheduleConfig) => {
    await delay(500);
    return { success: true };
  },
  
  getAnalyticsSummary: async () => {
    await delay(500);
    return { 
      data: {
        kpis: [
          { id: '1', label: 'Total Employees', value: 1250, trend_percentage: 5, trend_direction: 'up' },
          { id: '2', label: 'Average Attendance', value: '92%', trend_percentage: 2, trend_direction: 'up' },
          { id: '3', label: 'Pending Leaves', value: 45, trend_percentage: 10, trend_direction: 'down' }
        ]
      }
    };
  }
};
