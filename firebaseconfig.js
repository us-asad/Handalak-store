import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCk0uReWXQI6SDXVrIIuUGJm7L1FuVFkoA",
  authDomain: "olcha-uz.firebaseapp.com",
  projectId: "olcha-uz",
  storageBucket: "olcha-uz.appspot.com",
  messagingSenderId: "436630559578",
  appId: "1:436630559578:web:5e7d320e06827635fa7163"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
