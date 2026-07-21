import { useEffect } from 'react';
import { useProfileStore } from '../store/profileStore';

export function useProfile() {
  const { profile, isLoading, isRefreshing, error, fetchProfile, refreshProfileData } = useProfileStore();

  useEffect(() => {
    fetchProfile(false);
  }, [fetchProfile]);

  return {
    profile,
    isLoading,
    isRefreshing,
    error,
    refreshProfile: () => fetchProfile(true),
    refreshProfileData,
  };
}
