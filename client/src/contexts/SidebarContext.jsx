import React, { createContext, useState } from 'react';

export const SidebarContext = createContext({
    sidebar: true,
    toggleSidebar: () => { },
});

export const SidebarProvider = ({ children }) => {
    const [sidebar, setSidebar] = useState(true);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    return (
        <SidebarContext.Provider value={{ sidebar, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

