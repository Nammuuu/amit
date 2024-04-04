const express = require('express');
const app = express();
app.use(express.json()); // Use express.json() to parse JSON in the request body
const firebase = require('firebase');

// const firebaseConfig = {
//     apiKey: "AIzaSyBxwaJcfLPPZiOk8NzhkRZJwg3EmaygZ68",
//     authDomain: "swap-fb37b.firebaseapp.com",
//     projectId: "swap-fb37b",
//     storageBucket: "swap-fb37b.appspot.com",
//     messagingSenderId: "158236462122",
//     appId: "1:158236462122:web:d5b413fd82f69a12604753",
//     measurementId: "G-WG29J2F891"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCgE_Q7DwtHT1dbTImpe5cm43h2E3vVR5Q",
  authDomain: "virtualtryon-827f1.firebaseapp.com",
  projectId: "virtualtryon-827f1",
  storageBucket: "virtualtryon-827f1.appspot.com",
  messagingSenderId: "966667244888",
  appId: "1:966667244888:web:d8add19fd560110d58812d",
  measurementId: "G-1X2GYRRXKJ"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();   
module.exports={db}