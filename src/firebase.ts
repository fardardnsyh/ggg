import { getApp,getApps,initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgfIcCPxD0609UjQJvDjOa8KLMKaAcU4c",
  authDomain: "doctalk-5a51e.firebaseapp.com",
  projectId: "doctalk-5a51e",
  storageBucket: "doctalk-5a51e.appspot.com",
  messagingSenderId: "503705436637",
  appId: "1:503705436637:web:279b1adf8aef900d3bb634"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig):getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage};