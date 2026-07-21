import api from '@/api/axios';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockLeaveTypes = [
  { id: 'annual', label: 'Annual Leave', description: 'Planned annual leave' },
  { id: 'sick', label: 'Sick Leave', description: 'Medical leave' },
  { id: 'personal', label: 'Personal Leave', description: 'Personal time' },
  { id: 'emergency', label: 'Emergency Leave', description: 'Urgent family or personal matters' },
];

const mockBalance = {
  total: 24,
  used: 8,
  remaining: 16,
  pending: 2,
};

const mockHistory = [
  {
    id: 'leave-001',
    leaveType: 'Annual Leave',
    startDate: '2026-07-20',
    endDate: '2026-07-22',
    halfDay: false,
    reason: 'Planned vacation with family.',
    status: 'PENDING',
    duration: 3,
    createdAt: '2026-07-16T08:15:00.000Z',
  },
  {
    id: 'leave-002',
    leaveType: 'Sick Leave',
    startDate: '2026-06-12',
    endDate: '2026-06-13',
    halfDay: true,
    reason: 'Medical follow-up and rest.',
    status: 'APPROVED',
    duration: 1,
    createdAt: '2026-06-10T09:30:00.000Z',
  },
  {
    id: 'leave-003',
    leaveType: 'Personal Leave',
    startDate: '2026-05-05',
    endDate: '2026-05-05',
    halfDay: false,
    reason: 'Personal errands.',
    status: 'REJECTED',
    duration: 1,
    createdAt: '2026-05-02T14:00:00.000Z',
  },
];

const buildDuration = (startDate, endDate, halfDay) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dayCount = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1);
  return halfDay ? 0.5 : dayCount;
};

export const leaveService = {
  getLeaveBalance: async () => {
    try {
      const response = await api.get('/leave/balance');
      return response.data?.data || response.data;
    } catch {
      await delay(600);
      return mockBalance;
    }
  },

  getLeaveHistory: async () => {
    try {
      const response = await api.get('/leave/history');
      return response.data?.data || response.data;
    } catch {
      await delay(800);
      return { data: mockHistory, total: mockHistory.length };
    }
  },

  getLeaveDetails: async (requestId) => {
    try {
      const response = await api.get(`/leave/history/${requestId}`);
      return response.data?.data || response.data;
    } catch {
      await delay(500);
      return mockHistory.find((item) => item.id === requestId) || mockHistory[0];
    }
  },

  applyLeave: async (payload) => {
    try {
      const response = await api.post('/leave/apply', payload);
      return response.data?.data || response.data;
    } catch {
      await delay(900);
      return {
        id: `leave-${Date.now()}`,
        leaveType: payload.leaveType,
        startDate: payload.startDate,
        endDate: payload.endDate,
        halfDay: payload.halfDay || false,
        reason: payload.reason,
        status: 'PENDING',
        duration: buildDuration(payload.startDate, payload.endDate, payload.halfDay),
        createdAt: new Date().toISOString(),
      };
    }
  },

  cancelLeave: async (requestId) => {
    try {
      const response = await api.post(`/leave/cancel/${requestId}`);
      return response.data?.data || response.data;
    } catch {
      await delay(700);
      return { id: requestId, status: 'CANCELLED' };
    }
  },

  getLeaveTypes: async () => {
    try {
      const response = await api.get('/leave/types');
      return response.data?.data || response.data;
    } catch {
      await delay(400);
      return mockLeaveTypes;
    }
  },

  getLeaveStatus: async () => {
    return ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'];
  },
};
