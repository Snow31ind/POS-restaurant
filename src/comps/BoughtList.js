import React from 'react'
import BoughtItem from './BoughtItem'
import { PaymentProvider } from '../contexts/PaymentContext'
import { useUser } from '../contexts/UserContext'
import Carousel from 'react-elastic-carousel';

function BoughtList(){
    const { boughtList } = useUser()

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
                    boughtItem => 
                    (
                            <BoughtItem fromMenuId={boughtItem.fromMenuId} quantity={boughtItem.quantity} id={boughtItem.id} name={boughtItem.name} price={boughtItem.price} image={boughtItem.img}/>
                    )
                )}
            </Carousel>
        </div>
    )
}

export default BoughtList
