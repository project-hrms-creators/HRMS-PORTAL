import { apiClient } from '@/api/client/apiClient';
import { USE_MOCK_DATA } from '@/shared/constants/env';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockManagers = [
  { id: 'emp-mgr1', firstName: 'Sanjay', lastName: 'Kumar', email: 'sanjay.kumar@company.com' },
  { id: 'emp-mgr2', firstName: 'Kriti', lastName: 'Sen', email: 'kriti.sen@company.com' },
];

let mockDepartments = [
  { id: 'dept-eng', name: 'Engineering', code: 'ENG', description: 'Product development and technology infrastructure.', managerId: 'emp-mgr1', parentDepartmentId: null, status: 'ACTIVE' },
  { id: 'dept-hr', name: 'Human Resources', code: 'HR', description: 'Talent acquisition and employee relations.', managerId: 'emp-mgr2', parentDepartmentId: null, status: 'ACTIVE' },
  { id: 'dept-prod', name: 'Product', code: 'PROD', description: 'Product strategy, mapping, and roadmaps.', managerId: 'emp-mgr1', parentDepartmentId: 'dept-eng', status: 'ACTIVE' },
  { id: 'dept-mktg', name: 'Marketing', code: 'MKTG', description: 'Brand outreach and customer acquisitions.', managerId: 'emp-mgr2', parentDepartmentId: null, status: 'ACTIVE' },
];

let mockDesignations = [
  { id: 'des-se', title: 'Software Engineer', departmentId: 'dept-eng', level: 1, description: 'Core product builder.', status: 'ACTIVE' },
  { id: 'des-sse', title: 'Senior Software Engineer', departmentId: 'dept-eng', level: 2, description: 'Leads engineering tracks.', status: 'ACTIVE' },
  { id: 'des-hrm', title: 'HR Specialist', departmentId: 'dept-hr', level: 2, description: 'Talent growth coordinator.', status: 'ACTIVE' },
  { id: 'des-pm', title: 'Product Manager', departmentId: 'dept-prod', level: 3, description: 'Guides product delivery.', status: 'ACTIVE' },
];

let mockTeams = [
  { id: 'team-web', name: 'Web Core Development', departmentId: 'dept-eng', managerId: 'emp-mgr1', memberCount: 8 },
  { id: 'team-mobile', name: 'Mobile App Core', departmentId: 'dept-eng', managerId: 'emp-mgr1', memberCount: 5 },
  { id: 'team-ops', name: 'Talent Operations', departmentId: 'dept-hr', managerId: 'emp-mgr2', memberCount: 3 },
];

let mockLocations = [
  { id: 'loc-hq', name: 'Corporate HQ', type: 'OFFICE', region: 'APAC', timezone: 'IST', country: 'India', state: 'Karnataka', city: 'Bengaluru' },
  { id: 'loc-us', name: 'North America Remote', type: 'REMOTE', region: 'AMER', timezone: 'EST', country: 'USA', state: 'NY', city: 'New York' },
  { id: 'loc-hybrid', name: 'Innovation Hub', type: 'HYBRID', region: 'EMEA', timezone: 'GMT', country: 'UK', state: 'England', city: 'London' },
];

const mockHierarchy = {
  id: 'root-org',
  label: 'Enterprise HRMS Inc.',
  subtitle: 'Corporate HQ',
  children: [
    {
      id: 'dept-eng',
      label: 'Engineering Department',
      subtitle: 'Sanjay Kumar (Head)',
      children: [
        {
          id: 'dept-prod',
          label: 'Product Sub-dept',
          subtitle: 'Kriti Sen (Lead)',
          children: [],
        },
      ],
    },
    {
      id: 'dept-hr',
      label: 'Human Resources Department',
      subtitle: 'Kriti Sen (Head)',
      children: [],
    },
    {
      id: 'dept-mktg',
      label: 'Marketing Department',
      subtitle: 'Vacant',
      children: [],
    },
  ],
};

export const organizationService = {
  getDepartments: async ({ search, status } = {}) => {
    if (USE_MOCK_DATA) {
      await delay(400);
      let filtered = [...mockDepartments];
      if (search) {
        const query = search.toLowerCase();
        filtered = filtered.filter((d) => d.name.toLowerCase().includes(query) || d.code.toLowerCase().includes(query));
      }
      if (status && status !== 'all') {
        filtered = filtered.filter((d) => d.status === status);
      }
      return filtered;
    }
    const response = await apiClient.get('/admin/departments', { params: { search, status } });
    return response?.data || response;
  },

  getDepartment: async (id) => {
    if (USE_MOCK_DATA) {
      await delay(300);
      const dept = mockDepartments.find((d) => d.id === id);
      if (!dept) throw new Error('Department not found.');
      return dept;
    }
    const response = await apiClient.get(`/admin/departments/${id}`);
    return response?.data || response;
  },

  createDepartment: async (data) => {
    if (USE_MOCK_DATA) {
      await delay(400);
      const newDept = {
        id: `dept-${Math.random().toString(36).substr(2, 9)}`,
        name: data.name,
        code: data.code,
        description: data.description || '',
        managerId: data.managerId || null,
        parentDepartmentId: data.parentDepartmentId || null,
        status: 'ACTIVE',
      };
      mockDepartments.push(newDept);
      return newDept;
    }
    const response = await apiClient.post('/admin/departments', data);
    return response?.data || response;
  },

  updateDepartment: async (id, data) => {
    if (USE_MOCK_DATA) {
      await delay(400);
      const index = mockDepartments.findIndex((d) => d.id === id);
      if (index === -1) throw new Error('Department not found.');
      const updated = {
        ...mockDepartments[index],
        ...data,
      };
      mockDepartments[index] = updated;
      return updated;
    }
    const response = await apiClient.put(`/admin/departments/${id}`, data);
    return response?.data || response;
  },

  getDesignations: async ({ search, departmentId } = {}) => {
    if (USE_MOCK_DATA) {
      await delay(400);
      let filtered = [...mockDesignations];
      if (search) {
        const query = search.toLowerCase();
        filtered = filtered.filter((d) => d.title.toLowerCase().includes(query));
      }
      if (departmentId && departmentId !== 'all') {
        filtered = filtered.filter((d) => d.departmentId === departmentId);
      }
      return filtered;
    }
    const response = await apiClient.get('/admin/designations', { params: { search, departmentId } });
    return response?.data || response;
  },

  getDesignation: async (id) => {
    if (USE_MOCK_DATA) {
      await delay(300);
      const desig = mockDesignations.find((d) => d.id === id);
      if (!desig) throw new Error('Designation not found.');
      return desig;
    }
    const response = await apiClient.get(`/admin/designations/${id}`);
    return response?.data || response;
  },

  createDesignation: async (data) => {
    if (USE_MOCK_DATA) {
      await delay(400);
      const newDesig = {
        id: `des-${Math.random().toString(36).substr(2, 9)}`,
        title: data.title,
        departmentId: data.departmentId,
        level: data.level,
        description: data.description || '',
        status: 'ACTIVE',
      };
      mockDesignations.push(newDesig);
      return newDesig;
    }
    const response = await apiClient.post('/admin/designations', data);
    return response?.data || response;
  },

  updateDesignation: async (id, data) => {
    if (USE_MOCK_DATA) {
      await delay(400);
      const index = mockDesignations.findIndex((d) => d.id === id);
      if (index === -1) throw new Error('Designation not found.');
      const updated = {
        ...mockDesignations[index],
        ...data,
      };
      mockDesignations[index] = updated;
      return updated;
    }
    const response = await apiClient.put(`/admin/designations/${id}`, data);
    return response?.data || response;
  },

  getTeams: async () => {
    if (USE_MOCK_DATA) {
      await delay(400);
      return mockTeams;
    }
    const response = await apiClient.get('/admin/teams');
    return response?.data || response;
  },

  getLocations: async () => {
    if (USE_MOCK_DATA) {
      await delay(400);
      return mockLocations;
    }
    const response = await apiClient.get('/admin/locations');
    return response?.data || response;
  },

  getOrganizationHierarchy: async () => {
    if (USE_MOCK_DATA) {
      await delay(500);
      return mockHierarchy;
    }
    const response = await apiClient.get('/admin/hierarchy');
    return response?.data || response;
  },

  getManagers: async () => {
    if (USE_MOCK_DATA) {
      await delay(200);
      return mockManagers;
    }
    const response = await apiClient.get('/admin/managers');
    return response?.data || response;
  },
};
