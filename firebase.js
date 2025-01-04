// Firebase Configuration File
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmhYKjvtbMUGddCybtfjmQyv20aylD_uY",
  authDomain: "thadosschool.firebaseapp.com",
  projectId: "thadosschool",
  storageBucket: "thadosschool.firebasestorage.app",
  messagingSenderId: "488603663388",
  appId: "1:488603663388:web:8165ee762628b3f833f3d9",
  measurementId: "G-1LSDF10EYX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword };
