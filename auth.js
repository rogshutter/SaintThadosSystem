import { auth, signInWithEmailAndPassword } from "../firebase/config.js";

const loginWithEmail = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Utilisateur connecté : ", user);
      window.location.href = "/pages/dashboard.html"; // Redirige vers le tableau de bord
    })
    .catch((error) => {
      console.error("Erreur de connexion : ", error.message);
    });
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("input[type=email]").value;
  const password = document.querySelector("input[type=password]").value;
  loginWithEmail(email, password);
});
