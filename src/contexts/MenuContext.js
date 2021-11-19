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
    const [selectedMenuName, setSelectedMenuName] = useState('');

    const [refreshCurrentSelectedMenuCount, setRefreshCurrentSelectedMenuCount] = useState(0);
    
    const { menus } = useData()

    
    const [chunk, setChunk] = useState(3)
    const modifyChunk = () => {
        let x = window.innerWidth

        if (x < 720) setChunk(1)
        else if (x < 1160) setChunk(2)
        else setChunk(3)
    }
    useEffect(
        () => {
            modifyChunk()
        }
    , [])
    window.addEventListener('resize', modifyChunk)

    
    useEffect(
        () => {
            // setSelectedDishes( menus.at(0) )
            // setDishBars( cutList(selectedDishes) )
            // console.log('Selected dishes in MenuContext :', menus.at(0));
        }
    , [])

    useEffect(
        () => {
          setDishBars( cutList(selectedDishes) );
          console.log('Dishbars at MenuContext:', dishBars);
        }
    , [refreshCurrentSelectedMenuCount, chunk])


    const cutList = (list) => {
        var i, j
        var array = [];

        for(i = 0, j = list.length; i < j; i += chunk) {
            array.push( list.slice(i, i + chunk) )    
        }
        
        console.log('Array contains', array);
        return array



        // const numOfDishes = list.length;

        // for(var i = 0; i<numOfDishes;) {
        //     if (numOfDishes - i >= 3) {
        //         array.push([list.at(i), list.at(i + 1), list.at(i + 2)])
        //         i += 3;
        //     } else if (numOfDishes - i >= 2) {
        //         array.push([list.at(i), list.at(i + 1)])
        //         i += 2;
        //     } else {
        //         array.push([list.at(i)])
        //         i += 1;
        //     }
        // }

        // console.log('Cutted list: ', array);
        // return array;

        // let x = window.innerWidth

        // // 1160

        // if (x < 1160) {

        // }
    }

    const value = {
        selectedMenuName,
        chunk,
        selectedMenuId,
        selectedDishes,
        selectedDish,
        dishBars,

        setSelectedMenuName,
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

