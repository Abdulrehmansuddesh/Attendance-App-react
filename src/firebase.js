// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-MDbKxfjHCOptEaUX47pG2D23fWgayK8",
  authDomain: "attendence-app-165cb.firebaseapp.com",
  projectId: "attendence-app-165cb",
  storageBucket: "attendence-app-165cb.appspot.com",
  messagingSenderId: "481120103861",
  appId: "1:481120103861:web:e7ff4895779c8b03cf3dfc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage();
export{
  auth ,
  app,
  db,
  storage
}
