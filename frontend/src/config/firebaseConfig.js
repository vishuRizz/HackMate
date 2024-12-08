// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrth4DYERDvgHS_urbjDxEdA-Rn7YZ7_c",
  authDomain: "multiverse-saas.firebaseapp.com",
  projectId: "multiverse-saas",
  storageBucket: "multiverse-saas.firebaseapp.com",
  messagingSenderId: "863836481185",
  appId: "1:863836481185:web:76228297005a8791b1f2e0",
  measurementId: "G-VBQTNVJESL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase Authentication instance
const auth = getAuth();

// Token Refresh Logic
const setupTokenRefresh = () => {
  // Listen to changes in the user's sign-in state
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        // Get and refresh the token
        const token = await user.getIdToken(true); // Force refresh
        console.log("Refreshed Firebase Token:", token);

        // Store the refreshed token in localStorage or your state management
        localStorage.setItem("firebaseToken", token);

        // (Optional) You can also store other user data if needed
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Error refreshing token:", error.message);
      }
    }
  });
};

// Call the token refresh setup when the app initializes
setupTokenRefresh();

export { app, auth };









// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCrth4DYERDvgHS_urbjDxEdA-Rn7YZ7_c",
//   authDomain: "multiverse-saas.firebaseapp.com",
//   projectId: "multiverse-saas",
//   storageBucket: "multiverse-saas.firebasestorage.app",
//   messagingSenderId: "863836481185",
//   appId: "1:863836481185:web:76228297005a8791b1f2e0",
//   measurementId: "G-VBQTNVJESL"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);