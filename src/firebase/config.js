import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBR65l5gTIG1yYM5gOHjkg2itcZzg0Cfjg",
    authDomain: "pos-restaurant-34dad.firebaseapp.com",
    projectId: "pos-restaurant-34dad",
    storageBucket: "pos-restaurant-34dad.appspot.com",
    messagingSenderId: "172459041510",
    appId: "1:172459041510:web:81dbc61b9783f1cdc71127",
    measurementId: "G-8JVS09E3WD"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);



