import React from 'react'
import { usePayment } from '../contexts/PaymentContext';
import { useUser } from '../contexts/UserContext';

import {AiFillMinusSquare, AiFillPlusSquare, AiOutlineShoppingCart} from 'react-icons/ai';
import {TiDelete} from 'react-icons/ti';
import cupcake from '../pictures/cupcake.jpg'

function BoughtItem({fromMenuId, id, name, price, quantity, image}){
    const { boughtList, setBoughtList } = useUser()
    const { totalAmount, setCost, setTax, setTotalAmount} = usePayment()

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
        setTotalAmount( (prevAmount) => (prevAmount + 1.1 * parseFloat(price)));
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
        setTotalAmount( (prevAmount) => (totalAmount - 1.1 * parseFloat(price)));
        console.log('After substract a time', boughtList);
    }

    const handleClickDeleteItem = () => {
        setBoughtList(
            boughtList.filter( boughtItem => {return boughtItem.id != id;})
        )

        setCost((prevAmount) => (parseFloat(prevAmount) - quantity * parseFloat(price)));
        setTax( (prevAmount) => (prevAmount - quantity * (0.1) * parseFloat(price)));
        setTotalAmount( (prevAmount) => (totalAmount - quantity * 1.1 * parseFloat(price)));
    }
    return(
        <div style={{borderColor: 'white', height: 120, width: '100%', borderStyle: 'ridge',backgroundColor: 'white', flexDirection:'row', display:'flex', padding: 10, borderRadius: 20
        , animationName: 'example', animationDuration: '4s'
        }}>
            <div style={{height: '100%', width: '30%', display: 'flex', justifyContent: 'center', alignItems :'center'}}>
                <img src={image} alt={cupcake} style={{height: 90, width: 90, borderRadius: 90}} />
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

export default BoughtItem
