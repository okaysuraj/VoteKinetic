import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from 'firebase/auth';

/**
 * A custom hook to wrap API calls with loading and error states.
 * 
 * @param apiFunc The API function from client.ts (must take a `User` as its first argument).
 * @param initialData Optional initial data to populate before the request completes.
 */
export function useApi<T, P extends any[]>(
  apiFunc: (user: User, ...args: P) => Promise<T>,
  initialData: T | null = null
) {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const request = useCallback(async (...args: P): Promise<T | null> => {
    if (!user) {
      setError('User not authenticated');
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await apiFunc(user, ...args);
      setData(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.message || err.error || 'An unexpected error occurred';
      setError(errorMessage);
      console.error('API Error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiFunc, user]);

  return { data, loading, error, request, setData };
}
