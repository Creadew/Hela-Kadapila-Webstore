// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLZ6orFBvblyU54be-VHN9i73XqjW3wYg",
  authDomain: "hela-kadapila-web-2.firebaseapp.com",
  projectId: "hela-kadapila-web-2",
  storageBucket: "hela-kadapila-web-2.appspot.com",
  messagingSenderId: "718039667693",
  appId: "1:718039667693:web:6aa76ecac0e0c77c8a4de4",
  measurementId: "G-D2D45BGPD7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app, "gs://hela-kadapila-web-2.appspot.com");

export { fireDB, auth, storage };
