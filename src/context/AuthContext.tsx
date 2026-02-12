import React, { createContext, useContext, useState, useCallback } from 'react';
import type { UserRole } from '@/utils/constants';
import { demoCredentials, mockUsers, type User } from '@/utils/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, isLoading: true }));
    // Simulate API call
    await new Promise((r) => setTimeout(r, 600));

    const cred = demoCredentials.find((c) => c.email === email && c.password === password);
    if (cred) {
      // Find the full user data from mockUsers to get organizational fields
      const fullUser = mockUsers.find((u) => u.email === email);
      const user: User = fullUser || {
        id: `${cred.role}-user`,
        name: cred.name,
        email: cred.email,
        role: cred.role,
        status: 'active',
      };
      setState({ user, isAuthenticated: true, isLoading: false });
      return { success: true };
    }
    setState((s) => ({ ...s, isLoading: false }));
    return { success: false, error: 'Invalid credentials' };
  }, []);

  const logout = useCallback(() => {
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    const cred = demoCredentials.find((c) => c.role === role);
    if (cred) {
      const fullUser = mockUsers.find((u) => u.email === cred.email);
      setState({
        user: fullUser || { id: `${role}-user`, name: cred.name, email: cred.email, role, status: 'active' },
        isAuthenticated: true,
        isLoading: false,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
