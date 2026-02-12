import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Load auth from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setIsLoading(false);
  }, []);

  // ✅ Login using API response
  const login = (userData, accessToken) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', accessToken);

    setUser(userData);
    setToken(accessToken);
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
