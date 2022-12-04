import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8ZngOhX75hc-lKJ5HzlIJ-GhDt89zGCU",
  authDomain: "desafio-quinta-etapa.firebaseapp.com",
  databaseURL: "https://desafio-quinta-etapa-default-rtdb.firebaseio.com",
  projectId: "desafio-quinta-etapa",
  storageBucket: "desafio-quinta-etapa.appspot.com",
  messagingSenderId: "163012661353",
  appId: "1:163012661353:web:8ec83b390e3dce7ebed2f8",
};

//iniciar firebaseapp

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export default app;
