import {getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDNGUWY6Rh88eWtFhSUggONL18zs2T2_S0",
  authDomain: "techverse-65b6f.firebaseapp.com",
  projectId: "techverse-65b6f",
  storageBucket: "techverse-65b6f.appspot.com",
  messagingSenderId: "721527550119",
  appId: "1:721527550119:web:a123cb542b660ae682eb82",
  measurementId: "G-J9ZVY6Y8NS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)
export const db =  getFirestore(app)
