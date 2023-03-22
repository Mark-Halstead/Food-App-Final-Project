import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const storedUsername = localStorage.getItem('username');
//     if (token) {
//       setIsLoggedIn(true);
//     }
//     if (storedUsername) {
//       setUsername(storedUsername); 
//     }
//   }, []);
  

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    // localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, setIsLoggedIn, username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};
