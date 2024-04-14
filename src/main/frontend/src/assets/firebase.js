// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGjvQhIuubHzhiN-LHSjEN10B63uX6Pes",
  authDomain: "left-right-toyple.firebaseapp.com",
  projectId: "left-right-toyple",
  storageBucket: "left-right-toyple.appspot.com",
  messagingSenderId: "124443337245",
  appId: "1:124443337245:web:48d61613860d09d1a35cf4",
  measurementId: "G-MR5ZLR0Y0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };