import { collection, getDocs } from '@firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../firebase/config';

const DataContext = createContext();

export function useData() {
    return useContext(DataContext);
}

export function DataProvider({children}) {

    const [menus, setMenus] = useState([]);

    const menusRef = collection(db, 'menus')

    useEffect(
        () => {
            const queryMenus = async () => {
                const menusDocs = await getDocs(menusRef);

                setMenus(
                    menusDocs.docs.map( menu => {
                        const queryDishes = async () => {
                            const dishesRef = collection(db, 'menus' + '/' + menu.id + '/' + 'dishes')
                            const dishesDocs = await getDocs(dishesRef);
                            
                            return dishesDocs.docs.map( dish => ({...dish.data(), id: dish.id}))
                        }

                        var list = []
                        queryDishes()
                        .then( dishes => dishes.map( dish => list.push(dish) ))
                        .catch(e => console.log('Error in reading dishes:', e.message))


                        return {...menu.data(), id: menu.id, dishes: list}
                    })
                )
            }

            queryMenus();
            console.log('!',menus);
        }
    , [])

    const value = {
        menus
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

