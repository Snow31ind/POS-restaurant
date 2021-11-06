import { db } from "./firebase/config.js";
import { collection, addDoc, getDocs, doc } from "@firebase/firestore";
import { data } from "./comps/Data.js";

console.log('Program is running');

const menusRef = collection(db, 'menus');