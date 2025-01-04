import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();

// Fonction pour créer un utilisateur avec un rôle spécifique
async function createUser(email, password, role) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Enregistrer l'utilisateur dans Firestore avec un rôle spécifique
    await setDoc(doc(firestore, "users", user.uid), {
      email: user.email,
      role: role
    });

    console.log(`${role} créé avec succès`);
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur : ", error);
  }
}

// Fonction de connexion
async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Récupérer les données de l'utilisateur depuis Firestore pour obtenir son rôle
    const userDoc = await getDoc(doc(firestore, "users", user.uid));
    const userData = userDoc.data();

    if (userData && userData.role) {
      // Vérifier le rôle et rediriger l'utilisateur
      if (userData.role === "admin") {
        window.location.href = "admin_dashboard.html"; // Redirection vers le tableau de bord de l'administrateur
      } else if (userData.role === "student") {
        window.location.href = "student_dashboard.html"; // Redirection vers le tableau de bord de l'élève
      } else if (userData.role === "teacher") {
        window.location.href = "teacher_dashboard.html"; // Redirection vers le tableau de bord de l'enseignant
      } else if (userData.role === "authority") {
        window.location.href = "authority_dashboard.html"; // Redirection vers le tableau de bord de l'autorité
      }
    } else {
      console.error("Le rôle de l'utilisateur est introuvable.");
    }
  } catch (error) {
    console.error("Erreur lors de la connexion : ", error);
  }
}

// Vous pouvez ajouter d'autres méthodes ici selon vos besoins (ex : fonction de déconnexion)
