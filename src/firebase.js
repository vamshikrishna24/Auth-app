// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "tutorials-e7dfc.firebaseapp.com",
  projectId: "tutorials-e7dfc",
  storageBucket: "tutorials-e7dfc.appspot.com",
  messagingSenderId: "213106200299",
  appId: "1:213106200299:web:8e04a786b67a80478bb8ae",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
