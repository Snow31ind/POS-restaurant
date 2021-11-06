import React from 'react'
import '../App.css';

function DishModel({selectedImg, setSelectedImg, name, price}) {
    const handleClick = (e) => {
        if (e.target.classList.contains('DishItem-backdrop')){
            setSelectedImg(null);
        }
    }

    return (
        <div className='DishItem-backdrop' onClick={handleClick}>
            <div className='DishItem-backdrop-container'>
                <div style={{display: 'flex', flexDirection: 'row', height: '70%',alignItems:'center' ,justifyContent: 'space-around'}}>
                    <text style={{width: '40%', fontSize: 24, fontStyle: 'italic', fontWeight: 'bold'}}> {name} </text>
                    <img src={selectedImg} alt='Picture is not available'/>
                </div>

                <div>
                    <text> [Description of the dish will be written here] </text>
                </div>  
            </div>       
        </div>
    )
}

export default DishModel
