import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvWkJQMmZH7nV4xRmM64CajdIkYcMCJ8E",
  authDomain: "slack-clone-a385b.firebaseapp.com",
  projectId: "slack-clone-a385b",
  storageBucket: "slack-clone-a385b.appspot.com",
  messagingSenderId: "957160321859",
  appId: "1:957160321859:web:dc7cf7c4f7ea3d765535f6",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
