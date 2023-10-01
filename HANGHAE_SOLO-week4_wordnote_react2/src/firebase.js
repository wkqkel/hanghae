import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 파이어베이스 접속해서 db 가져오기
const firebaseConfig = {
  apiKey: "AIzaSyBn-iGo64SSNNTbwf-KrEd0lNfavnFqDvs",
  authDomain: "wordnote-ff327.firebaseapp.com",
  projectId: "wordnote-ff327",
  storageBucket: "wordnote-ff327.appspot.com",
  messagingSenderId: "893244578450",
  appId: "1:893244578450:web:96ebd5cf94a09c3ba2e44b",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
