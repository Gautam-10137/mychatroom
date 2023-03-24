import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import{getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCnSkNKf6FjSytpAQ7z2WiLIRwzdxA6wj0",
  authDomain: "chatapp-605a0.firebaseapp.com",
  projectId: "chatapp-605a0",
  storageBucket: "chatapp-605a0.appspot.com",
  messagingSenderId: "141015849294",
  appId: "1:141015849294:web:774092f0d6bdbb6d90e61f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);