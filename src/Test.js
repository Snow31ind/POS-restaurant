import { db } from "./firebase/config.js";
import { collection, addDoc, getDocs } from "@firebase/firestore";

const userColref = collection(db, "customers");

const addCustomer = async (customer) => {
    await addDoc(userColref, customer);
}

const getUsers = async () => {
    const data = await getDocs(userColref);
    

    data.docs.map(
        (doc) => console.log({...doc.data(), id: doc.id})
    );
}

let customer = {
    name: "Quang Tien",
    phoneNumber: "0789130657",
    sex: "male"
}

const customers = db.collection('customers');
// getUsers();

// addCustomer(customer);