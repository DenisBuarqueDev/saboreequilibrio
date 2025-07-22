// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDaELK-sHuoWO9L0qXtcmOF7IrbmJpE_V4",
  authDomain: "sabor-e-equilibrio-app.firebaseapp.com",
  projectId: "sabor-e-equilibrio-app",
  storageBucket: "sabor-e-equilibrio-app.firebasestorage.app",
  messagingSenderId: "139553827357",
  appId: "1:139553827357:web:341dc53c68b5138ecd74f4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };