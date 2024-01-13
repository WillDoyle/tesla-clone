import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiMPWRyO2P3FpbyaxidhWbL_nFmrY-oNA",
  authDomain: "tesla-clone-6f06a.firebaseapp.com",
  projectId: "tesla-clone-6f06a",
  storageBucket: "tesla-clone-6f06a.appspot.com",
  messagingSenderId: "899649792849",
  appId: "1:899649792849:web:909ed5b772d7560d068170",
  measurementId: "G-KFVM4L4NXC",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export { auth };
