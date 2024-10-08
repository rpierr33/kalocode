import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNDYSZsFjw1DCd8EVreTx79fVEpREd3vU",
  authDomain: "agency-8f7a9.firebaseapp.com",
  projectId: "agency-8f7a9",
  storageBucket: "agency-8f7a9.appspot.com",
  messagingSenderId: "34963414633",
  appId: "1:34963414633:web:428cc5e0af51dd74f8ccf8",
  measurementId: "G-Q6SQHCYFHE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
