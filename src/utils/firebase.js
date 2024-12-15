import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyC_R_IyeGqSn2WCY5ptWoRb3E0uWWi03fg",
    authDomain: "hdfh-32d6c.firebaseapp.com",
    projectId: "hdfh-32d6c",
    storageBucket: "hdfh-32d6c.firebasestorage.app",
    messagingSenderId: "531664911898",
    appId: "1:531664911898:web:2f355f348629d76f585ba3"
  };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
