import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadString } from 'firebase/storage';
import { getDatabase,update,get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAd1WXi7YX42cUyWTDQGmEH-dXeNE2bM3k",
  authDomain: "sentiments-a87bf.firebaseapp.com",
  databaseURL: "https://sentiments-a87bf-default-rtdb.firebaseio.com",
  projectId: "sentiments-a87bf",
  storageBucket: "sentiments-a87bf.appspot.com",
  messagingSenderId: "283489049280",
  appId: "1:283489049280:web:16132a4d5d87eed3b7eb25",
  measurementId: "G-00WFWEJ6M3"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getDatabase(app);

export { app, auth, storage,db,firebaseConfig };
