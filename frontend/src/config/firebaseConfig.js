// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrth4DYERDvgHS_urbjDxEdA-Rn7YZ7_c",
  authDomain: "multiverse-saas.firebaseapp.com",
  projectId: "multiverse-saas",
  storageBucket: "multiverse-saas.firebasestorage.app",
  messagingSenderId: "863836481185",
  appId: "1:863836481185:web:76228297005a8791b1f2e0",
  measurementId: "G-VBQTNVJESL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);