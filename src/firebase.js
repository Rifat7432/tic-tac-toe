// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuDwivfDaGP3OWHteVii9GhfGhO3JX4cY",
  authDomain: "tic-tac-toe-b12e2.firebaseapp.com",
  projectId: "tic-tac-toe-b12e2",
  storageBucket: "tic-tac-toe-b12e2.appspot.com",
  messagingSenderId: "698503544307",
  appId: "1:698503544307:web:101636e3366894f9e16686"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;