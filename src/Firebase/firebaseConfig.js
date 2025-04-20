import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadString } from 'firebase/storage';
import { getDatabase, update, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC9jK1Qyfp9D5q_NZV69JnsMxd6JTwQj-E",
  authDomain: "memory-86951.firebaseapp.com",
  projectId: "memory-86951",
  storageBucket: "memory-86951.firebasestorage.app",
  messagingSenderId: "531718749563",
  appId: "1:531718749563:web:73325e396f7bb2fef111de"
};





const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getDatabase(app);

export { app, auth, storage, db, firebaseConfig };
