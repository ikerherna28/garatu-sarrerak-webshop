
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Erabiltzailea } from './types';
import { loginUser, registerUser } from './firebase';

interface AuthContextType {
  user: Erabiltzailea | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (email: string, name: string, surname: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Erabiltzailea | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('garatu_user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (email: string, password?: string) => {
    const found = await loginUser(email, password);
    if (found) {
      setUser(found);
      localStorage.setItem('garatu_user', JSON.stringify(found));
      return true;
    }
    return false;
  };

  const register = async (email: string, name: string, surname: string, phone: string, password: string) => {
    const newUser = await registerUser(email, name, surname, phone, password);
    setUser(newUser);
    localStorage.setItem('garatu_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('garatu_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth error');
  return context;
};
