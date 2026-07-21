import api from '@/api/axios';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockProfile = {
  id: 'emp-001',
  employeeId: 'EMP00001',
  firstName: 'Aarav',
  lastName: 'Patel',
  email: 'aarav.patel@company.com',
  phone: '+91 98765 43210',
  avatarUrl: null,
  department: 'Engineering',
  designation: 'Senior Mobile Engineer',
  managerName: 'Mina Rao',
  joiningDate: '2023-05-15',
  location: 'Bengaluru',
  address: '12, MG Road, Bengaluru',
};

const mockEmployment = {
  employeeId: 'EMP00001',
  department: 'Engineering',
  designation: 'Senior Mobile Engineer',
  managerName: 'Mina Rao',
  joiningDate: '2023-05-15',
  employmentStatus: 'ACTIVE',
};

const mockContacts = [
  {
    id: 'emg-1',
    name: 'Asha Patel',
    relationship: 'Mother',
    phone: '+91 99887 66554',
  },
];

const mockDocuments = [
  { id: 'doc-1', name: 'Offer Letter', type: 'offer', uploadedAt: '2023-05-01' },
  { id: 'doc-2', name: 'ID Proof', type: 'id', uploadedAt: '2023-05-02' },
];

const mockAccount = {
  email: 'aarav.patel@company.com',
  phone: '+91 98765 43210',
  lastPasswordChange: '2026-06-01',
  twoFactorEnabled: false,
};

export const profileService = {
  getProfile: async () => {
    try {
      const response = await api.get('/profile');
      return response.data?.data || response.data;
    } catch {
      await delay(700);
      return mockProfile;
    }
  },

  updateProfile: async (payload) => {
    try {
      const response = await api.put('/profile', payload);
      return response.data?.data || response.data;
    } catch {
      await delay(600);
      return payload;
    }
  },

  getEmploymentDetails: async () => {
    try {
      const response = await api.get('/profile/employment');
      return response.data?.data || response.data;
    } catch {
      await delay(500);
      return mockEmployment;
    }
  },

  getEmergencyContacts: async () => {
    try {
      const response = await api.get('/profile/emergency-contacts');
      return response.data?.data || response.data;
    } catch {
      await delay(500);
      return mockContacts;
    }
  },

  updateEmergencyContact: async (payload) => {
    try {
      const response = await api.put('/profile/emergency-contacts', payload);
      return response.data?.data || response.data;
    } catch {
      await delay(500);
      return payload;
    }
  },

  uploadProfileImage: async () => {
    try {
      const response = await api.post('/profile/avatar');
      return response.data?.data || response.data;
    } catch {
      await delay(500);
      return { avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' };
    }
  },

  changePassword: async (payload) => {
    try {
      const response = await api.post('/profile/change-password', payload);
      return response.data?.data || response.data;
    } catch {
      await delay(500);
      return { success: true };
    }
  },

  getDocuments: async () => {
    try {
      const response = await api.get('/profile/documents');
      return response.data?.data || response.data;
    } catch {
      await delay(500);
      return mockDocuments;
    }
  },

  getAccountInfo: async () => {
    try {
      const response = await api.get('/profile/account');
      return response.data?.data || response.data;
    } catch {
      await delay(500);
      return mockAccount;
    }
  },
};
