import logo from './logo.svg';
import './App.css';
import Carousel from 'react-elastic-carousel';
// import styles from './App.css'
import Item from './comps/Item';
import { isValidTimestamp } from '@firebase/util';
import MenuSection from './screens/MenuSection';
import { db } from './firebase/config';
import { useEffect, useState } from 'react';
import { collection, getDoc, getDocs, doc, onSnapshot } from '@firebase/firestore';
import {data} from './comps/Data';
import bg from './pictures/POS-background.png';

function App() {
  const [refresh, setRefresh] = useState(0);

  // const [menus, setMenus] = useState([]);
  // const menusRef = collection(db, 'menus');

  // useEffect(
  //   () => {
  //     const getMenus = async () => {
  //       const data = await getDocs(menusRef);

  //         data.docs.forEach(
  //           menu => {

  //             const getDishes = async () => {
  //               var dishesRef = collection(db, 'menus' + '/' + menu.id + '/' + 'dishes');
  //               const dishes = await getDocs(dishesRef);

  //               console.log('Adding at menu id', menu.id);
  //               const dishesList = dishes.docs.map( dish => ({...dish.data(), id: dish.id}));

  //               setMenus(
  //                 (prevList) => ([...prevList, {...menu.data(), id: menu.id, dishes: dishesList}])
  //               )
  //             }

  //             getDishes();
  //           }
  //         )

  //         // setRefreshDataCount((prevCount) => prevCount + 1)
  //     }

  //     getMenus();
  //     console.log('App call', refreshDataCount);

  //     // getMenus().then(
  //     //   () => {
  //     //     console.log('In App:', menus);
  //     //   }
  //     // ).catch(
  //     //   (e) => console.log('Error in loading data:', e)
  //     // );      
  //   }
  // , [])


  // const [docs ,setDocs] = useState([]);
//   const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
//     setDocs([...docs, doc.data(), doc.id]);
//     console.log("Current data: ", doc.data());
// });

  return (
    // Learn Listen for change
    // <div>
    //   <text> Learning is god! </text>

    // </div>

    // App run
    <div style={{backgroundImage: `url(${bg})`, height: '50%', backgroundSize: '100%'}}>
      <MenuSection 
      refresh={refresh}
      setRefresh={setRefresh}
      // menusList={menus}
      // count={refreshDataCount}
      // setCount={setRefreshDataCount}
    />

      {/* <img src='https://cdn.theforkmanager.com/static/body-images/the-fork-10-desserts-ideas-to-add-to-your-menu-8.jpg'/> */}
    </div>

    // <div>
    //   {
        
    //   menusList.map(
    //     menu => {
    //       console.log(menusList);
    //       console.log('The menu with id', menu.id, ':', menu);

    //       return (
    //           <div>
    //           <text> {menu.id}: {menu.name} </text>
    //           {
    //             menu.dishes.map(
    //               dish => (<h1> {dish.id}: {dish.name}, {dish.price} </h1>)
    //             )
    //           }
    //         </div>
    //       )
    //     }
    //   )}
    // </div>
  );
}

export default App;
