// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPgI0z5wRqsSrJ1ucHSx1rsD7FLdIFQ6M",
  authDomain: "video-d6119.firebaseapp.com",
  projectId: "video-d6119",
  storageBucket: "video-d6119.firebasestorage.app",
  messagingSenderId: "54360567416",
  appId: "1:54360567416:web:350c5aca8b30e7b2ab478d",
  measurementId: "G-KXFBEKR3BT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
