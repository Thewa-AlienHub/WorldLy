// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1QYYx4D5RW_yB3mDPrvIzqZhOnDrBX1o",
  authDomain: "worldly-73271.firebaseapp.com",
  projectId: "worldly-73271",
  storageBucket: "worldly-73271.firebasestorage.app",
  messagingSenderId: "977389626458",
  appId: "1:977389626458:web:e49e61dd54d8186327e463"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();