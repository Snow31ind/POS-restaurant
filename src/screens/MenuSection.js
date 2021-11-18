import React from 'react'
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import {collection, getDocs} from 'firebase/firestore';
import Carousel from 'react-elastic-carousel';
import {AiFillMinusSquare, AiFillPlusSquare, AiOutlineHome, AiOutlineLogout, AiOutlineShoppingCart} from 'react-icons/ai';
import cupcake from '../pictures/cupcake.jpg'
import {FaShoppingCart, FaSquare} from 'react-icons/fa';
import {TiDelete} from 'react-icons/ti';
import DishModel from '../comps/DishModal';
import homepageIcon from '../pictures/home.png';
import { useData } from '../contexts/DataContext';
import { PaymentProvider, usePayment } from '../contexts/PaymentContext';
import BoughtItem from '../comps/BoughtItem';
import MenuItem from '../comps/MenuItem';
import BoughtList from '../comps/BoughtList';
import DishItem from '../comps/DishItem';
import { MenuProvider, useMenu } from '../contexts/MenuContext';
import { useUser } from '../contexts/UserContext';
import PaymentModal from '../comps/PaymentModal';
import { MdOutlineLogout, MdSettings } from 'react-icons/md';
import { useAuth } from '../contexts/AuthContext';
// import {motion} from 'framer-motion';
function MenuSection({setRefresh, refresh}) {
    // const homepageIcon = 'https://cdn-icons.flaticon.com/png/512/2932/premium/2932143.png?token=exp=1636136139~hmac=818881b59fd1a0251d8a6a4a49eef751';

    const [selectedMenuName, setSelectedMenuName] = useState('');

    const [isPaid, setIsPaid] = useState(null);
    const [openDishModal, setOpenDishModal] = useState(false)

    const { menus } = useData()
    const { dishBars, refreshCurrentSelectedMenuCount, selectedDish, selectedDishes, setSelectedDish  } = useMenu()
    const { boughtList, setBoughtList } = useUser()
    const { cost, tax, totalAmount, setCost, setTax, setTotalAmount } = usePayment()

    const Cost = boughtList.reduce( 
        (prevBoughtItem, currentBoughtItem) => parseFloat(prevBoughtItem.price) * prevBoughtItem.quantity + parseFloat(currentBoughtItem.price) * currentBoughtItem.quantity
        , 0)

    useEffect(
        () => {
            console.log('Cost', Cost);
        }
    , [])


    function PaymentModel() {
        const handleClick = (e) => {
            if (e.target.classList.contains('PaymentModal-backdrop')) {
                setIsPaid(false);
            }
        }

        return (
            <div className='PaymentModal-backdrop'
                onClick={handleClick}
            >
                <div className='PaymentModal-backdrop-container'>
                    <text style={{fontSize: 28, fontStyle: 'italic'}}> Thank you for having us served you our best. Have a delicious dine. You're always welcome here.</text>
                </div>
            </div>
        )
    }





    const handleClickPayment = () => {
        const billDesc = {
            cost: cost,
            tax: tax,
            totalAmount: totalAmount,
            boughtItems: boughtList,
            createdAt: new Date(),
        }

        setCost(0);
        setTax(0);
        setTotalAmount(0);
        setBoughtList([]);

        setIsPaid(true);
    }

    const { logout } = useAuth()

    return (
        <div className='MenuSection-container'>
            {/* <text>{menus[0].dishes[0].id}</text> */}
            {/* <img src={bg} alt={'Back ground'} style={{height: 100, width: 100}}/> */}

            {/* Left-hand side section */}
            <div className='MenuSection-menu'>

                {/* Menu bar */}
                <div className='MenuSection-menu-bar'>
                    <div className='MenuSection-menu-bar-home'>
                        <AiOutlineHome size={36}/>
                    </div>
                    
                    <div>
                        <MdOutlineLogout onClick={() => logout()} size={36}/>
                    </div>

                </div>

                {/* <text>Hasi</text>
                { menus.map( menu => <text>{menu.id}</text>) } */}

                {/* Menu item carousel */}
                <div className='MenuSection-menu-item'>
                    
                    <Carousel
                        itemsToShow={5}
                        itemsToScroll={1}
                        // pagination={false}
                        // enableTilt={true}
                        // preventDefaultTouchmoveEvent={true} 
                        showArrows={true}
                        // renderPagination={myPagnition}
                        // renderArrow={myArrow}
                        children={menus.map( item =>
                            (
                                    <MenuItem
                                    key={item.id}
                                    id={item.id} 
                                    name={item.name}
                                    picture={item.img}
                                    // setRefreshCurrentSelectedMenuCount={setRefreshCurrentSelectedMenuCount}
                                    />
                            )
                        )}
                    >
                    </Carousel>
                </div>

                {/* Dish item carousel */}
                <div className='MenuSection-menu-dish'>

                    <div className='MenuSection-menu-dish-title'>
                        <div style={{borderBottomStyle:'inset', width: '45%', height: 20, marginLeft: 15, marginLeft: 15}}></div>
                        
                        <div style={{width: '10%', display: 'flex', justifyContent: 'center'}}>
                            <text style={{fontWeight: 'bold', fontSize: 28, color: 'black', fontStyle: 'oblique'}}>
                                {selectedMenuName == '' ? (<div> </div>) : selectedMenuName}
                            </text>
                        </div>

                        <div style={{borderBottomStyle:'inset', width: '45%', height: 20, marginRight: 15}}></div>
                    </div>

                        <div className='MenuSection-menu-dish-item'>
                        <Carousel
                            itemsToShow={2}
                            verticalMode={true}
                            // pagination={false}
                            children={dishBars.map(
                                dishBar => (
                                    <Carousel
                                    key={dishBar.id}
                                    enableSwipe={false}
                                    showArrows={false}
                                    itemsToShow={3}
                                    pagination={false}
                                    showEmptySlots
                                    >
                                        {dishBar.map(
                                            dish => 
                                            (
                                                // <MenuProvider>
                                                // <PaymentProvider>
                                                    <DishItem setOpenDishModal={setOpenDishModal} fromMenuId={dishBar.id} key={dish.id} id={dish.id} name={dish.name} price={dish.price} picture={dish.img}/>
                                                // </PaymentProvider>
                                                // </MenuProvider>
                                            )
                                        )}
                                    </Carousel>
                                )
                            )}
                            itemPadding={[15, 15]}
                            showArrows={false}
                        >
                        </Carousel>
                    </div>
                </div>

            </div>

            {/* Right-hand side section */}
            <div className='MenuSection-cart'>
                <div style={{height: '10%', backgroundColor: 'white', alignItems: 'center', display: 'flex', paddingLeft: 10, paddingRight: 10}}>
                    <FaShoppingCart color='tomato' size={50} />
                    <text style={{marginLeft: 20, color: 'tomato', fontWeight: 'bold', fontSize: 28}}>Your cart ({boughtList.length})</text>
                </div>

                <div style={{height: '60%', flexDirection:'column', display: 'flex', backgroundColor: 'white', borderTopStyle: 'ridge', borderBottomStyle: 'ridge'}}>
                    {boughtList.length === 0 ? (
                        <div style={{height: '100%', display:'flex', justifyContent: 'center', alignItems:'center', fontSize: 20}}>
                                <h5>You have not chose any dish yet.</h5>
                                <h5>Let's fill up your cart!</h5>
                        </div>
                    ): (
                        <BoughtList boughtList={boughtList}/>
                    )}
                </div>

                <div style={{height:'29.3%', backgroundColor: 'white', paddingLeft: 10, paddingRight: 10}}>
                    <div style={{height: '60%', backgroundColor: 'white', display: 'flex', flexDirection:'row', paddingLeft: 10, paddingRight: 10}}>
                        <div style={{width: '50%', backgroundColor: 'white', display: 'flex', flexDirection: 'column'}}>
                            <text style={{backgroundColor: 'white', fontSize: 22, fontWeight: 'bold'}}> Cost </text>
                            <text style={{backgroundColor: 'white', fontSize: 22, fontWeight: 'bold', marginTop: 50}}> Total </text>
                        </div>
                        
                        
                        
                        <div style={{width: '50%', flexDirection: 'column', display: 'flex', alignItems:'end'}}>
                            <text style={{color: 'tomato', fontSize: 35, fontWeight: 'bold'}}> $ {Math.abs(cost.toFixed(2))} </text>
                            <text style={{backgroundColor: 'white', fontSize: 15, fontWeight: 'bold'}}> ( Tax 10%: {Math.abs(tax.toFixed(2))} )  </text>
                            <text style={{color: 'tomato', fontSize: 35, fontWeight: 'bold'}}> $ {Math.abs(totalAmount.toFixed(2))} </text>

                        </div>
                    </div>

                    <div style={{height: '30%', backgroundColor: 'white'}}>
                        <button style={{width: '100%', height: '100%', backgroundColor: 'red', borderRadius: 20}}
                            onClick={handleClickPayment}
                        >
                            <h1 style={{color: 'white'}}> PAYMENT </h1>
                        </button>
                    </div>
                </div>
            </div>
        
            

            {/* Open the backdrop for dish item */}
            {
                openDishModal && 
                <DishModel 
                    selectedImg={selectedDish.img} 
                    setOpenModal={setOpenDishModal}
                    name={selectedDish.name}
                    price={selectedDish.price}
                    id={selectedDish.id}
                />
            }

            {/* Open the backdrop for payment */}
            {
                isPaid && 
                <PaymentModel />
            }

        </div>
    )
}

export default MenuSection;
