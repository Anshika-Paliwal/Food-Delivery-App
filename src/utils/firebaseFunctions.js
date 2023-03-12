import { doc, setDoc, getDocs, query, collection, orderBy } from "firebase/firestore"
import { firestore } from "../firebase.config"

// Saving new Item Details in foodItems Collection in Firestore
export const saveItem = async (data) => {
    await setDoc(doc(firestore, 'foodItems', `${Date.now()}`), // foodItems is firebase collection 
        data, { merge: true, });
}

// Fetching all the details from Cloud
export const getAllFoodItems = async () => {
    const items = await getDocs(
        query(collection(firestore, 'foodItems'), orderBy("id", "desc"))
    );
    return items.docs.map((doc) => doc.data());
}

