import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCszAnC1H1Uwl9UlHOxEV19Qe3KBUvpUBk",
  authDomain: "olx-web-app-c944d.firebaseapp.com",
  projectId: "olx-web-app-c944d",
  storageBucket: "olx-web-app-c944d.appspot.com",
  messagingSenderId: "684786325127",
  appId: "1:684786325127:web:58b2f40a5d925e04e1ca22",
  measurementId: "G-6MZ6PS3KJC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app)
