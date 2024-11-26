import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0SXdy-N9ptpXY7Atp-R0VJshmNtU6lb0",
  authDomain: "fir-auth-7f5dc.firebaseapp.com",
  projectId: "fir-auth-7f5dc",
  storageBucket: "fir-auth-7f5dc.appspot.com",
  messagingSenderId: "444058395374",
  appId: "1:444058395374:web:ea7cc7e82510c2d7aa09ff",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
