import React, { createContext, useState } from 'react';

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [pendingClients, setPendingClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});

  return (
    <ClientContext.Provider value={{ clients, setClients, pendingClients, setPendingClients, selectedClient, setSelectedClient }}>
      {children}
    </ClientContext.Provider>
  );
};
