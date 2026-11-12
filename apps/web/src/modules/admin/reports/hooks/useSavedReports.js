import { useEffect } from 'react';
import { useReportsStore } from '../store/reportsStore';

export const useSavedReports = () => {
  const { savedReports, isLoading, error, fetchSavedReports } = useReportsStore();

  useEffect(() => {
    fetchSavedReports();
  }, []);

  return { savedReports, isLoading, error, fetchSavedReports };
};
