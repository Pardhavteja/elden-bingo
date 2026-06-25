import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxxr1cGIRkIkqD1ZZzuiCGBHNE6Fyh3eo",
  authDomain: "elden-bingo-36c90.firebaseapp.com",
  projectId: "elden-bingo-36c90",
  storageBucket: "elden-bingo-36c90.firebasestorage.app",
  messagingSenderId: "698052644671",
  appId: "1:698052644671:web:9dbab8355070b839150d8a"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);