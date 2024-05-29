// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqWEXcJheNcoW6wN-YQyFO89kBvFypvV0",
  authDomain: "pinterestclone-423704.firebaseapp.com",
  projectId: "pinterestclone-423704",
  storageBucket: "pinterestclone-423704.appspot.com",
  messagingSenderId: "446258264117",
  appId: "1:446258264117:web:54b4ff3dd2ae52f99d597c",
  measurementId: "G-NM02CVNSL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

