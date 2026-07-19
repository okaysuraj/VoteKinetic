import { useEffect, useCallback } from 'react';
import { useApi } from './useApi';
import { electionApi } from '../api/client';

/**
 * Hook for voters to list active elections.
 */
export function useActiveElections() {
  const { data, loading, error, request } = useApi(electionApi.listActive);

  const fetchElections = useCallback(() => {
    request();
  }, [request]);

  useEffect(() => {
    fetchElections();
  }, [fetchElections]);

  return { 
    elections: data?.elections || [], 
    loading, 
    error, 
    refresh: fetchElections 
  };
}

/**
 * Hook for admins to list all elections.
 */
export function useAllElections() {
  const { data, loading, error, request } = useApi(electionApi.listAll);

  const fetchElections = useCallback(() => {
    request();
  }, [request]);

  useEffect(() => {
    fetchElections();
  }, [fetchElections]);

  return { 
    elections: data?.elections || [], 
    loading, 
    error, 
    refresh: fetchElections 
  };
}

/**
 * Hook to get a single election's details.
 */
export function useElection(electionId: string) {
  const { data, loading, error, request } = useApi(electionApi.getById);

  const fetchElection = useCallback(() => {
    if (electionId) {
      request(electionId);
    }
  }, [request, electionId]);

  useEffect(() => {
    fetchElection();
  }, [fetchElection]);

  return { 
    election: data?.election, 
    isEligible: data?.isEligible || false,
    hasVoted: data?.hasVoted || false,
    loading, 
    error, 
    refresh: fetchElection 
  };
}
