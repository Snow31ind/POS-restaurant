import React, {useState, createContext, useContext, useEffect } from 'react'
import { useData } from './DataContext';

const MenuContext = createContext()

export function useMenu() {
    return useContext(MenuContext)
}

export function MenuProvider({children}) {
    const [selectedMenuId, setSelectedMenuId] = useState('');
    const [selectedDishes, setSelectedDishes] = useState([]);
    const [selectedDish, setSelectedDish] = useState(null);
    const [dishBars, setDishBars] = useState([])

    const [refreshCurrentSelectedMenuCount, setRefreshCurrentSelectedMenuCount] = useState(0);
    
    const { menus } = useData()

    useEffect(
        () => {
            if (menus.length == 0) console.log('Menus are not loaded yet.');
            // setSelectedDish( menus[0].dishes.map( dish => dish ))
        }
    , [])

    useEffect(
        () => {
          setDishBars( cutList(selectedDishes) );
          console.log('Dishbars at MenuContext:', dishBars);
        }
    , [refreshCurrentSelectedMenuCount])

    const cutList = (list) => {
        var array = [];
        const numOfDishes = list.length;

        for(var i = 0; i<numOfDishes;) {
            if (numOfDishes - i >= 3) {
                array.push([list.at(i), list.at(i + 1), list.at(i + 2)])
                i += 3;
            } else if (numOfDishes - i >= 2) {
                array.push([list.at(i), list.at(i + 1)])
                i += 2;
            } else {
                array.push([list.at(i)])
                i += 1;
            }
        }

        console.log('Cutted list: ', array);
        return array;
    }

    const value = {
        selectedMenuId,
        selectedDishes,
        selectedDish,
        dishBars,

        setSelectedMenuId,
        setSelectedDishes,
        setSelectedDish,
        setRefreshCurrentSelectedMenuCount,
        setDishBars,
        cutList
    }
    
    return (
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    )
}

