import { useEffect } from 'react';
import { useProfileStore } from '../store/profileStore';

export function useDocuments() {
  const { documents, isLoading, error, fetchDocuments } = useProfileStore();

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return {
    documents,
    isLoading,
    error,
    refreshDocuments: fetchDocuments,
  };
}
