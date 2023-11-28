// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpDUWuP_Chw2eMFtYswpaUu43GVFOi0Ng",
  authDomain: "auth-35e1a.firebaseapp.com",
  projectId: "auth-35e1a",
  storageBucket: "auth-35e1a.appspot.com",
  messagingSenderId: "437838522251",
  appId: "1:437838522251:web:68f5080ed6b9aa1e8bb18e",
  measurementId: "G-EBZD8MQ568"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};