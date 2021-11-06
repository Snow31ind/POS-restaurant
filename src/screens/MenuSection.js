import React, {Component} from 'react'
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import {getDoc, collection, getDocs, doc} from 'firebase/firestore';
import Carousel from 'react-elastic-carousel';
import { CONSTANTS, isValidTimestamp } from '@firebase/util';
import {AiFillMinusSquare, AiFillPlusSquare, AiOutlineHome, AiOutlineReload, AiOutlineShoppingCart} from 'react-icons/ai';
import cupcake from '../pictures/cupcake.jpg'
import { cleanup } from '@testing-library/react';
import {data} from '../comps/Data';
import {FaShoppingCart, FaSquare} from 'react-icons/fa';
import bg from '../pictures/POS-background.png';
import {TiDelete} from 'react-icons/ti';
import DishModel from '../comps/DishModel';

// import {motion} from 'framer-motion';

function MenuSection({setRefresh, refresh}) {
    const homepageIcon = 'https://cdn-icons.flaticon.com/png/512/2932/premium/2932143.png?token=exp=1636136139~hmac=818881b59fd1a0251d8a6a4a49eef751';

    const menusRef = collection(db, 'menus');
    const [menus, setMenus] = useState([]);
    const [selectedMenuId, setSelectedMenuId] = useState('');
    const [refreshCount, setRefreshCount] = useState(0);
    const [refreshDataCount, setRefreshDataCount] = useState(0);
    const [selectedMenuName, setSelectedMenuName] = useState('');
    const [selectedDish, setSelectedDish] = useState(null);

    const [selectedDishes, setSelectedDishes] = useState([]);
    const [dishBars, setDishBars] = useState([]);
    const [isMenuItemClicked, setIsMenuItemClicked] = useState(false);
    // const [numbers, setNumbers ] = useState([0,1,2,3,4,5,6,7,8,9, 10, 11, 12]);
    const [boughtList, setBoughtList] = useState([]);

    const [totalAmount, setTotalAmout] = useState(0);
    const [tax, setTax] = useState(0);
    const [cost, setCost] = useState(0);
    const N = 3;

    const [isPaid, setIsPaid] = useState(null);
    


  useEffect(
    () => {

        if (menus.length == 0) {
            const getMenus = async () => {
                const data = await getDocs(menusRef);
    
                data.docs.forEach(
                    menu => {
    
                    const getDishes = async () => {
                        var dishesRef = collection(db, 'menus' + '/' + menu.id + '/' + 'dishes');
                        const dishes = await getDocs(dishesRef);
    
                        console.log('Adding at menu id', menu.id);
                        const dishesList = dishes.docs.map( dish => ({...dish.data(), id: dish.id}));
    
                        setMenus(
                        (prevList) => ([...prevList, {...menu.data(), id: menu.id, dishes: dishesList}])
                        )
                    }
    
                    getDishes();
                    }
                )
            }
    
            console.log('Menu section re-render.');
    
            getMenus();
        }
        // setDishBars( cutList(selectedDishes) );
        
    }
  , [refreshCount])

  const [refreshCurrentSelectedMenuCount, setRefreshCurrentSelectedMenuCount] = useState(0);

  useEffect(
      () => {
        setDishBars( cutList(selectedDishes) );
      }
  , [refreshCurrentSelectedMenuCount])

    // const menus = {menus};

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
    
    function showMenu(){
        return (
            <div>
            {menus.map(
                menu => {
                    return (
                        <div>
                            <h1> {menu.id}: {menu.name} </h1>
                            {menu.dishes.map(
                                dish => <h2> {dish.name}: {dish.price}</h2>
                            )}
                        </div>
                    )
                }
            )}
        </div>
        )
    }

    function MenuItem({id, name, picture}){
        const [isClicked, setIsClicked] = useState(false);

        const handleMenuItemClicked = () => {
            setIsClicked(!isClicked);

            // Set the current select menu base on id.
            setSelectedMenuId(id);
            console.log(selectedMenuId);
            
            // Get the list of dishes from the selected menu
            // IMPORTANT
            // const dishes = data().at(id - 1).dishes;

            const menuWithId = menus.find( menu => {return menu.id == id;})
            console.log('Selected menu: ', menuWithId);
            console.log('This menu contains: ', menuWithId.dishes);
            setSelectedMenuName(menuWithId.name);
            // Input dishes from the selected menu to render them in the menu dish.
            // setSelectedDishes(dishes.map(
            //     dish => ({...dish, fromMenuId: id})
            // ));
            // console.log(selectedDishes);

            setSelectedDishes(menuWithId.dishes.map(
                dish => (dish)
            ))

            // setDishBars( cutList(selectedDishes) );

            
            // Refresh the list
            // setRefreshCount(refreshCount + 1);
            setRefreshCurrentSelectedMenuCount(refreshCurrentSelectedMenuCount + 1);
        }

        const [isHovering, setIsHovering] = useState(false);

        return (
            <div className='MenuItem-container'
                style={{
                backgroundColor: (isHovering || selectedMenuId == id) ? '#2C3A65' : 'white',
                opacity: isHovering ? '1' : '0.8'
                }}
                onClick={handleMenuItemClicked}
                onMouseEnter={() => setIsHovering(!isHovering)}
                onMouseLeave={() => setIsHovering(!isHovering)}
            >
                <img src={picture} style={{width: 100, height: 100, borderRadius: 20}}/>
                {/* <text> {id} </text> */}
                <text style={{fontWeight: 'bold', fontSize: 18, marginTop: 5}}> {name} </text>
            </div>
        )
    }

    function DishItem({id, name, price, picture}){
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
            setTotalAmout( (prevAmount) => (prevAmount + 1.1 * parseFloat(price)));

            setIsHovering(true);
        }

        const handleClickedDishItemImage = () => {
            setSelectedDish( selectedDishes.find( dish => {return dish.id == id}));
        }
        
        return (
            <div className='DishItem-container'
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div style={{borderTopLeftRadius:20, borderTopRightRadius: 20, height: '60%', width: '100%', display:'flex', justifyContent:'center', backgroundColor: isHovering ? '#2C3A65' : 'white', alignItems:'center'}}
                    onClick={handleClickedDishItemImage}
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

    function BoughtList({boughtList}){
        return (
            <div style={{backgroundColor: 'white'}}>
                <Carousel
                    itemsToShow={4}
                    itemsToScroll={4}
                    verticalMode={true}
                    itemPadding={[10, 10]}
                    showArrows={false}
                    pagination={false}
                >
                    {boughtList.map(
                        boughtItem => <BoughtItem fromMenuId={boughtItem.fromMenuId} quantity={boughtItem.quantity} id={boughtItem.id} name={boughtItem.name} price={boughtItem.price} image={boughtItem.img}/>
                    )}
                </Carousel>
            </div>
        )
    }

    function BoughtItem({fromMenuId, id, name, price, quantity, image}){
        const handleClickAddItem = () => {
            // var dishItem = boughtList.find( boughtItem => {return boughtItem.id == id});
            
            // setBoughtList(boughtList.filter( (boughtItem) => {return boughtItem.id != id}));
            // setBoughtList([...boughtList, {}])

            setBoughtList(
                boughtList.map(
                    boughtItem => boughtItem.id == id ? {...boughtItem, quantity: boughtItem.quantity + 1} : boughtItem
                )
            )
            
            setCost((prevAmount) => (parseFloat(prevAmount) + parseFloat(price)));
            setTax( (prevAmount) => (prevAmount + (0.1) * parseFloat(price)));
            setTotalAmout( (prevAmount) => (prevAmount + 1.1 * parseFloat(price)));
            console.log("After buy more a new one", boughtList);
        }

        const handleClickMinusItem = () => {
            if (quantity == 1) {

                setBoughtList(boughtList.filter( boughtItem => {
                    // return (boughtItem.fromMenuId != selectedMenuId) || (boughtItem.fromMenuId == selectedMenuId && boughtItem.id != id)
                    var x = boughtItem.id != id;
                    var y = boughtItem.fromMenuId != fromMenuId;
                    console.log(boughtItem.fromMenuId);
                    console.log(fromMenuId);
                    console.log('Condition X:', x);
                    console.log('Condition Y:', y);

                    console.log(boughtItem.fromMenuId);
                    console.log(fromMenuId);

                    return (boughtItem.id != id || boughtItem.fromMenuId != fromMenuId)
                    ;}));
            } else {
                setBoughtList(
                    boughtList.map(
                        boughtItem => (boughtItem.id == id && boughtItem.fromMenuId == fromMenuId) ? {...boughtItem, quantity: boughtItem.quantity - 1} : boughtItem
                    )
                )
            }

            setCost((prevAmount) => (parseFloat(prevAmount) - parseFloat(price)));
            setTax( (prevAmount) => (prevAmount - (0.1) * parseFloat(price)));
            setTotalAmout( (prevAmount) => (totalAmount - 1.1 * parseFloat(price)));
            console.log('After substract a time', boughtList);
        }

        const handleClickDeleteItem = () => {
            setBoughtList(
                boughtList.filter( boughtItem => {return boughtItem.id != id;})
            )

            setCost((prevAmount) => (parseFloat(prevAmount) - quantity * parseFloat(price)));
            setTax( (prevAmount) => (prevAmount - quantity * (0.1) * parseFloat(price)));
            setTotalAmout( (prevAmount) => (totalAmount - quantity * 1.1 * parseFloat(price)));
        }
        return(
            <div style={{borderColor: 'white', height: 100, width: '100%', borderStyle: 'ridge',backgroundColor: 'white', flexDirection:'row', display:'flex', padding: 10, borderRadius: 20
            , animationName: 'example', animationDuration: '4s'
            }}>
                <div style={{height: '100%', width: '30%', display: 'flex', justifyContent: 'center', alignItems :'center'}}>
                    <img src={image} alt={cupcake} style={{height: 100, width: 100, borderRadius:20}} />
                </div>
                
                <div style={{width: '70%', backgroundColor:'white', paddingLeft: 5, paddingRight: 5}}>
                    <div style={{backgroundColor: 'white', display: 'flex', flexDirection: 'row'}}>
                        <text style={{fontWeight: 'bold', backgroundColor: 'white', width: '90%'}}> {name} </text>
                        <div style={{float: 'right'}}>
                            <TiDelete
                                color='red'
                                style={{alignSelf:'end'}}
                                size={36}
                                onClick={handleClickDeleteItem}
                            />
                        </div>

                    </div>

                    <div style={{marginTop: 20, backgroundColor: 'white', width: '100%', display: 'flex'}}>
                        <AiFillMinusSquare size={40}
                            color='gray'
                            onClick={handleClickMinusItem}
                        />
                        <div style={{width: '30%', justifyContent:'center', alignItems:'center', display: 'flex'}}>
                            <text style={{fontSize: 20, fontWeight: 'bold'}}> {quantity} </text>
                        </div>
                        <AiFillPlusSquare size={40}
                            color='tomato'
                            onClick={handleClickAddItem}
                        />
                        <div style={{width: '70%', justifyContent:'end', alignItems:'center', display: 'flex'}}>
                        <text style={{color: 'red', fontWeight: 'bold', fontSize:30}}> $ {price * quantity} </text>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

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
        setTotalAmout(0);
        setBoughtList([]);

        setIsPaid(true);
    }

    // useEffect(
    //     () => {

    //         setDishBars( cutList(selectedDishes) );

    //     }, [refreshCount])

    return (
        <div className='MenuSection-container'>
            {/* <img src={bg} alt={'Back ground'} style={{height: 100, width: 100}}/> */}

            {/* Left-hand side section */}
            <div className='MenuSection-menu'>

                {/* Menu bar */}
                <div className='MenuSection-menu-bar'>
                    <div className='MenuSection-menu-bar-home'>
                        {/* <AiOutlineHome size={50} color={'white'}
                        /> */}
                        <img src={homepageIcon} style={{width: 50, height: 50}} />
                    </div>

                    <h2 style={{marginLeft: 20, fontWeight: 'bold'}}> Homepage </h2>

                    {/* <div style={{width: '80%', justifyContent: 'end', display: 'flex', marginLeft: 60}}>
                        <div className='MenuSection-menu-bar-reload'>
                            <AiOutlineReload size={50} color={'white'}
                            />
                        </div>
                    </div> */}
                </div>

                {/* Menu item carousel */}
                <div className='MenuSection-menu-item'>
                    {/* <text> Menu item </text> */}
                    <Carousel
                        itemsToShow={3}
                        itemsToScroll={1}
                        // pagination={false}
                        // enableTilt={true}
                        // preventDefaultTouchmoveEvent={true} 
                        showArrows={true}
                        // renderPagination={myPagnition}
                        // renderArrow={myArrow}
                        children={menus.map( item => <MenuItem id={item.id} name={item.name} picture={item.img} />)}
                    >
                        {/* <MenuItem name='A' picture={cupcake}/>
                        <MenuItem name='B' picture={cupcake}/>
                        <MenuItem name='C' picture={cupcake}/>
                        <MenuItem name='D' picture={cupcake}/>
                        <MenuItem name='E' picture={cupcake}/>
                        <MenuItem name='F' picture={cupcake}/>
                        <MenuItem name='G' picture={cupcake}/>
                        <MenuItem name='H' picture={cupcake}/>
                        <MenuItem name='I' picture={cupcake}/>
                        <MenuItem name='J' picture={cupcake}/>   */}

                    </Carousel>

                </div>

                {/* Dish item carousel */}
                <div className='MenuSection-menu-dish'>

                    <div className='MenuSection-menu-dish-title'>
                        <div style={{borderBottomStyle:'inset', width: '45%', height: 20, marginLeft: 15, marginLeft: 15}}></div>
                        
                        <div style={{width: '10%', display: 'flex', justifyContent: 'center'}}>
                            <text style={{fontWeight: 'bold', fontSize: 28, color: 'black', fontStyle: 'oblique'}}>
                                {/* {menus.at(selectedMenuId - 1).name} */}
                                {selectedMenuName == '' ? (<div> </div>) : selectedMenuName}
                            </text>
                        </div>

                        <div style={{borderBottomStyle:'inset', width: '45%', height: 20, marginRight: 15}}></div>
                    </div>
                    
                    {selectedMenuId != '' ? (
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
                                            dish => <DishItem fromMenuId={dishBar.id} key={dish.id} id={dish.id} name={dish.name} price={dish.price} picture={dish.img}/>
                                        )}
                                    </Carousel>
                                )
                            )}
                            itemPadding={[15, 15]}
                            showArrows={false}
                        >
                        </Carousel>
                    </div>
                    ) : (
                        <div>

                        </div>
                    )}
                    
                </div>
            </div>

            {/* Right-hand side section */}
            <div className='MenuSection-cart'>
                <div style={{height: '10%', backgroundColor: 'white', alignItems: 'center', display: 'flex', paddingLeft: 10, paddingRight: 10}}>
                    <FaShoppingCart color='tomato' size={50} />
                    <text style={{marginLeft: 20, color: 'tomato', fontWeight: 'bold', fontSize: 28}}>Your cart ({boughtList.length})</text>
                </div>

                <div style={{height: '60%', flexDirection:'column', display: 'flex', backgroundColor: 'white', borderTopStyle: 'ridge', borderBottomStyle: 'ridge'}}>
                    {boughtList.length == 0 ? (
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
                selectedDish && 
                <DishModel 
                    selectedImg={selectedDish.img} 
                    setSelectedImg={setSelectedDish} 
                    name={selectedDish.name}
                    price={selectedDish.price}
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
