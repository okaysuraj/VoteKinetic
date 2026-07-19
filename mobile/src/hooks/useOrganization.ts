import { useEffect, useCallback } from 'react';
import { useApi } from './useApi';
import { organizationApi } from '../api/client';

export function useOrganizations() {
  const { data, loading, error, request } = useApi(organizationApi.list);

  const fetchOrganizations = useCallback(() => {
    request();
  }, [request]);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  return {
    organizations: data?.organizations || [],
    loading,
    error,
    refresh: fetchOrganizations
  };
}

export function useOrganization(orgId: string) {
  const { data, loading, error, request } = useApi(organizationApi.getById);

  const fetchOrganization = useCallback(() => {
    if (orgId) {
      request(orgId);
    }
  }, [request, orgId]);

  useEffect(() => {
    fetchOrganization();
  }, [fetchOrganization]);

  return {
    organization: data?.organization,
    totalVotes: data?.totalVotes || 0,
    loading,
    error,
    refresh: fetchOrganization
  };
}

export function useOrganizationMembers(orgId: string) {
  const { data, loading, error, request } = useApi(organizationApi.listMembers);

  const fetchMembers = useCallback(() => {
    if (orgId) {
      request(orgId);
    }
  }, [request, orgId]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return {
    members: data?.members || [],
    loading,
    error,
    refresh: fetchMembers
  };
}
