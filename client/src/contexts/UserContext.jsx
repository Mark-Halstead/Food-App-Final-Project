import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [nutritionistData, setNutritionistData] = useState(null);
  
    return (
      <UserContext.Provider value={{ userData, setUserData, nutritionistData, setNutritionistData }}>
        {children}
      </UserContext.Provider>
    );
  };
  