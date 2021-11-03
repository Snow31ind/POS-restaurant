import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import {db} from './firebase/config'
import {getDoc ,setDoc, collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, collectionGroup} from 'firebase/firestore'
import Carousel from 'react-elastic-carousel';
// import styles from './App.css'
import Item from './comps/Item';
import { isValidTimestamp } from '@firebase/util';
import Menu from './comps/Menu';
function App() {
  // const [newName, setNewName] = useState("")
  // const [newAge, setNewAge] = useState(0)

  // const [users, setUsers] = useState([]);
  // const usersColRef = collection(db, "users");

  // useEffect(
  //   () => {
  //     const getUsers = async () => {
  //       const data = await getDocs(usersColRef);
  //       console.log(data);

  //       setUsers(data.docs.map(doc => ({...doc.data(), id:doc.id})));
  //     }

  //     getUsers();
  //   }
  // ,[])

  //   const createUser = async () => {
  //     await addDoc(usersColRef, {name: newName, age: Number(newAge)})
  //   }

  //   const updateUser = async (id, age) =>{
  //     const newFields = {age: age + 1};
  //     const userDoc = doc(db, "users", id);
  //     await updateDoc(userDoc, newFields);
  //   }

  //   const deleteUser = async (id) => {
  //     const userDoc = doc(db, "users", id);
  //     await deleteDoc(userDoc);

  //   }

  const [menus, setMenus] = useState([]);
  const menuColRef = collection(db, 'menu');
  const [hotpots, setHotpos] = useState([]);

  useEffect(
    () => {
      const getMenus = async () => {
        const data = await getDocs(menuColRef);
        console.log(data.docs);

        setMenus(data.docs.map(
          doc => {
            return (
              {...doc.data(), id: doc.id}
            )
          } 
        ))
      }
      getMenus();
    }
  , []);

  const addData = async () => {
    const citiesRef = collection(db, "cities");

    await setDoc(doc(citiesRef, "SF"), {
      name: "San Francisco", state: "CA", country: "USA",
      capital: false, population: 860000,
      regions: ["west_coast", "norcal"] });
  await setDoc(doc(citiesRef, "LA"), {
      name: "Los Angeles", state: "CA", country: "USA",
      capital: false, population: 3900000,
      regions: ["west_coast", "socal"] });
  await setDoc(doc(citiesRef, "DC"), {
      name: "Washington, D.C.", state: null, country: "USA",
      capital: true, population: 680000,
      regions: ["east_coast"] });
  await setDoc(doc(citiesRef, "TOK"), {
      name: "Tokyo", state: null, country: "Japan",
      capital: true, population: 9000000,
      regions: ["kanto", "honshu"] });
  await setDoc(doc(citiesRef, "BJ"), {
      name: "Beijing", state: null, country: "China",
      capital: true, population: 21500000,
      regions: ["jingjinji", "hebei"] });
  }

  const a = doc(db, 'menu', 'dishes');
  const b = a.id;


  return (
    <div className='App-container'>

      <div>
        <button
          style={{width: 100, height: 100}}
          onClick={addData}
        >
          Add data
        </button>
        {menus.map(
          menu => (<h1>{menu.id}: {menu.name} </h1>)
        )}
      </div>
      {/* <div className='App-menu'>
        <Menu />
      </div>

      <div className='App-list'>

      </div>   */}
    </div>
  );
}

export default App;
