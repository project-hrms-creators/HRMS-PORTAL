import { useCallback } from 'react';
import { useProfileStore } from '../store/profileStore';

export function useChangePassword() {
  const { changePassword, isSubmitting, error } = useProfileStore();

  const submitPasswordChange = useCallback(async (payload) => {
    return changePassword(payload);
  }, [changePassword]);

  return {
    submitPasswordChange,
    isSubmitting,
    error,
  };
}
