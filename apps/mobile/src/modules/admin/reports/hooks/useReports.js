import { useEffect } from 'react';
import { useReportsStore } from '../store/reportsStore';

export const useReports = () => {
  const { reports, isLoading, error, fetchReports } = useReportsStore();

  useEffect(() => {
    fetchReports();
  }, []);

  return { reports, isLoading, error, fetchReports };
};
