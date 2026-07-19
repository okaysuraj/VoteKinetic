import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { API_URL } from '../config/api';

export type UserRole = 'SUPER_ADMIN' | 'ORG_ADMIN' | 'ELECTION_ADMIN' | 'OBSERVER' | 'AUDITOR' | 'VOTER' | null;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: UserRole;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<UserRole>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          const response = await fetch(`${API_URL}/users/sync`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          });
          const data = await response.json();
          const userRoles: string[] = data.user?.roles?.map((r: any) => r.role?.name) || [];

          // Determine highest-priority role
          if (userRoles.includes('SUPER_ADMIN')) {
            setRole('SUPER_ADMIN');
          } else if (userRoles.includes('ORG_ADMIN')) {
            setRole('ORG_ADMIN');
          } else if (userRoles.includes('ELECTION_ADMIN')) {
            setRole('ELECTION_ADMIN');
          } else if (userRoles.includes('OBSERVER')) {
            setRole('OBSERVER');
          } else if (userRoles.includes('AUDITOR')) {
            setRole('AUDITOR');
          } else {
            setRole('VOTER');
          }
        } catch (error) {
          console.error('Failed to sync mobile user:', error);
          setRole('VOTER'); // Default to VOTER on sync failure
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const register = async (email: string, pass: string) => {
    await createUserWithEmailAndPassword(auth, email, pass);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, role, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
