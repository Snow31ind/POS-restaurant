import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext)
}

export function UserProvider({children}) {
    const [boughtList, setBoughtList] = useState([]);

    const value = {
        boughtList,
        setBoughtList
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

