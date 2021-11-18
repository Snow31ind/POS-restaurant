import React from 'react'
import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useMenu } from '../contexts/MenuContext';
import '../App.css'
import { Card, Container } from 'react-bootstrap';

function MenuItem({
    id, 
    name, 
    picture
}) {
    const { menus } = useData()
    const { setRefreshCurrentSelectedMenuCount ,setSelectedMenuId, setSelectedDishes, selectedMenuId, cutList, setDishBars, selectedDishes  } = useMenu()

    const [isClicked, setIsClicked] = useState(false);

    const handleMenuItemClicked = () => {
        setIsClicked(!isClicked);

        setSelectedMenuId(id);

        const menuWithId = menus.find( menu => {return menu.id == id;})
        console.log('Selected menu: ', menuWithId);
        console.log('This menu contains: ', menuWithId.dishes);

        setSelectedDishes(menuWithId.dishes.map(
            dish => (dish)
        ))

        setDishBars( cutList(selectedDishes) );

        setRefreshCurrentSelectedMenuCount(prevCount => prevCount + 1);
    }

    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className='MenuItem-container'
            style={{
            backgroundColor: (isHovering) ? '#2C3A65' : 'white',
            opacity: isHovering ? '1' : '0.8'
            }}
            onClick={handleMenuItemClicked}
            onMouseEnter={() => setIsHovering(!isHovering)}
            onMouseLeave={() => setIsHovering(!isHovering)}
        >
            {/* <text>asd</text> */}
            <img src={picture} style={{width: 100, height: 100, borderRadius: 20}}/>
            {/* <text> {id} </text> */}
            <text style={{fontWeight: 'bold', fontSize: 18, marginTop: 5}}> {name} </text>
        </div>

            // <Card className='d-flex align-items-center b-0' style={{width: 120}}>
            //     <Card.Img variant='top' src={picture} style={{width: 120, height: 120}}/>
            //     <Card.Body>
            //         <Card.Title>{name}</Card.Title>
            //     </Card.Body>
            // </Card>
    )
}

export default MenuItem
