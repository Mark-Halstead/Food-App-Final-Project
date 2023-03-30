import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [nutritionistData, setNutritionistData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    return (
      <UserContext.Provider value={{ userData, setUserData, nutritionistData, setNutritionistData, isLoggedIn, setIsLoggedIn }}>
        {children}
      </UserContext.Provider>
    );
  };
  