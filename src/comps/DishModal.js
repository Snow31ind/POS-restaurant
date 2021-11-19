import React, { useState } from 'react'
// import '../App.css';
import 'react-icons/ai'
import '../styles/DishModal.css'

import { AiFillMinusCircle, AiFillPlusCircle, AiOutlineCloseCircle, AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineShopping, AiOutlineShoppingCart } from 'react-icons/ai';
import { useUser } from '../contexts/UserContext';
import { useMenu } from '../contexts/MenuContext';
import { useParams } from 'react-router';
import { usePayment } from '../contexts/PaymentContext';

function DishModal({id, setOpenModal, selectedImg, name, price}) {


    const [amount, setAmount] = useState(1)

    const { boughtList, setBoughtList } = useUser()
    const { selectedDishes, selectedMenuId } = useMenu()
    const { setCost, setTax, setTotalAmount } = usePayment()

    const handleClick = (e) => {
        if (e.target.classList.contains('DishItem-backdrop')){
            setOpenModal(false);
        }
    }

    const handleClickPlus = () => {
        setAmount( prevAmount => prevAmount + 1)
    }

    const handleClickMinus = () => {
        if ( amount > 1) setAmount ( prevAmount => prevAmount - 1)
        else setAmount(0)
    }

    const handleClickBuy = () => {
        // const findAlreadyExistBoughtItem = boughtList.find( boughtItem => {return (boughtItem.id == id && boughtItem.fromMenuId == selectedMenuId)});

        // if (findAlreadyExistBoughtItem == undefined) {
        //     const clickedItem = selectedDishes.find( (item) => {return item.id == id;})
        //     setBoughtList([...boughtList, {...clickedItem, quantity: 1, fromMenuId: selectedMenuId}])
        // } else {
        //     setBoughtList(
        //         boughtList.map(
        //             boughtItem => (boughtItem.id == id && boughtItem.fromMenuId == selectedMenuId) ? {...boughtItem, quantity: boughtItem.quantity + 1} : boughtItem
        //         )
        //     )
        // }

        if (amount == 0) return;

        const isItemBought = boughtList.find( boughtItem => { return boughtItem.id == id})

        if (isItemBought == undefined) {
            const clickedItem = selectedDishes.find( (item) => {return item.id == id;})
            setBoughtList([...boughtList, {...clickedItem, quantity: amount, fromMenuId: selectedMenuId}])
        } else {
            setBoughtList(
                boughtList.map(
                    boughtItem => (boughtItem.id == id && boughtItem.fromMenuId == selectedMenuId) ? {...boughtItem, quantity: boughtItem.quantity + amount} : boughtItem
                )
            )
        }

        setCost((prevAmount) => (parseFloat(prevAmount) + parseFloat(price) * amount));
        setTax( (prevAmount) => (prevAmount + (0.1) * parseFloat(price) * amount));
        setTotalAmount( (prevAmount) => (prevAmount + 1.1 * parseFloat(price) * amount));
    }

    return (
        <div className='DishItem-backdrop' onClick={handleClick}>
            <div className='DishItem-backdrop-container'>
                <div style={{
                    justifyContent: 'space-between', 
                    display: 'flex', 
                    backgroundColor: '#dcdcdc',
                    padding: 10,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15
                    }}>
                        <h5>ADD TO CART</h5>
                        <AiOutlineCloseCircle
                        onClick={() => setOpenModal(false)}
                        size={28}
                        />
                </div>

                <div style={{
                    flexDirection: 'row', 
                    display: 'flex', 
                    // backgroundColor: 'gray',
                    // padding: 10,
                    flex: 1
                    }}>
                    <div style={{padding: 10, display: 'flex'}}>
                        <img style={{borderRadius: 90}} src={selectedImg} />
                    </div>

                    <div style={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        // alignItems: 'center', 
                        // backgroundColor:'beige',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: 20,
                        flex: 1
                        }}>
                        
                        <div style={{flex: 1}}>
                            <div style={{   
                                flexDirection: 'row', 
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <div>
                                    <h4>SKU</h4>
                                    <h6>Quantity</h6>
                                </div>

                                <div>
                                    <h4>Category</h4>
                                    <h6>{name}</h6>
                                </div>

                                <div style={{textAlign: 'right'}}>
                                    <h4>Unit Price</h4>
                                    <h6 style={{color: 'red'}}>$ {price}</h6>
                                </div>
                            </div>

                            <div style={{
                                flexDirection: 'row',
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderTopStyle: 'ridge',
                                borderBottomStyle: 'ridge',
                                // backgroundColor: 'gray',
                                // height: '20%',
                                // padding: 10,
                                alignItems: 'center',
                                paddingTop: 10,
                                paddingBottom: 10
                                }}>
                                    <h4>Quantity</h4>

                                    <div style={{
                                        // backgroundColor: 'blue',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <AiOutlineMinusCircle  onClick={handleClickMinus} size={32} />
                                        <text style={{marginLeft: 10, marginRight: 10}}>{amount}</text>
                                        <AiOutlinePlusCircle color='red'  onClick={handleClickPlus} size={32} />
                                    </div>
                            </div>

                            <div style={{
                                // borderBottomStyle: 'ridge'
                            }}>
                                <h4>Description</h4>
                            </div>
                        </div>
                        <div
                            onClick={(e) => {
                                handleClickBuy()
                                setOpenModal(false)
                            }} 
                            style={{
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: 'red',
                            padding: 5,
                            borderRadius: 15,
                            alignItems: 'center',
                            color: 'white'
                            }}>
                            <AiOutlineShoppingCart size={32}/>
                            <text style={{marginLeft: 10, fontSize: 22}}>$ {price * amount}</text>
                        </div>
                    </div>
                </div>
            </div>       
        </div>
    )
}

export default DishModal
