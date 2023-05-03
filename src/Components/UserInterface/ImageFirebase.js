import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAtPFHijTeiCrKj1dYttIAHgVeZcIKRBrU",
  authDomain: "tattoo-tattle.firebaseapp.com",
  projectId: "tattoo-tattle",
  storageBucket: "tattoo-tattle.appspot.com",
  messagingSenderId: "392369009944",
  appId: "1:392369009944:web:de6c197d6f4a44ec90da6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);