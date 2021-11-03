import React, {useState} from 'react'
import Carousel from 'react-elastic-carousel'
import '../App.css'
import cupcake from '../pictures/cupcake.jpg'

function Menu() {
    const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const [dishes, setDishes] = useState([
        {
            name: 'A',
            price: 1
        },
        {
            name: 'B',
            price: 1
        },
        {
            name: 'C',
            price: 1
        },
        {
            name: 'D',
            price: 1
        },
        {
            name: 'E',
            price: 1
        },
    ])

    function MenuItem({name}){
        return (
            <div className='Menu-item'>
                <img
                style={{height: 100, width:100}}
                src={cupcake}/>
                <text> {name} </text>
            </div>
        )
    }

    function Seperator(){


        return (
            <div className='Seperator'>
                <h1> Seperator </h1>
            </div>
        )
    }

    function DishItem({name, price}) {
        return (
            <div className='Dish-item'>
                <img
                style={{height: 100, width:100}}
                src={cupcake}
                />
                <text> {name}: {price}</text>
            </div>
        )
    }

    return (
        <div className='Menu'>
            <div className='Carousel-wrapper'>
                <Carousel
                    itemsToShow={3}
                    itemsToScroll={3}

                >
                    {items.map(
                        (item) => <MenuItem name={item.toString()} />
                    )}
                </Carousel>
            </div>

            <Seperator />
            
            <div className='Carousel-wrapper'>
                <Carousel
                    verticalMode={true}
                    itemsToShow={1}
                >
                    {dishes.map(
                        dish => <DishItem name={dish.name} price={dish.price} />
                    )}
                </Carousel>
            </div>


        </div>
    )
}

export default Menu;
