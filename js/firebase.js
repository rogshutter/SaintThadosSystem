// Importation des modules nécessaires depuis Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDmhYKjvtbMUGddCybtfjmQyv20aylD_uY",
  authDomain: "thadosschool.firebaseapp.com",
  projectId: "thadosschool",
  storageBucket: "thadosschool.firebasestorage.app",
  messagingSenderId: "488603663388",
  appId: "1:488603663388:web:8165ee762628b3f833f3d9",
  measurementId: "G-1LSDF10EYX"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export async function loginUser(email, password) {
  try {
    // Authentification de l'utilisateur avec email et mot de passe
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const uid = user.uid;

    // Référence au document utilisateur dans Firestore
    const userRef = doc(firestore, "users", uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Créer un document utilisateur s'il n'existe pas encore
      await setDoc(userRef, {
        email: user.email,
        role: "student" // Par défaut, rôle "student"
      });
      console.log("Document utilisateur créé avec succès.");
    }

    // Récupération des données utilisateur
    const userData = (await getDoc(userRef)).data();
    const userRole = userData.role;

    // Redirection selon le rôle
    switch (userRole) {
      case "admin":
        window.location.href = "dashboard_admin.html";
        break;
      case "student":
        window.location.href = "dashboard_eleve.html";
        break;
      case "teacher":
        window.location.href = "dashboard_prof.html";
        break;
      case "authority":
        window.location.href = "dashboard_autorite.html";
        break;
      default:
        console.error("Rôle inconnu.");
    }
  } catch (error) {
    console.error("Erreur lors de la connexion : ", error.message);
    alert("Échec de la connexion. Veuillez vérifier vos identifiants.");
  }
}