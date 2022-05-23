/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB-O00iYg_wAHDvqWq2ffjuFcGI82YirMc",
  authDomain: "otpapp-d2143.firebaseapp.com",
  databaseURL: "https://otpapp-d2143-default-rtdb.firebaseio.com",
  projectId: "otpapp-d2143",
  storageBucket: "otpapp-d2143.appspot.com",
  messagingSenderId: "697936759034",
  appId: "1:697936759034:web:4ec937e2e416a840f2a143",
  measurementId: "G-NEMB6K2QGX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);

export const provider = new GoogleAuthProvider();

 
export const database = getDatabase(app);