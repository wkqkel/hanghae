import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBX6VePtYRCtYtVRaPllVsaHnE-uqEbmYQ",
  authDomain: "image-community-f803b.firebaseapp.com",
  projectId: "image-community-f803b",
  storageBucket: "image-community-f803b.appspot.com",
  messagingSenderId: "376692889820",
  appId: "1:376692889820:web:3e546c7f59e8c4259b3c19",
  measurementId: "G-CEMS4MX5L6",
};

firebase.initializeApp(firebaseConfig);
const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };
