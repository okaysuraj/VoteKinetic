import { useEffect, useCallback } from 'react';
import { useApi } from './useApi';
import { userApi } from '../api/client';

export function useUserProfile() {
  const { data, loading, error, request } = useApi(userApi.getProfile);
  const updateProfileApi = useApi(userApi.updateProfile);

  const fetchProfile = useCallback(() => {
    request();
  }, [request]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (updates: { displayName?: string; preferences?: any }) => {
    const result = await updateProfileApi.request(updates);
    if (result) {
      fetchProfile();
    }
    return result;
  };

  return {
    profile: data?.user,
    verificationLevel: data?.verificationLevel || 'unverified',
    loading,
    error,
    refresh: fetchProfile,
    updateProfile,
    isUpdating: updateProfileApi.loading
  };
}
