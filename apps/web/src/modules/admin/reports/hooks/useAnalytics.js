import { useEffect } from 'react';
import { useReportsStore } from '../store/reportsStore';

export const useAnalytics = () => {
  const { analyticsSummary, isLoading, error, fetchAnalyticsSummary } = useReportsStore();

  useEffect(() => {
    fetchAnalyticsSummary();
  }, []);

  return { analyticsSummary, isLoading, error, fetchAnalyticsSummary };
};
