import React from 'react'
import { useState } from 'react';
import { usePayment } from '../contexts/PaymentContext';
import { useUser } from '../contexts/UserContext';
import {AiFillMinusSquare, AiFillPlusSquare, AiOutlineShoppingCart} from 'react-icons/ai';
import cupcake from '../pictures/cupcake.jpg'
import { useMenu } from '../contexts/MenuContext';
import DishModel from './DishModal';


function DishItem({ setOpenDishModal, id, name, price, picture}){
    const { boughtList, setBoughtList } = useUser()
    const { setCost, setTax, setTotalAmount } = usePayment()
    
    const {
        selectedMenuId,
        selectedDishes,
        selectedDish,

        setSelectedMenuId,
        setSelectedDishes,
        setSelectedDish
    } = useMenu()

    const [isHovering, setIsHovering] = useState(false);

    const handleClickBuyItem = () => {
        const findAlreadyExistBoughtItem = boughtList.find( boughtItem => {return (boughtItem.id == id && boughtItem.fromMenuId == selectedMenuId)});

        if (findAlreadyExistBoughtItem == undefined) {
            const clickedItem = selectedDishes.find( (item) => {return item.id == id;})
            setBoughtList([...boughtList, {...clickedItem, quantity: 1, fromMenuId: selectedMenuId}])
        } else {
            setBoughtList(
                boughtList.map(
                    boughtItem => (boughtItem.id == id && boughtItem.fromMenuId == selectedMenuId) ? {...boughtItem, quantity: boughtItem.quantity + 1} : boughtItem
                )
            )
        }

        console.log("The current bought list contains:", boughtList);
        setCost((prevAmount) => (parseFloat(prevAmount) + parseFloat(price)));
        setTax( (prevAmount) => (prevAmount + (0.1) * parseFloat(price)));
        setTotalAmount( (prevAmount) => (prevAmount + 1.1 * parseFloat(price)));

        setIsHovering(true);
    }

    const handleClickedDishItemImage = () => {
        setSelectedDish( selectedDishes.find( dish => {return dish.id == id}));
    }
    
    return (
        <div className='DishItem-container'
            onClick={() => {
                setSelectedDish( selectedDishes.find( dish => { return dish.id == id}));
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div style={{borderTopLeftRadius:20, borderTopRightRadius: 20, height: '60%', width: '100%', display:'flex', justifyContent:'center', backgroundColor: isHovering ? '#2C3A65' : 'white', alignItems:'center'}}
                onClick={() => {
                    handleClickedDishItemImage()
                    setOpenDishModal(true)
                }}
            >
                <img src={picture} alt={cupcake} style={{width: 150, height: 150, borderRadius: 30}}/>

            </div>

            <div style={{backgroundColor: 'white', borderBottomStyle: 'ridge', display:'flex', height: '20%', width: '80%', alignItems: 'center'}}>
                <text style={{fontWeight: 'bold'}}> {name} </text>
            </div>

            <div style={{alignItems:'center', backgroundColor: 'white', height: '20%', width: '80%', flexDirection: 'row', display: 'flex'}}>
                <div style={{width: '80%'}}>
                    <text
                        style={{fontSize: 24, color: 'red', fontWeight: 'bold'}}
                    > {'$' + price} </text>
                </div>

                <div style={{width: '20%', backgroundColor: 'white', display: 'flex', justifyContent:'end', alignContent: 'center'}}>
                    <div style={{borderRadius:10, display:'flex', backgroundColor: 'red', height: 35, width: 35, justifyContent:'center', alignItems:'center'}}
                            onClick={handleClickBuyItem}
                    >
                        <AiOutlineShoppingCart
                            
                            color='white'
                            size={28} 
                            style={{float: 'right'}}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DishItem
