import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1QYYx4D5RW_yB3mDPrvIzqZhOnDrBX1o",
  authDomain: "worldly-73271.firebaseapp.com",
  projectId: "worldly-73271",
  storageBucket: "worldly-73271.firebasestorage.app",
  messagingSenderId: "977389626458",
  appId: "1:977389626458:web:e49e61dd54d8186327e463",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
