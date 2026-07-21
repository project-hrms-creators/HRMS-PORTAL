import axiosInstance from './axios';
import { parseApiError } from './errorParser';

/**
 * Generic API Client wrapper to standardize request handling
 * and error parsing across the application.
 */
export const apiClient = {
  /**
   * Generic GET request
   */
  get: async (url, config = {}) => {
    try {
      const response = await axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  },

  /**
   * Generic POST request
   */
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  },

  /**
   * Generic PUT request
   */
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  },

  /**
   * Generic DELETE request
   */
  delete: async (url, config = {}) => {
    try {
      const response = await axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }
};
