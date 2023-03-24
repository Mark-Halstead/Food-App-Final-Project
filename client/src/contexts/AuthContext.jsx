import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');
    if (token) {
      setIsLoggedIn(true);
    }
    if (storedEmail) {
      setEmail(storedEmail); 
    }
  }, []);
  

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    // localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, setIsLoggedIn, email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
