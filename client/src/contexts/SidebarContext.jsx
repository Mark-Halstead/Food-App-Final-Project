import React, { createContext, useState } from 'react';

export const SidebarContext = createContext({
    sidebar: false,
    toggleSidebar: () => { },
});

export const SidebarProvider = ({ children }) => {
    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    return (
        <SidebarContext.Provider value={{ sidebar, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

