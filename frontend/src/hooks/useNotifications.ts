import { useEffect, useCallback } from 'react';
import { useApi } from './useApi';
import { notificationApi } from '../api/client';

export function useNotifications() {
  const { data, loading, error, request } = useApi(notificationApi.list);
  const markReadApi = useApi(notificationApi.markRead);
  const markAllReadApi = useApi(notificationApi.markAllRead);

  const fetchNotifications = useCallback(() => {
    request();
  }, [request]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (notificationId: string) => {
    await markReadApi.request(notificationId);
    fetchNotifications(); // Refresh list after marking
  };

  const markAllAsRead = async () => {
    await markAllReadApi.request();
    fetchNotifications();
  };

  return {
    notifications: data?.notifications || [],
    unreadCount: data?.unreadCount || 0,
    loading,
    error,
    refresh: fetchNotifications,
    markAsRead,
    markAllAsRead,
    isMarking: markReadApi.loading || markAllReadApi.loading
  };
}
