import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AiFillPlusSquare } from 'react-icons/ai'
import { auth } from '../firebase/config'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(
        () => {
            const unsub = onAuthStateChanged(auth, user => {
                setCurrentUser(user)
                setLoading(false)
            })

            return unsub
        }
    , [])


    const value = {
        currentUser,

        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>        
    )
}


