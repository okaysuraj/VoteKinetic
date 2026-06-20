import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuth() {
      try {
        const token = await SecureStore.getItemAsync('token');
        const storedUser = await SecureStore.getItemAsync('user');
        
        if (token && storedUser) {
          setUser(JSON.parse(storedUser));
          // Refresh user data
          const { user: freshUser } = await api.me();
          setUser(freshUser);
          await SecureStore.setItemAsync('user', JSON.stringify(freshUser));
        }
      } catch (e) {
        console.error('Failed to load auth state', e);
        logout();
      } finally {
        setLoading(false);
      }
    }
    
    loadAuth();
  }, []);

  async function login(token, userData) {
    await SecureStore.setItemAsync('token', token);
    await SecureStore.setItemAsync('user', JSON.stringify(userData));
    setUser(userData);
  }

  async function logout() {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
