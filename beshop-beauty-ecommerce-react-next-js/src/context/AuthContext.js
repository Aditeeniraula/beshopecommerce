import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);

  const fetchUserProfile = useCallback(async (token) => {
    try {
      const res = await fetch('/api/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      console.error(error);
      logout();
    }
  }, []);

  useEffect(() => {
    if (authToken) fetchUserProfile(authToken);
  }, [authToken, fetchUserProfile]);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ 
             authToken, user, login, logout 
            }), [authToken, user]);

  return <AuthContext.Provider 
            value={value}>{children}
          </AuthContext.Provider>;
};
