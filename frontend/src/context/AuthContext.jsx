import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get('/auth/me');
        setUser({
          userId: data.userId,
          username: data.username
        });
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    const { data } = await axios.post('/auth/login', { username, password });
    setUser({ username: data.username });
    return data;
  };

  const register = async (username, password) => {
    const { data } = await axios.post('/auth/register', { username, password });
    setUser({ username: data.username });
    return data;
  };

  const logout = async () => {
    await axios.get('/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
