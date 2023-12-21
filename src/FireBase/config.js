// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOQ3WdX1CXqWkeeq3PRrHlu_2sdEGgWwc",
  authDomain: "yu-gi-oh-react.firebaseapp.com",
  projectId: "yu-gi-oh-react",
  storageBucket: "yu-gi-oh-react.appspot.com",
  messagingSenderId: "461571299527",
  appId: "1:461571299527:web:a271c2b10ca0956e3cc6e2",
  measurementId: "G-745H4WJL4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

//const analytics = getAnalytics(app);