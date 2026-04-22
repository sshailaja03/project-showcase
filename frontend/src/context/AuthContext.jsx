import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/auth/me');
        setUser({ userId: res.data.userId });
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (username, password) => {
    const res = await axios.post('/auth/login', { username, password });
    setUser({ username: res.data.username });
    return res.data;
  };

  const register = async (username, password) => {
    const res = await axios.post('/auth/register', { username, password });
    setUser({ username: res.data.username });
    return res.data;
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
