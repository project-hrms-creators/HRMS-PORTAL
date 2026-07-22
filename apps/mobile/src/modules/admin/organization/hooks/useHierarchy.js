import { useEffect } from 'react';
import { useOrganizationStore } from '../store/organizationStore';

export function useHierarchy() {
  const { hierarchy, isLoading, error, loadHierarchy } = useOrganizationStore((state) => ({
    hierarchy: state.hierarchy,
    isLoading: state.isLoading,
    error: state.error,
    loadHierarchy: state.loadHierarchy,
  }));

  useEffect(() => {
    loadHierarchy();
  }, [loadHierarchy]);

  return {
    hierarchy,
    isLoading,
    error,
  };
}
