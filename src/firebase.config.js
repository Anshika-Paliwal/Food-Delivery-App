import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDmFSJgXeMze_m-_pZHcjj0z8sMlgD0JvI",
    authDomain: "e-commerce-website-a8c0c.firebaseapp.com",
    databaseURL: "https://e-commerce-website-a8c0c-default-rtdb.firebaseio.com",
    projectId: "e-commerce-website-a8c0c",
    storageBucket: "e-commerce-website-a8c0c.appspot.com",
    messagingSenderId: "113781599693",
    appId: "1:113781599693:web:cccfc770dc96084e0ea884",
    measurementId: "G-QRLLRLK8WH"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, storage }