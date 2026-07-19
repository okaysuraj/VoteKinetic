import { useEffect, useCallback } from 'react';
import { useApi } from './useApi';
import { adminApi, platformSettingsApi } from '../api/client';

export function useAdminDashboard() {
  const { data, loading, error, request } = useApi(adminApi.getDashboard);

  const fetchDashboard = useCallback(() => {
    request();
  }, [request]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    metrics: data?.metrics,
    recentAlerts: data?.recentAlerts || [],
    loading,
    error,
    refresh: fetchDashboard
  };
}

export function useAuditLogs(params?: { entityType?: string; limit?: number; offset?: number; userId?: string }) {
  const { data, loading, error, request } = useApi(adminApi.getAuditLogs);

  const fetchLogs = useCallback(() => {
    request(params);
  }, [request, params]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs: data?.logs || [],
    total: data?.total || 0,
    loading,
    error,
    refresh: fetchLogs
  };
}

export function useTurnoutAnalytics(electionId: string) {
  const { data, loading, error, request } = useApi(adminApi.getTurnoutAnalytics);

  const fetchAnalytics = useCallback(() => {
    if (electionId) {
      request(electionId);
    }
  }, [request, electionId]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analytics: data,
    loading,
    error,
    refresh: fetchAnalytics
  };
}

export function usePlatformSettings() {
  const { data, loading, error, request } = useApi(platformSettingsApi.get);
  const updateSettingsApi = useApi(platformSettingsApi.update);

  const fetchSettings = useCallback(() => {
    request();
  }, [request]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = async (updates: any) => {
    const result = await updateSettingsApi.request(updates);
    if (result) {
      fetchSettings();
    }
    return result;
  };

  return {
    settings: data?.settings,
    loading,
    error,
    refresh: fetchSettings,
    updateSettings,
    isUpdating: updateSettingsApi.loading
  };
}
