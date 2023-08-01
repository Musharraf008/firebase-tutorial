import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALAXfznlBvdWZNvqCE9Hk1bhVXIDMWpgA",
  authDomain: "fir-tutorial-47d5f.firebaseapp.com",
  projectId: "fir-tutorial-47d5f",
  storageBucket: "fir-tutorial-47d5f.appspot.com",
  messagingSenderId: "842218208502",
  appId: "1:842218208502:web:b8e11cb5b80124b13980d7",
  measurementId: "G-H1RJF9FK9L",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app)
