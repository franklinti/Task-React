// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAV7JuMTiIey3GlOxB7xqe2Xo9t3v2cuFo",
    authDomain: "task-a71db.firebaseapp.com",
    projectId: "task-a71db",
    storageBucket: "task-a71db.appspot.com",
    messagingSenderId: "424364929664",
    appId: "1:424364929664:web:81b1b64837e5d7d9186c65",
    measurementId: "G-G1RSG1RYXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storageFirebase = getStorage(app);


