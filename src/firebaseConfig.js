// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getSelectionRange } from "@testing-library/user-event/dist/utils";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd5ionvF0SGjNYR9u96SAx5Yl00ma146k",
  authDomain: "beach-hack-5.firebaseapp.com",
  projectId: "beach-hack-5",
  storageBucket: "beach-hack-5.appspot.com",
  messagingSenderId: "159052157019",
  appId: "1:159052157019:web:e0267c4c00c2c21a702f7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const storage = new getStorage(app)