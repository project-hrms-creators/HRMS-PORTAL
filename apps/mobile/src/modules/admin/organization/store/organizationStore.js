import { create } from 'zustand';
import { organizationService } from '../services/organizationService';

export const useOrganizationStore = create((set, get) => ({
  departments: [],
  designations: [],
  teams: [],
  locations: [],
  hierarchy: null,
  managers: [],

  selectedDepartment: null,
  selectedDesignation: null,

  isLoading: false,
  error: null,

  deptFilters: { search: '', status: 'all' },
  desigFilters: { search: '', departmentId: 'all' },

  setDeptFilters: (filters) => {
    set((state) => ({ deptFilters: { ...state.deptFilters, ...filters } }));
    get().loadDepartments();
  },

  setDesigFilters: (filters) => {
    set((state) => ({ desigFilters: { ...state.desigFilters, ...filters } }));
    get().loadDesignations();
  },

  loadMetadata: async () => {
    try {
      const mgrs = await organizationService.getManagers();
      set({ managers: mgrs });
    } catch {
      // Quiet fail manager loading
    }
  },

  loadDepartments: async () => {
    set({ isLoading: true, error: null });
    try {
      const depts = await organizationService.getDepartments(get().deptFilters);
      set({ departments: depts, isLoading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to load departments', isLoading: false });
    }
  },

  loadDepartment: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const dept = await organizationService.getDepartment(id);
      set({ selectedDepartment: dept, isLoading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to load department details', isLoading: false });
    }
  },

  createDepartment: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newDept = await organizationService.createDepartment(data);
      set({ isLoading: false });
      get().loadDepartments();
      return newDept;
    } catch (err) {
      set({ error: err.message || 'Failed to create department', isLoading: false });
      throw err;
    }
  },

  updateDepartment: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await organizationService.updateDepartment(id, data);
      set({ selectedDepartment: updated, isLoading: false });
      get().loadDepartments();
      return updated;
    } catch (err) {
      set({ error: err.message || 'Failed to update department', isLoading: false });
      throw err;
    }
  },

  loadDesignations: async () => {
    set({ isLoading: true, error: null });
    try {
      const desigs = await organizationService.getDesignations(get().desigFilters);
      set({ designations: desigs, isLoading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to load designations', isLoading: false });
    }
  },

  loadDesignation: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const desig = await organizationService.getDesignation(id);
      set({ selectedDesignation: desig, isLoading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to load designation details', isLoading: false });
    }
  },

  createDesignation: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newDesig = await organizationService.createDesignation(data);
      set({ isLoading: false });
      get().loadDesignations();
      return newDesig;
    } catch (err) {
      set({ error: err.message || 'Failed to create designation', isLoading: false });
      throw err;
    }
  },

  updateDesignation: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await organizationService.updateDesignation(id, data);
      set({ selectedDesignation: updated, isLoading: false });
      get().loadDesignations();
      return updated;
    } catch (err) {
      set({ error: err.message || 'Failed to update designation', isLoading: false });
      throw err;
    }
  },

  loadTeams: async () => {
    set({ isLoading: true, error: null });
    try {
      const teams = await organizationService.getTeams();
      set({ teams, isLoading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to load teams', isLoading: false });
    }
  },

  loadLocations: async () => {
    set({ isLoading: true, error: null });
    try {
      const locations = await organizationService.getLocations();
      set({ locations, isLoading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to load locations', isLoading: false });
    }
  },

  loadHierarchy: async () => {
    set({ isLoading: true, error: null });
    try {
      const h = await organizationService.getOrganizationHierarchy();
      set({ hierarchy: h, isLoading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to load hierarchy', isLoading: false });
    }
  },
}));
