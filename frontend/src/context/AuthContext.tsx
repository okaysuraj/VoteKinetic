import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: 'VOTER' | 'ADMIN' | 'SUPER_ADMIN' | 'ORG_ADMIN' | 'OBSERVER' | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<'VOTER' | 'ADMIN' | 'SUPER_ADMIN' | 'ORG_ADMIN' | 'OBSERVER' | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const token = await user.getIdToken();
          const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/users/sync`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          const userRoles = data.user?.roles?.map((r: any) => r.role?.name) || [];
          
          if (userRoles.includes('SUPER_ADMIN')) {
            setRole('SUPER_ADMIN');
          } else if (userRoles.includes('ORG_ADMIN') || userRoles.includes('ADMIN')) {
            setRole('ORG_ADMIN');
          } else if (userRoles.includes('OBSERVER')) {
            setRole('OBSERVER');
          } else {
            setRole('VOTER');
          }
        } catch (error) {
          console.error("Failed to sync user", error);
          setRole('VOTER');
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
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
