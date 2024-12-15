import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  onAuthStateChanged, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrth4DYERDvgHS_urbjDxEdA-Rn7YZ7_c",
  authDomain: "multiverse-saas.firebaseapp.com",
  projectId: "multiverse-saas",
  storageBucket: "multiverse-saas.appspot.com",
  messagingSenderId: "863836481185",
  appId: "1:863836481185:web:76228297005a8791b1f2e0",
  measurementId: "G-VBQTNVJESL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

// Set persistent authentication
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to local (long-lasting sessions).");
  })
  .catch((error) => {
    console.error(
      "Error setting persistence. This may be due to blocked cookies or storage:",
      error.message
    );
    alert("Your browser is blocking persistent authentication. Please enable cookies.");
  });

// Function to handle token refresh and user state changes
const setupTokenRefresh = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        // Initial token refresh
        const token = await user.getIdToken(true);
        console.log("Initial Firebase Token:", token);

        // Store token securely in localStorage
        localStorage.setItem("firebaseToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Proactively refresh the token every 55 minutes
        const refreshInterval = setInterval(async () => {
          try {
            const refreshedToken = await user.getIdToken(true);
            console.log("Periodic Token Refresh:", refreshedToken);
            localStorage.setItem("firebaseToken", refreshedToken);
            localStorage.setItem("token", `Bearer ${refreshedToken}`);
          } catch (error) {
            console.error("Error during periodic token refresh:", error.message);
            clearInterval(refreshInterval); // Stop the interval on error
          }
        }, 58 * 60 * 1000); // 58 minutes
      } catch (error) {
        console.error("Error refreshing token on auth state change:", error.message);
      }
    } else {
      // Handle user logout
      console.log("User logged out.");
      localStorage.removeItem("firebaseToken");
      localStorage.removeItem("user");
    }
  });
};

// Call the token refresh setup
setupTokenRefresh();

export { app, auth };







// // Import the necessary Firebase functions
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCrth4DYERDvgHS_urbjDxEdA-Rn7YZ7_c",
//   authDomain: "multiverse-saas.firebaseapp.com",
//   projectId: "multiverse-saas",
//   storageBucket: "multiverse-saas.firebaseapp.com",
//   messagingSenderId: "863836481185",
//   appId: "1:863836481185:web:76228297005a8791b1f2e0",
//   measurementId: "G-VBQTNVJESL",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // Firebase Authentication instance
// const auth = getAuth();

// // Token Refresh Logic
// const setupTokenRefresh = () => {
//   // Listen to changes in the user's sign-in state
//   onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       try {
//         // Get and refresh the token
//         const token = await user.getIdToken(true); // Force refresh
//         console.log("Refreshed Firebase Token:", token);

//         // Store the refreshed token in localStorage or your state management
//         localStorage.setItem("firebaseToken", token);

//         // (Optional) You can also store other user data if needed
//         localStorage.setItem("user", JSON.stringify(user));
//       } catch (error) {
//         console.error("Error refreshing token:", error.message);
//       }
//     }
//   });
// };

// // Call the token refresh setup when the app initializes
// setupTokenRefresh();

// export { app, auth };









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